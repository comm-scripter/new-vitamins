import BackButton from './BackButton';

export default function InfoPage({ onNavigate }) {
  const items = [
    { icon:'💊', title:'Daily Vitamins', text:'Receive a curated verse or quote each day of the week, tailored to themes that matter: Faith, Hope, Love, and more.' },
    { icon:'🌀', title:'Flip to Reveal', text:'Each capsule holds a hidden message. Tap it to flip and reveal the scripture or wisdom inside.' },
    { icon:'✨', title:'Bonus Vitamins', text:'Choose from bonus vitamins for extra daily nourishment — morning blessings, evening peace, and courage boosters.' },
    { icon:'💙', title:'Save & Share', text:'Bookmark your favorites and share powerful verses with friends and family on social media.' },
  ];
  return (
    <div className="page-enter" style={{
      width:'100%', height:'100%', overflowY:'auto',
      background:'radial-gradient(ellipse at 70% 20%, #180a35 0%, #0d0820 70%)',
      padding:'80px 24px 40px',
    }}>
      <div style={{maxWidth:540, margin:'0 auto'}}>
        <BackButton onNavigate={onNavigate}/>
        <h2 style={{fontFamily:'Playfair Display', fontSize:32, color:'#f3e8ff', marginBottom:8, fontWeight:700}}>What are Spiritual Vitamins?</h2>
        <p style={{fontFamily:'DM Sans', fontSize:18, color:'rgba(233,213,255,0.65)', lineHeight:1.8, marginBottom:32}}>
          Just as your body needs daily vitamins to thrive, your soul needs daily nourishment from scripture and wisdom to flourish.
        </p>
        {items.map(item=>(
          <div key={item.title} style={{
            display:'flex', gap:16, marginBottom:24, padding:20, borderRadius:16,
            background:'rgba(168,85,247,0.06)', border:'1px solid rgba(168,85,247,0.15)',
          }}>
            <span style={{fontSize:28, flexShrink:0}}>{item.icon}</span>
            <div>
              <h3 style={{fontFamily:'Playfair Display', fontSize:19, color:'#f3e8ff', marginBottom:6, fontWeight:600}}>{item.title}</h3>
              <p style={{fontFamily:'DM Sans', fontSize:17, color:'rgba(233,213,255,0.6)', lineHeight:1.7}}>{item.text}</p>
            </div>
          </div>
        ))}
        <div onClick={()=>onNavigate('home')} style={{
          marginTop:8, padding:20, borderRadius:16, cursor:'pointer',
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
