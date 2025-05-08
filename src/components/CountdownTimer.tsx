
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Set wedding date - March 21, 2026
    const weddingDate = new Date('March 21, 2026 00:00:00').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = weddingDate - now;
      
      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="max-w-md mx-auto my-4 sm:my-8 p-3 sm:p-4 md:p-6 rounded-lg bg-transparent backdrop-blur-sm border border-wedding-gold/20 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
      <div className="flex justify-center gap-1 sm:gap-2 md:gap-4 mb-3 sm:mb-4">
        <div className="flex flex-col items-center bg-black/5 px-1 sm:px-2 md:px-4 py-1 sm:py-2 rounded-md backdrop-blur-sm">
          <span className={`${isMobile ? 'text-lg' : 'text-xl md:text-3xl'} font-bold gold-shimmer`}>{timeLeft.days}</span>
          <span className="text-[10px] sm:text-xs uppercase tracking-wider font-sans text-white">Days</span>
        </div>
        <div className="flex flex-col items-center bg-black/5 px-1 sm:px-2 md:px-4 py-1 sm:py-2 rounded-md backdrop-blur-sm">
          <span className={`${isMobile ? 'text-lg' : 'text-xl md:text-3xl'} font-bold gold-shimmer`}>{timeLeft.hours}</span>
          <span className="text-[10px] sm:text-xs uppercase tracking-wider font-sans text-white">Hours</span>
        </div>
        <div className="flex flex-col items-center bg-black/5 px-1 sm:px-2 md:px-4 py-1 sm:py-2 rounded-md backdrop-blur-sm">
          <span className={`${isMobile ? 'text-lg' : 'text-xl md:text-3xl'} font-bold gold-shimmer`}>{timeLeft.minutes}</span>
          <span className="text-[10px] sm:text-xs uppercase tracking-wider font-sans text-white">Minutes</span>
        </div>
        <div className="flex flex-col items-center bg-black/5 px-1 sm:px-2 md:px-4 py-1 sm:py-2 rounded-md backdrop-blur-sm">
          <span className={`${isMobile ? 'text-lg' : 'text-xl md:text-3xl'} font-bold gold-shimmer`}>{timeLeft.seconds}</span>
          <span className="text-[10px] sm:text-xs uppercase tracking-wider font-sans text-white">Seconds</span>
        </div>
      </div>
      <p className="text-wedding-gold text-base sm:text-lg font-script text-center">Until We Say "I Do"</p>
    </div>
  );
};

export default CountdownTimer;
