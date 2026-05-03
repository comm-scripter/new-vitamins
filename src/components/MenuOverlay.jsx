import StarField from './StarField';

export default function MenuOverlay({ open, onClose, onNavigate, loggedIn }) {
  const items = [
    { id:'home',     label:'Home',        icon:'🏠' },
    { id:'app',      label:'My Vitamins', icon:'💊', requireAuth:true },
    { id:'info',     label:'Info',        icon:'ℹ️' },
    { id:'about',    label:'About',       icon:'✨' },
    { id:'feedback', label:'Feedback',    icon:'💬' },
  ];
  return (
    <div style={{
      position:'fixed', inset:0, zIndex:190,
      background:'rgba(13,8,32,0.97)',
      backdropFilter:'blur(20px)',
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      opacity: open ? 1 : 0,
      pointerEvents: open ? 'all' : 'none',
      animation: open ? 'menuOverlayIn 0.35s ease forwards' : undefined,
      transition: open ? undefined : 'opacity 0.3s ease',
    }}>
      <StarField/>
      <nav style={{display:'flex', flexDirection:'column', gap:8, alignItems:'center'}}>
        {items.filter(it => !it.requireAuth || loggedIn).map((item, i) => (
          <button key={item.id} onClick={()=>{ onNavigate(item.id); onClose(); }} style={{
            background:'none', border:'none', cursor:'pointer',
            display:'flex', alignItems:'center', gap:16, padding:'14px 40px',
            borderRadius:16,
            animation: open ? `menuItemIn 0.4s ${i*0.07}s both` : undefined,
            transition:'background 0.2s',
          }}
          onMouseEnter={e=>e.currentTarget.style.background='rgba(168,85,247,0.15)'}
          onMouseLeave={e=>e.currentTarget.style.background='none'}
          >
            <span style={{fontSize:28}}>{item.icon}</span>
            <span style={{
              fontFamily:'Playfair Display',
              fontSize:36, color:'#f3e8ff',
              fontWeight:600, letterSpacing:'-0.02em',
            }}>{item.label}</span>
          </button>
        ))}
      </nav>
      <div style={{position:'absolute', bottom:40, color:'rgba(255,255,255,0.3)', fontSize:13, fontFamily:'DM Sans'}}>
        Press ESC to close
      </div>
    </div>
  );
}
