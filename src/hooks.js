import { useState, useEffect, useMemo, useCallback } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, addDoc, onSnapshot, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';

export function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
}

export function useAuth() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => onAuthStateChanged(auth, u => { setUser(u); setAuthLoading(false); }), []);
  return { user, authLoading };
}

function favoriteDocId(categoryId, day, isBonus) {
  return `${categoryId}_${isBonus ? 'bonus' : day}`;
}

export function useFavorites() {
  const { user } = useAuth();
  const uid = user?.uid ?? null;
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) { setFavorites([]); setLoading(false); return; }
    setLoading(true);
    return onSnapshot(collection(db, 'users', uid, 'favorites'), snap => {
      setFavorites(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
  }, [uid]);

  const favoriteIds = useMemo(() => new Set(favorites.map(f => f.id)), [favorites]);

  const isFavorite = useCallback((categoryId, day, isBonus) =>
    favoriteIds.has(favoriteDocId(categoryId, day, isBonus)), [favoriteIds]);

  const toggleFavorite = useCallback(async ({ category, vitamin, dayLabel }) => {
    if (!uid) return;
    const isBonus = vitamin.day === undefined;
    const id = favoriteDocId(category.id, vitamin.day, isBonus);
    const ref = doc(db, 'users', uid, 'favorites', id);
    if (favoriteIds.has(id)) {
      await deleteDoc(ref);
    } else {
      await setDoc(ref, {
        categoryId: category.id, categoryLabel: category.label, categoryEmoji: category.emoji,
        categoryColor: category.color, day: isBonus ? null : vitamin.day, isBonus, dayLabel,
        scripture: vitamin.scripture, quote: vitamin.quote, savedAt: serverTimestamp(),
      });
    }
  }, [uid, favoriteIds]);

  return { favorites, loading, isFavorite, toggleFavorite };
}

// Writes to a top-level `feedback` collection (not user-scoped like
// favorites) — firestore.rules only allows create, not read/update/
// delete, so submitted messages are only visible via the Firebase console.
export function useSendFeedback() {
  const { user } = useAuth();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const sendFeedback = useCallback(async (message) => {
    if (!user) return false;
    setSending(true);
    setError(null);
    try {
      await addDoc(collection(db, 'feedback'), {
        message, uid: user.uid, email: user.email ?? null, sentAt: serverTimestamp(),
      });
      return true;
    } catch (e) {
      setError('Something went wrong sending your feedback. Please try again.');
      return false;
    } finally {
      setSending(false);
    }
  }, [user]);

  return { sending, error, sendFeedback };
}
