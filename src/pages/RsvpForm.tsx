import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DemographicForm from '@/components/DemographicForm';
import RSVPBackground from '@/components/wedding/RSVPBackground';
import ArtDecoBorder from '@/components/wedding/ArtDecoBorder';
import InvitationHeader from '@/components/wedding/InvitationHeader';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface GuestFormData {
  primaryGuest: {
    name: string;
    email: string;
    phone: string;
  };
  additionalGuests: Array<{
    id: string;
    name: string;
  }>;
  goodwillMessage: string;
  wantsAsoEbi: boolean;
}

const RsvpForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isAttending, setIsAttending] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState<GuestFormData>({
    primaryGuest: { name: '', email: '', phone: '' },
    additionalGuests: [],
    goodwillMessage: '',
    wantsAsoEbi: false
  });
  
  // Handle intent parameter from URL
  useEffect(() => {
    const intent = searchParams.get('intent');
    if (intent === 'attend') {
      setIsAttending(true);
    } else if (intent === 'decline') {
      setIsAttending(false);
    }
  }, [searchParams]);
  
  const handleDemographicSubmit = (data: GuestFormData) => {
    console.log("Demographic form submitted:", data);
    setFormData({
      primaryGuest: data.primaryGuest,
      additionalGuests: data.additionalGuests,
      goodwillMessage: data.goodwillMessage,
      wantsAsoEbi: data.wantsAsoEbi
    });
    // Submit directly for both attending and not attending
    handleFormSubmit(data);
  };
  
  const handleFormSubmit = async (data: GuestFormData) => {
    console.log("=== SERVER SUBMISSION START ===");
    console.log("Received form data:", JSON.stringify(data, null, 2));
    
    if (isSubmitting) {
      console.warn("Submission already in progress, preventing duplicate submission");
      return;
    }
    
    setIsSubmitting(true);
    console.log("Submission status set to true");
    
    try {
      console.log("Attempting to submit RSVP to Supabase...");
      // Submit RSVP to Supabase
      const { data: rsvpData, error: rsvpError } = await supabase
        .from('rsvp_responses')
        .insert({
          guest_name: data.primaryGuest.name,
          is_attending: isAttending,
          number_of_guests: data.additionalGuests.length + 1,
          notes: data.goodwillMessage,
          email: data.primaryGuest.email,
          phone: data.primaryGuest.phone,
          wants_aso_ebi: data.wantsAsoEbi,
          additional_guests_data: data.additionalGuests.map(guest => ({ name: guest.name }))
        })
        .select()
        .single();
      
      if (rsvpError) {
        console.error("=== RSVP SUBMISSION ERROR ===");
        console.error("Supabase Error:", rsvpError);
        console.error("Error details:", {
          code: rsvpError.code,
          message: rsvpError.message,
          details: rsvpError.details,
          hint: rsvpError.hint
        });
        toast.error('There was a problem submitting your RSVP');
        setIsSubmitting(false);
        return;
      }

      console.log("RSVP submitted successfully:", rsvpData);
      
      console.log("=== SUBMISSION COMPLETED SUCCESSFULLY ===");
      // Show thank you popup only, removing the toast notification
      setShowThankYou(true);
      
      // Redirect after 4 seconds
      setTimeout(() => {
        console.log("Redirecting to home page...");
        goBackToHomePage();
      }, 4000);
    } catch (error) {
      console.error("=== UNEXPECTED ERROR ===");
      console.error("Error details:", error);
      console.error("Error stack:", (error as Error).stack);
      console.error("Form data at time of error:", data);
      toast.error('An unexpected error occurred');
      setIsSubmitting(false);
    }
  };
  
  const goBackToHomePage = () => {
    console.log("Going back to home page");
    
    // Use multiple navigation methods for the best reliability
    try {
      // Try to use React Router navigate first
      navigate('/');
      
      // Fallback to direct window.location with a slight delay
      setTimeout(() => {
        // Try to use the full URL for maximum compatibility
        const currentOrigin = window.location.origin;
        window.location.href = `${currentOrigin}/?success=true&attending=${isAttending}`;
      }, 100);
    } catch (error) {
      console.error("Navigation error:", error);
      // Final fallback to direct setting of location
      window.location.replace('/');
    }
  };

  return (
    <RSVPBackground>
      <ArtDecoBorder />
      <InvitationHeader />
      
      {/* Thank You Popup */}
      {showThankYou && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
          <div className="relative bg-gradient-to-b from-black to-black/90 p-8 rounded-lg border-2 border-wedding-gold shadow-lg max-w-md w-full mx-4 transform thank-you-popup gold-border-pulse">
            <div className="absolute -top-3 -left-3 -right-3 -bottom-3 border border-wedding-lilac rounded-lg opacity-50"></div>
            <div className="absolute -top-4 -left-4 -right-4 -bottom-4 border border-wedding-gold rounded-lg opacity-30"></div>
            
            <div className="text-center space-y-6 py-6">
              <h2 className="text-4xl md:text-5xl font-script text-wedding-gold mb-4 gold-text">Thank You!</h2>
              
              <div className="py-4">
                <p className="text-xl text-white mb-4">Your RSVP has been submitted successfully.</p>
                <p className="text-lg text-wedding-lilac lilac-glow">
                  {isAttending 
                    ? "We're excited to celebrate with you!" 
                    : "We'll miss you, but thank you for letting us know."}
                </p>
              </div>
              
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-wedding-gold to-transparent mx-auto my-4"></div>
              
              <p className="text-sm text-white/70 animate-pulse">Redirecting you back to the home page...</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="pb-12 px-4">
        <DemographicForm 
          onSubmit={handleDemographicSubmit} 
          isAttending={isAttending} 
        />
        
        {/* Enhanced back button with multiple navigation options */}
        <div className="mt-8 text-center">
          <a 
            href="/"
            className="inline-block mx-auto text-wedding-lilac hover:text-wedding-gold hover:underline text-lg font-medium transition-all duration-300 hover:scale-105 relative z-40"
            onClick={(e) => {
              e.preventDefault();
              goBackToHomePage();
            }}
          >
            Back to Home
          </a>
          
          {/* Fallback link in case JavaScript fails */}
          <noscript>
            <a 
              href="/" 
              className="inline-block mx-auto mt-2 text-wedding-lilac underline"
            >
              Back to Home
            </a>
          </noscript>
        </div>
      </div>
    </RSVPBackground>
  );
};

export default RsvpForm;
