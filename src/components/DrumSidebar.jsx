import { useState, useRef, useEffect, useCallback } from 'react';
import { CATEGORY_GROUPS, CATEGORIES } from '../data';
import TopicBtn from './TopicBtn';

// ── Vertical group slider ─────────────────────────────────────
function GroupSlider({ activeGroup, onSelect }) {
  const trackRef = useRef(null);
  const n = CATEGORY_GROUPS.length;

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
      padding: '20px 0', margin: '0 6% 0 8%', cursor: 'grab',
    }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      <div ref={trackRef} style={{
        position: 'relative', width: 6, height: '100%',
        background: 'rgba(168,85,247,0.15)', borderRadius: 6,
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: `${activePct}%`,
          background: `linear-gradient(180deg,#a855f7,${activeG.color[0]})`,
          borderRadius: 6, transition: 'height 0.4s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: `0 0 8px ${activeG.color[0]}55`,
        }} />

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

        <div style={{
          position: 'absolute', left: '50%', top: `${activePct}%`,
          transform: 'translate(-50%, -50%)',
          width: 18, height: 32, borderRadius: 9999, zIndex: 4,
          background: `linear-gradient(160deg, ${activeG.color[0]}, ${activeG.color[1]})`,
          boxShadow: `0 2px 14px ${activeG.color[0]}88, 0 0 0 2px rgba(255,255,255,0.15)`,
          transition: 'top 0.4s cubic-bezier(0.4,0,0.2,1), background 0.4s',
          pointerEvents: 'none',
          backgroundImage: `linear-gradient(160deg, ${activeG.color[0]}, ${activeG.color[1]}),
            linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 55%)`,
          backgroundBlendMode: 'normal',
        }}>
          <div style={{
            position: 'absolute', top: 3, left: 3, right: 3, height: '40%',
            borderRadius: 9999, background: 'rgba(255,255,255,0.25)',
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
  const [halfW, setHalfW] = useState(110);
  const drumAreaRef = useRef(null);
  const drumRowRef  = useRef(null);
  const wheelLastFired = useRef(0);

  // Keep active group in sync when category is selected externally
  useEffect(() => {
    const gi = CATEGORY_GROUPS.findIndex(g => g.categoryIds.includes(selectedCat));
    if (gi >= 0 && gi !== activeGroup) setActiveGroup(gi);
  }, [selectedCat]); // eslint-disable-line react-hooks/exhaustive-deps

  // Measure drum area width — determines the translateZ prism radius
  useEffect(() => {
    const el = drumAreaRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setHalfW(e.contentRect.width / 2));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Non-passive wheel listener so we can preventDefault
  useEffect(() => {
    const el = drumRowRef.current;
    if (!el) return;
    const handler = (e) => {
      e.preventDefault();
      const now = Date.now();
      if (now - wheelLastFired.current < 550) return;
      wheelLastFired.current = now;
      setActiveGroup(g => e.deltaY > 0
        ? Math.min(CATEGORY_GROUPS.length - 1, g + 1)
        : Math.max(0, g - 1));
    };
    el.addEventListener('wheel', handler, { passive: false });
    return () => el.removeEventListener('wheel', handler);
  }, []);

  // N-sided prism geometry: works for any number of groups in data.js.
  // radius is the apothem — distance from the rotation axis to each face
  // (equals halfW for a 4-sided square prism, so the look is unchanged).
  const n = CATEGORY_GROUPS.length;
  const faceAngle = 360 / n;
  const radius = n >= 3 ? halfW / Math.tan(Math.PI / n) : halfW;

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

      {/* Search results */}
      <div style={{
        display: filtered ? 'block' : 'none',
        flex: 1, overflowY: 'auto', padding: '8px 10px 16px', scrollbarWidth: 'thin',
      }}>
        {filtered && (filtered.length === 0
          ? <p style={{ color: 'rgba(196,181,253,0.45)', fontFamily: 'DM Sans', fontSize: 'var(--fs-xs)', padding: '12px 4px' }}>No topics found</p>
          : filtered.map(c => <TopicBtn key={c.id} cat={c} selected={selectedCat === c.id} onSelect={onSelectCat} onNavigate={onNavigate} />)
        )}
      </div>

      {/* Drum + slider */}
      <div
        ref={drumRowRef}
        style={{ display: filtered ? 'none' : 'flex', flex: 1, overflow: 'hidden' }}
      >
        <GroupSlider activeGroup={activeGroup} onSelect={setActiveGroup} />

        {/* Drum area: CSS 3D prism.
            Each face carries its own full transform instead of living inside
            one rotating preserve-3d container. The rendered motion is
            identical, but the active face's transform is always a plain
            frontal one — browsers cannot hit-test descendants of an ancestor
            rotated exactly 90°/270°, which is what made sides 2 and 4
            unclickable.
            The leading translateZ(-radius) pushes the rotation axis behind
            the screen plane so the active face lands exactly at z=0: no
            perspective magnification, so the face fits the drum area with no
            top/right clipping, while off-axis faces still recede in 3D
            during the spin. */}
        <div ref={drumAreaRef} style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
          <div style={{
            width: '100%', height: '100%', position: 'relative',
            perspective: `${Math.max(radius * 6, 800)}px`,
            perspectiveOrigin: '50% 50%',
          }}>
            {CATEGORY_GROUPS.map((group, gi) => {
              const cats = group.categoryIds
                .map(id => CATEGORIES.find(c => c.id === id))
                .filter(Boolean);
              const isActive = gi === activeGroup;
              return (
                <div
                  key={group.id}
                  style={{
                    position: 'absolute', inset: 0,
                    transform: `translateZ(${-radius}px) rotateY(${(gi - activeGroup) * faceAngle}deg) translateZ(${radius}px)`,
                    transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    overflowY: isActive ? 'auto' : 'hidden',
                    scrollbarWidth: 'thin',
                    display: 'flex', flexDirection: 'column',
                    padding: '12px 8px 16px',
                    pointerEvents: isActive ? 'auto' : 'none',
                    background: `linear-gradient(160deg, ${group.color[0]}20, ${group.color[1]}0c)`,
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
