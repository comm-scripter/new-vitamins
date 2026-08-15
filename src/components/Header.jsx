import CapsuleSVG from './CapsuleSVG';
import { useWindowWidth } from '../hooks';
import { DAYS, TODAY_IDX } from '../data';

export default function Header({ onMenuToggle, menuOpen, onNavigate, loggedIn, userEmail }) {
  const isLarge = useWindowWidth() >= 1024;
  const capsuleSize = isLarge ? 26 : 18;
  const barWidth = isLarge ? 30 : 24;
  const username = userEmail ? userEmail.split('@')[0] : '';

  return (
    <header className="app-header">
      {/* Date + greeting live in the header on large screens to free
          vertical space for the vitamin card and day picker below */}
      {isLarge && loggedIn && username && (
        <div style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', alignItems: 'baseline', gap: 12, whiteSpace: 'nowrap',
        }}>
          <span style={{ fontFamily: 'DM Sans', fontSize: 'var(--fs-xs)', color: 'rgba(196,181,253,0.7)' }}>
            {DAYS[TODAY_IDX]}, {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
          </span>
          <span style={{ fontFamily: 'Playfair Display', fontSize: 'var(--fs-lg)', color: '#f3e8ff', fontWeight: 700 }}>
            Good day, <em style={{ color: '#d8b4fe' }}>{username}</em> ✨
          </span>
        </div>
      )}
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
        display:'flex', flexDirection:'column', alignItems:'center', gap:6, padding:8,
        transition:'opacity 0.2s',
      }}>
        {/* Vertical center-to-center distance between bars (height 2 + gap 6).
            Bars translate straight down/up by exactly this before rotating,
            so the two diagonal legs cross dead-center — translateY listed
            before rotate() applies in screen space *after* the rotation,
            giving a precisely symmetrical X (the old rotate()-then-translate()
            order rotated the offset itself, landing the legs a couple px
            apart and making one side of the X look shorter). Widening the
            bars slightly in the X state reads as a bolder, more balanced X. */}
        <span style={{
          display:'block', width: menuOpen ? barWidth + 8 : barWidth, height:2, background:'#e9d5ff', borderRadius:2,
          transform: menuOpen ? 'translateY(8px) rotate(45deg)' : 'none',
          transition:'transform 0.3s ease, width 0.3s ease',
        }}/>
        <span style={{
          display:'block', width:barWidth, height:2, background:'#e9d5ff', borderRadius:2,
          opacity: menuOpen ? 0 : 1,
          transition:'opacity 0.3s ease',
        }}/>
        <span style={{
          display:'block', width: menuOpen ? barWidth + 8 : barWidth, height:2, background:'#e9d5ff', borderRadius:2,
          transform: menuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none',
          transition:'transform 0.3s ease, width 0.3s ease',
        }}/>
      </button>
    </header>
  );
}
