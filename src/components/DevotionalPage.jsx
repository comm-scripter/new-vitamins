import { DEVOTIONALS } from '../data';
import { hexToRgb } from '../utils';

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

        {/* Category header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
          <div style={{
            width: 54, height: 54, borderRadius: 14, flexShrink: 0,
            background: `linear-gradient(135deg,${c1},${c2})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
            boxShadow: `0 4px 24px rgba(${hexToRgb(c1)},0.45)`,
          }}>{category.emoji}</div>
          <div>
            <div style={{
              fontFamily: 'DM Sans', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', marginBottom: 5,
              color: c1,
            }}>
              {category.label} · Devotional
            </div>
            <h1 style={{
              fontFamily: 'Playfair Display', fontSize: 'clamp(22px, 5vw, 28px)',
              color: '#f3e8ff', fontWeight: 700, lineHeight: 1.2, margin: 0,
            }}>
              {devotional.title}
            </h1>
          </div>
        </div>

        {/* Gradient divider */}
        <div style={{
          height: 1, marginBottom: 28,
          background: `linear-gradient(90deg,rgba(${hexToRgb(c1)},0.6),rgba(${hexToRgb(c2)},0.2),transparent)`,
        }} />

        {/* Scripture card */}
        <div style={{
          padding: '22px 26px', borderRadius: 16, marginBottom: 28,
          background: `linear-gradient(135deg,rgba(${hexToRgb(c1)},0.14),rgba(${hexToRgb(c2)},0.07))`,
          border: `1px solid rgba(${hexToRgb(c1)},0.3)`,
        }}>
          <p style={{
            fontFamily: 'Playfair Display', fontSize: 16, color: '#f3e8ff',
            lineHeight: 1.85, fontStyle: 'italic', margin: '0 0 10px',
          }}>
            {devotional.scripture.verse}
          </p>
          <p style={{
            fontFamily: 'DM Sans', fontSize: 13, fontWeight: 600, margin: 0,
            color: c1,
          }}>
            — {devotional.scripture.ref}
          </p>
        </div>

        {/* Body paragraphs */}
        {devotional.body.map((para, i) => (
          <p key={i} style={{
            fontFamily: 'DM Sans', fontSize: 15, color: 'rgba(233,213,255,0.75)',
            lineHeight: 1.9, marginBottom: 18,
          }}>
            {para}
          </p>
        ))}

        {/* For Reflection */}
        <div style={{
          padding: '20px 24px', borderRadius: 16, marginBottom: 20,
          background: 'rgba(168,85,247,0.07)', border: '1px solid rgba(168,85,247,0.18)',
        }}>
          <h3 style={{
            fontFamily: 'Playfair Display', fontSize: 16, color: '#d8b4fe',
            fontWeight: 600, marginBottom: 10,
          }}>
            📖 For Reflection
          </h3>
          <p style={{
            fontFamily: 'DM Sans', fontSize: 14, color: 'rgba(233,213,255,0.72)',
            lineHeight: 1.85, margin: 0,
          }}>
            {devotional.reflection}
          </p>
        </div>

        {/* Closing Prayer */}
        <div style={{
          padding: '20px 24px', borderRadius: 16, marginBottom: 40,
          background: `rgba(${hexToRgb(c1)},0.07)`, border: `1px solid rgba(${hexToRgb(c1)},0.22)`,
        }}>
          <h3 style={{
            fontFamily: 'Playfair Display', fontSize: 16, color: '#d8b4fe',
            fontWeight: 600, marginBottom: 10,
          }}>
            🙏 Closing Prayer
          </h3>
          <p style={{
            fontFamily: 'DM Sans', fontSize: 14, color: 'rgba(233,213,255,0.72)',
            lineHeight: 1.85, fontStyle: 'italic', margin: 0,
          }}>
            {devotional.prayer}
          </p>
        </div>

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
