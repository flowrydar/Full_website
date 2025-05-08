import { useRef, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Slideshow from '@/components/Slideshow';
import IntroSection from '@/components/IntroSection';
import RSVPSection from '@/components/RSVPSection';
import InvitationAnimation from '@/components/InvitationAnimation';
import BackgroundMusic from '@/components/BackgroundMusic';
import EnvelopeEntrance from '@/components/MasqueradeEntrance';

const Index = () => {
  const rsvpRef = useRef<HTMLDivElement>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [showEntrance, setShowEntrance] = useState(true);
  const [searchParams] = useSearchParams();
  
  // Check for success parameter in URL (coming back from RSVP form)
  useEffect(() => {
    const success = searchParams.get('success');
    
    if (success === 'true') {
      // Skip entrance animation when returning from RSVP form
      setShowEntrance(false);
      
      // Scroll to RSVP section when coming back from successful submission
      setTimeout(() => {
        rsvpRef.current?.scrollIntoView({
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [searchParams]);

  // Add event listener to detect user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      setUserInteracted(true);
      // Remove event listeners after first interaction
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);
  
  const handleEntranceComplete = () => {
    setShowEntrance(false);
  };
  
  const handleArrowClick = () => {
    setShowAnimation(true);
    setUserInteracted(true);
    console.log("Animation triggered");
  };
  
  const scrollToRSVP = () => {
    rsvpRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* Envelope Entrance Animation */}
      {showEntrance && (
        <EnvelopeEntrance onComplete={handleEntranceComplete} />
      )}
      
      {/* Background Music Player */}
      <BackgroundMusic 
        audioSrc="/music/wedding_background.mp3" 
        trackName="The Matrimony"
        artistName="Wedding Ensemble"
        autoPlay={userInteracted}
      />
      
      {/* Hero Section with Slideshow */}
      <section className="relative h-screen">
        <Slideshow 
          onScrollDown={handleArrowClick} 
          shouldStart={!showEntrance} // Only start slideshow when envelope animation is complete
        />
        <IntroSection />
        
        {/* Invitation Animation */}
        <InvitationAnimation 
          isOpen={showAnimation} 
          onAnimationComplete={scrollToRSVP} 
        />
      </section>
      
      {/* RSVP Section */}
      <div ref={rsvpRef}>
        <RSVPSection />
      </div>
    </div>
  );
};

export default Index;
