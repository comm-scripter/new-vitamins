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
    favorites:  <FavoritesPage onNavigate={handleNavigate}/>,
    info:       <InfoPage onNavigate={handleNavigate}/>,
    salvation:  <SalvationPage onNavigate={handleNavigate}/>,
    about:      <AboutPage onNavigate={handleNavigate}/>,
    feedback:   <FeedbackPage onNavigate={handleNavigate}/>,
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
      <div style={{width:'100%', height:'100%'}}>
        {pageMap[page] || pageMap.home}
      </div>
    </div>
  );
}
