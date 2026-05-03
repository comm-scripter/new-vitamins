import { useRef } from 'react';

export default function CapsuleSVG({ color1, color2, size=80, spinning=false }) {
  const id = useRef(`cap_${Math.random().toString(36).slice(2)}`).current;
  const w = size * 2.2, h = size;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{
      filter:`drop-shadow(0 4px 16px ${color1}88)`,
      animation: spinning ? `spin3d 4s linear infinite` : undefined,
      display:'block',
    }}>
      <defs>
        <linearGradient id={`${id}_a`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color1} stopOpacity="1"/>
          <stop offset="100%" stopColor={color2} stopOpacity="1"/>
        </linearGradient>
        <linearGradient id={`${id}_b`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color2} stopOpacity="1"/>
          <stop offset="100%" stopColor={color1} stopOpacity="1"/>
        </linearGradient>
        <radialGradient id={`${id}_shine`} cx="30%" cy="25%" r="60%">
          <stop offset="0%" stopColor="white" stopOpacity="0.55"/>
          <stop offset="100%" stopColor="white" stopOpacity="0"/>
        </radialGradient>
        <clipPath id={`${id}_clipL`}>
          <rect x="0" y="0" width={w/2} height={h}/>
        </clipPath>
        <clipPath id={`${id}_clipR`}>
          <rect x={w/2} y="0" width={w/2} height={h}/>
        </clipPath>
      </defs>
      <rect x={h/2} y={0} width={w/2 - h/2} height={h} fill={`url(#${id}_a)`} clipPath={`url(#${id}_clipL)`}/>
      <ellipse cx={h/2} cy={h/2} rx={h/2} ry={h/2} fill={`url(#${id}_a)`}/>
      <rect x={w/2} y={0} width={w/2 - h/2} height={h} fill={`url(#${id}_b)`} clipPath={`url(#${id}_clipR)`}/>
      <ellipse cx={w - h/2} cy={h/2} rx={h/2} ry={h/2} fill={`url(#${id}_b)`}/>
      <line x1={w/2} y1={3} x2={w/2} y2={h-3} stroke="rgba(0,0,0,0.25)" strokeWidth="2"/>
      <rect x={h/2} y={0} width={w-h} height={h} fill={`url(#${id}_shine)`}/>
      <ellipse cx={h/2} cy={h/2} rx={h/2} ry={h/2} fill={`url(#${id}_shine)`}/>
      <ellipse cx={w-h/2} cy={h/2} rx={h/2} ry={h/2} fill={`url(#${id}_shine)`}/>
    </svg>
  );
}
