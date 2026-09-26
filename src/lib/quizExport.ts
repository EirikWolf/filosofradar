import type { ThemeId } from '../schemas/philosopher';
import { THEME_IDS } from '../schemas/philosopher';
import { getThemeMeta } from './themes';
import type { QuizMatch } from './similarity';

export interface ExportQuizResultOptions {
  userScores: Record<ThemeId, number>;
  topMatch: QuizMatch;
  runnerUps: QuizMatch[];
}

/**
 * Hjelpefunksjon for å bryte tekst i linjer på canvas
 */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

/**
 * Eksporterer quiz-resultatet som et høyoppløselig PNG-bilde via HTML5 Canvas.
 * Alt skjer lokalt i nettleseren – ingen server eller sporing.
 */
export async function exportQuizResultAsPng(
  options: ExportQuizResultOptions
): Promise<void> {
  const { userScores, topMatch, runnerUps } = options;

  const width = 800;
  const height = 960;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 1. Kosmisk gradient-bakgrunn (Observatoriet-stil)
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#040714');
  bgGrad.addColorStop(0.5, '#070d24');
  bgGrad.addColorStop(1, '#0c173b');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Bakgrunns-stjerner (deterministisk plassering)
  ctx.fillStyle = '#ffffff';
  for (let i = 0; i < 70; i++) {
    const sx = (Math.sin(i * 997) * 0.5 + 0.5) * width;
    const sy = (Math.cos(i * 613) * 0.5 + 0.5) * height;
    const sr = (Math.sin(i * 31) * 0.5 + 0.5) * 1.5 + 0.5;
    const opacity = (Math.cos(i * 47) * 0.5 + 0.5) * 0.7 + 0.2;
    ctx.globalAlpha = opacity;
    ctx.beginPath();
    ctx.arc(sx, sy, sr, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1.0;

  // Ytre ramme med gyllen glød
  ctx.strokeStyle = 'rgba(246, 200, 95, 0.25)';
  ctx.lineWidth = 2;
  ctx.strokeRect(16, 16, width - 32, height - 32);

  // 3. Topp-banner
  ctx.textAlign = 'center';
  ctx.fillStyle = '#f6c85f';
  ctx.font = '600 12px serif';
  ctx.letterSpacing = '3px';
  ctx.fillText('✦ OBSERVATORIET · FILOSOFRADAREN ✦', width / 2, 54);
  ctx.letterSpacing = '0px';

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 32px serif';
  ctx.fillText('Hvilken filosof ligner du på?', width / 2, 94);

  // 4. Vinner-seksjon
  ctx.fillStyle = '#67e8f9';
  ctx.font = 'bold 36px serif';
  ctx.fillText(
    `Du ligner ${topMatch.percentage}% på ${topMatch.philosopher.name}!`,
    width / 2,
    155
  );

  // Forklaringssetning
  ctx.fillStyle = '#93c5fd';
  ctx.font = 'italic 16px sans-serif';
  const explanationLines = wrapText(ctx, `«${topMatch.explanation}»`, 680);
  let explY = 195;
  for (const line of explanationLines) {
    ctx.fillText(line, width / 2, explY);
    explY += 22;
  }

  // 5. Tegn Temaradaren (Edderkoppdiagram)
  const cx = width / 2;
  const cy = 460;
  const maxR = 150;
  const numAxes = THEME_IDS.length;
  const angleStep = (Math.PI * 2) / numAxes;

  const getCoord = (axisIdx: number, val: number) => {
    // Vinkel: start på toppen (-PI/2)
    const angle = axisIdx * angleStep - Math.PI / 2;
    const r = (val / 5) * maxR;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  };

  // Konsentriske åttekantede baner (nivå 1–5)
  for (let lvl = 1; lvl <= 5; lvl++) {
    ctx.beginPath();
    for (let i = 0; i < numAxes; i++) {
      const pt = getCoord(i, lvl);
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    }
    ctx.closePath();
    ctx.strokeStyle = lvl === 5 ? 'rgba(246, 200, 95, 0.4)' : 'rgba(147, 197, 253, 0.15)';
    ctx.lineWidth = lvl === 5 ? 1.5 : 1;
    ctx.stroke();
  }

  // Akser og tema-etiketter
  ctx.font = '600 13px serif';
  for (let i = 0; i < numAxes; i++) {
    const outer = getCoord(i, 5);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(outer.x, outer.y);
    ctx.strokeStyle = 'rgba(147, 197, 253, 0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Etikett litt utenfor
    const angle = i * angleStep - Math.PI / 2;
    const labelR = maxR + 26;
    const lx = cx + labelR * Math.cos(angle);
    const ly = cy + labelR * Math.sin(angle) + 4;
    const meta = getThemeMeta(THEME_IDS[i]);
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText(meta.name, lx, ly);
  }

  // Tegn filosofens polygon (Cyan)
  ctx.beginPath();
  for (let i = 0; i < numAxes; i++) {
    const val = topMatch.philosopher.themes[THEME_IDS[i]] ?? 0;
    const pt = getCoord(i, val);
    if (i === 0) ctx.moveTo(pt.x, pt.y);
    else ctx.lineTo(pt.x, pt.y);
  }
  ctx.closePath();
  ctx.fillStyle = 'rgba(103, 232, 249, 0.25)';
  ctx.fill();
  ctx.strokeStyle = '#67e8f9';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Tegn brukerens polygon (Gull)
  ctx.beginPath();
  for (let i = 0; i < numAxes; i++) {
    const val = userScores[THEME_IDS[i]] ?? 0;
    const pt = getCoord(i, val);
    if (i === 0) ctx.moveTo(pt.x, pt.y);
    else ctx.lineTo(pt.x, pt.y);
  }
  ctx.closePath();
  ctx.fillStyle = 'rgba(246, 200, 95, 0.35)';
  ctx.fill();
  ctx.strokeStyle = '#f6c85f';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Nodepunkter for brukeren
  for (let i = 0; i < numAxes; i++) {
    const val = userScores[THEME_IDS[i]] ?? 0;
    const pt = getCoord(i, val);
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#f6c85f';
    ctx.fill();
    ctx.strokeStyle = '#040714';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // 6. Fargenøkkel (Legend)
  const legendY = 670;
  ctx.font = '14px sans-serif';

  // Deg (Gull)
  ctx.fillStyle = '#f6c85f';
  ctx.beginPath();
  ctx.arc(cx - 140, legendY - 4, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'left';
  ctx.fillText('Deg (din profil)', cx - 126, legendY);

  // Filosof (Cyan)
  ctx.fillStyle = '#67e8f9';
  ctx.beginPath();
  ctx.arc(cx + 40, legendY - 4, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.fillText(topMatch.philosopher.name, cx + 54, legendY);

  // 7. Runner-ups boks
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.fillRect(80, 715, width - 160, 130);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  ctx.strokeRect(80, 715, width - 160, 130);

  ctx.fillStyle = '#f6c85f';
  ctx.font = '600 13px serif';
  ctx.fillText('ANDRE NÆRE TENKERE PÅ RADAREN:', width / 2, 745);

  let runnerY = 775;
  runnerUps.slice(0, 2).forEach((match, idx) => {
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '15px sans-serif';
    ctx.fillText(
      `${idx + 2}. ${match.philosopher.name} (${match.percentage}%) – ${match.philosopher.tradition}`,
      width / 2,
      runnerY
    );
    runnerY += 26;
  });

  // 8. Bunnlinje og personvern-info
  ctx.fillStyle = '#64748b';
  ctx.font = '12px sans-serif';
  ctx.fillText(
    'filosofradar.web.app · 100% privat · Ingen svar ble sendt over nettet',
    width / 2,
    910
  );

  // 9. Konverter til Blob og last ned
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `filosofradaren-${topMatch.philosopher.id}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 'image/png');
}
