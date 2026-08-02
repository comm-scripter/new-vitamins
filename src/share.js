export function buildShareText(verse, refOrAuthor) {
  return `"${verse}"${refOrAuthor ? `\n— ${refOrAuthor}` : ''}\n\n${window.location.origin}`;
}

export const xIntentUrl = text => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;

export async function copyToClipboard(text) {
  await navigator.clipboard.writeText(text);
}
