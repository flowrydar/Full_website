import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface RSVPFormProps {
  onSuccess: () => void;
}

const RSVPForm = ({ onSuccess }: RSVPFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    numberOfGuests: 1,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    // In a real implementation, this would send the data to your backend
    console.log('RSVP Form Submitted:', formData);
    
    // Show success message
    toast.success('Thank you for your RSVP!');
    
    // Reset form data to prevent duplicate submissions
    setFormData({
      name: '',
      email: '',
      numberOfGuests: 1,
      message: ''
    });
    
    // Allow success message to be visible before redirecting
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
    }, 300);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md mx-auto px-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-wedding-gold">Full Name</Label>
        <Input
          id="name"
          name="name"
          required
          placeholder="Your name"
          className="bg-black border-wedding-gold text-white focus:border-wedding-lilac placeholder:text-gray-400"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email" className="text-wedding-gold">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Your email"
          className="bg-black border-wedding-gold text-white focus:border-wedding-lilac placeholder:text-gray-400"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="numberOfGuests" className="text-wedding-gold">Number of Guests</Label>
        <Input
          id="numberOfGuests"
          name="numberOfGuests"
          type="number"
          min="1"
          max="5"
          required
          className="bg-black border-wedding-gold text-white focus:border-wedding-lilac"
          value={formData.numberOfGuests}
          onChange={handleChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="message" className="text-wedding-gold">Message to the Couple</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Optional message for the bride and groom"
          className="bg-black border-wedding-gold text-white focus:border-wedding-lilac min-h-20 placeholder:text-gray-400"
          value={formData.message}
          onChange={handleChange}
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-wedding-gold hover:bg-wedding-lilac text-black font-medium transition-colors duration-300 py-6 text-lg relative z-40 pointer-events-auto"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
      </Button>
    </form>
  );
};

export default RSVPForm;
