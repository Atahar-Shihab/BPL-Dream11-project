import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal – Intersection Observer hook for scroll-triggered animations.
 * Returns a ref to attach and a boolean indicating visibility.
 */
export const useScrollReveal = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element); // Only animate once
        }
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? '0px 0px -40px 0px',
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return { ref, isVisible };
};

/**
 * useStaggerReveal – Returns an array of refs and visibility booleans for staggered animations.
 */
export const useStaggerReveal = (count, baseDelay = 80) => {
  const refs = useRef([]);
  const [visibleSet, setVisibleSet] = useState(new Set());

  useEffect(() => {
    const observers = [];

    refs.current.forEach((el, index) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleSet((prev) => new Set(prev).add(index));
            }, index * baseDelay);
            observer.unobserve(el);
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [count, baseDelay]);

  return {
    setRef: (index) => (el) => {
      refs.current[index] = el;
    },
    isVisible: (index) => visibleSet.has(index),
  };
};

/**
 * useParallax – Returns a transform value based on scroll position for parallax depth.
 */
export const useParallax = (speed = 0.3) => {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      setOffset(scrolled * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, offset };
};
