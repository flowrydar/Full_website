
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import BackButton from '@/components/wedding/BackButton';
import RSVPBackground from '@/components/wedding/RSVPBackground';
import ArtDecoBorder from '@/components/wedding/ArtDecoBorder';
import InvitationHeader from '@/components/wedding/InvitationHeader';

const RSVPFormPage = () => {
  const navigate = useNavigate();
  const [guestName, setGuestName] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted', guestName, numberOfGuests);
    // Show success toast
    toast.success('Thank you for your RSVP!');
    // Redirect back to home with success state
    navigate('/?success=true&attending=true');
  };
  
  const goBack = () => {
    navigate('/');
  };

  return (
    <RSVPBackground>
      <ArtDecoBorder />
      <InvitationHeader />
      
      <div className="pb-12 px-4">
        <form onSubmit={handleFormSubmit} className="space-y-6 w-full max-w-md mx-auto">
          <div className="space-y-2">
            <Label htmlFor="guestName" className="text-wedding-gold">Your Name</Label>
            <Input
              id="guestName"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              required
              placeholder="Your name"
              className="bg-black border-wedding-gold text-white focus:border-wedding-lilac placeholder:text-gray-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="numberOfGuests" className="text-wedding-gold">Number of Guests</Label>
            <Input
              id="numberOfGuests"
              type="number"
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(Number(e.target.value))}
              min="1"
              max="5"
              required
              className="bg-black border-wedding-gold text-white focus:border-wedding-lilac"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-wedding-gold hover:bg-wedding-lilac text-black font-medium transition-colors duration-300 py-6 text-lg"
          >
            Submit RSVP
          </Button>
        </form>
        
        <BackButton onClick={goBack} />
      </div>
    </RSVPBackground>
  );
};

export default RSVPFormPage;
