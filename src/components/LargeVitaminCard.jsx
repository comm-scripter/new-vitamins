import { useState, useEffect, useRef } from 'react';
import { hexToRgb } from '../utils';
import { useWindowWidth } from '../hooks';

export default function LargeVitaminCard({ vitamin, category, dayLabel }) {
  const [flipped, setFlipped] = useState(false);
  const [saved, setSaved] = useState(false);
  const isMobile = useWindowWidth() < 640;

  const pillRef = useRef(null);
  const [pillW, setPillW] = useState(0);

  useEffect(() => {
    if (isMobile) return;
    const el = pillRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setPillW(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [isMobile]);

  const handleShare = (e) => {
    e.stopPropagation();
    const text = vitamin.ref
      ? `"${vitamin.verse}" — ${vitamin.ref}`
      : `"${vitamin.verse}" — ${vitamin.author}`;
    if (navigator.share) navigator.share({ title: 'Spiritual Vitamins', text });
    else navigator.clipboard.writeText(text).then(() => alert('Copied!'));
  };

  const c0 = category.color[0];
  const c1 = category.color[1];
  const r0 = hexToRgb(c0);
  const shadow = `0 8px 48px rgba(${r0},0.45), 0 2px 16px rgba(0,0,0,0.5)`;

  /**
   * Computes the largest verse font size (px) that fits inside the pill
   * without overlapping the absolutely-positioned controls pinned to the bottom.
   *
   * Pill geometry (CSS % padding is always relative to element width):
   *   face height  = pillW × 0.40   (paddingBottom: '40%' on container)
   *   usable width = pillW × 0.64   (18% padding each side)
   *   usable height= pillW × 0.30   (face height − 5% top/bottom padding each)
   *
   * Controls sit at bottom: 16px from the face's bottom border.
   * Face bottom padding = 5% of pillW. The distance the controls intrude
   * into the content area = max(0, 16 + controlsH − 5%·pillW).
   * Because the verse is flex-centered in usableH, we need equal clearance
   * top and bottom, so reserve 2× that intrusion.
   */
  function calcFontPx(text, isBack) {
    if (!pillW) return null;

    const usableW  = pillW * 0.75;
    const usableH  = pillW * 0.30;

    const facePadBot     = pillW * 0.05;
    const controlsH      = isBack ? 36 : 16;
    const ctrlsTopFromBot = 16 + controlsH;
    const ctrlsInContent = Math.max(0, ctrlsTopFromBot - facePadBot);

    // On the back face, ref sits in the flex group with the verse (gap: 8 + ~20px text)
    const refH = isBack ? 28 : 0;

    const maxVerseH = usableH - refH - 2 * ctrlsInContent;

    let fs = Math.min(Math.round(pillW / 30), 24);
    while (fs > 11) {
      const charsPerLine = Math.floor(usableW / (fs * 0.56));
      if (charsPerLine < 1) { fs--; continue; }
      const lines = Math.ceil(text.length / charsPerLine);
      if (lines * fs * 1.75 <= maxVerseH) break;
      fs--;
    }
    return `${Math.max(fs, 11)}px`;
  }

  const verseFontFront = calcFontPx(vitamin.verse, false) ?? 'var(--fs-base)';
  const verseFontBack  = calcFontPx(vitamin.verse, true)  ?? 'var(--fs-base)';

  /* ── Mobile: stacked card (no pill) ── */
  if (isMobile) {
    const face = {
      position: 'absolute', inset: 0,
      borderRadius: 24,
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      padding: '28px 22px',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 16,
      boxShadow: shadow,
    };
    return (
      <div style={{ width: '100%', perspective: 1200, cursor: 'pointer', outline: 'none' }}
        onClick={() => setFlipped(f => !f)}>
        <div style={{
          position: 'relative', width: '100%', paddingBottom: '90%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.75s cubic-bezier(0.4,0,0.2,1)',
          transform: flipped ? 'rotateY(180deg)' : 'none',
        }}>
          {/* FRONT */}
          <div style={{ ...face, background: `linear-gradient(145deg, ${c0}, ${c1})` }}>
            <div style={{ fontSize: 40 }}>{category.emoji}</div>
            <div style={{
              fontFamily: 'DM Sans', fontSize: 'var(--fs-xs)', fontWeight: 700,
              color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase',
              letterSpacing: '0.1em', textAlign: 'center',
            }}>{dayLabel} · {category.label}</div>
            <p style={{
              fontFamily: 'Playfair Display', fontStyle: 'italic',
              fontSize: 'var(--fs-base)', color: 'white', lineHeight: 1.8,
              textAlign: 'center', margin: 0,
              textShadow: '0 1px 6px rgba(0,0,0,0.35)',
            }}>{vitamin.verse}</p>
            <div style={{
              fontFamily: 'DM Sans', fontSize: 'var(--fs-xs)',
              color: 'rgba(255,255,255,0.65)',
            }}>↻ tap to flip</div>
          </div>
          {/* BACK */}
          <div style={{ ...face, transform: 'rotateY(180deg)', background: `linear-gradient(145deg, ${c1}, ${c0})` }}>
            <p style={{
              fontFamily: 'Playfair Display', fontStyle: 'italic',
              fontSize: 'var(--fs-base)', color: 'white', lineHeight: 1.8,
              textAlign: 'center', margin: 0,
              textShadow: '0 1px 6px rgba(0,0,0,0.35)',
            }}>{vitamin.verse}</p>
            <p style={{
              fontFamily: 'DM Sans', fontSize: 'var(--fs-sm)', fontWeight: 700,
              color: 'rgba(255,255,255,0.92)', textAlign: 'center',
            }}>— {vitamin.ref || vitamin.author}</p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={e => { e.stopPropagation(); setSaved(s => !s); }} style={{
                padding: '11px 24px', borderRadius: 50,
                background: saved ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.35)',
                cursor: 'pointer', color: 'white',
                fontFamily: 'DM Sans', fontSize: 'var(--fs-sm)', fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s',
              }}>{saved ? '♥' : '♡'} Save</button>
              <button onClick={handleShare} style={{
                padding: '11px 24px', borderRadius: 50,
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.3)',
                cursor: 'pointer', color: 'white',
                fontFamily: 'DM Sans', fontSize: 'var(--fs-sm)', fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s',
              }}>↗ Share</button>
            </div>
            <div style={{
              fontFamily: 'DM Sans', fontSize: 'var(--fs-xs)',
              color: 'rgba(255,255,255,0.6)',
            }}>↻ tap to flip back</div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Desktop: pill shape ── */
  const pillBg = `
    radial-gradient(ellipse 30% 55% at 20% 25%, rgba(255,255,255,0.18) 0%, transparent 70%),
    linear-gradient(135deg, ${c0} 0%, ${c1} 100%)
  `;
  const pillBgFlip = `
    radial-gradient(ellipse 30% 55% at 20% 25%, rgba(255,255,255,0.18) 0%, transparent 70%),
    linear-gradient(135deg, ${c1} 0%, ${c0} 100%)
  `;

  const sharedFace = {
    position: 'absolute', inset: 0,
    borderRadius: '9999px',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    padding: '5% 18%',
    gap: 8,
    boxShadow: shadow,
  };

  // Controls pinned to the bottom of the pill on both faces
  const ctrlRow = {
    position: 'absolute', bottom: 16,
    left: 0, right: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
  };

  const iconBtn = (extra) => ({
    width: 36, height: 36, borderRadius: '50%', border: 'none',
    cursor: 'pointer', color: 'white', fontSize: 18,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.2s', outline: 'none', flexShrink: 0,
    ...extra,
  });

  return (
    <div className="vitamin-card-wrap">
      {/* Category label above pill */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        marginBottom: 14,
      }}>
        <span style={{ fontSize: 'clamp(18px,2vw,24px)' }}>{category.emoji}</span>
        <span style={{
          fontFamily: 'Playfair Display', fontSize: 'var(--fs-lg)',
          color: '#f3e8ff', fontWeight: 600,
          textShadow: '0 1px 6px rgba(0,0,0,0.5)',
        }}>{category.label}</span>
        <span style={{
          fontFamily: 'DM Sans', fontSize: 'var(--fs-xs)', fontWeight: 600,
          color: 'rgba(196,181,253,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em',
          marginLeft: 4,
        }}>· {dayLabel}</span>
      </div>

      {/* Flip card */}
      <div style={{ perspective: 1400, cursor: 'pointer', width: '100%', outline: 'none' }}
        onClick={() => setFlipped(f => !f)}>
        <div ref={pillRef} style={{
          position: 'relative', width: '100%', paddingBottom: '40%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.85s cubic-bezier(0.4,0,0.2,1)',
          transform: flipped ? 'rotateY(180deg)' : 'none',
        }}>

          {/* FRONT */}
          <div style={{ ...sharedFace, background: pillBg }}>
            <p style={{
              fontFamily: 'Playfair Display', fontStyle: 'italic',
              fontSize: verseFontFront, color: 'white', lineHeight: 1.75,
              textAlign: 'center', margin: 0, textShadow: '0 1px 6px rgba(0,0,0,0.5)',
            }}>{vitamin.verse}</p>
            {/* hint pinned to bottom */}
            <div style={ctrlRow}>
              <span style={{
                fontFamily: 'DM Sans', fontSize: 'var(--fs-2xs)',
                color: 'rgba(255,255,255,0.6)',
              }}>↻ tap to flip</span>
            </div>
          </div>

          {/* BACK */}
          <div style={{ ...sharedFace, transform: 'rotateY(180deg)', background: pillBgFlip }}>
            <p style={{
              fontFamily: 'Playfair Display', fontStyle: 'italic',
              fontSize: verseFontBack, color: 'white', lineHeight: 1.75,
              textAlign: 'center', margin: 0, textShadow: '0 1px 5px rgba(0,0,0,0.5)',
            }}>{vitamin.verse}</p>
            <p style={{
              fontFamily: 'DM Sans', fontSize: 'var(--fs-xs)', fontWeight: 700,
              color: 'rgba(255,255,255,0.92)', textAlign: 'center', margin: 0,
              textShadow: '0 1px 4px rgba(0,0,0,0.4)',
            }}>— {vitamin.ref || vitamin.author}</p>
            {/* save / share / hint pinned to bottom */}
            <div style={ctrlRow}>
              <button onClick={e => { e.stopPropagation(); setSaved(s => !s); }}
                title={saved ? 'Unsave' : 'Save'}
                style={iconBtn({ background: saved ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.12)' })}>
                {saved ? '♥' : '♡'}
              </button>
              <button onClick={handleShare} title="Share"
                style={iconBtn({ background: 'rgba(255,255,255,0.12)' })}>
                ↗
              </button>
              <span style={{
                fontFamily: 'DM Sans', fontSize: 'var(--fs-2xs)',
                color: 'rgba(255,255,255,0.6)',
              }}>↻ tap to flip back</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
