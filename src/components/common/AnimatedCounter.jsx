import { useEffect, useRef, useState } from 'react';

/**
 * AnimatedCounter – Smoothly animates from current displayed value to the target value.
 * Uses requestAnimationFrame for buttery 60fps counting.
 */
const AnimatedCounter = ({ value, duration = 600, prefix = '', suffix = '', className = '' }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const previousValue = useRef(value);
  const animationRef = useRef(null);

  useEffect(() => {
    const start = previousValue.current;
    const end = value;
    const diff = end - start;

    if (diff === 0) return;

    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for a satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + diff * eased);

      setDisplayValue(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        previousValue.current = end;
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, duration]);

  const isGaining = value > previousValue.current;

  return (
    <span
      className={`inline-flex items-center tabular-nums transition-colors duration-300 ${
        isGaining ? 'text-emerald-500' : ''
      } ${className}`}
    >
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
};

export default AnimatedCounter;
