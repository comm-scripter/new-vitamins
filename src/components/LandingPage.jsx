import StarField from './StarField';
import CapsuleSVG from './CapsuleSVG';
import { CATEGORIES } from '../data';

export default function LandingPage({ onNavigate }) {
  const floatingCaps = [
    { color1:'#a855f7', color2:'#ec4899', size:28, style:{top:'18%',left:'8%',animation:'floatA 6s ease-in-out infinite'} },
    { color1:'#60a5fa', color2:'#34d399', size:22, style:{top:'30%',right:'10%',animation:'floatB 7s ease-in-out infinite'} },
    { color1:'#fbbf24', color2:'#f97316', size:20, style:{top:'65%',left:'12%',animation:'floatC 5s ease-in-out infinite'} },
    { color1:'#f472b6', color2:'#a855f7', size:16, style:{top:'72%',right:'15%',animation:'floatA 8s ease-in-out infinite'} },
    { color1:'#10b981', color2:'#0ea5e9', size:18, style:{top:'50%',left:'5%',animation:'floatB 9s ease-in-out infinite'} },
    { color1:'#818cf8', color2:'#6366f1', size:14, style:{top:'20%',right:'30%',animation:'floatC 6.5s ease-in-out infinite'} },
    { color1:'#fb923c', color2:'#fbbf24', size:12, style:{top:'80%',left:'40%',animation:'floatA 7.5s ease-in-out infinite'} },
    { color1:'#c084fc', color2:'#818cf8', size:25, style:{top:'40%',left:'20%',animation:'floatC 8.5s ease-in-out infinite'} },
  ];
  return (
    <div className="page-enter" style={{
      width:'100%', height:'100%',
      display:'flex', flexDirection:'column',
      alignItems:'center',
      position:'relative', overflowX:'hidden', overflowY:'auto',
      background:'radial-gradient(ellipse at 50% 0%, #1e0a3c 0%, #0d0820 60%)',
    }}>
      <StarField/>
      {floatingCaps.map((c,i)=>(
        <div key={i} style={{position:'absolute', ...c.style, opacity:0.55}}>
          <CapsuleSVG color1={c.color1} color2={c.color2} size={c.size}/>
        </div>
      ))}
      <div style={{
        position:'absolute', width:600, height:600, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
        top:'50%', left:'50%', transform:'translate(-50%,-50%)',
        pointerEvents:'none',
      }}/>
      {/* margin:auto centers when there's room but keeps the top reachable
          (scrollable) when the hero is taller than the viewport */}
      <div style={{textAlign:'center', zIndex:10, padding:'88px 24px 48px', maxWidth:600, margin:'auto 0', flexShrink:0}}>
        <div style={{marginBottom:32, animation:'capsuleGlow 3s ease-in-out infinite'}}>
          <CapsuleSVG color1="#a855f7" color2="#ec4899" size={48}/>
        </div>
        <h1 style={{
          fontFamily:'Playfair Display', fontSize:'clamp(36px,6vw,64px)',
          color:'#f3e8ff', fontWeight:700, lineHeight:1.1,
          letterSpacing:'-0.02em', marginBottom:16,
          textShadow:'0 0 40px rgba(168,85,247,0.5)',
        }}>
          Your Daily<br/><em style={{color:'#d8b4fe'}}>Spiritual Vitamin</em>
        </h1>
        <p style={{
          fontFamily:'DM Sans', fontSize:'clamp(15px,2vw,18px)',
          color:'rgba(233,213,255,0.75)', lineHeight:1.7,
          marginBottom:40, fontWeight:300,
        }}>
          Nourish your soul with handpicked scripture verses and timeless wisdom — one capsule at a time.
        </p>
        <div style={{display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap'}}>
          <button onClick={()=>onNavigate('login')} style={{
            padding:'14px 36px', borderRadius:50,
            background:'linear-gradient(135deg, #a855f7, #ec4899)',
            color:'white', border:'none', cursor:'pointer',
            fontFamily:'DM Sans', fontSize:16, fontWeight:600,
            letterSpacing:'0.02em',
            boxShadow:'0 8px 32px rgba(168,85,247,0.4)',
            transition:'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 12px 40px rgba(168,85,247,0.6)'}}
          onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 8px 32px rgba(168,85,247,0.4)'}}
          >
            Take Your Daily Vitamin
          </button>
          <button onClick={()=>onNavigate('info')} style={{
            padding:'14px 36px', borderRadius:50,
            background:'transparent',
            color:'#d8b4fe', border:'1px solid rgba(168,85,247,0.4)',
            cursor:'pointer', fontFamily:'DM Sans', fontSize:16, fontWeight:500,
            transition:'all 0.2s',
          }}
          onMouseEnter={e=>{e.currentTarget.style.background='rgba(168,85,247,0.1)';e.currentTarget.style.borderColor='rgba(168,85,247,0.8)'}}
          onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.borderColor='rgba(168,85,247,0.4)'}}
          >
            Learn More
          </button>
        </div>
        <div style={{display:'flex', gap:8, justifyContent:'center', flexWrap:'wrap', marginTop:40}}>
          {CATEGORIES.map(cat=>(
            <span key={cat.id} style={{
              padding:'5px 14px', borderRadius:50,
              background:'rgba(168,85,247,0.12)',
              border:'1px solid rgba(168,85,247,0.25)',
              color:'#c4b5fd', fontSize:12, fontFamily:'DM Sans', fontWeight:500,
              display:'flex', alignItems:'center', gap:5,
            }}>
              <span style={{fontSize:12}}>{cat.emoji}</span>{cat.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
