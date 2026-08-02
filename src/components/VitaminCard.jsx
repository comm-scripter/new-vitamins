import { useState } from 'react';
import CapsuleSVG from './CapsuleSVG';
import { hexToRgb } from '../utils';

export default function VitaminCard({ vitamin, category, isToday, dayLabel, size=100, favorited, onToggleFavorite }) {
  const [flipped, setFlipped] = useState(false);
  const [localSaved, setLocalSaved] = useState(false);
  const saved = favorited ?? localSaved;
  const handleSave = (e) => {
    e.stopPropagation();
    onToggleFavorite ? onToggleFavorite() : setLocalSaved(s => !s);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    const text = vitamin.ref
      ? `"${vitamin.verse}" — ${vitamin.ref}`
      : `"${vitamin.verse}" — ${vitamin.author}`;
    if (navigator.share) {
      navigator.share({ title: 'Spiritual Vitamins', text });
    } else {
      navigator.clipboard.writeText(text).then(()=>alert('Copied to clipboard!'));
    }
  };

  const cardW = size * 2.6;
  const cardH = size * 1.6;

  return (
    <div style={{
      width: cardW, height: cardH,
      perspective: 1000,
      cursor: 'pointer',
      flexShrink: 0,
    }} onClick={()=>setFlipped(f=>!f)}>
      <div style={{
        width:'100%', height:'100%',
        position:'relative',
        transformStyle:'preserve-3d',
        transition:'transform 0.7s cubic-bezier(0.4,0,0.2,1)',
        transform: flipped ? 'rotateY(180deg)' : 'none',
      }}>
        {/* FRONT */}
        <div style={{
          position:'absolute', inset:0,
          backfaceVisibility:'hidden',
          borderRadius:20,
          background:`linear-gradient(135deg, rgba(${hexToRgb(category.color[0])},0.15), rgba(${hexToRgb(category.color[1])},0.08))`,
          border:`1px solid rgba(${hexToRgb(category.color[0])},0.35)`,
          display:'flex', flexDirection:'column',
          alignItems:'center', justifyContent:'center', gap:12,
          padding:16,
          boxShadow: isToday ? `0 0 32px rgba(${hexToRgb(category.color[0])},0.4), inset 0 0 20px rgba(${hexToRgb(category.color[0])},0.05)` : 'none',
        }}>
          {isToday && (
            <div style={{
              position:'absolute', top:-10, left:'50%', transform:'translateX(-50%)',
              background:`linear-gradient(90deg, ${category.color[0]}, ${category.color[1]})`,
              color:'white', fontSize:12, fontWeight:700, fontFamily:'DM Sans',
              padding:'3px 12px', borderRadius:50, letterSpacing:'0.05em',
              textTransform:'uppercase', whiteSpace:'nowrap',
            }}>Today</div>
          )}
          <CapsuleSVG color1={category.color[0]} color2={category.color[1]} size={size*0.38}/>
          <div style={{textAlign:'center'}}>
            <div style={{fontFamily:'DM Sans', fontSize:13, color:category.color[0], fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:4}}>
              {category.emoji} {dayLabel}
            </div>
            <div style={{fontFamily:'Playfair Display', fontSize:16, color:'#e9d5ff', fontWeight:600}}>
              {category.label} Vitamin
            </div>
          </div>
          <div style={{fontFamily:'DM Sans', fontSize:13, color:'rgba(233,213,255,0.4)', marginTop:4}}>
            Tap to reveal ↓
          </div>
        </div>

        {/* BACK */}
        <div style={{
          position:'absolute', inset:0,
          backfaceVisibility:'hidden',
          transform:'rotateY(180deg)',
          borderRadius:20,
          background:`linear-gradient(135deg, rgba(${hexToRgb(category.color[1])},0.2), rgba(13,8,32,0.95))`,
          border:`1px solid rgba(${hexToRgb(category.color[0])},0.4)`,
          display:'flex', flexDirection:'column',
          justifyContent:'space-between',
          padding:20,
          overflow:'hidden',
        }}>
          <div style={{flex:1, display:'flex', flexDirection:'column', justifyContent:'center'}}>
            <p style={{
              fontFamily:'Playfair Display',
              fontSize: cardW > 280 ? 16 : 14,
              color:'#f3e8ff', lineHeight:1.65, marginBottom:12,
              textAlign:'center',
            }}>
              {vitamin.verse}
            </p>
            <p style={{
              fontFamily:'DM Sans', fontSize:14,
              color: category.color[0],
              textAlign:'center', fontWeight:600,
            }}>
              — {vitamin.ref || vitamin.author}
            </p>
          </div>
          <div style={{display:'flex', justifyContent:'center', gap:12, marginTop:12}}>
            <button onClick={handleSave} style={{
              padding:'7px 16px', borderRadius:50,
              background: saved ? `linear-gradient(90deg,${category.color[0]},${category.color[1]})` : 'rgba(255,255,255,0.08)',
              border:'none', cursor:'pointer', color:'white',
              fontFamily:'DM Sans', fontSize:14, fontWeight:500,
              transition:'all 0.2s', display:'flex', alignItems:'center', gap:5,
            }}>
              {saved ? '♥' : '♡'} Save
            </button>
            <button onClick={handleShare} style={{
              padding:'7px 16px', borderRadius:50,
              background:'rgba(255,255,255,0.08)',
              border:'none', cursor:'pointer', color:'white',
              fontFamily:'DM Sans', fontSize:14, fontWeight:500,
              transition:'all 0.2s', display:'flex', alignItems:'center', gap:5,
            }}>
              ↗ Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
