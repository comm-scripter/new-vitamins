import { DEVOTIONALS } from '../data';
import { hexToRgb, withBase } from '../utils';

export default function DevotionalPage({ category, onNavigate }) {
  if (!category) return null;
  const devotional = DEVOTIONALS[category.id];
  if (!devotional) return null;

  const [c1, c2] = category.color;

  return (
    <div className="page-enter" style={{
      width: '100%', height: '100%', overflowY: 'auto',
      background: 'radial-gradient(ellipse at 70% 20%, #180a35 0%, #0d0820 70%)',
      padding: '80px 24px 60px',
    }}>
      <div style={{ maxWidth: 580, margin: '0 auto' }}>

        {/* Back button */}
        <button
          onClick={() => onNavigate('app')}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#c4b5fd', fontFamily: 'DM Sans', fontSize: 14, fontWeight: 500,
            padding: '8px 0', marginBottom: 28, transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#f3e8ff'}
          onMouseLeave={e => e.currentTarget.style.color = '#c4b5fd'}
        >
          ← Back to My Vitamins
        </button>

        {/* Badge/image */}
        {category.image && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <img src={withBase(category.image)} alt="" style={{
              width: '60%', maxWidth: 260, aspectRatio: '2.2', borderRadius: '9999px', objectFit: 'fill',
              border: `3px solid ${c1}`,
              boxShadow: `0 6px 24px rgba(${hexToRgb(c1)},0.4), 0 2px 10px rgba(0,0,0,0.35)`,
            }}/>
          </div>
        )}

        {/* Category header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, marginBottom: 32 }}>
          {!category.image && (
            <div style={{
              width: 54, height: 54, borderRadius: 14, flexShrink: 0,
              background: `linear-gradient(135deg,${c1},${c2})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
              boxShadow: `0 4px 24px rgba(${hexToRgb(c1)},0.45)`,
            }}>{category.emoji}</div>
          )}
          <h1 style={{
            fontFamily: 'Playfair Display', fontSize: 'clamp(22px, 5vw, 28px)',
            color: '#f3e8ff', fontWeight: 700, lineHeight: 1.2, margin: 0,
            textAlign: 'center',
          }}>
            {devotional.title}
          </h1>
        </div>

        {/* Gradient divider */}
        <div style={{
          height: 1, marginBottom: 28,
          background: `linear-gradient(90deg,rgba(${hexToRgb(c1)},0.6),rgba(${hexToRgb(c2)},0.2),transparent)`,
        }} />

        {/* Scripture card */}
        {devotional.scripture && (
          <div style={{
            padding: '22px 26px', borderRadius: 16, marginBottom: 28,
            background: `linear-gradient(135deg,rgba(${hexToRgb(c1)},0.14),rgba(${hexToRgb(c2)},0.07))`,
            border: `1px solid rgba(${hexToRgb(c1)},0.3)`,
          }}>
            <p style={{
              fontFamily: 'Playfair Display', fontSize: 19, color: '#f3e8ff',
              lineHeight: 1.85, fontStyle: 'italic', margin: '0 0 10px',
            }}>
              {devotional.scripture.verse}
            </p>
            {devotional.scripture.ref && (
              <p style={{
                fontFamily: 'DM Sans', fontSize: 15, fontWeight: 600, margin: 0,
                color: c1,
              }}>
                — {devotional.scripture.ref}
              </p>
            )}
          </div>
        )}

        {/* Body paragraphs */}
        {devotional.body.map((para, i) => (
          <p key={i} style={{
            fontFamily: 'DM Sans', fontSize: 18, color: 'rgba(233,213,255,0.75)',
            lineHeight: 1.9, marginBottom: i === devotional.body.length - 1 ? 40 : 18,
          }}>
            {para}
          </p>
        ))}

        {/* Bottom nav */}
        <div
          onClick={() => onNavigate('app')}
          style={{
            padding: 20, borderRadius: 16, cursor: 'pointer',
            background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            transition: 'background 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(168,85,247,0.18)'; e.currentTarget.style.borderColor = 'rgba(168,85,247,0.5)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(168,85,247,0.08)'; e.currentTarget.style.borderColor = 'rgba(168,85,247,0.2)'; }}
        >
          <span style={{ fontSize: 20 }}>💊</span>
          <span style={{ fontFamily: 'DM Sans', fontSize: 15, color: '#c4b5fd', fontWeight: 500 }}>Back to My Vitamins</span>
        </div>

      </div>
    </div>
  );
}
