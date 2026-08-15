import BackButton from './BackButton';

const STORY = [
  `While reading my Devotions one morning about 2 years ago I heard a voice (yes, it was audible for me) say, "Get my Word out!" I understood it to be God speaking to me. It was not a dream as I was wide awake. I answered and said, "Lord, I am a nobody. I am not a preacher nor do I teach women or children in church. How can I get Your Word out?"`,
  `Looking back on the event that was a pretty stupid thing to say. Did I think God didn't know who He was talking to? He repeated, "Get my Word out". Later I told my husband about the encounter and we discussed possibilities. After prayer we decided to produce a form of what we call "Spiritual Vitamins".`,
  `The original vitamins were made of construction paper shaped like a capsule. They contained a Title, Date and Scripture verse, all hand lettered, and colored. I mailed 20 copies to my family and it took me 30 days to create 20 vitamins. They were not fancy at all.`,
  `Months later my husband offered the idea that he could print the vitamins on cardstock on the computer, in color and even find computer art work for the front. I added an additional Quote on the back side. This continued until recently when our son offered to design a web page to include all past, present and future vitamins.`,
  `Now the amazing thing is that our son does not work with computers or the design of web pages. But after several months of research, online instruction, and lots of prayer, the Spiritual Vitamins website began to take shape. Since launching the Spiritual Vitamin web page, many new vitamins and improvements have been added and we hope that it is a blessing to you.`,
  `If this resonates with you, please share this app with your friends and family members and help "Get the Word out" to the ones close to you.`
];

export default function AboutPage({ onNavigate }) {
  return (
    <div className="page-enter" style={{
      width:'100%', height:'100%', overflowY:'auto',
      background:'radial-gradient(ellipse at 30% 70%, #180a35 0%, #0d0820 70%)',
      padding:'80px 24px 40px',
    }}>
      <div style={{maxWidth:540, margin:'0 auto', textAlign:'center'}}>
        <BackButton onNavigate={onNavigate}/>
        <div style={{marginBottom:24, display:'flex', justifyContent:'center'}}>
          <img src="/icons/about-megaphone.png" alt="" style={{width:64, height:'auto'}}/>
        </div>
        <h2 style={{fontFamily:'Playfair Display', fontSize:32, color:'#f3e8ff', marginBottom:8, fontWeight:700}}>"Get the Word out!"</h2>
        <p style={{fontFamily:'DM Sans', fontSize:12, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'#d8b4fe', marginBottom:28}}>
          How the Spiritual Vitamins Developed
        </p>
        {STORY.map((para, i) => (
          <p key={i} style={{
            fontFamily:'DM Sans', fontSize:18, color:'rgba(233,213,255,0.65)',
            lineHeight:1.8, textAlign:'left', marginBottom: i === STORY.length - 1 ? 0 : 18,
          }}>
            {para}
          </p>
        ))}
        <div onClick={()=>onNavigate('home')} style={{
          marginTop:36, padding:20, borderRadius:16, cursor:'pointer',
          background:'rgba(168,85,247,0.08)', border:'1px solid rgba(168,85,247,0.2)',
          display:'flex', alignItems:'center', justifyContent:'center', gap:10,
          transition:'background 0.2s, border-color 0.2s',
        }}
        onMouseEnter={e=>{e.currentTarget.style.background='rgba(168,85,247,0.18)';e.currentTarget.style.borderColor='rgba(168,85,247,0.5)'}}
        onMouseLeave={e=>{e.currentTarget.style.background='rgba(168,85,247,0.08)';e.currentTarget.style.borderColor='rgba(168,85,247,0.2)'}}
        >
          <span style={{fontSize:22}}>🏠</span>
          <span style={{fontFamily:'DM Sans', fontSize:15, color:'#c4b5fd', fontWeight:500}}>Back to Home</span>
        </div>
      </div>
    </div>
  );
}
