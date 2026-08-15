import { useState } from 'react';
import BackButton from './BackButton';

export default function SalvationPage({ onNavigate }) {
  const [prayed, setPrayed] = useState(false);

  return (
    <div className="page-enter" style={{
      width:'100%', height:'100%', overflowY:'auto',
      background:'radial-gradient(ellipse at 70% 20%, #180a35 0%, #0d0820 70%)',
      padding:'80px 24px 40px',
    }}>
      <div style={{maxWidth:540, margin:'0 auto', textAlign:'center'}}>
        <BackButton onNavigate={onNavigate}/>

        {!prayed ? (
          <>
            <h2 style={{fontFamily:'Playfair Display', fontSize:32, color:'#f3e8ff', marginBottom:24, fontWeight:700}}>How to be Saved</h2>

            <p style={{fontFamily:'DM Sans', fontSize:18, color:'rgba(233,213,255,0.75)', lineHeight:1.8, marginBottom:12}}>
              Would you like to ask Jesus to be your personal Lord and Savior?
            </p>
            <p style={{fontFamily:'DM Sans', fontSize:18, color:'rgba(233,213,255,0.75)', lineHeight:1.8, marginBottom:24}}>
              You can pray this prayer right now:
            </p>

            <div style={{
              padding:'24px 28px', borderRadius:16, marginBottom:28, textAlign:'left',
              background:'rgba(168,85,247,0.08)', border:'1px solid rgba(168,85,247,0.25)',
            }}>
              <p style={{fontFamily:'Playfair Display', fontStyle:'italic', fontSize:19, color:'#f3e8ff', lineHeight:1.85, margin:0}}>
                Dear God,<br/><br/>
                I know I'm a sinner, and I ask for your forgiveness.
                I believe Jesus Christ is Your Son. I believe that He died
                for my sin and that you raised Him to life.
                I want to trust Him as my Savior and follow Him as Lord,
                from this day forward. Guide my life and help me to do your will.<br/><br/>
                I pray this in the name of Jesus. Amen.
              </p>
            </div>

            <p style={{fontFamily:'DM Sans', fontSize:18, color:'rgba(233,213,255,0.75)', marginBottom:20, fontWeight:600}}>
              Did you pray this prayer?
            </p>

            <div style={{display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap'}}>
              <button onClick={()=>setPrayed(true)} style={{
                padding:'14px 26px', borderRadius:50, border:'none', cursor:'pointer',
                background:'linear-gradient(135deg,#a855f7,#ec4899)', color:'white',
                fontFamily:'DM Sans', fontSize:15, fontWeight:600,
              }}>
                Yes, I prayed!
              </button>
              <button onClick={()=>onNavigate('feedback')} style={{
                padding:'14px 26px', borderRadius:50,
                background:'rgba(255,255,255,0.08)', border:'1px solid rgba(168,85,247,0.3)',
                cursor:'pointer', color:'#e9d5ff',
                fontFamily:'DM Sans', fontSize:15, fontWeight:600,
              }}>
                No, I have questions
              </button>
            </div>
          </>
        ) : (
          <div style={{
            padding:32, borderRadius:20, textAlign:'center',
            background:'rgba(168,85,247,0.1)', border:'1px solid rgba(168,85,247,0.3)',
          }}>
            <div style={{fontSize:40, marginBottom:12}}>🎉</div>
            <h3 style={{fontFamily:'Playfair Display', fontSize:22, color:'#f3e8ff', marginBottom:8}}>Congratulations!</h3>
            <p style={{fontFamily:'DM Sans', fontSize:18, color:'rgba(233,213,255,0.7)', lineHeight:1.8}}>
              Welcome to the family of God. This is the beginning of a new life —
              we're so glad you took this step, and we'll be praying for your journey ahead.
            </p>
          </div>
        )}

        <div onClick={()=>onNavigate('home')} style={{
          marginTop:36, padding:20, borderRadius:16, cursor:'pointer',
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
