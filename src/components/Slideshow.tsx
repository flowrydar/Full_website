import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

// Using the high-quality pre-wedding photos in the order they were uploaded (removed floral background)
const images = [
  "/lovable-uploads/b4a35cde-cd87-43db-909e-1f7e42d8759b.png", // Villa view with couple
  "/lovable-uploads/cc94b16f-b313-4e40-904c-b4c26f6e41b4.png", // Couple with save the date newspapers
  "/lovable-uploads/017c3e3e-28e3-43ec-9567-79df03c95e6b.png", // Couple walking hand in hand
  "/lovable-uploads/8ac863cc-294e-4721-aaa4-d3f38ae6850c.png", // Couple on red Alfa Romeo
  "/lovable-uploads/e0307200-85e0-473c-89a3-202ee560c679.png", // Couple kissing on red Alfa Romeo with #FLOVE2026 license plate
];

interface SlideshowProps {
  onScrollDown: () => void;
  shouldStart?: boolean; // New prop to control when slideshow starts
}

const Slideshow = ({ onScrollDown, shouldStart = false }: SlideshowProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Only start the slideshow if shouldStart is true
    if (!shouldStart) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [shouldStart]); // Add shouldStart to dependencies

  const handleClick = () => {
    console.log("Down arrow clicked"); // Added for debugging
    onScrollDown();
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Slideshow images */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${image})`,
              filter: 'brightness(0.6)' 
            }}
          />
        </div>
      ))}

      {/* Overlay with semi-transparent gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10" />

      {/* Down arrow with improved mobile visibility and larger size */}
      <div 
        className="absolute bottom-24 sm:bottom-8 left-[36%] sm:left-[45%] transform -translate-x-1/2 z-20 cursor-pointer flex flex-col items-center gap-4 animate-bounce"
        onClick={handleClick}
      >
        {/* Text hint - larger size */}
        <p className="text-wedding-gold text-2xl sm:text-3xl font-script tracking-wider drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
          Scroll Down
        </p>
        <div className="relative">
          <ChevronDown className="h-16 w-16 sm:h-20 sm:w-20 text-wedding-gold hover:text-wedding-lilac transition-colors duration-300" />
          {/* Enhanced glow effect for better visibility */}
          <div className="absolute inset-0 bg-wedding-gold/40 blur-xl rounded-full -z-10 scale-150"></div>
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
