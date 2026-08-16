import { hexToRgb } from '../utils';
import { DEVOTIONALS } from '../data';

export default function TopicBtn({ cat, selected, onSelect, onNavigate }) {
  const r0 = hexToRgb(cat.color[0]);
  const r1 = hexToRgb(cat.color[1]);
  return (
    <div>
      <button
        onClick={() => onSelect(cat.id)}
        style={{
          display: 'flex', alignItems: 'center', gap: 9,
          width: '100%', padding: '7px 10px', borderRadius: 10,
          border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.18s',
          background: selected
            ? `linear-gradient(135deg,rgba(${r0},0.28),rgba(${r1},0.13))`
            : 'transparent',
          outline: selected ? `1px solid rgba(${r0},0.45)` : 'none',
        }}
      >
        <span style={{
          width: 26, height: 26, borderRadius: 7, flexShrink: 0, fontSize: 14,
          background: `linear-gradient(135deg,${cat.color[0]},${cat.color[1]})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{cat.emoji}</span>
        <span style={{
          fontFamily: 'DM Sans', fontSize: 'var(--fs-xs)',
          fontWeight: selected ? 600 : 400,
          color: selected ? '#f3e8ff' : '#c4b5fd',
        }}>{cat.label}</span>
      </button>
      {selected && DEVOTIONALS[cat.id] && (
        <button
          onClick={() => onNavigate(`devotional:${cat.id}`)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '3px 10px 3px 45px', width: '100%',
            border: 'none', background: 'transparent', cursor: 'pointer',
            color: '#a78bfa', fontFamily: 'DM Sans', fontSize: 12, fontWeight: 500,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#f3e8ff'}
          onMouseLeave={e => e.currentTarget.style.color = '#a78bfa'}
        >
          📖 Read Devotional
        </button>
      )}
    </div>
  );
}
