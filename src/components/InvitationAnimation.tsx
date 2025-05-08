import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface InvitationAnimationProps {
  isOpen: boolean;
  onAnimationComplete: () => void;
}

const InvitationAnimation = ({ isOpen, onAnimationComplete }: InvitationAnimationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (!isOpen) {
      setIsVisible(false);
      return;
    }
    
    // Simple fade in animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => {
      clearTimeout(timer);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className={`w-[90vw] max-w-2xl transition-all duration-500 transform ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
        <div className="bg-gradient-to-b from-black to-gray-900 border-2 border-wedding-gold rounded-lg p-8 text-center">
          <div className="space-y-8">
            <div className="text-wedding-gold font-script text-5xl md:text-6xl animate-fade-in">
              Onyinye & Folarin
            </div>
            
            <div className="space-y-4">
              <div className="text-white font-serif text-xl md:text-2xl animate-fade-in">
                Request the honor of your presence
              </div>
              
              <div className="text-wedding-lilac font-script text-3xl md:text-4xl animate-fade-in">
                March 21st, 2026
              </div>
            </div>

            <Button
              onClick={onAnimationComplete}
              className="mt-8 bg-wedding-gold hover:bg-wedding-gold/90 text-black font-medium py-6 px-8 rounded-full transform hover:scale-105 transition-all duration-200"
            >
              <span className="mr-2">Continue to RSVP</span>
              <ChevronDown className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationAnimation;
