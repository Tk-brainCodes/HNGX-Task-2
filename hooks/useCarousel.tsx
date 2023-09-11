"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const useCarousel = (length: number, options = { delay: 5000 }) => {
  const [index, setIndex] = useState<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const next = useCallback(
    () => setIndex((idx) => (idx + 1) % length),
    [length]
  );

  const back = useCallback(
    () => setIndex((idx) => (idx === 0 ? length - 1 : (idx - 1) % length)),
    [length]
  );

  const resetCarouselTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const setCarouselTimeout = useCallback(() => {
    timeoutRef.current = setTimeout(next, options.delay);
  }, [next, options.delay]);

  useEffect(() => {
    resetCarouselTimeout();
    setCarouselTimeout();

    return () => {
      resetCarouselTimeout();
    };
  }, [index, setCarouselTimeout]);

  return {
    index,
    setIndex,
    next,
    back,
    resetCarouselTimeout,
    setCarouselTimeout,
  };
};

export default useCarousel;
