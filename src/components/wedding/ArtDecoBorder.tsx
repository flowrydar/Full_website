
const ArtDecoBorder = () => {
  return (
    <div className="absolute inset-0 p-2 overflow-hidden rounded-lg">
      {/* Main border with enhanced gold gradient effect to match the text */}
      <div className="absolute inset-0 border-[4px] rounded-lg" style={{ 
        borderImage: 'linear-gradient(135deg, #D4AF37 10%, #FBF5E0 50%, #D4AF37 90%) 1',
        WebkitMaskImage: 'linear-gradient(black, black)', /* Fix for Safari */
      }}></div>
      
      {/* Inner Border with enhanced gradient effect */}
      <div className="absolute inset-0 border-[1px] bg-gradient-to-b from-wedding-gold/10 to-transparent rounded-lg" style={{ 
        borderImage: 'linear-gradient(135deg, #D4AF37 10%, #FBF5E0 50%, #D4AF37 90%) 1',
      }}></div>
      
      {/* Corner Designs - Top Left - with elegant curves */}
      <div className="absolute top-0 left-0 w-24 h-24">
        <div className="absolute top-0 left-0 w-16 h-[1px] bg-gold-gradient"></div>
        <div className="absolute top-0 left-0 w-[1px] h-16 bg-gold-gradient"></div>
        <div className="absolute top-8 left-8 w-12 h-[1px] bg-gold-gradient"></div>
        <div className="absolute top-8 left-8 w-[1px] h-12 bg-gold-gradient"></div>
        <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-gold-gradient"></div>
      </div>
      
      {/* Corner Designs - Top Right */}
      <div className="absolute top-0 right-0 w-24 h-24">
        <div className="absolute top-0 right-0 w-16 h-[1px] bg-gold-gradient"></div>
        <div className="absolute top-0 right-0 w-[1px] h-16 bg-gold-gradient"></div>
        <div className="absolute top-8 right-8 w-12 h-[1px] bg-gold-gradient"></div>
        <div className="absolute top-8 right-8 w-[1px] h-12 bg-gold-gradient"></div>
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gold-gradient"></div>
      </div>
      
      {/* Corner Designs - Bottom Left */}
      <div className="absolute bottom-0 left-0 w-24 h-24">
        <div className="absolute bottom-0 left-0 w-16 h-[1px] bg-gold-gradient"></div>
        <div className="absolute bottom-0 left-0 w-[1px] h-16 bg-gold-gradient"></div>
        <div className="absolute bottom-8 left-8 w-12 h-[1px] bg-gold-gradient"></div>
        <div className="absolute bottom-8 left-8 w-[1px] h-12 bg-gold-gradient"></div>
        <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-gold-gradient"></div>
      </div>
      
      {/* Corner Designs - Bottom Right */}
      <div className="absolute bottom-0 right-0 w-24 h-24">
        <div className="absolute bottom-0 right-0 w-16 h-[1px] bg-gold-gradient"></div>
        <div className="absolute bottom-0 right-0 w-[1px] h-16 bg-gold-gradient"></div>
        <div className="absolute bottom-8 right-8 w-12 h-[1px] bg-gold-gradient"></div>
        <div className="absolute bottom-8 right-8 w-[1px] h-12 bg-gold-gradient"></div>
        <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-gold-gradient"></div>
      </div>
      
      {/* Elegant Top Ornament */}
      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-40 h-10 overflow-hidden">
        <div className="relative w-full h-full">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[1px] h-10 bg-gold-gradient"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 rotate-30 w-[1px] h-10 bg-gold-gradient opacity-70"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -rotate-30 w-[1px] h-10 bg-gold-gradient opacity-70"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 rotate-60 w-[1px] h-10 bg-gold-gradient opacity-40"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -rotate-60 w-[1px] h-10 bg-gold-gradient opacity-40"></div>
        </div>
        {/* Top ornament circle */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gold-gradient flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-black/80"></div>
        </div>
      </div>
      
      {/* Elegant Bottom Ornament */}
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-40 h-10 overflow-hidden">
        <div className="relative w-full h-full">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[1px] h-10 bg-gold-gradient"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 rotate-30 w-[1px] h-10 bg-gold-gradient opacity-70"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -rotate-30 w-[1px] h-10 bg-gold-gradient opacity-70"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 rotate-60 w-[1px] h-10 bg-gold-gradient opacity-40"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -rotate-60 w-[1px] h-10 bg-gold-gradient opacity-40"></div>
        </div>
        {/* Bottom ornament circle */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gold-gradient flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-black/80"></div>
        </div>
      </div>
      
      {/* Side decorative elements */}
      <div className="absolute top-1/2 left-2 transform -translate-y-1/2 h-60 w-1 flex flex-col items-center justify-center gap-4">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-wedding-gold to-transparent"></div>
        <div className="w-3 h-3 rounded-full bg-gold-gradient"></div>
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-wedding-gold to-transparent"></div>
      </div>
      <div className="absolute top-1/2 right-2 transform -translate-y-1/2 h-60 w-1 flex flex-col items-center justify-center gap-4">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-wedding-gold to-transparent"></div>
        <div className="w-3 h-3 rounded-full bg-gold-gradient"></div>
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-wedding-gold to-transparent"></div>
      </div>
    </div>
  );
};

export default ArtDecoBorder;
