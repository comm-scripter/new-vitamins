export default function BackButton({ onOpenMenu, label='← Back to Menu', onClick }) {
  return (
    <button onClick={onClick ?? onOpenMenu} style={{
      display:'flex', alignItems:'center', gap:8,
      background:'none', border:'none', cursor:'pointer',
      color:'#c4b5fd', fontFamily:'DM Sans', fontSize:14, fontWeight:500,
      padding:'8px 0', marginBottom:24,
      transition:'color 0.2s',
    }}
    onMouseEnter={e=>e.currentTarget.style.color='#f3e8ff'}
    onMouseLeave={e=>e.currentTarget.style.color='#c4b5fd'}
    >
      {label}
    </button>
  );
}
