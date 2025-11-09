import { useState, useEffect, useCallback, useMemo } from 'react';

interface UseCarouselOptions {
  itemCount: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function useCarousel({ itemCount, autoPlay = false, autoPlayInterval = 3000 }: UseCarouselOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % itemCount);
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, itemCount, autoPlayInterval]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount);
  }, [itemCount]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % itemCount);
  }, [itemCount]);

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return {
    currentIndex,
    goToPrevious,
    goToNext,
    goToIndex,
    setCurrentIndex,
  };
}
