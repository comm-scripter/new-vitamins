import { TODAY_IDX, DAYS } from '../data';
import AllVitaminsView from './AllVitaminsView';

export default function AppPage({ userEmail, onNavigate, savedCat, savedDay, onCatChange, onDayChange }) {
  const username = userEmail.split('@')[0];

  return (
    <div className="page-enter" style={{
      width:'100%', height:'100%',
      background:'radial-gradient(ellipse at 60% 0%, #180a35 0%, #0d0820 65%)',
      display:'flex', flexDirection:'column',
      overflow:'hidden',
    }}>
      <div className="app-greeting">
        <p style={{fontFamily:'DM Sans', fontSize:'var(--fs-xs)', color:'rgba(196,181,253,0.7)'}}>
          {DAYS[TODAY_IDX]}, {new Date().toLocaleDateString('en-US',{month:'long',day:'numeric'})}
        </p>
        <h2 style={{fontFamily:'Playfair Display', fontSize:'var(--fs-xl)', color:'#f3e8ff', fontWeight:700}}>
          Good day, <em style={{color:'#d8b4fe'}}>{username}</em> ✨
        </h2>
      </div>
      <div style={{flex:1, overflow:'hidden'}}>
        <AllVitaminsView onNavigate={onNavigate}
          savedCat={savedCat} savedDay={savedDay}
          onCatChange={onCatChange} onDayChange={onDayChange}/>
      </div>
    </div>
  );
}
