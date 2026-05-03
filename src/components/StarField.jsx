import { useRef } from 'react';

export default function StarField() {
  const stars = useRef(Array.from({length:120},()=>({
    x: Math.random()*100, y: Math.random()*200,
    size: Math.random()*2+0.5,
    delay: Math.random()*4,
    dur: Math.random()*3+2,
  }))).current;
  return (
    <div style={{position:'absolute',inset:0,overflow:'hidden',pointerEvents:'none'}}>
      {stars.map((s,i)=>(
        <div key={i} style={{
          position:'absolute',
          left:`${s.x}%`, top:`${s.y}%`,
          width:s.size, height:s.size,
          borderRadius:'50%',
          background:'white',
          animation:`twinkle ${s.dur}s ${s.delay}s ease-in-out infinite`,
        }}/>
      ))}
    </div>
  );
}
