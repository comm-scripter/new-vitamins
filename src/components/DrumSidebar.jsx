import { useState, useRef, useEffect, useCallback } from 'react';
import { CATEGORY_GROUPS, CATEGORIES } from '../data';
import { hexToRgb } from '../utils';

// ── Topic button ──────────────────────────────────────────────
function TopicBtn({ cat, selected, onSelect, onNavigate }) {
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
      {selected && (
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

// ── Vertical group slider ─────────────────────────────────────
function GroupSlider({ activeGroup, onSelect }) {
  const trackRef = useRef(null);
  const n = CATEGORY_GROUPS.length; // 4

  const pickGroup = useCallback((clientY) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    onSelect(Math.min(n - 1, Math.round(pct * (n - 1))));
  }, [n, onSelect]);

  const onMouseDown = (e) => {
    e.preventDefault();
    pickGroup(e.clientY);
    const onMove = (ev) => pickGroup(ev.clientY);
    const onUp   = () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  const onTouchStart = (e) => {
    const onMove = (ev) => pickGroup(ev.touches[0].clientY);
    const onEnd  = () => { window.removeEventListener('touchmove', onMove); window.removeEventListener('touchend', onEnd); };
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onEnd);
  };

  const activePct = (activeGroup / (n - 1)) * 100;
  const activeG   = CATEGORY_GROUPS[activeGroup];

  return (
    <div style={{
      width: 44, flexShrink: 0, display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      padding: '20px 0', margin: '0 40px 0 48px', cursor: 'grab',
    }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      <div ref={trackRef} style={{
        position: 'relative', width: 6, height: '100%',
        background: 'rgba(168,85,247,0.15)', borderRadius: 6,
      }}>
        {/* filled track */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: `${activePct}%`,
          background: `linear-gradient(180deg,#a855f7,${activeG.color[0]})`,
          borderRadius: 6, transition: 'height 0.4s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: `0 0 8px ${activeG.color[0]}55`,
        }} />

        {/* tick marks */}
        {CATEGORY_GROUPS.map((g, i) => {
          const pct = (i / (n - 1)) * 100;
          return (
            <div
              key={g.id}
              onClick={e => { e.stopPropagation(); onSelect(i); }}
              title={g.label}
              style={{
                position: 'absolute', left: '50%', top: `${pct}%`,
                transform: 'translate(-50%,-50%)',
                width: 8, height: 8,
                borderRadius: '50%', zIndex: 2, transition: 'all 0.25s',
                background: i <= activeGroup ? g.color[0] : 'rgba(168,85,247,0.25)',
              }}
            />
          );
        })}

        {/* Vitamin-shaped drag handle */}
        <div style={{
          position: 'absolute', left: '50%', top: `${activePct}%`,
          transform: 'translate(-50%, -50%)',
          width: 18, height: 32, borderRadius: 9999, zIndex: 4,
          background: `linear-gradient(160deg, ${activeG.color[0]}, ${activeG.color[1]})`,
          boxShadow: `0 2px 14px ${activeG.color[0]}88, 0 0 0 2px rgba(255,255,255,0.15)`,
          transition: 'top 0.4s cubic-bezier(0.4,0,0.2,1), background 0.4s',
          pointerEvents: 'none',
          // shine overlay
          backgroundImage: `linear-gradient(160deg, ${activeG.color[0]}, ${activeG.color[1]}),
            linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 55%)`,
          backgroundBlendMode: 'normal',
        }}>
          {/* inner shine */}
          <div style={{
            position: 'absolute', top: 3, left: 3, right: 3, height: '40%',
            borderRadius: 9999,
            background: 'rgba(255,255,255,0.25)',
          }} />
        </div>
      </div>
    </div>
  );
}

// ── Main drum sidebar ─────────────────────────────────────────
export default function DrumSidebar({ selectedCat, onSelectCat, onNavigate }) {
  const [activeGroup, setActiveGroup] = useState(() => {
    const gi = CATEGORY_GROUPS.findIndex(g => g.categoryIds.includes(selectedCat));
    return gi >= 0 ? gi : 0;
  });
  const [search, setSearch] = useState('');
  const [drumW, setDrumW] = useState(200);
  const drumRef = useRef(null);

  // Keep active group in sync when category is selected externally
  useEffect(() => {
    const gi = CATEGORY_GROUPS.findIndex(g => g.categoryIds.includes(selectedCat));
    if (gi >= 0 && gi !== activeGroup) setActiveGroup(gi);
  }, [selectedCat]); // eslint-disable-line react-hooks/exhaustive-deps

  // Measure drum container WIDTH — this is the translateZ distance (half of square prism side)
  useEffect(() => {
    const el = drumRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setDrumW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const halfW = drumW / 2;
  const wheelLastFired = useRef(0);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const now = Date.now();
    if (now - wheelLastFired.current < 550) return;
    wheelLastFired.current = now;
    setActiveGroup(g => e.deltaY > 0
      ? Math.min(CATEGORY_GROUPS.length - 1, g + 1)
      : Math.max(0, g - 1));
  }, []);

  const filtered = search.trim()
    ? CATEGORIES.filter(c => c.label.toLowerCase().includes(search.toLowerCase()))
    : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* Search bar */}
      <div style={{ padding: '14px 10px 10px', flexShrink: 0 }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search topics…"
          style={{
            width: '100%', padding: '8px 14px', borderRadius: 50,
            background: 'rgba(168,85,247,0.08)',
            border: '1px solid rgba(168,85,247,0.28)',
            color: '#f3e8ff', fontFamily: 'DM Sans', fontSize: 'var(--fs-xs)',
            outline: 'none', transition: 'border-color 0.2s',
          }}
          onFocus={e => e.target.style.borderColor = 'rgba(168,85,247,0.6)'}
          onBlur={e => e.target.style.borderColor = 'rgba(168,85,247,0.28)'}
        />
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(168,85,247,0.12)', flexShrink: 0 }} />

      {/* ── Search results — always mounted, hidden when not searching ── */}
      <div style={{
        display: filtered ? 'block' : 'none',
        flex: 1, overflowY: 'auto', padding: '8px 10px 16px', scrollbarWidth: 'thin',
      }}>
        {filtered && (filtered.length === 0
          ? <p style={{ color: 'rgba(196,181,253,0.45)', fontFamily: 'DM Sans', fontSize: 'var(--fs-xs)', padding: '12px 4px' }}>No topics found</p>
          : filtered.map(c => <TopicBtn key={c.id} cat={c} selected={selectedCat === c.id} onSelect={onSelectCat} onNavigate={onNavigate} />)
        )}
      </div>

      {/* ── Drum + slider — always mounted, hidden during search ── */}
      <div
        style={{ display: filtered ? 'none' : 'flex', flex: 1, overflow: 'hidden', padding: '8px 0' }}
        onWheel={handleWheel}
      >
        <GroupSlider activeGroup={activeGroup} onSelect={setActiveGroup} />

        {/* 3-D drum */}
        <div
          ref={drumRef}
          style={{
            flex: 1, overflow: 'visible',
            perspective: `${Math.max(drumW * 3, 600)}px`,
            perspectiveOrigin: '50% 0%',
          }}
        >
          <div style={{
            width: '100%', height: '100%',
            position: 'relative', transformStyle: 'preserve-3d',
            transform: `rotateY(${-activeGroup * 90}deg)`,
            transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1)',
          }}>
            {CATEGORY_GROUPS.map((group, gi) => {
              const cats = group.categoryIds
                .map(id => CATEGORIES.find(c => c.id === id))
                .filter(Boolean);
              return (
                <div
                  key={group.id}
                  style={{
                    position: 'absolute', inset: 0,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: `rotateY(${gi * 90}deg) translateZ(${halfW}px)`,
                    overflowY: 'auto', scrollbarWidth: 'thin',
                    padding: '12px 8px 16px',
                    display: 'flex', flexDirection: 'column',
                    pointerEvents: gi === activeGroup ? 'auto' : 'none',
                  }}
                >
                  <div style={{
                    fontFamily: 'DM Sans', fontSize: 'var(--fs-2xs)', fontWeight: 700,
                    color: group.color[0], textTransform: 'uppercase',
                    letterSpacing: '0.11em', padding: '4px 4px 8px', flexShrink: 0,
                  }}>
                    {group.label}
                  </div>
                  {cats.map(cat => (
                    <TopicBtn
                      key={cat.id} cat={cat}
                      selected={selectedCat === cat.id}
                      onSelect={onSelectCat}
                      onNavigate={onNavigate}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
