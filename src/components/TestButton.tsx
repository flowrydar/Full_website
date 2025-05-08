import React from 'react';

const TestButton = () => {
  const handleClick = () => {
    console.log('Button clicked!');
    alert('Button clicked!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-8">Button Click Test</h1>
      
      <button
        onClick={handleClick}
        className="w-full max-w-md bg-gradient-to-r from-wedding-gold via-wedding-gold/90 to-wedding-gold hover:opacity-90 text-black font-medium py-6 transition-all duration-300 shadow-lg shadow-wedding-gold/20 relative z-50 cursor-pointer mb-8"
      >
        Test Click Here
      </button>
      
      <p className="text-gray-400 mt-4">
        Click the button above to test if button clicks are working.
        Check the console for the "Button clicked!" message.
      </p>
      
      <div className="mt-8">
        <a href="/rsvp-form" className="text-wedding-lilac hover:text-wedding-gold">
          Back to RSVP Form
        </a>
      </div>
    </div>
  );
};

export default TestButton; 