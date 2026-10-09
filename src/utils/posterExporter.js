// Pure HTML5 Canvas 2D Squad Poster Exporter

export const generateSquadPoster = async ({
  selectedPlayers,
  captainId,
  viceCaptainId,
  teamPower = 90,
}) => {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 680;
  const ctx = canvas.getContext('2d');

  // Background Gradient
  const grad = ctx.createLinearGradient(0, 0, 1200, 680);
  grad.addColorStop(0, '#06170d');
  grad.addColorStop(0.5, '#0b2918');
  grad.addColorStop(1, '#05120a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1200, 680);

  // Stadium Pitch Lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 3;
  ctx.strokeRect(60, 60, 1080, 560);

  ctx.beginPath();
  ctx.arc(600, 340, 220, 0, Math.PI * 2);
  ctx.stroke();

  // Header Title
  ctx.fillStyle = '#e7fb25';
  ctx.font = 'bold 36px Inter, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🏏 BPL DREAM 11 — OFFICIAL STARTING SQUAD', 600, 115);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = '500 16px Inter, system-ui, sans-serif';
  ctx.fillText(`Squad Power Rating: ${teamPower}/100 · Assembled on ${new Date().toLocaleDateString()}`, 600, 145);

  // Draw Player Cards (2 rows of 3 or 1 row of 6)
  const cols = 3;
  const cardWidth = 320;
  const cardHeight = 190;
  const startX = 110;
  const startY = 180;
  const gapX = 50;
  const gapY = 35;

  selectedPlayers.slice(0, 6).forEach((p, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = startX + col * (cardWidth + gapX);
    const y = startY + row * (cardHeight + gapY);

    const isC = p.id === captainId;
    const isVC = p.id === viceCaptainId;

    // Card background
    ctx.fillStyle = isC ? 'rgba(231, 251, 37, 0.12)' : isVC ? 'rgba(59, 130, 246, 0.12)' : 'rgba(255, 255, 255, 0.05)';
    ctx.strokeStyle = isC ? '#e7fb25' : isVC ? '#38bdf8' : 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x, y, cardWidth, cardHeight, 16);
    ctx.fill();
    ctx.stroke();

    // Player Number & Badge
    ctx.fillStyle = isC ? '#e7fb25' : isVC ? '#38bdf8' : 'rgba(255, 255, 255, 0.5)';
    ctx.font = 'bold 13px Inter, system-ui, sans-serif';
    ctx.textAlign = 'left';
    const tag = isC ? '👑 CAPTAIN (2x)' : isVC ? '⭐ VICE-CAPTAIN (1.5x)' : `#${i + 1} SQUAD`;
    ctx.fillText(tag, x + 20, y + 35);

    // Player Name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px Inter, system-ui, sans-serif';
    ctx.fillText(p.playerName, x + 20, y + 70);

    // Role & Country
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '500 14px Inter, system-ui, sans-serif';
    ctx.fillText(`${p.playerType} · ${p.playerCountry}`, x + 20, y + 98);

    // Stats Bar
    ctx.fillStyle = '#e7fb25';
    ctx.font = 'bold 15px Inter, system-ui, sans-serif';
    ctx.fillText(`Rating: ★ ${p.rating} · Fee: $${p.price.toLocaleString()}`, x + 20, y + 135);

    // Team
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '500 12px Inter, system-ui, sans-serif';
    ctx.fillText(p.bplTeam || 'BPL Franchise', x + 20, y + 162);
  });

  // Footer Watermark
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.font = '500 13px Inter, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Dream 11 Cricket — Designed with Antigravity AI Engine', 600, 650);

  // Trigger Download
  const link = document.createElement('a');
  link.download = 'my-bpl-dream-11.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
};
