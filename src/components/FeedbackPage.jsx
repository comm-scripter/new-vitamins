import { useState } from 'react';
import BackButton from './BackButton';

export default function FeedbackPage({ onOpenMenu }) {
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <div className="page-enter" style={{
      width:'100%', height:'100%', overflowY:'auto',
      background:'radial-gradient(ellipse at 50% 80%, #180a35 0%, #0d0820 70%)',
      padding:'80px 24px 40px',
    }}>
      <div style={{maxWidth:480, margin:'0 auto'}}>
        <BackButton onOpenMenu={onOpenMenu}/>
        <h2 style={{fontFamily:'Playfair Display', fontSize:32, color:'#f3e8ff', marginBottom:8, fontWeight:700}}>Share Your Thoughts</h2>
        <p style={{fontFamily:'DM Sans', fontSize:17, color:'rgba(233,213,255,0.55)', marginBottom:28}}>
          Help us grow Spiritual Vitamins into the best it can be.
        </p>
        {!sent ? (
          <div style={{display:'flex', flexDirection:'column', gap:16}}>
            <textarea
              value={msg} onChange={e=>setMsg(e.target.value)}
              placeholder="Share your experience, suggestions, or a verse that changed your life..."
              rows={6}
              style={{
                width:'100%', padding:'16px', borderRadius:14,
                background:'rgba(255,255,255,0.05)', border:'1px solid rgba(168,85,247,0.3)',
                color:'#f3e8ff', fontFamily:'DM Sans', fontSize:17, resize:'vertical',
                outline:'none', lineHeight:1.7,
              }}
            />
            <button onClick={()=>{if(msg.trim())setSent(true)}} style={{
              padding:'14px', borderRadius:12,
              background:'linear-gradient(135deg,#a855f7,#ec4899)',
              color:'white', border:'none', cursor:'pointer',
              fontFamily:'DM Sans', fontSize:15, fontWeight:600,
            }}>
              Send Feedback ✨
            </button>
          </div>
        ) : (
          <div style={{
            padding:32, borderRadius:20, textAlign:'center',
            background:'rgba(168,85,247,0.1)', border:'1px solid rgba(168,85,247,0.3)',
          }}>
            <div style={{fontSize:40, marginBottom:12}}>🙏</div>
            <h3 style={{fontFamily:'Playfair Display', fontSize:22, color:'#f3e8ff', marginBottom:8}}>Thank You!</h3>
            <p style={{fontFamily:'DM Sans', fontSize:17, color:'rgba(233,213,255,0.6)'}}>Your feedback has been received. May God bless your journey.</p>
          </div>
        )}
      </div>
    </div>
  );
}
