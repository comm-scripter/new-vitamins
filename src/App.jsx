import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useAuth } from './hooks';
import Header from './components/Header';
import MenuOverlay from './components/MenuOverlay';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import AppPage from './components/AppPage';
import InfoPage from './components/InfoPage';
import AboutPage from './components/AboutPage';
import FeedbackPage from './components/FeedbackPage';
import DevotionalPage from './components/DevotionalPage';
import FavoritesPage from './components/FavoritesPage';
import SalvationPage from './components/SalvationPage';
import { CATEGORIES } from './data';

export default function App() {
  const { user, authLoading } = useAuth();
  const loggedIn = !!user;
  const userEmail = user?.email ?? '';
  const [page, setPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [devotionalCatId, setDevotionalCatId] = useState(null);
  const [savedCat, setSavedCat] = useState(null);
  const [savedDay, setSavedDay] = useState(null);

  useEffect(()=>{
    const handler = (e) => { if(e.key==='Escape') setMenuOpen(false); };
    window.addEventListener('keydown', handler);
    return ()=>window.removeEventListener('keydown', handler);
  },[]);

  // Jump returning (already-logged-in) visitors past the landing page once
  // the initial auth check resolves, mirroring the old localStorage-seeded
  // page state without needing localStorage.
  useEffect(() => {
    if (!authLoading && user && page === 'home') setPage('app');
  }, [authLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogout = async () => {
    await signOut(auth);
    setPage('home');
  };

  const handleNavigate = (p) => {
    if ((p==='app' || p==='favorites') && !loggedIn) { setPage('login'); return; }
    if (p==='home' && loggedIn) { setPage('app'); return; }
    if (p.startsWith('devotional:')) {
      setDevotionalCatId(p.split(':')[1]);
      setPage('devotional');
      return;
    }
    setPage(p);
  };

  const pageMap = {
    home:       <LandingPage onNavigate={handleNavigate}/>,
    login:      <LoginPage onAuthenticated={()=>setPage('app')}/>,
    app:        <AppPage userEmail={userEmail} onNavigate={handleNavigate}
                  savedCat={savedCat} savedDay={savedDay}
                  onCatChange={setSavedCat} onDayChange={setSavedDay}/>,
    favorites:  <FavoritesPage onOpenMenu={()=>setMenuOpen(true)}/>,
    info:       <InfoPage onNavigate={handleNavigate} onOpenMenu={()=>setMenuOpen(true)}/>,
    salvation:  <SalvationPage onNavigate={handleNavigate} onOpenMenu={()=>setMenuOpen(true)}/>,
    about:      <AboutPage onNavigate={handleNavigate} onOpenMenu={()=>setMenuOpen(true)}/>,
    feedback:   <FeedbackPage onOpenMenu={()=>setMenuOpen(true)}/>,
    devotional: <DevotionalPage
                  category={CATEGORIES.find(c => c.id === devotionalCatId)}
                  onNavigate={handleNavigate}/>,
  };

  if (authLoading) {
    return <div style={{width:'100%', height:'100%', background:'#0d0820'}}/>;
  }

  return (
    <div style={{width:'100%', height:'100%', position:'relative', overflow:'hidden'}}>
      <Header
        onMenuToggle={()=>setMenuOpen(m=>!m)}
        menuOpen={menuOpen}
        onNavigate={handleNavigate}
        loggedIn={loggedIn}
        userEmail={userEmail}
      />
      <MenuOverlay
        open={menuOpen}
        onClose={()=>setMenuOpen(false)}
        onNavigate={handleNavigate}
        loggedIn={loggedIn}
        onLogout={handleLogout}
      />
      {/* Recede/dim the page behind the menu overlay while it's open, and ease
          back in when it closes, instead of the content just sitting there
          static and popping back into view the instant the overlay fades out. */}
      <div style={{
        width:'100%', height:'100%',
        opacity: menuOpen ? 0.4 : 1,
        transform: menuOpen ? 'scale(0.97)' : 'scale(1)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}>
        {pageMap[page] || pageMap.home}
      </div>
    </div>
  );
}
