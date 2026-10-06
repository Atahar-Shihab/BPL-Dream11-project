import confetti from 'canvas-confetti';

/**
 * Trigger explosive burst of cricket celebration confetti
 */
export const triggerConfetti = () => {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.65 },
    colors: ['#e7fb25', '#10b981', '#3b82f6', '#f59e0b', '#ec4899'],
  });
};

/**
 * Grand stadium celebration with double side-cannons for complete team
 */
export const triggerGrandCelebration = () => {
  const duration = 2.5 * 1000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ['#e7fb25', '#3b82f6', '#10b981', '#ffffff'],
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#e7fb25', '#3b82f6', '#10b981', '#ffffff'],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  frame();
};

/**
 * Gold coin shower when claiming rewards
 */
export const triggerCoinShower = () => {
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { y: 0.2 },
    shapes: ['circle'],
    colors: ['#ffd700', '#f59e0b', '#fbbf24', '#e7fb25'],
    scalar: 1.2,
    gravity: 1.2,
  });
};
