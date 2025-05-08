import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface EnvelopeEntranceProps {
  onComplete: () => void;
}

const EnvelopeEntrance: React.FC<EnvelopeEntranceProps> = ({ onComplete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isDissolving, setIsDissolving] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const envelopeRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Get envelope position for correctly positioned sparkles
  useEffect(() => {
    if (envelopeRef.current) {
      const rect = envelopeRef.current.getBoundingClientRect();
      setMaskPosition({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
      });
    }
  }, []);
  
  // Create sparkle elements dynamically
  useEffect(() => {
    if (isDissolving && sparklesRef.current) {
      const sparkleCount = 200; // Increased for more dramatic effect
      const container = sparklesRef.current;
      container.innerHTML = '';
      
      // Create an envelope shape for the sparkles to follow
      const envelopeShape = [
        { x: 0.5, y: 0.5, weight: 6 },  // center (increased weight)
        { x: 0.5, y: 0.2, weight: 5 },  // top
        { x: 0.5, y: 0.8, weight: 5 },  // bottom
        { x: 0.2, y: 0.5, weight: 4 },  // left
        { x: 0.8, y: 0.5, weight: 4 },  // right
        { x: 0.2, y: 0.2, weight: 3 },  // top left
        { x: 0.8, y: 0.2, weight: 3 },  // top right
        { x: 0.2, y: 0.8, weight: 3 },  // bottom left
        { x: 0.8, y: 0.8, weight: 3 },  // bottom right
        { x: 0.5, y: 0.6, weight: 5 },  // center fold
      ];
      
      for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        // Randomize sparkle properties with refined sizes
        const size = Math.random() * 6 + 2; // 2-8px (smaller range for crisper look)
        const isGold = Math.random() > 0.25; // 75% gold, 25% lilac
        
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.background = isGold 
          ? `radial-gradient(circle, #faebc3 10%, #D4AF37 60%)` // Adjusted gradient
          : `radial-gradient(circle, #d4ccfa 10%, #9b87f5 60%)`; // Adjusted gradient
        
        // Position sparkles to follow the envelope shape
        let x, y;
        
        if (Math.random() < 0.8) { // Increased envelope shape following
          // 80% follow the envelope shape
          const point = weightedRandomPick(envelopeShape);
          x = point.x * 100 + (Math.random() * 15 - 7.5); // Reduced randomness
          y = point.y * 100 + (Math.random() * 15 - 7.5); // Reduced randomness
        } else {
          // 20% fully random
          x = Math.random() * 100;
          y = Math.random() * 100;
        }
        
        sparkle.style.left = `${x}%`;
        sparkle.style.top = `${y}%`;
        
        // Custom variables for animation direction with reduced randomness
        sparkle.style.setProperty('--random-x', (Math.random() * 1.5 - 0.75).toFixed(2));
        sparkle.style.setProperty('--random-y', (Math.random() * 1.5 - 0.75).toFixed(2));
        
        // Animation properties with faster timing
        sparkle.style.animationDelay = `${Math.random() * 0.75}s`; // Reduced delay
        sparkle.style.animationDuration = `${Math.random() * 0.5 + 1}s`; // Faster animation
        
        container.appendChild(sparkle);
      }
      
      // Faster transition to homepage
      setTimeout(() => {
        setIsComplete(true);
        setTimeout(() => onComplete(), 300); // Reduced exit delay
      }, 1200); // Reduced sparkle duration
    }
  }, [isDissolving, onComplete]);

  // Helper function for weighted random selection
  const weightedRandomPick = (items: Array<{x: number, y: number, weight: number}>) => {
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const item of items) {
      random -= item.weight;
      if (random <= 0) {
        return item;
      }
    }
    
    return items[0];
  };

  // Handle envelope interaction
  const handleEnvelopeInteraction = () => {
    setIsClicked(true);
    setIsDissolving(true);
    
    // Complete the entrance after the dissolve animation
    setTimeout(() => {
      setIsComplete(true);
      onComplete();
    }, 1000);
  };

  // Animation variants for the envelope flap
  const flapVariants = {
    closed: { 
      d: "M10 20L100 70L190 20",
      fill: "black",
      transition: { duration: 0.3 }
    },
    open: { 
      d: "M10 20L100 10L190 20",
      fill: "none",
      transition: { duration: 0.3 }
    }
  };

  // Animation variants for the seal
  const sealVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      transition: { duration: 0.2 }
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2 }
    }
  };

  // Animation variants for the letter
  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 0,
      transition: { duration: 0.3 }
    },
    visible: {
      opacity: 0.95,
      y: -8,
      transition: { duration: 0.3, delay: 0.1 }
    }
  };

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div 
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/3 w-32 h-32 rounded-full bg-wedding-gold/5 blur-lg"></div>
            <div className="absolute top-2/3 right-1/4 w-48 h-48 rounded-full bg-wedding-lilac/5 blur-lg"></div>
            <div className="absolute bottom-1/4 left-1/2 w-40 h-40 rounded-full bg-wedding-gold/5 blur-lg"></div>
            
            {/* Additional decorative elements */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-wedding-gold to-transparent opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-wedding-gold to-transparent opacity-30"></div>
          </div>
          
          {/* Envelope container */}
          <div className="relative w-full max-w-md h-96 flex items-center justify-center">
            {/* Envelope with interaction effect */}
            {!isDissolving && (
              <motion.div
                ref={envelopeRef}
                className="w-72 h-56 relative cursor-pointer touch-manipulation"
                animate={{
                  y: [0, 8, 0],
                  filter: isClicked
                    ? ["drop-shadow(0 0 10px rgba(212, 175, 55, 0.6))", "drop-shadow(0 0 20px rgba(212, 175, 55, 0.8))", "drop-shadow(0 0 10px rgba(212, 175, 55, 0.6))"] 
                    : ["drop-shadow(0 0 6px rgba(212, 175, 55, 0.4))", "drop-shadow(0 0 12px rgba(212, 175, 55, 0.6))", "drop-shadow(0 0 6px rgba(212, 175, 55, 0.4))"]
                }}
                transition={{
                  y: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
                  filter: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                onClick={handleEnvelopeInteraction}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Envelope SVG */}
                <svg 
                  viewBox="0 0 200 150" 
                  className="w-full h-full"
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Letter inside (only visible when clicked) */}
                  <motion.rect 
                    x="25" 
                    y="30" 
                    width="150" 
                    height="100" 
                    fill="white" 
                    rx="2"
                    variants={letterVariants}
                    initial="hidden"
                    animate={isClicked ? "visible" : "hidden"}
                  />
                  
                  {/* Gold accent on letter */}
                  <motion.path 
                    d="M35 40H165M35 50H165M35 60H120" 
                    stroke="#D4AF37" 
                    strokeWidth="1"
                    strokeOpacity="0.9"
                    variants={letterVariants}
                    initial="hidden"
                    animate={isClicked ? "visible" : "hidden"}
                  />
                  
                  {/* Envelope base */}
                  <rect x="10" y="20" width="180" height="120" rx="4" fill="black" stroke="#D4AF37" strokeWidth="1.5" />
                  
                  {/* Envelope inner flap */}
                  <path 
                    d="M10 140L100 90L190 140" 
                    stroke="#D4AF37" 
                    strokeWidth="1"
                    strokeOpacity="0.6"
                  />
                  
                  {/* Envelope flap (animated) */}
                  <motion.path 
                    variants={flapVariants}
                    initial="closed"
                    animate={isClicked ? "open" : "closed"}
                    stroke="#D4AF37" 
                    strokeWidth="1.5"
                  />
                  
                  {/* Wax seal (disappears on click) */}
                  <motion.g
                    variants={sealVariants}
                    initial="visible"
                    animate={isClicked ? "hidden" : "visible"}
                  >
                    <path
                      d="M100 95 C100 95, 85 75, 100 65 C115 75, 100 95, 100 95Z M100 95 C100 95, 115 75, 100 65 C85 75, 100 95, 100 95Z"
                      fill="#9b87f5"
                      opacity="0.95"
                    />
                    <path
                      d="M100 92 C100 92, 88 77, 100 70 C112 77, 100 92, 100 92Z M100 92 C100 92, 112 77, 100 70 C88 77, 100 92, 100 92Z"
                      fill="#d4ccfa"
                      opacity="0.9"
                    />
                    <path
                      d="M100 98 C100 98, 82 73, 100 62 C118 73, 100 98, 100 98Z M100 98 C100 98, 118 73, 100 62 C82 73, 100 98, 100 98Z"
                      stroke="#9b87f5"
                      strokeWidth="0.5"
                      opacity="0.6"
                      fill="none"
                    />
                  </motion.g>
                </svg>
                
                {/* Interaction hint */}
                <motion.div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-wedding-gold text-sm font-serif tracking-wide whitespace-nowrap"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  Click to open
                </motion.div>
              </motion.div>
            )}
            
            {/* Dissolving sparkles container */}
            {isDissolving && (
              <div 
                ref={sparklesRef} 
                className="absolute inset-0 mask-container"
                style={{
                  width: maskPosition.width || '100%',
                  height: maskPosition.height || '100%'
                }}
              ></div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnvelopeEntrance; 