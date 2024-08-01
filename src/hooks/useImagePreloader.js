// src/hooks/useImagePreloader.js
import { useEffect } from 'react';

const useImagePreloader = (images) => {
  useEffect(() => {
    const preloadImages = async () => {
      const promises = images.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(promises);
        console.log('All images preloaded successfully');
      } catch (error) {
        console.error('Error preloading images', error);
      }
    };

    preloadImages();
  }, [images]);
};

export default useImagePreloader;
