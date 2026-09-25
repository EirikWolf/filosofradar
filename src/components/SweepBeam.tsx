import React from 'react';

interface SweepBeamProps {
  /** Rotasjonshastighet i sekunder per fulle runde (standard er 8 sekunder) */
  durationSeconds?: number;
  /** Fargen på sveipens glød */
  glowColor?: string;
  /** Om rotasjonen skal pauses */
  isPaused?: boolean;
}

/**
 * SweepBeam (Sveipestråle)
 * En kosmisk stjernelys-stråle som roterer kontinuerlig rundt radaren.
 */
export const SweepBeam: React.FC<SweepBeamProps> = ({
  durationSeconds = 8,
  glowColor = 'rgba(103, 232, 249, 0.45)',
  isPaused = false,
}) => {
  return (
    <div
      className="absolute inset-0 pointer-events-none rounded-full overflow-hidden animate-sweep-beam"
      style={
        {
          '--sweep-duration': `${durationSeconds}s`,
          animationPlayState: isPaused ? 'paused' : 'running',
        } as React.CSSProperties
      }
    >
      {/* Roterende stjernelys-hale (conic gradient) */}
      <div
        className="w-full h-full rounded-full"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, ${glowColor} 0deg, rgba(246, 200, 95, 0.22) 20deg, rgba(103, 232, 249, 0.06) 45deg, transparent 70deg)`,
        }}
      />
      {/* Skarp, lysende front-stråle (12 o'clock radius) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-1/2"
        style={{
          background: 'linear-gradient(to top, rgba(246, 200, 95, 0.9), rgba(255, 255, 255, 1))',
          boxShadow: '0 0 10px rgba(103, 232, 249, 0.9), 0 0 4px #ffffff',
        }}
      />
    </div>
  );
};
