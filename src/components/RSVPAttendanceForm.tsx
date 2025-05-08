import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { UserPlus, Send } from 'lucide-react';
import { supabase, withRetry } from '@/integrations/supabase/client';
import { useIsMobile } from '@/hooks/use-mobile';
import { useMutation } from '@tanstack/react-query';

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 1000; // 1 second
const MAX_REQUESTS_PER_WINDOW = 5;
const requestTimestamps: number[] = [];

interface RSVPAttendanceFormProps {
  onSubmit: () => void;
}

const RSVPAttendanceForm = ({ onSubmit }: RSVPAttendanceFormProps) => {
  const [guestName, setGuestName] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [notes, setNotes] = useState('');
  const isMobile = useIsMobile();

  // Rate limiting function
  const checkRateLimit = useCallback(() => {
    const now = Date.now();
    // Remove timestamps older than the window
    while (requestTimestamps.length > 0 && requestTimestamps[0] < now - RATE_LIMIT_WINDOW) {
      requestTimestamps.shift();
    }
    // Check if we're within rate limit
    if (requestTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
      return false;
    }
    requestTimestamps.push(now);
    return true;
  }, []);

  // RSVP mutation with React Query
  const rsvpMutation = useMutation({
    mutationFn: async (formData: {
      guest_name: string;
      number_of_guests: number;
      notes: string;
    }) => {
      if (!checkRateLimit()) {
        throw new Error('Too many requests. Please try again in a moment.');
      }

      return withRetry(async () => {
        const { data, error } = await supabase
          .from('rsvp_responses')
          .insert({
            guest_name: formData.guest_name,
            is_attending: true,
            number_of_guests: formData.number_of_guests,
            notes: formData.notes
          })
          .select();

        if (error) throw error;
        return data;
      });
    },
    onMutate: () => {
      // Optimistic update with elegant loading message
      toast.loading('Submitting Your RSVP', {
        description: 'Please wait while we record your response...',
        duration: 10000,
        className: 'wedding-toast-loading'
      });
    },
    onSuccess: () => {
      toast.success('Thank You for Your RSVP!', {
        description: 'We look forward to celebrating with you on our special day.',
        duration: 5000,
        className: 'wedding-toast-success'
      });
      onSubmit();
    },
    onError: (error: Error) => {
      console.error('Error submitting RSVP:', error);
      if (error.message.includes('Too many requests')) {
        toast.error('A Moment of Patience', {
          description: 'Many guests are responding at once. Please try again shortly.',
          duration: 4000,
          className: 'wedding-toast-error'
        });
      } else {
        toast.error('Unable to Submit RSVP', {
          description: 'Please try again in a moment. Your response is important to us.',
          duration: 4000,
          className: 'wedding-toast-error'
        });
      }
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!guestName.trim()) {
      toast.error('Name Required', {
        description: 'Please provide your name to continue with the RSVP.',
        duration: 4000,
        className: 'wedding-toast-error'
      });
      return;
    }

    rsvpMutation.mutate({
      guest_name: guestName,
      number_of_guests: numberOfGuests,
      notes: notes
    });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-black/70 p-4 sm:p-6 rounded-lg border border-wedding-gold/30">
      <h3 className="text-xl sm:text-2xl font-serif text-wedding-gold mb-4 sm:mb-6 text-center">RSVP Details</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <div className="space-y-2">
          <Label htmlFor="guestName" className="text-wedding-gold text-sm sm:text-base">Your Name</Label>
          <Input
            id="guestName"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            required
            placeholder="Your full name"
            className="bg-black/50 border border-wedding-gold/30 focus:border-wedding-gold text-white placeholder:text-gray-400 h-12 sm:h-10"
            disabled={rsvpMutation.isPending}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="numberOfGuests" className="text-wedding-gold text-sm sm:text-base">Number of Guests</Label>
          <div className="flex items-center">
            <Input
              id="numberOfGuests"
              type="number"
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(Math.max(1, Math.min(5, parseInt(e.target.value) || 1)))}
              min="1"
              max="5"
              required
              className="bg-black/50 border border-wedding-gold/30 focus:border-wedding-gold text-white h-12 sm:h-10"
              disabled={rsvpMutation.isPending}
            />
            <UserPlus className="ml-2 text-wedding-gold/70" />
          </div>
          <p className="text-xs text-gray-400">Maximum 5 guests</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notes" className="text-wedding-gold text-sm sm:text-base">Special Notes</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any special notes..."
            className="bg-black/50 border border-wedding-gold/30 focus:border-wedding-gold text-white min-h-[80px] sm:min-h-[100px] placeholder:text-gray-400"
            disabled={rsvpMutation.isPending}
          />
        </div>
        
        <Button 
          type="submit" 
          className={`w-full bg-wedding-gold hover:bg-wedding-lilac text-black font-medium transition-all duration-300 ${isMobile ? 'py-4 text-base' : 'py-6 text-lg'} flex items-center justify-center rounded-lg mt-4`}
          disabled={rsvpMutation.isPending}
        >
          <Send className="mr-2 h-5 w-5" />
          {rsvpMutation.isPending ? 'Submitting...' : 'Submit RSVP'}
        </Button>
      </form>
    </div>
  );
};

export default RSVPAttendanceForm;
