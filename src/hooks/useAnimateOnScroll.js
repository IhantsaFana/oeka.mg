import { useEffect } from 'react';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function useAnimateOnScroll(key = '', threshold = 0.1) {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true, // Only trigger once to prevent duplicate animations
  });

  useEffect(() => {
    if (inView) {
      controls.start(`visible-${key}`);
    } else {
      controls.start(`hidden-${key}`);
    }
  }, [controls, inView, key]);

  return {
    ref,
    controls,
    inView,
  };
}

export const fadeInUpVariants = (key = '') => ({
  [`hidden-${key}`]: {
    opacity: 0,
    y: 30,
  },
  [`visible-${key}`]: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
});

export const staggerChildrenVariants = {
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    }
  },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

export const scaleInVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}; 