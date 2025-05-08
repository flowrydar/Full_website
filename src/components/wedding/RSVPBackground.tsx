import { ReactNode, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface RSVPBackgroundProps {
  children: ReactNode;
}

const RSVPBackground = ({ children }: RSVPBackgroundProps) => {
  const [hoverEffect, setHoverEffect] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <div id="rsvp" className="min-h-screen flex flex-col items-center justify-center p-3 sm:p-6 relative overflow-hidden">
      {/* Lighter elegant dark background instead of deep black */}
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: '#222222' }} // Lighter elegant black
      />
      
      {/* Gold shimmer particle overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-wedding-gold via-transparent to-transparent opacity-10 animate-pulse"></div>
        <div className="absolute top-1/4 left-1/3 w-32 h-32 rounded-full bg-wedding-gold/10 blur-xl"></div>
        <div className="absolute top-2/3 right-1/4 w-48 h-48 rounded-full bg-wedding-gold/5 blur-xl"></div>
        <div className="absolute bottom-1/4 left-1/2 w-40 h-40 rounded-full bg-wedding-gold/10 blur-xl"></div>
      </div>
      
      {/* Background image with parallax effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-in-out opacity-30"
        style={{ 
          backgroundImage: "url('/images/pattern-bg.png')",
          transform: hoverEffect && !isMobile ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 8s ease-in-out'
        }}
      />
      
      {/* Subtle parallax effect on hover (desktop only) */}
      {!isMobile && (
        <div 
          className="absolute inset-0 z-0"
          onMouseMove={() => setHoverEffect(true)}
          onMouseLeave={() => setHoverEffect(false)}
        />
      )}
      
      {/* Enhanced overlay to improve text readability - lighter and more elegant */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      
      {/* Gold border effect */}
      <div className="absolute inset-0 border border-wedding-gold/20 m-2 sm:m-4 pointer-events-none"></div>
      
      <div 
        className={`w-full ${isMobile ? 'max-w-[95%]' : 'max-w-3xl'} mx-auto bg-black/70 p-4 sm:p-8 backdrop-blur-md relative z-10 rounded-lg shadow-[0_0_25px_rgba(212,175,55,0.2)]`}
        onMouseEnter={() => !isMobile && setHoverEffect(true)}
        onMouseLeave={() => !isMobile && setHoverEffect(false)}
      >
        {children}
      </div>
    </div>
  );
};

export default RSVPBackground;
