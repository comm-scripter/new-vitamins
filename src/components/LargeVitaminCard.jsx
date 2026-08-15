import { useState } from 'react';
import { hexToRgb, pickTextColor, withBase } from '../utils';
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
  // Some early vitamins were authored without a distinct quote — the CMS
  // just duplicated the scripture verse into the quote field as a
  // placeholder (author left null). Treat that as "no quote": disable the
  // flip and hide its hint. Purely data-driven, so filling in a real quote
  // later re-enables both automatically.
  const hasQuote = Boolean(quote?.verse) && quote.verse !== scripture.verse;

  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  // Save/Share live on the scripture face only, so they always act on the scripture.
  const shareText = buildShareText(scripture.verse, scripture.ref);

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

  // Save/Share sit as icon buttons pinned to the scripture face's top
  // corners (out of flex flow) so they never compete with the verse
  // text for vertical space.
  const iconBtn = (size, extra) => ({
    position: 'absolute', top: size === 44 ? 20 : 14,
    width: size, height: size, borderRadius: '50%',
    border: `1px solid ${btnBorder}`, cursor: 'pointer', color: textMain,
    fontSize: size === 44 ? 19 : 16,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.2s', outline: 'none', zIndex: 1,
    ...extra,
  });

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
      <div style={{ width: '100%', perspective: 1200, cursor: hasQuote ? 'pointer' : 'default', outline: 'none' }}
        onClick={() => hasQuote && setFlipped(f => !f)}>
        <div style={{
          position: 'relative', width: '100%', paddingBottom: 'calc(90% + 40px)',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.75s cubic-bezier(0.4,0,0.2,1)',
          transform: flipped ? 'rotateY(180deg)' : 'none',
        }}>
          {/* FRONT — scripture */}
          <div style={{ ...face, justifyContent: 'flex-start', paddingTop: 8, background: `linear-gradient(145deg, ${c0}, ${c1})` }}>
            <button onClick={handleSave} title={saved ? 'Unsave' : 'Save'}
              style={iconBtn(36, { left: 14, background: saved ? btnBgActive : btnBg })}>
              {saved ? '♥' : '♡'}
            </button>
            <button onClick={handleShare} title="Share"
              style={iconBtn(36, { right: 14, background: btnBg })}>
              ↗
            </button>
            {category.image ? (
              <img src={withBase(category.image)} alt="" style={{
                width: '65%', maxWidth: 220, aspectRatio: '2.2', borderRadius: '9999px', objectFit: 'fill',
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
            {hasQuote && (
              <div style={{
                fontFamily: 'DM Sans', fontSize: 'var(--fs-xs)',
                color: textFaint, flexShrink: 0,
              }}>↻ tap for quote</div>
            )}
          </div>
          {/* BACK — quote */}
          <div style={{ ...face, transform: 'rotateY(180deg)', background: `linear-gradient(145deg, ${c1}, ${c0})` }}>
            {/* Same flex:1-then-hint structure as the scripture face, so
                "tap for scripture" lands at the exact same bottom offset
                as "tap for quote" regardless of how much text is above it. */}
            <div style={{
              flex: 1, minHeight: 0, width: '100%',
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
              gap: 8, overflowY: 'auto',
            }}>
              <p style={{
                fontFamily: 'Playfair Display',
                fontSize: 'var(--fs-base)', color: textMain, lineHeight: 1.8,
                textAlign: 'center', margin: 0,
                textShadow: verseShadow,
              }}>{quote.verse}</p>
              {quote.author && (
                <p style={{
                  fontFamily: 'DM Sans', fontSize: 'var(--fs-sm)', fontWeight: 700,
                  color: textStrong, textAlign: 'center', margin: 0,
                }}>— {quote.author}</p>
              )}
            </div>
            <div style={{
              fontFamily: 'DM Sans', fontSize: 'var(--fs-xs)',
              color: textFaint, flexShrink: 0,
            }}>↻ tap for scripture</div>
          </div>
        </div>
      </div>
      </>
    );
  }

  /* ── Medium/large: rectangular card filling the available space,
     badge positioned just above the scripture text — same layout as
     the mobile card above, just bigger and height-driven instead of
     width/aspect-ratio-driven. ── */
  const cardBg = `
    radial-gradient(ellipse 30% 55% at 20% 25%, rgba(255,255,255,0.18) 0%, transparent 70%),
    linear-gradient(135deg, ${c0} 0%, ${c1} 100%)
  `;
  const cardBgFlip = `
    radial-gradient(ellipse 30% 55% at 20% 25%, rgba(255,255,255,0.18) 0%, transparent 70%),
    linear-gradient(135deg, ${c1} 0%, ${c0} 100%)
  `;

  const face = {
    position: 'absolute', inset: 0,
    borderRadius: 28,
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    padding: '40px 56px',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', gap: 20,
    boxShadow: shadow,
  };

  return (
    <>
    {shareMenuOpen && <ShareMenu text={shareText} onClose={() => setShareMenuOpen(false)}/>}
    <div className="vitamin-card-wrap">
      <div style={{ perspective: 1600, cursor: hasQuote ? 'pointer' : 'default', width: '100%', height: '100%', outline: 'none' }}
        onClick={() => hasQuote && setFlipped(f => !f)}>
        <div style={{
          position: 'relative', width: '100%', height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.85s cubic-bezier(0.4,0,0.2,1)',
          transform: flipped ? 'rotateY(180deg)' : 'none',
        }}>
          {/* FRONT — scripture */}
          <div style={{ ...face, justifyContent: 'flex-start', paddingTop: 40, background: cardBg }}>
            <button onClick={handleSave} title={saved ? 'Unsave' : 'Save'}
              style={iconBtn(44, { left: 20, background: saved ? btnBgActive : btnBg })}>
              {saved ? '♥' : '♡'}
            </button>
            <button onClick={handleShare} title="Share"
              style={iconBtn(44, { right: 20, background: btnBg })}>
              ↗
            </button>
            {category.image ? (
              <img src={withBase(category.image)} alt="" style={{
                width: '45%', maxWidth: 340, aspectRatio: '2.2', borderRadius: '9999px', objectFit: 'fill',
                border: '3px solid rgba(255,255,255,0.6)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
                flexShrink: 0,
              }}/>
            ) : (
              <div style={{ fontSize: 56, flexShrink: 0 }}>{category.emoji}</div>
            )}
            {/* Flexible region: absorbs long verses by scrolling internally
                instead of pushing the badge above (min-height:0 lets it shrink).
                Top-aligned (not centered) so overflow is clipped/scrolled at the
                bottom only — see LargeVitaminCard mobile face for the same fix. */}
            <div style={{
              flex: 1, minHeight: 0, width: '100%',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center',
              gap: 12, overflowY: 'auto',
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
            {hasQuote && (
              <div style={{
                fontFamily: 'DM Sans', fontSize: 'var(--fs-xs)',
                color: textFaint, flexShrink: 0,
              }}>↻ tap for quote</div>
            )}
          </div>

          {/* BACK — quote */}
          <div style={{ ...face, transform: 'rotateY(180deg)', background: cardBgFlip }}>
            {/* Same flex:1-then-hint structure as the scripture face, so
                "tap for scripture" lands at the exact same bottom offset
                as "tap for quote" regardless of how much text is above it. */}
            <div style={{
              flex: 1, minHeight: 0, width: '100%',
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
              gap: 12, overflowY: 'auto',
            }}>
              <p style={{
                fontFamily: 'Playfair Display',
                fontSize: 'var(--fs-base)', color: textMain, lineHeight: 1.8,
                textAlign: 'center', margin: 0,
                textShadow: verseShadow,
              }}>{quote.verse}</p>
              {quote.author && (
                <p style={{
                  fontFamily: 'DM Sans', fontSize: 'var(--fs-sm)', fontWeight: 700,
                  color: textStrong, textAlign: 'center', margin: 0,
                }}>— {quote.author}</p>
              )}
            </div>
            <div style={{
              fontFamily: 'DM Sans', fontSize: 'var(--fs-xs)',
              color: textFaint, flexShrink: 0,
            }}>↻ tap for scripture</div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
