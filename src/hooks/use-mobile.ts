import { useState, useEffect } from 'react';

export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = [
        'android', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone', 'mobile'
      ];
      
      // Check if any mobile keyword is in user agent
      const isUserAgentMobile = mobileKeywords.some(keyword => userAgent.includes(keyword));
      
      // Check screen width as a fallback
      const isScreenWidthMobile = window.innerWidth < 768;
      
      setIsMobile(isUserAgentMobile || isScreenWidthMobile);
    };

    checkIsMobile();

    // Handle resize events to update when orientation changes
    window.addEventListener('resize', checkIsMobile);
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return isMobile;
}; 