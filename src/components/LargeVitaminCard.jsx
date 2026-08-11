import { useState, useEffect, useRef } from 'react';
import { hexToRgb, pickTextColor } from '../utils';
import { useWindowWidth, useFavorites } from '../hooks';
import { buildShareText } from '../share';
import ShareMenu from './ShareMenu';

export default function LargeVitaminCard({ vitamin, category, dayLabel }) {
  const [flipped, setFlipped] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const isBonus = vitamin.day === undefined;
  const saved = isFavorite(category.id, vitamin.day, isBonus);
  const handleSave = (e) => { e.stopPropagation(); toggleFavorite({ category, vitamin, dayLabel }); };
  const isMobile = useWindowWidth() < 640;

  const { scripture, quote } = vitamin;

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

  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const shareText = flipped && quote.author
    ? buildShareText(quote.verse, quote.author)
    : buildShareText(scripture.verse, scripture.ref);

  const handleShare = (e) => {
    e.stopPropagation();
    // navigator.share() also exists on desktop Chrome/Edge on Windows, but it
    // opens the OS's native Share flyout there — which never lists Facebook/
    // Instagram/X, only whatever's registered as a Windows share target. Only
    // trust it on an actual mobile viewport, where real apps are wired in.
    if (isMobile && navigator.share) navigator.share({ title: 'Spiritual Vitamins', text: shareText });
    else setShareMenuOpen(o => !o);
  };

  const c0 = category.color[0];
  const c1 = category.color[1];
  const r0 = hexToRgb(c0);
  const shadow = `0 8px 48px rgba(${r0},0.45), 0 2px 16px rgba(0,0,0,0.5)`;

  // The pill/card faces are solid gradients of the category's own colors —
  // some categories are pale (e.g. #fde68a, #e0e7ff), so fixed white text
  // can nearly disappear. Pick whichever text color survives worst-case.
  const isLightBg = pickTextColor([c0, c1]) !== '#ffffff';
  const textMain   = isLightBg ? '#1b1033' : '#ffffff';
  const textStrong = isLightBg ? 'rgba(27,16,51,0.85)' : 'rgba(255,255,255,0.92)';
  const textSoft   = isLightBg ? 'rgba(27,16,51,0.65)' : 'rgba(255,255,255,0.65)';
  const textFaint  = isLightBg ? 'rgba(27,16,51,0.55)' : 'rgba(255,255,255,0.6)';
  const verseShadow = isLightBg
    ? '0 1px 2px rgba(255,255,255,0.5)'
    : '0 1px 6px rgba(0,0,0,0.5)';
  const btnBg      = isLightBg ? 'rgba(27,16,51,0.1)'  : 'rgba(255,255,255,0.12)';
  const btnBgActive= isLightBg ? 'rgba(27,16,51,0.22)' : 'rgba(255,255,255,0.3)';
  const btnBorder  = isLightBg ? 'rgba(27,16,51,0.28)' : 'rgba(255,255,255,0.35)';

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
  function calcFontPx(text, isBack, hasCaption) {
    if (!pillW) return null;

    const usableW  = pillW * 0.75;
    const usableH  = pillW * 0.30;

    const facePadBot     = pillW * 0.05;
    const controlsH      = isBack ? 36 : 16;
    const ctrlsTopFromBot = 16 + controlsH;
    const ctrlsInContent = Math.max(0, ctrlsTopFromBot - facePadBot);

    // The reference/author caption sits in the flex group with the verse (gap: 8 + ~20px text)
    const refH = hasCaption ? 28 : 0;

    const maxVerseH = usableH - refH - 2 * ctrlsInContent;

    let fs = Math.min(Math.round(pillW / 24), 30);
    while (fs > 13) {
      const charsPerLine = Math.floor(usableW / (fs * 0.56));
      if (charsPerLine < 1) { fs--; continue; }
      const lines = Math.ceil(text.length / charsPerLine);
      if (lines * fs * 1.75 <= maxVerseH) break;
      fs--;
    }
    return `${Math.max(fs, 13)}px`;
  }

  const verseFontFront = calcFontPx(scripture.verse, false, !!scripture.ref) ?? 'var(--fs-base)';
  const verseFontBack  = calcFontPx(quote.verse, true, !!quote.author)  ?? 'var(--fs-base)';

  /* ── Mobile: stacked card (no pill) ── */
  if (isMobile) {
    const face = {
      position: 'absolute', inset: 0,
      borderRadius: 24,
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      padding: '24px 22px',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 12,
      boxShadow: shadow,
    };
    return (
      <>
      {shareMenuOpen && <ShareMenu text={shareText} onClose={() => setShareMenuOpen(false)}/>}
      <div style={{ width: '100%', perspective: 1200, cursor: 'pointer', outline: 'none' }}
        onClick={() => setFlipped(f => !f)}>
        <div style={{
          position: 'relative', width: '100%', paddingBottom: 'calc(90% + 40px)',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.75s cubic-bezier(0.4,0,0.2,1)',
          transform: flipped ? 'rotateY(180deg)' : 'none',
        }}>
          {/* FRONT — scripture */}
          <div style={{ ...face, justifyContent: 'flex-start', paddingTop: 8, background: `linear-gradient(145deg, ${c0}, ${c1})` }}>
            {category.image ? (
              <img src={category.image} alt="" style={{
                width: '65%', maxWidth: 220, aspectRatio: '2.2', borderRadius: '9999px', objectFit: 'cover',
                border: '3px solid rgba(255,255,255,0.6)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.35)',
                flexShrink: 0,
              }}/>
            ) : (
              <div style={{ fontSize: 40, flexShrink: 0 }}>{category.emoji}</div>
            )}
            {/* Flexible region: absorbs long verses by scrolling internally
                instead of pushing the badge above (min-height:0 lets it shrink).
                Top-aligned (not centered) so overflow is clipped/scrolled at the
                bottom only — centering here clipped the verse's first line
                right under the badge whenever the text didn't fit. */}
            <div style={{
              flex: 1, minHeight: 0, width: '100%',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center',
              gap: 8, overflowY: 'auto',
            }}>
              <p style={{
                fontFamily: 'Playfair Display',
                fontSize: 'var(--fs-base)', color: textMain, lineHeight: 1.8,
                textAlign: 'center', margin: 0,
                textShadow: verseShadow,
              }}>{scripture.verse}</p>
              {scripture.ref && (
                <p style={{
                  fontFamily: 'DM Sans', fontSize: 'var(--fs-sm)', fontWeight: 700,
                  color: textStrong, textAlign: 'center', margin: 0,
                }}>— {scripture.ref}</p>
              )}
            </div>
            <div style={{
              fontFamily: 'DM Sans', fontSize: 'var(--fs-xs)',
              color: textFaint, flexShrink: 0,
            }}>↻ tap for quote</div>
          </div>
          {/* BACK — quote */}
          <div style={{ ...face, transform: 'rotateY(180deg)', background: `linear-gradient(145deg, ${c1}, ${c0})` }}>
            <p style={{
              fontFamily: 'Playfair Display',
              fontSize: 'var(--fs-base)', color: textMain, lineHeight: 1.8,
              textAlign: 'center', margin: 0,
              textShadow: verseShadow,
            }}>{quote.verse}</p>
            {quote.author && (
              <p style={{
                fontFamily: 'DM Sans', fontSize: 'var(--fs-sm)', fontWeight: 700,
                color: textStrong, textAlign: 'center',
              }}>— {quote.author}</p>
            )}
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={handleSave} style={{
                padding: '11px 24px', borderRadius: 50,
                background: saved ? btnBgActive : btnBg,
                border: `1px solid ${btnBorder}`,
                cursor: 'pointer', color: textMain,
                fontFamily: 'DM Sans', fontSize: 'var(--fs-sm)', fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s',
              }}>{saved ? '♥' : '♡'} Save</button>
              <button onClick={handleShare} style={{
                padding: '11px 24px', borderRadius: 50,
                background: btnBg,
                border: `1px solid ${btnBorder}`,
                cursor: 'pointer', color: textMain,
                fontFamily: 'DM Sans', fontSize: 'var(--fs-sm)', fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s',
              }}>↗ Share</button>
            </div>
            <div style={{
              fontFamily: 'DM Sans', fontSize: 'var(--fs-xs)',
              color: textFaint,
            }}>↻ tap for scripture</div>
          </div>
        </div>
      </div>
      </>
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
    <>
    {shareMenuOpen && <ShareMenu text={shareText} onClose={() => setShareMenuOpen(false)}/>}
    <div className="vitamin-card-wrap">
      {/* Category image + label above pill */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10,
        marginBottom: 18,
      }}>
        {category.image && (
          <img src={category.image} alt="" style={{
            width: '85%', maxWidth: 420, aspectRatio: '2.2', borderRadius: '9999px', objectFit: 'cover',
            border: `3px solid ${c0}`,
            boxShadow: `0 6px 24px rgba(${r0},0.4), 0 2px 10px rgba(0,0,0,0.35)`,
          }}/>
        )}
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

          {/* FRONT — scripture */}
          <div style={{ ...sharedFace, background: pillBg }}>
            <p style={{
              fontFamily: 'Playfair Display',
              fontSize: verseFontFront, color: textMain, lineHeight: 1.75,
              textAlign: 'center', margin: 0, textShadow: verseShadow,
            }}>{scripture.verse}</p>
            {scripture.ref && (
              <p style={{
                fontFamily: 'DM Sans', fontSize: 'var(--fs-xs)', fontWeight: 700,
                color: textStrong, textAlign: 'center', margin: 0,
                textShadow: verseShadow,
              }}>— {scripture.ref}</p>
            )}
            {/* hint pinned to bottom */}
            <div style={ctrlRow}>
              <span style={{
                fontFamily: 'DM Sans', fontSize: 'var(--fs-2xs)',
                color: textFaint,
              }}>↻ tap for quote</span>
            </div>
          </div>

          {/* BACK — quote */}
          <div style={{ ...sharedFace, transform: 'rotateY(180deg)', background: pillBgFlip }}>
            <p style={{
              fontFamily: 'Playfair Display',
              fontSize: verseFontBack, color: textMain, lineHeight: 1.75,
              textAlign: 'center', margin: 0, textShadow: verseShadow,
            }}>{quote.verse}</p>
            {quote.author && (
              <p style={{
                fontFamily: 'DM Sans', fontSize: 'var(--fs-xs)', fontWeight: 700,
                color: textStrong, textAlign: 'center', margin: 0,
                textShadow: verseShadow,
              }}>— {quote.author}</p>
            )}
            {/* save / share / hint pinned to bottom */}
            <div style={ctrlRow}>
              <button onClick={handleSave}
                title={saved ? 'Unsave' : 'Save'}
                style={iconBtn({ background: saved ? btnBgActive : btnBg, color: textMain })}>
                {saved ? '♥' : '♡'}
              </button>
              <button onClick={handleShare} title="Share"
                style={iconBtn({ background: btnBg, color: textMain })}>
                ↗
              </button>
              <span style={{
                fontFamily: 'DM Sans', fontSize: 'var(--fs-2xs)',
                color: textFaint,
              }}>↻ tap for scripture</span>
            </div>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}
