import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import CapsuleSVG from './CapsuleSVG';
import StarField from './StarField';
import { DAYS, TODAY_IDX, CATEGORIES } from '../data';

function mapFirebaseError(code) {
  switch (code) {
    case 'auth/invalid-email': return 'Please enter a valid email address.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential': return 'Incorrect email or password.';
    case 'auth/email-already-in-use': return 'An account with that email already exists. Try signing in instead.';
    case 'auth/weak-password': return 'Password must be at least 6 characters.';
    case 'auth/too-many-requests': return 'Too many attempts. Please wait a moment and try again.';
    case 'auth/network-request-failed': return 'Network error. Check your connection and try again.';
    default: return 'Something went wrong. Please try again.';
  }
}

export default function LoginPage({ onAuthenticated }) {
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isSignUp = mode === 'signup';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes('@')) { setError('Please enter a valid email.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    setError('');
    try {
      if (isSignUp) await createUserWithEmailAndPassword(auth, email, password);
      else await signInWithEmailAndPassword(auth, email, password);
      onAuthenticated();
    } catch (err) {
      setError(mapFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width:'100%', padding:'14px 18px', borderRadius:12,
    background:'rgba(255,255,255,0.06)', border:'1px solid rgba(168,85,247,0.3)',
    color:'#f3e8ff', fontFamily:'DM Sans', fontSize:15,
    outline:'none', transition:'border-color 0.2s',
  };

  return (
    <div className="page-enter" style={{
      width:'100%', height:'100%',
      display:'flex', alignItems:'center', justifyContent:'center',
      position:'relative', overflow:'hidden',
      background:'radial-gradient(ellipse at 30% 50%, #1e0a3c 0%, #0d0820 70%)',
    }}>
      <StarField/>
      <div style={{zIndex:10, width:'100%', maxWidth:420, padding:'0 24px'}}>
        <div style={{display:'flex', justifyContent:'center', marginBottom:24}}>
          <div style={{animation:'capsuleGlow 3s ease-in-out infinite'}}>
            <CapsuleSVG color1="#a855f7" color2="#ec4899" size={30}/>
          </div>
        </div>
        <h2 style={{
          fontFamily:'Playfair Display', fontSize:28, color:'#f3e8ff',
          textAlign:'center', marginBottom:6, fontWeight:700,
        }}>{isSignUp ? 'Create Your Account' : 'Welcome Back'}</h2>
        <p style={{
          fontFamily:'DM Sans', color:'rgba(233,213,255,0.6)',
          textAlign:'center', fontSize:14, marginBottom:32, fontWeight:300,
        }}>{isSignUp ? 'Sign up to receive your daily vitamin' : 'Sign in to receive your daily vitamin'}</p>

        <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:16}}>
          <div>
            <label style={{display:'block', fontFamily:'DM Sans', fontSize:12, color:'#c4b5fd', marginBottom:6, fontWeight:500, letterSpacing:'0.05em', textTransform:'uppercase'}}>Email</label>
            <input
              type="email" value={email} onChange={e=>setEmail(e.target.value)}
              placeholder="your@email.com"
              style={inputStyle}
              onFocus={e=>e.target.style.borderColor='rgba(168,85,247,0.8)'}
              onBlur={e=>e.target.style.borderColor='rgba(168,85,247,0.3)'}
            />
          </div>
          <div>
            <label style={{display:'block', fontFamily:'DM Sans', fontSize:12, color:'#c4b5fd', marginBottom:6, fontWeight:500, letterSpacing:'0.05em', textTransform:'uppercase'}}>Password</label>
            <input
              type="password" value={password} onChange={e=>setPassword(e.target.value)}
              placeholder="••••••••"
              style={inputStyle}
              onFocus={e=>e.target.style.borderColor='rgba(168,85,247,0.8)'}
              onBlur={e=>e.target.style.borderColor='rgba(168,85,247,0.3)'}
            />
          </div>
          {error && <p style={{color:'#fb7185', fontFamily:'DM Sans', fontSize:13, textAlign:'center'}}>{error}</p>}
          <button type="submit" disabled={loading} style={{
            padding:'15px', borderRadius:12, marginTop:4,
            background: loading ? 'rgba(168,85,247,0.4)' : 'linear-gradient(135deg,#a855f7,#ec4899)',
            color:'white', border:'none', cursor: loading ? 'default' : 'pointer',
            fontFamily:'DM Sans', fontSize:16, fontWeight:600,
            transition:'opacity 0.2s, transform 0.2s',
            boxShadow:'0 8px 24px rgba(168,85,247,0.35)',
          }}>
            {loading ? '✨ Preparing your vitamin...' : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        <div style={{
          marginTop:24, textAlign:'center',
        }}>
          <button
            onClick={() => { setMode(m => m === 'signin' ? 'signup' : 'signin'); setError(''); }}
            style={{
              background:'none', border:'none', cursor:'pointer',
              fontFamily:'DM Sans', fontSize:13, color:'rgba(233,213,255,0.6)',
            }}
          >
            {isSignUp
              ? 'Already have an account? '
              : "Don't have an account? "}
            <span style={{color:'#c4b5fd', fontWeight:600}}>{isSignUp ? 'Sign In' : 'Create one'}</span>
          </button>
        </div>

        <p style={{
          marginTop:20, textAlign:'center', fontFamily:'DM Sans',
          fontSize:13, color:'rgba(233,213,255,0.4)',
        }}>
          {"Today's vitamin: "}
          <span style={{color:'#c4b5fd', fontWeight:500}}>{DAYS[TODAY_IDX]}'s {CATEGORIES[TODAY_IDX % CATEGORIES.length].label}</span>
        </p>
      </div>
    </div>
  );
}
