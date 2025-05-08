const InvitationHeader = () => {
  return (
    <div className="text-center mb-6 mt-8 md:mt-12 transition-all duration-500 ease-in-out transform hover:scale-105 px-4">
      <div className="text-white space-y-4 max-w-2xl mx-auto">
        <p className="text-sm text-wedding-lilac font-sans">THE FAMILIES OF</p>
        <p className="text-lg md:text-xl font-serif text-transparent bg-gold-gradient bg-clip-text mt-1 tracking-wider">MR AND MRS CHRISTIAN CHUGHA</p>
        <p className="text-sm text-wedding-lilac font-sans my-1">AND</p>
        <p className="text-lg md:text-xl font-serif text-transparent bg-gold-gradient bg-clip-text tracking-wider">MR. AND MRS. ADEKUNLE ADEYA</p>
        <p className="text-sm text-wedding-lilac font-sans mt-4 mb-6">INVITE YOU TO CELEBRATE THE WEDDING OF THEIR CHILDREN</p>
        
        <div className="my-6 space-y-2">
          <p className="text-3xl md:text-4xl lg:text-5xl font-script text-transparent bg-gold-gradient bg-clip-text drop-shadow-[0_0_1px_rgba(212,175,55,0.5)]">Onyinye</p>
          <p className="text-lg text-wedding-lilac-light">&</p>
          <p className="text-3xl md:text-4xl lg:text-5xl font-script text-transparent bg-gold-gradient bg-clip-text drop-shadow-[0_0_1px_rgba(212,175,55,0.5)]">Folarin</p>
        </div>
        
        <div className="mt-6 space-y-1 text-sm">
          <p className="text-transparent bg-gold-gradient bg-clip-text font-medium tracking-wide">ON SATURDAY, MARCH 21ST, 2026</p>
          <div className="w-16 h-px bg-wedding-gold mx-auto my-2 opacity-70"></div>
          <p className="text-transparent bg-gold-gradient bg-clip-text font-medium tracking-wide">TIMELINE : TBD</p>
        </div>
      </div>
    </div>
  );
};

export default InvitationHeader;
