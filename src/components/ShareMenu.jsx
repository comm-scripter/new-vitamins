import { useState } from 'react';
import { xIntentUrl, copyToClipboard } from '../share';

const rowStyle = {
  display: 'flex', alignItems: 'center', gap: 10,
  padding: '14px 16px', borderRadius: 12,
  background: 'rgba(168,85,247,0.1)', border: 'none',
  color: '#f3e8ff', fontFamily: 'DM Sans', fontSize: 15, fontWeight: 500,
  cursor: 'pointer', textDecoration: 'none', transition: 'background 0.2s',
};

export default function ShareMenu({ text, onClose }) {
  const [toast, setToast] = useState('');

  const handleCopyOpen = async (label, url) => {
    await copyToClipboard(text);
    setToast(`Copied! Paste it into ${label}.`);
    window.open(url, '_blank', 'noopener,noreferrer');
    setTimeout(onClose, 2200);
  };

  return (
    <div
      onClick={e => { e.stopPropagation(); onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(13,8,32,0.6)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="toast-enter"
        style={{
          width: '100%', maxWidth: 420, margin: '0 16px 24px',
          background: '#1b1033', borderRadius: 20,
          border: '1px solid rgba(168,85,247,0.3)',
          padding: 16, display: 'flex', flexDirection: 'column', gap: 10,
          boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
        }}
      >
        {toast ? (
          <p style={{
            fontFamily: 'DM Sans', fontSize: 14, color: '#f3e8ff',
            textAlign: 'center', padding: '10px 0', margin: 0,
          }}>{toast}</p>
        ) : (
          <>
            <a href={xIntentUrl(text)} target="_blank" rel="noopener noreferrer"
              onClick={() => setTimeout(onClose, 150)} style={rowStyle}>
              𝕏 &nbsp;Share on X
            </a>
            <button onClick={() => handleCopyOpen('Facebook', 'https://www.facebook.com')} style={rowStyle}>
              📘 &nbsp;Facebook <span style={{ marginLeft: 'auto', fontSize: 12, color: 'rgba(233,213,255,0.5)' }}>copies text</span>
            </button>
            <button onClick={() => handleCopyOpen('Instagram', 'https://www.instagram.com')} style={rowStyle}>
              📸 &nbsp;Instagram <span style={{ marginLeft: 'auto', fontSize: 12, color: 'rgba(233,213,255,0.5)' }}>copies text</span>
            </button>
            <button onClick={onClose} style={{ ...rowStyle, justifyContent: 'center', color: 'rgba(233,213,255,0.5)' }}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
