import { useState, useRef, useEffect } from 'react';
import BackButton from './BackButton';

const CONGRATS = [
  `We are rejoicing with you and so happy that you have received God's free gift of eternal life! You have started on an amazing journey and there are many resources available to guide you. The Bible says that when you accept Christ as your personal Lord and Savior, you are a new creation. 2 Corinthians 5:17 says "This means that anyone who belongs to Christ has become a new person. The old life is gone; a new life has begun!"`,
  `You have a new life and a new relationship. Galatians 3:26 says "For you are all children of God through faith in Christ Jesus." By believing what the Bible says about Jesus, you are a child of God!`,
  `This new relationship as a child of God has given you victory over the world and our sinful nature. 1 John 5:1-5 says "Everyone who believes that Jesus is the Christ has become a child of God. And everyone who loves the Father loves his children, too. We know we love God's children if we love God and obey his commandments. Loving God means keeping his commandments, and his commandments are not burdensome. For every child of God defeats this evil world, and we achieve this victory through our faith. And who can win this battle against the world? Only those who believe that Jesus is the Son of God."`,
  `In Matthew 13 Jesus Himself teaches us about our salvation experience with a parable. He explains what the parable means starting in verse 18: "Now listen to the explanation of the parable about the farmer planting seeds: The seed that fell on the footpath represents those who hear the message about the Kingdom and don't understand it. Then the evil one comes and snatches away the seed that was planted in their hearts. The seed on the rocky soil represents those who hear the message and immediately receive it with joy. But since they don't have deep roots, they don't last long. They fall away as soon as they have problems or are persecuted for believing God's word. The seed that fell among the thorns represents those who hear God's word, but all too quickly the message is crowded out by the worries of this life and the lure of wealth, so no fruit is produced. The seed that fell on good soil represents those who truly hear and understand God's word and produce a harvest of thirty, sixty, or even a hundred times as much as had been planted!"`,
  `To grow deep roots and have a healthy spiritual life the Bible teaches us that after receiving Christ, we are to follow Him by being baptized and joining a group of fellow believers so we can learn and grow.`,
  `If you would like to share your salvation experience with us, we would love to hear about it! Let us know your name or email address and we will pray for you.`,
];

export default function SalvationPage({ onNavigate, onOpenMenu }) {
  const [prayed, setPrayed] = useState(false);
  const scrollRef = useRef(null);

  // Swapping between the prayer and congratulations content re-renders
  // inside the same scrollable container, which keeps whatever scroll
  // position the previous content was left at instead of starting the new
  // content at its top.
  useEffect(() => { scrollRef.current?.scrollTo({ top: 0 }); }, [prayed]);

  return (
    <div ref={scrollRef} className="page-enter" style={{
      width:'100%', height:'100%', overflowY:'auto',
      background:'radial-gradient(ellipse at 70% 20%, #180a35 0%, #0d0820 70%)',
      padding:'80px 24px 40px',
    }}>
      <div style={{maxWidth:540, margin:'0 auto', textAlign:'center'}}>
        {prayed
          ? <BackButton label="← Back to how to be saved" onClick={()=>setPrayed(false)}/>
          : <BackButton onOpenMenu={onOpenMenu}/>
        }

        {!prayed ? (
          <>
            <h2 style={{fontFamily:'Playfair Display', fontSize:32, color:'#f3e8ff', marginBottom:24, fontWeight:700}}>How to be Saved</h2>

            <p style={{fontFamily:'DM Sans', fontSize:18, color:'rgba(233,213,255,0.75)', lineHeight:1.8, marginBottom:12}}>
              Would you like to ask Jesus to be your personal Lord and Savior?
            </p>
            <p style={{fontFamily:'DM Sans', fontSize:18, color:'rgba(233,213,255,0.75)', lineHeight:1.8, marginBottom:24}}>
              You can pray this prayer right now:
            </p>

            <div style={{
              padding:'24px 28px', borderRadius:16, marginBottom:28, textAlign:'left',
              background:'rgba(168,85,247,0.08)', border:'1px solid rgba(168,85,247,0.25)',
            }}>
              <p style={{fontFamily:'Playfair Display', fontStyle:'italic', fontSize:19, color:'#f3e8ff', lineHeight:1.85, margin:0}}>
                Dear God,<br/><br/>
                I know I'm a sinner, and I ask for your forgiveness.
                I believe Jesus Christ is Your Son. I believe that He died
                for my sin and that you raised Him to life.
                I want to trust Him as my Savior and follow Him as Lord,
                from this day forward. Guide my life and help me to do your will.<br/><br/>
                I pray this in the name of Jesus. Amen.
              </p>
            </div>

            <p style={{fontFamily:'DM Sans', fontSize:18, color:'rgba(233,213,255,0.75)', marginBottom:20, fontWeight:600}}>
              Did you pray this prayer?
            </p>

            <div style={{display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap'}}>
              <button onClick={()=>setPrayed(true)} style={{
                padding:'14px 26px', borderRadius:50, border:'none', cursor:'pointer',
                background:'linear-gradient(135deg,#a855f7,#ec4899)', color:'white',
                fontFamily:'DM Sans', fontSize:15, fontWeight:600,
              }}>
                Yes, I prayed!
              </button>
              <button onClick={()=>onNavigate('feedback')} style={{
                padding:'14px 26px', borderRadius:50,
                background:'rgba(255,255,255,0.08)', border:'1px solid rgba(168,85,247,0.3)',
                cursor:'pointer', color:'#e9d5ff',
                fontFamily:'DM Sans', fontSize:15, fontWeight:600,
              }}>
                No, I have questions
              </button>
            </div>
          </>
        ) : (
          <>
            <div style={{fontSize:40, marginBottom:12}}>🎉</div>
            <h2 style={{fontFamily:'Playfair Display', fontSize:32, color:'#f3e8ff', marginBottom:24, fontWeight:700}}>Congratulations!</h2>

            {CONGRATS.map((para, i) => (
              <p key={i} style={{
                fontFamily:'DM Sans', fontSize:18, color:'rgba(233,213,255,0.75)',
                lineHeight:1.9, textAlign:'left', marginBottom:18,
              }}>
                {para}
              </p>
            ))}

            <button onClick={()=>onNavigate('feedback')} style={{
              padding:'14px 26px', borderRadius:50, border:'none', cursor:'pointer',
              background:'linear-gradient(135deg,#a855f7,#ec4899)', color:'white',
              fontFamily:'DM Sans', fontSize:15, fontWeight:600, marginBottom:24,
            }}>
              Share Your Story
            </button>

            <p style={{fontFamily:'Playfair Display', fontStyle:'italic', fontSize:19, color:'#f3e8ff', margin:0}}>
              God bless you on your new journey!
            </p>
          </>
        )}

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
