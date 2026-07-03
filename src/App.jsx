import { useState, useEffect } from 'react';
import Header from './components/Header';
import MenuOverlay from './components/MenuOverlay';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import AppPage from './components/AppPage';
import InfoPage from './components/InfoPage';
import AboutPage from './components/AboutPage';
import FeedbackPage from './components/FeedbackPage';
import DevotionalPage from './components/DevotionalPage';
import { CATEGORIES } from './data';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('loggedIn') === 'true');
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('userEmail') || '');
  const [page, setPage] = useState(() => localStorage.getItem('loggedIn') === 'true' ? 'app' : 'home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [devotionalCatId, setDevotionalCatId] = useState(null);
  const [savedCat, setSavedCat] = useState(null);
  const [savedDay, setSavedDay] = useState(null);

  useEffect(()=>{
    const handler = (e) => { if(e.key==='Escape') setMenuOpen(false); };
    window.addEventListener('keydown', handler);
    return ()=>window.removeEventListener('keydown', handler);
  },[]);

  const handleLogin = (email) => {
    setLoggedIn(true);
    setUserEmail(email);
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('userEmail', email);
    setPage('app');
  };

  const handleNavigate = (p) => {
    if (p==='app' && !loggedIn) { setPage('login'); return; }
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
    login:      <LoginPage onLogin={handleLogin}/>,
    app:        <AppPage userEmail={userEmail} onNavigate={handleNavigate}
                  savedCat={savedCat} savedDay={savedDay}
                  onCatChange={setSavedCat} onDayChange={setSavedDay}/>,
    info:       <InfoPage onNavigate={handleNavigate}/>,
    about:      <AboutPage onNavigate={handleNavigate}/>,
    feedback:   <FeedbackPage onNavigate={handleNavigate}/>,
    devotional: <DevotionalPage
                  category={CATEGORIES.find(c => c.id === devotionalCatId)}
                  onNavigate={handleNavigate}/>,
  };

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
      />
      <div style={{width:'100%', height:'100%'}}>
        {pageMap[page] || pageMap.home}
      </div>
    </div>
  );
}
