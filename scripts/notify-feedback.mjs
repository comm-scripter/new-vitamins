// Polls the Firestore `feedback` collection for messages submitted since the
// last run and emails a summary. Runs hourly via .github/workflows/notify-feedback.yml.
// Uses firebase-admin (service account), which bypasses firestore.rules entirely —
// that's expected, since the feedback collection is intentionally client-unreadable.
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import nodemailer from 'nodemailer';

const {
  FIREBASE_SERVICE_ACCOUNT_KEY,
  GMAIL_USER,
  GMAIL_APP_PASSWORD,
  NOTIFY_EMAIL,
} = process.env;

for (const [name, val] of Object.entries({
  FIREBASE_SERVICE_ACCOUNT_KEY, GMAIL_USER, GMAIL_APP_PASSWORD, NOTIFY_EMAIL,
})) {
  if (!val) throw new Error(`Missing required env var: ${name}`);
}

initializeApp({
  credential: cert(JSON.parse(FIREBASE_SERVICE_ACCOUNT_KEY)),
});
const db = getFirestore();

const CURSOR_REF = db.doc('_meta/feedbackNotifier');

async function main() {
  const cursorSnap = await CURSOR_REF.get();

  // First-ever run: establish the cursor at "now" and stop. Without this, the
  // first run would email every historical feedback doc (including test
  // submissions) all at once.
  if (!cursorSnap.exists) {
    await CURSOR_REF.set({ lastNotifiedAt: Timestamp.now() });
    console.log('No cursor found — initialized to now. Nothing sent this run.');
    return;
  }

  const { lastNotifiedAt } = cursorSnap.data();
  const newDocs = await db.collection('feedback')
    .where('sentAt', '>', lastNotifiedAt)
    .orderBy('sentAt', 'asc')
    .get();

  if (newDocs.empty) {
    console.log('No new feedback since last run.');
    return;
  }

  const entries = newDocs.docs.map(doc => {
    const d = doc.data();
    const when = d.sentAt?.toDate().toLocaleString('en-US', { timeZone: 'America/New_York' }) ?? 'unknown time';
    return `From: ${d.email ?? 'unknown'}\nWhen: ${when}\n\n${d.message}`;
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });

  await transporter.sendMail({
    from: GMAIL_USER,
    to: NOTIFY_EMAIL,
    subject: `Spiritual Vitamins: ${entries.length} new feedback message${entries.length > 1 ? 's' : ''}`,
    text: entries.join('\n\n---\n\n'),
  });

  const lastDoc = newDocs.docs[newDocs.docs.length - 1].data();
  await CURSOR_REF.set({ lastNotifiedAt: lastDoc.sentAt });
  console.log(`Sent ${entries.length} feedback message(s).`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
