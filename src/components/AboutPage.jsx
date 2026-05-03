import BackButton from './BackButton';
import CapsuleSVG from './CapsuleSVG';

export default function AboutPage({ onNavigate }) {
  return (
    <div className="page-enter" style={{
      width:'100%', height:'100%', overflowY:'auto',
      background:'radial-gradient(ellipse at 30% 70%, #180a35 0%, #0d0820 70%)',
      padding:'80px 24px 40px',
    }}>
      <div style={{maxWidth:540, margin:'0 auto', textAlign:'center'}}>
        <BackButton onNavigate={onNavigate}/>
        <div style={{marginBottom:24, display:'flex', justifyContent:'center'}}>
          <CapsuleSVG color1="#a855f7" color2="#ec4899" size={40}/>
        </div>
        <h2 style={{fontFamily:'Playfair Display', fontSize:32, color:'#f3e8ff', marginBottom:12, fontWeight:700}}>About Spiritual Vitamins</h2>
        <p style={{fontFamily:'Playfair Display', fontStyle:'italic', fontSize:16, color:'#d8b4fe', marginBottom:24, lineHeight:1.7}}>
          "Thy word is a lamp unto my feet, and a light unto my path." — Psalm 119:105
        </p>
        <p style={{fontFamily:'DM Sans', fontSize:15, color:'rgba(233,213,255,0.65)', lineHeight:1.8, marginBottom:20}}>
          Spiritual Vitamins was created to make daily scripture engagement joyful, accessible, and memorable. We believe that God's Word is the ultimate nourishment for the human spirit.
        </p>
        <p style={{fontFamily:'DM Sans', fontSize:15, color:'rgba(233,213,255,0.65)', lineHeight:1.8}}>
          Content is drawn from the King James Version, NIV, and inspired quotes from theologians, historical figures, and spiritual leaders throughout history.
        </p>
        <div style={{marginTop:36, padding:20, borderRadius:16, background:'rgba(168,85,247,0.08)', border:'1px solid rgba(168,85,247,0.2)'}}>
          <p style={{fontFamily:'DM Sans', fontSize:13, color:'rgba(233,213,255,0.5)'}}>Version 1.0 · Content updates coming soon</p>
        </div>
        <div onClick={()=>onNavigate('home')} style={{
          marginTop:16, padding:20, borderRadius:16, cursor:'pointer',
          background:'rgba(168,85,247,0.08)', border:'1px solid rgba(168,85,247,0.2)',
          display:'flex', alignItems:'center', justifyContent:'center', gap:10,
          transition:'background 0.2s, border-color 0.2s',
        }}
        onMouseEnter={e=>{e.currentTarget.style.background='rgba(168,85,247,0.18)';e.currentTarget.style.borderColor='rgba(168,85,247,0.5)'}}
        onMouseLeave={e=>{e.currentTarget.style.background='rgba(168,85,247,0.08)';e.currentTarget.style.borderColor='rgba(168,85,247,0.2)'}}
        >
          <span style={{fontSize:22}}>🏠</span>
          <span style={{fontFamily:'DM Sans', fontSize:15, color:'#c4b5fd', fontWeight:500}}>Back to Home</span>
        </div>
      </div>
    </div>
  );
}
