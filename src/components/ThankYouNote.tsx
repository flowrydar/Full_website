
import { Button } from '@/components/ui/button';

interface ThankYouNoteProps {
  willAttend: boolean;
  onReset: () => void;
}

const ThankYouNote = ({ willAttend, onReset }: ThankYouNoteProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 animate-fade-in p-4 md:p-6 text-center max-w-md mx-auto">
      <h3 className="text-3xl md:text-4xl font-serif text-wedding-gold">
        {willAttend ? 'Thank You!' : 'We\'ll Miss You'}
      </h3>
      
      <div className="text-white space-y-4">
        {willAttend ? (
          <>
            <p className="text-base md:text-lg">
              Thank you for your RSVP. We're thrilled that you'll be joining us on our special day!
            </p>
            <p className="text-base md:text-lg">
              We'll send more details closer to the date. We can't wait to celebrate with you.
            </p>
          </>
        ) : (
          <>
            <p className="text-base md:text-lg">
              We understand that not everyone can make it to our celebration, and we appreciate you letting us know.
            </p>
            <p className="text-base md:text-lg">
              You'll be in our thoughts on our special day, and we hope to celebrate with you another time.
            </p>
          </>
        )}
      </div>
      
      <Button
        onClick={onReset}
        className="bg-wedding-lilac hover:bg-wedding-gold text-black font-medium transition-colors duration-300 mt-6 py-4 md:py-6 px-6 md:px-8 text-base md:text-lg"
      >
        Back to RSVP
      </Button>
    </div>
  );
};

export default ThankYouNote;
