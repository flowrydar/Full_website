
import { Button } from '@/components/ui/button';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

const BackButton = ({ onClick, label = "Back" }: BackButtonProps) => {
  return (
    <div className="text-center mt-8">
      <Button
        onClick={onClick}
        variant="ghost"
        className="text-wedding-lilac hover:text-wedding-gold hover:bg-transparent transition-all duration-300 hover:scale-105"
      >
        {label}
      </Button>
    </div>
  );
};

export default BackButton;
