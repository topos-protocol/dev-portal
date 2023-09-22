import { useState, useEffect } from 'react';

interface Viewport {
  width?: number;
  height?: number;
}

export const useViewport = (): Viewport => {
  const [viewport, setViewport] = useState<Viewport>({
    width: undefined,
    height: undefined,
  });

  function handleResize() {
    setViewport({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  useEffect(() => {
    if (!window) return;
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return viewport;
};
