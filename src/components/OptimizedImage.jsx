/**
 * OptimizedImage Component
 * Provides lazy loading and WebP support for images
 */

import { useState, useRef, useEffect, memo } from 'react';

/**
 * Check if browser supports WebP
 */
let webpSupported = null;
const checkWebPSupport = () => {
  if (webpSupported !== null) return Promise.resolve(webpSupported);
  
  return new Promise((resolve) => {
    const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
    const img = new Image();
    img.onload = () => {
      webpSupported = true;
      resolve(true);
    };
    img.onerror = () => {
      webpSupported = false;
      resolve(false);
    };
    img.src = webpData;
  });
};

/**
 * OptimizedImage - Lazy loading image with WebP support
 * 
 * @param {Object} props
 * @param {string} props.src - Primary image source (WebP preferred)
 * @param {string} props.fallbackSrc - Fallback image source (JPEG/PNG)
 * @param {string} props.alt - Alt text for accessibility
 * @param {string} props.className - CSS class name
 * @param {Object} props.style - Inline styles
 * @param {string} props.placeholder - Placeholder color or image URL
 * @param {function} props.onLoad - Callback when image loads
 * @param {function} props.onError - Callback on load error
 */
const OptimizedImage = memo(({
  src,
  fallbackSrc,
  alt = '',
  className = '',
  style = {},
  placeholder = '#1a2332',
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Determine correct source based on WebP support
  useEffect(() => {
    let mounted = true;
    
    const determineSource = async () => {
      const supportsWebP = await checkWebPSupport();
      if (!mounted) return;
      
      // If src is WebP and browser supports it, use it
      // Otherwise use fallback
      if (supportsWebP && src) {
        setImageSrc(src);
      } else if (fallbackSrc) {
        setImageSrc(fallbackSrc);
      } else {
        setImageSrc(src);
      }
    };
    
    determineSource();
    return () => { mounted = false; };
  }, [src, fallbackSrc]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!imgRef.current || !imageSrc) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start loading the image
            const img = new Image();
            img.src = imageSrc;
            img.onload = () => {
              setIsLoaded(true);
              onLoad?.();
            };
            img.onerror = () => {
              setError(true);
              onError?.();
            };
            
            // Disconnect after triggering load
            observerRef.current?.disconnect();
          }
        });
      },
      { rootMargin: '50px' }
    );

    observerRef.current.observe(imgRef.current);

    return () => observerRef.current?.disconnect();
  }, [imageSrc, onLoad, onError]);

  const containerStyle = {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: placeholder.startsWith('#') ? placeholder : 'transparent',
    ...style,
  };

  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
  };

  return (
    <div ref={imgRef} className={className} style={containerStyle} {...props}>
      {imageSrc && (
        <img
          src={isLoaded ? imageSrc : undefined}
          alt={alt}
          style={imgStyle}
          loading="lazy"
          decoding="async"
        />
      )}
      {!isLoaded && !error && placeholder && !placeholder.startsWith('#') && (
        <img
          src={placeholder}
          alt=""
          aria-hidden="true"
          style={{ ...imgStyle, opacity: 1, filter: 'blur(10px)' }}
        />
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;

/**
 * Utility function to get WebP or fallback source
 */
export const getOptimizedImageSrc = async (webpSrc, fallbackSrc) => {
  const supportsWebP = await checkWebPSupport();
  return supportsWebP ? webpSrc : fallbackSrc;
};

/**
 * Hook for checking WebP support
 */
export const useWebPSupport = () => {
  const [supported, setSupported] = useState(webpSupported);
  
  useEffect(() => {
    if (webpSupported !== null) {
      setSupported(webpSupported);
    } else {
      checkWebPSupport().then(setSupported);
    }
  }, []);
  
  return supported;
};
