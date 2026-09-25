import React from 'react';

interface SweepBeamProps {
  /** Rotasjonshastighet i sekunder per fulle runde (standard er 8 sekunder) */
  durationSeconds?: number;
  /** Fargen på sveipens glød */
  glowColor?: string;
}

/**
 * SweepBeam (Sveipestråle)
 * En kosmisk stjernelys-stråle som roterer kontinuerlig rundt radaren.
 */
export const SweepBeam: React.FC<SweepBeamProps> = ({
  durationSeconds = 8,
  glowColor = 'rgba(103, 232, 249, 0.35)', // Cyan stjerneglow (kan endres i Din tur!)
}) => {
  return (
    <div
      className="absolute inset-0 pointer-events-none rounded-full overflow-hidden"
      style={{
        animation: `rotate-sweep ${durationSeconds}s linear infinite`,
        transformOrigin: 'center center',
      }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background: `conic-gradient(from 0deg, ${glowColor} 0deg, rgba(246, 200, 95, 0.15) 25deg, transparent 65deg)`,
        }}
      />
    </div>
  );
};
