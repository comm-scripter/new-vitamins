import React, { useState, useEffect, useRef } from 'react';
import { CATEGORIES, TODAY_IDX, VITAMINS, BONUS_VITAMINS, DAYS } from '../data';
import { hexToRgb, measureTextWidth } from '../utils';
import LargeVitaminCard from './LargeVitaminCard';
import DrumSidebar from './DrumSidebar';

// Fixed chrome around each drum-sidebar topic label (icon, gaps, paddings,
// the group-slider column) that the label's own text width doesn't cover —
// see DrumSidebar's TopicBtn/GroupSlider layout for where each figure comes from.
const SIDEBAR_CHROME_PX = 161;
const SIDEBAR_MIN_PX = 220;

export default function AllVitaminsView({ onNavigate, savedCat, savedDay, onCatChange, onDayChange }) {
  // Always opens on the very first category (Season 1's first vitamin) —
  // picking by weekday used to coincidentally stay inside the first
  // thematic group when it had 13+ categories, but seasons vary in size
  // (Season 1 now has only 5), so that could land in a later season.
  const defaultCat = CATEGORIES[0].id;
  const [selectedCat, setSelectedCat] = useState(savedCat ?? defaultCat);
  const [selectedDay, setSelectedDay] = useState(savedDay ?? TODAY_IDX);
  const [showBonus, setShowBonus] = useState(false);

  const cat = CATEGORIES.find(c => c.id === selectedCat);
  const vitamin = VITAMINS[selectedCat]?.[selectedDay] ?? null;
  const bv = BONUS_VITAMINS[selectedCat];

  const updateCat = (id) => { setSelectedCat(id); onCatChange?.(id); };
  const updateDay = (i) => { setSelectedDay(i); onDayChange?.(i); };

  const selectCat = (id) => { updateCat(id); updateDay(TODAY_IDX); setShowBonus(false); };

  const activeDayRef = useRef(null);
  useEffect(() => {
    activeDayRef.current?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  }, [selectedDay]);

  // Widen the drum sidebar to fit the longest category label at the current
  // responsive font size, so labels never word-wrap on wide screens where
  // there's plenty of room to spare.
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_MIN_PX);
  useEffect(() => {
    const recompute = () => {
      const fsXs = getComputedStyle(document.documentElement).getPropertyValue('--fs-xs').trim() || '14px';
      const font = `600 ${fsXs} "DM Sans"`;
      const longest = CATEGORIES.reduce((max, c) => Math.max(max, measureTextWidth(c.label, font)), 0);
      setSidebarWidth(Math.max(SIDEBAR_MIN_PX, Math.ceil(longest + SIDEBAR_CHROME_PX)));
    };
    recompute();
    window.addEventListener('resize', recompute);
    document.fonts?.ready?.then(recompute);
    return () => window.removeEventListener('resize', recompute);
  }, []);

  const vitaminCard = cat && (showBonus
    ? <LargeVitaminCard key="bonus" vitamin={bv} category={cat} dayLabel="Bonus" />
    : <LargeVitaminCard key={`${selectedCat}-${selectedDay}`}
        vitamin={vitamin} category={cat} dayLabel={DAYS[selectedDay]} />
  );

  const dayPicker = cat && (
    <div className="day-picker">
      {DAYS.map((day, i) => (
        <button key={i} ref={selectedDay === i ? activeDayRef : null}
          onClick={() => { updateDay(i); setShowBonus(false); }} style={{
          padding: '9px 14px', borderRadius: 50, flexShrink: 0,
          background: selectedDay === i && !showBonus
            ? `linear-gradient(90deg,${cat.color[0]},${cat.color[1]})`
            : 'rgba(168,85,247,0.08)',
          border: selectedDay === i && !showBonus ? 'none' : '1px solid rgba(168,85,247,0.2)',
          boxShadow: i === TODAY_IDX ? `0 0 0 2px ${cat.color[0]}` : 'none',
          color: selectedDay === i && !showBonus ? 'white' : '#c4b5fd',
          fontFamily: 'DM Sans', fontSize: 'var(--fs-xs)', fontWeight: 500,
          cursor: 'pointer', transition: 'all 0.2s',
        }}>
          {day.slice(0, 3)}
        </button>
      ))}
      <button onClick={() => setShowBonus(b => !b)} style={{
        padding: '9px 16px', borderRadius: 50,
        background: showBonus
          ? `linear-gradient(90deg,${cat.color[0]},${cat.color[1]})`
          : 'rgba(251,191,36,0.12)',
        border: showBonus ? 'none' : '1px solid rgba(251,191,36,0.3)',
        color: showBonus ? 'white' : '#fbbf24',
        fontFamily: 'DM Sans', fontSize: 'var(--fs-xs)', fontWeight: 600,
        cursor: 'pointer', transition: 'all 0.2s',
        display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0,
      }}>✨ Bonus</button>
    </div>
  );

  return (
    <div className="vitamins-layout">

      {/* ── Mobile: horizontal category tab bar (hidden on desktop) ── */}
      <div className="vitamins-tabs">
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => selectCat(c.id)} style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '8px 14px', borderRadius: 50,
            border: 'none', cursor: 'pointer', flexShrink: 0, transition: 'all 0.2s',
            background: c.id === selectedCat
              ? `linear-gradient(135deg,${c.color[0]},${c.color[1]})`
              : 'rgba(168,85,247,0.1)',
            outline: c.id === selectedCat ? 'none' : '1px solid rgba(168,85,247,0.2)',
          }}>
            <span style={{ fontSize: 16 }}>{c.emoji}</span>
            <span style={{
              fontFamily: 'DM Sans', fontSize: 'var(--fs-xs)',
              fontWeight: c.id === selectedCat ? 600 : 400,
              color: c.id === selectedCat ? 'white' : '#c4b5fd',
              whiteSpace: 'nowrap',
            }}>{c.label}</span>
          </button>
        ))}
      </div>

      {/* ── Desktop: drum sidebar (hidden on mobile) ── */}
      <div className="vitamins-sidebar" style={{ width: sidebarWidth }}>
        <DrumSidebar
          selectedCat={selectedCat}
          onSelectCat={selectCat}
          onNavigate={onNavigate}
        />
      </div>

      {/* ── Main content (always visible) ── */}
      <div className="vitamins-main">
        <div className="vitamins-card-scroll">
          {vitaminCard}
        </div>
        <div className="vitamins-bottom-controls">
          {dayPicker}
          {cat && (
            <button
              className="devotional-btn-mobile"
              onClick={() => onNavigate(`devotional:${cat.id}`)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '10px 20px', borderRadius: 50, border: 'none', cursor: 'pointer',
                background: `linear-gradient(135deg,rgba(${hexToRgb(cat.color[0])},0.18),rgba(${hexToRgb(cat.color[1])},0.10))`,
                outline: `1px solid rgba(${hexToRgb(cat.color[0])},0.35)`,
                color: '#d8b4fe', fontFamily: 'DM Sans', fontSize: 'var(--fs-xs)', fontWeight: 600,
                transition: 'all 0.2s', alignSelf: 'center',
              }}
              onMouseEnter={e => e.currentTarget.style.outline = `1px solid rgba(${hexToRgb(cat.color[0])},0.7)`}
              onMouseLeave={e => e.currentTarget.style.outline = `1px solid rgba(${hexToRgb(cat.color[0])},0.35)`}
            >
              📖 Read Devotional
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
