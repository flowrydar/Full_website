import { useEffect, useState } from 'react';

const IntroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a small delay before showing the content for a nice effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`absolute inset-0 flex flex-col items-center justify-center z-20 transition-opacity duration-1000 px-4 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <h1 className="text-5xl md:text-6xl lg:text-8xl font-script text-white text-center mb-4 tracking-wider gold-text">
        Save The Date
      </h1>
      <h2 className="text-3xl md:text-4xl lg:text-6xl font-script text-wedding-lilac text-center mb-6 lilac-glow">
        Onyinye & Folarin
      </h2>
      <div className="mt-2">
        <p className="text-sm md:text-base lg:text-lg text-white text-center mb-1">
          Are Getting married on
        </p>
        <p className="text-2xl md:text-4xl lg:text-5xl font-script text-wedding-gold text-center">
          March 21st, 2026
        </p>
        <p className="text-xl md:text-2xl lg:text-3xl font-script text-center mt-1">
          <span className="text-wedding-gold">Dallas, TX</span>
        </p>
      </div>
      <div className="mt-6 flex flex-col items-center">
        <p className="text-xs md:text-sm text-white text-center max-w-md px-4">
          Join us for our special day as we celebrate our love and commitment.
        </p>
        <p className="text-xs text-wedding-lilac mt-2">Scroll down to RSVP</p>
      </div>
    </div>
  );
};

export default IntroSection;
