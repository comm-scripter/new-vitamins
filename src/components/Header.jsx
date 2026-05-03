import CapsuleSVG from './CapsuleSVG';
import { useWindowWidth } from '../hooks';

export default function Header({ onMenuToggle, menuOpen, onNavigate }) {
  const isLarge = useWindowWidth() >= 1024;
  const capsuleSize = isLarge ? 26 : 18;
  const barWidth = isLarge ? 30 : 24;

  return (
    <header className="app-header">
      <button onClick={()=>onNavigate('home')} style={{
        background:'none', border:'none', cursor:'pointer',
        display:'flex', alignItems:'center', gap:12,
      }}>
        <CapsuleSVG color1="#a855f7" color2="#ec4899" size={capsuleSize}/>
        <span style={{fontFamily:'Playfair Display', color:'#f3e8ff', fontSize:'var(--fs-lg)', fontWeight:600, letterSpacing:'-0.01em'}}>
          Spiritual Vitamins
        </span>
      </button>
      <button onClick={onMenuToggle} style={{
        background:'none', border:'none', cursor:'pointer',
        display:'flex', flexDirection:'column', gap:6, padding:8,
        transition:'opacity 0.2s',
      }}>
        <span style={{
          display:'block', width:barWidth, height:2, background:'#e9d5ff', borderRadius:2,
          transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
          transition:'transform 0.3s ease',
        }}/>
        <span style={{
          display:'block', width:barWidth, height:2, background:'#e9d5ff', borderRadius:2,
          opacity: menuOpen ? 0 : 1,
          transition:'opacity 0.3s ease',
        }}/>
        <span style={{
          display:'block', width:barWidth, height:2, background:'#e9d5ff', borderRadius:2,
          transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
          transition:'transform 0.3s ease',
        }}/>
      </button>
    </header>
  );
}
