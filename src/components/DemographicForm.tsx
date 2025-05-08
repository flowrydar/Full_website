import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { User, Mail, Phone, MessageSquare, UserPlus, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface AdditionalGuest {
  id: string;
  name: string;
}

interface GuestFormData {
  primaryGuest: {
    name: string;
    email: string;
    phone: string;
  };
  additionalGuests: AdditionalGuest[];
  goodwillMessage: string;
  wantsAsoEbi: boolean;
}

interface DemographicFormProps {
  onSubmit: (data: GuestFormData) => void;
  isAttending: boolean;
}

const DemographicForm: React.FC<DemographicFormProps> = ({ onSubmit, isAttending }) => {
  const [formData, setFormData] = useState<GuestFormData>({
    primaryGuest: {
      name: '',
      email: '',
      phone: ''
    },
    additionalGuests: [],
    goodwillMessage: '',
    wantsAsoEbi: false
  });

  // Handle changes for primary guest fields
  const handleChangePrimaryGuest = 
    (field: 'name' | 'email' | 'phone') => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(`Updating ${field} to: ${e.target.value}`);
      setFormData((prev) => ({
        ...prev,
        primaryGuest: {
          ...prev.primaryGuest,
          [field]: e.target.value
        }
      }));
    };

  const addGuest = () => {
    console.log("Adding guest");
    if (formData.additionalGuests.length >= 4) {
      toast.error('Maximum of 4 additional guests allowed');
      return;
    }
    setFormData(prev => ({
      ...prev,
      additionalGuests: [
        ...prev.additionalGuests,
        { id: uuidv4(), name: '' }
      ]
    }));
  };

  const removeGuest = (id: string) => {
    console.log(`Removing guest: ${id}`);
    setFormData(prev => ({
      ...prev,
      additionalGuests: prev.additionalGuests.filter(guest => guest.id !== id)
    }));
  };

  const updateGuestName = (id: string, name: string) => {
    console.log(`Updating guest ${id} name to: ${name}`);
    setFormData(prev => ({
      ...prev,
      additionalGuests: prev.additionalGuests.map(guest =>
        guest.id === id ? { ...guest, name } : guest
      )
    }));
  };

  const handleGoodwillMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(`Updating message to: ${e.target.value}`);
    setFormData(prev => ({
      ...prev,
      goodwillMessage: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("=== FORM SUBMISSION START ===");
    console.log("Form Data:", JSON.stringify(formData, null, 2));
    
    // Validate primary guest information
    if (!formData.primaryGuest.name.trim()) {
      console.error("Validation Error: Name is required");
      toast.error('Please enter your name');
      return;
    }
    if (!formData.primaryGuest.email.trim()) {
      console.error("Validation Error: Email is required");
      toast.error('Please enter your email');
      return;
    }
    if (!formData.primaryGuest.phone.trim()) {
      console.error("Validation Error: Phone is required");
      toast.error('Please enter your phone number');
      return;
    }
    
    // Validate additional guest names if any are added
    const emptyGuests = formData.additionalGuests.filter(guest => !guest.name.trim());
    if (emptyGuests.length > 0) {
      console.error("Validation Error: Empty guest names found", emptyGuests);
      toast.error('Please enter names for all additional guests');
      return;
    }
    
    console.log("All validations passed, attempting submission...");
    
    try {
      console.log("Calling onSubmit with data:", {
        primaryGuest: formData.primaryGuest,
        additionalGuests: formData.additionalGuests,
        goodwillMessage: formData.goodwillMessage,
        wantsAsoEbi: formData.wantsAsoEbi
      });
      
      onSubmit(formData);
      console.log("=== FORM SUBMISSION COMPLETE ===");
    } catch (error) {
      console.error("=== FORM SUBMISSION ERROR ===");
      console.error("Error details:", error);
      console.error("Error stack:", (error as Error).stack);
      console.error("Form data at time of error:", formData);
      toast.error('There was a problem submitting your RSVP. Please try again.');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto space-y-10 relative z-10"
      style={{ isolation: 'isolate' }}
    >
      <div className="text-center mb-6">
        <h3 className="text-3xl font-script text-transparent bg-gold-gradient bg-clip-text drop-shadow-[0_0_1px_rgba(212,175,55,0.5)]">
          {isAttending ? 'Guest Information' : 'Decline RSVP'}
        </h3>
        <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-wedding-gold to-transparent mx-auto mb-3"></div>
        <p className="text-white opacity-80">
          {isAttending 
            ? 'Please tell us about you and your party' 
            : 'We\'re sorry you can\'t make it. Please leave your details below.'}
        </p>
      </div>
      
      {/* Primary Guest Information */}
      <div className="space-y-6 bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-wedding-gold/20">
        <div className="flex items-center mb-3">
          <div className="w-1 h-6 bg-wedding-gold mr-3"></div>
          <h3 className="text-2xl font-script text-transparent bg-gold-gradient bg-clip-text drop-shadow-[0_0_1px_rgba(212,175,55,0.5)]">Your Information</h3>
        </div>
        <div className="grid gap-6">
          <div>
            <label htmlFor="guestName" className="block text-white mb-2 font-medium">Your Name *</label>
            <div className="relative group">
              <input
                id="guestName"
                type="text"
                value={formData.primaryGuest.name}
                onChange={handleChangePrimaryGuest('name')}
                className="pl-10 w-full rounded-md bg-black/70 border border-wedding-gold/30 text-white px-4 py-2 placeholder:text-white/50 focus:border-wedding-gold focus:ring-1 focus:ring-wedding-gold/30 transition-all duration-300"
                placeholder="Enter your full name"
                required
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 group-hover:text-white transition-colors duration-300" />
            </div>
          </div>
          <div>
            <label htmlFor="guestEmail" className="block text-white mb-2 font-medium">Email Address *</label>
            <div className="relative group">
              <input
                id="guestEmail"
                type="email"
                value={formData.primaryGuest.email}
                onChange={handleChangePrimaryGuest('email')}
                className="pl-10 w-full rounded-md bg-black/70 border border-wedding-gold/30 text-white px-4 py-2 placeholder:text-white/50 focus:border-wedding-gold focus:ring-1 focus:ring-wedding-gold/30 transition-all duration-300"
                placeholder="Enter your email address"
                required
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 group-hover:text-white transition-colors duration-300" />
            </div>
          </div>
          <div>
            <label htmlFor="guestPhone" className="block text-white mb-2 font-medium">Phone Number *</label>
            <div className="relative group">
              <input
                id="guestPhone"
                type="tel"
                value={formData.primaryGuest.phone}
                onChange={handleChangePrimaryGuest('phone')}
                className="pl-10 w-full rounded-md bg-black/70 border border-wedding-gold/30 text-white px-4 py-2 placeholder:text-white/50 focus:border-wedding-gold focus:ring-1 focus:ring-wedding-gold/30 transition-all duration-300"
                placeholder="Enter your phone number"
                required
              />
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 group-hover:text-white transition-colors duration-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Guests Section */}
      {isAttending && (
        <div className="space-y-6 bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-wedding-gold/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="w-1 h-6 bg-wedding-gold mr-3"></div>
              <h3 className="text-2xl font-script text-transparent bg-gold-gradient bg-clip-text drop-shadow-[0_0_1px_rgba(212,175,55,0.5)]">Additional Guests</h3>
            </div>
            <button
              type="button"
              onClick={addGuest}
              className="px-4 py-2 border border-wedding-gold/50 rounded-md text-white hover:bg-wedding-lilac hover:text-black hover:border-wedding-lilac flex items-center text-sm transition-all duration-300 shadow-sm shadow-wedding-gold/10"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add Guest
            </button>
          </div>
          
          <div className="space-y-4">
            {formData.additionalGuests.length === 0 && (
              <p className="text-white/70 italic text-center py-4">No additional guests added yet</p>
            )}
            
            {formData.additionalGuests.map((guest, index) => (
              <div key={guest.id} className="flex items-center gap-3 group">
                <div className="relative flex-grow">
                  <input
                    value={guest.name}
                    onChange={(e) => updateGuestName(guest.id, e.target.value)}
                    className="w-full rounded-md bg-black/70 border border-wedding-gold/30 text-white pl-10 px-4 py-2 placeholder:text-white/50 focus:border-wedding-gold focus:ring-1 focus:ring-wedding-gold/30 transition-all duration-300"
                    placeholder={`Guest ${index + 1} name`}
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                </div>
                <button
                  type="button"
                  onClick={() => removeGuest(guest.id)}
                  className="p-3 border border-wedding-gold/30 rounded-md text-white hover:bg-wedding-gold/10 hover:text-white transition-all duration-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Aso Ebi Section */}
      <div className="space-y-6 bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-wedding-gold/20">
        <div className="flex items-center mb-3">
          <div className="w-1 h-6 bg-wedding-gold mr-3"></div>
          <h3 className="text-2xl font-script text-transparent bg-gold-gradient bg-clip-text drop-shadow-[0_0_1px_rgba(212,175,55,0.5)]">Aso Ebi Interest</h3>
        </div>
        <div className="space-y-4">
          <p className="text-white/80">Would you like to purchase our Aso Ebi? (Details will be provided soon)</p>
          <div className="flex gap-4" role="radiogroup" aria-label="Aso Ebi preference">
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="asoEbi"
                value="yes"
                className="sr-only peer"
                checked={formData.wantsAsoEbi === true}
                onChange={() => {
                  console.log("Setting wantsAsoEbi to true");
                  setFormData(prev => ({ ...prev, wantsAsoEbi: true }));
                }}
              />
              <div 
                className={`py-3 px-6 rounded-md border text-center transition-all duration-300 ${
                  formData.wantsAsoEbi
                    ? 'bg-gold-gradient text-black border-wedding-gold hover:bg-wedding-lilac hover:border-wedding-lilac hover:text-black'
                    : 'border-wedding-gold/30 text-white hover:bg-wedding-lilac hover:text-black hover:border-wedding-lilac'
                }`}
              >
                Yes
              </div>
            </label>
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="asoEbi"
                value="no"
                className="sr-only peer"
                checked={formData.wantsAsoEbi === false}
                onChange={() => {
                  console.log("Setting wantsAsoEbi to false");
                  setFormData(prev => ({ ...prev, wantsAsoEbi: false }));
                }}
              />
              <div 
                className={`py-3 px-6 rounded-md border text-center transition-all duration-300 ${
                  !formData.wantsAsoEbi
                    ? 'bg-gold-gradient text-black border-wedding-gold hover:bg-wedding-lilac hover:border-wedding-lilac hover:text-black'
                    : 'border-wedding-gold/30 text-white hover:bg-wedding-lilac hover:text-black hover:border-wedding-lilac'
                }`}
              >
                No
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Message Section */}
      <div className="space-y-6 bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-wedding-gold/20">
        <div className="flex items-center mb-3">
          <div className="w-1 h-6 bg-wedding-gold mr-3"></div>
          <h3 className="text-2xl font-script text-transparent bg-gold-gradient bg-clip-text drop-shadow-[0_0_1px_rgba(212,175,55,0.5)]">Leave a Message</h3>
        </div>
        <div className="relative">
          <textarea
            id="goodwillMessage"
            value={formData.goodwillMessage}
            onChange={handleGoodwillMessageChange}
            className="w-full rounded-md bg-black/70 border border-wedding-gold/30 text-white px-4 py-2 placeholder:text-white/50 min-h-[100px] focus:border-wedding-gold focus:ring-1 focus:ring-wedding-gold/30 transition-all duration-300 pl-10"
            placeholder="Share your wishes or any special requirements..."
          />
          <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-white/50" />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-6">
        <button 
          type="submit"
          className="w-full bg-gold-gradient text-black py-4 transition-all duration-300 shadow-md text-center cursor-pointer rounded-full relative overflow-hidden group font-script tracking-wider text-xl"
        >
          Submit RSVP
        </button>
      </div>
    </form>
  );
};

export default DemographicForm;
