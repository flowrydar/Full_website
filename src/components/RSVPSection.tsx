import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ThankYouNote from './ThankYouNote';
import ArtDecoBorder from './wedding/ArtDecoBorder';
import InvitationHeader from './wedding/InvitationHeader';
import BackButton from './wedding/BackButton';
import RSVPBackground from './wedding/RSVPBackground';
import CountdownTimer from './CountdownTimer';
import CommentWall from './CommentWall';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import RSVPAttendanceForm from './RSVPAttendanceForm';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

const RSVPSection = () => {
  const navigate = useNavigate();
  const [rsvpState, setRsvpState] = useState<'initial' | 'not-attending' | 'submitted' | 'comments'>('initial');
  const [isAttending, setIsAttending] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const handleAttend = () => {
    try {
      console.log('Will Attend button clicked');
      toast.success("Navigating to RSVP form...");
      // Navigate to the RSVP form with a query parameter indicating attendance intent
      navigate('/rsvp-form?intent=attend');
    } catch (error) {
      console.error('Error in handleAttend:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };
  
  const handleNotAttend = async () => {
    console.log('Will Not Attend button clicked');
    try {
      toast.success("Navigating to RSVP form...");
      // Navigate to the RSVP form with a query parameter indicating decline intent
      navigate('/rsvp-form?intent=decline');
    } catch (error) {
      console.error('Exception when handling not attend:', error);
      toast.error('An unexpected error occurred');
    }
  };
  
  const handleFormSubmit = () => {
    try {
      setRsvpState('submitted');
    } catch (error) {
      console.error('Error in handleFormSubmit:', error);
      toast.error('Something went wrong with your submission.');
    }
  };
  
  const resetForm = () => {
    try {
      setRsvpState('initial');
      setIsAttending(false);
    } catch (error) {
      console.error('Error in resetForm:', error);
      toast.error('Something went wrong. Please refresh the page.');
    }
  };

  return (
    <RSVPBackground>
      <ArtDecoBorder />
      
      <InvitationHeader />
      
      {rsvpState === 'initial' && (
        <div className="container mx-auto px-4 max-w-md md:max-w-2xl">
          {/* RSVP Buttons - Using direct links styled as buttons for maximum compatibility */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center my-6 sm:my-10 px-2 sm:px-4">
            {/* Will Attend Button */}
            <a 
              href="/rsvp-form?intent=attend"
              className={`
                relative z-30 
                bg-gradient-to-r from-wedding-gold-gradient-from to-wedding-gold-gradient-to 
                hover:bg-wedding-lilac hover:from-wedding-lilac hover:to-wedding-lilac 
                active:bg-wedding-lilac-dark active:from-wedding-lilac-dark active:to-wedding-lilac-dark
                text-black font-script 
                ${isMobile ? 'text-xl py-6' : 'text-2xl py-8'} 
                px-4 sm:px-10 font-bold 
                transition-all duration-200 
                hover:scale-105 hover:shadow-lg
                active:scale-95
                shadow-md w-full sm:min-w-[200px] rounded-lg 
                cursor-pointer 
                text-center flex items-center justify-center
                after:content-[''] after:absolute after:inset-0 after:rounded-lg after:opacity-0 after:hover:opacity-100
                after:transition-opacity after:duration-300 after:border-2 after:border-wedding-lilac after:pointer-events-none
              `}
              onClick={(e) => {
                e.preventDefault();
                toast.success("Navigating to RSVP form...");
                window.location.assign("/rsvp-form?intent=attend");
              }}
            >
              <span className="relative z-10">Will Attend</span>
            </a>
            
            {/* Will Not Attend Button - Updated to match Will Attend style */}
            <a 
              href="/rsvp-form?intent=decline"
              className={`
                relative z-30 
                bg-black border-2 border-wedding-gold
                hover:bg-wedding-lilac hover:text-white hover:border-wedding-lilac 
                active:bg-wedding-lilac-dark active:text-white active:border-wedding-lilac-dark
                text-wedding-gold font-script 
                ${isMobile ? 'text-xl py-6' : 'text-2xl py-8'} 
                px-4 sm:px-10 font-bold 
                transition-all duration-200 
                hover:scale-105 hover:shadow-lg
                active:scale-95
                shadow-md w-full sm:min-w-[200px] rounded-lg 
                cursor-pointer 
                text-center flex items-center justify-center
                after:content-[''] after:absolute after:inset-0 after:rounded-lg after:opacity-0 after:hover:opacity-100
                after:transition-opacity after:duration-300 after:border-2 after:border-wedding-lilac after:pointer-events-none
              `}
              onClick={(e) => {
                e.preventDefault();
                toast.success("Navigating to RSVP form...");
                window.location.assign("/rsvp-form?intent=decline");
              }}
            >
              <span className="relative z-10">Will Not Attend</span>
            </a>
          </div>
          
          <div className="my-6 sm:my-8">
            <CountdownTimer />
          </div>
          
          {/* Wedding Details Section */}
          <div className="max-w-md mx-auto my-8">
            <div className="flex">
              {/* Left Side */}
              <div className="flex-1 text-center border-r border-wedding-gold/20 pr-4">
                <p className="text-2xl md:text-3xl font-script text-transparent bg-gold-gradient bg-clip-text">No Kids Allowed</p>
              </div>
              {/* Right Side */}
              <div className="flex-1 text-center pl-4">
                <p className="text-2xl md:text-3xl font-script text-transparent bg-gold-gradient bg-clip-text">Aso-Ebi Details will soon be provided</p>
              </div>
            </div>
          </div>
          
          {/* Attendance Form with better mobile spacing */}
          {isAttending && (
            <div ref={formRef} className="mb-8 px-2 sm:px-4 transition-all duration-500 animate-fade-in">
              <RSVPAttendanceForm onSubmit={handleFormSubmit} />
            </div>
          )}
          
          {/* Comment Wall section */}
          <div className="mt-8 sm:mt-12 mb-6 px-2 sm:px-4 mx-auto relative z-20 pointer-events-auto">
            <CommentWall />
          </div>
        </div>
      )}
      
      {rsvpState === 'submitted' && (
        <div className="pb-8 sm:pb-12 px-4">
          <ThankYouNote 
            willAttend={isAttending} 
            onReset={resetForm} 
          />
        </div>
      )}
    </RSVPBackground>
  );
};

export default RSVPSection;
