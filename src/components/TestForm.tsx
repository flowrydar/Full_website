import React, { useState } from 'react';

const TestForm = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [guests, setGuests] = useState<string[]>([]);

  const addGuest = () => {
    setGuests([...guests, '']);
  };

  const updateGuest = (index: number, value: string) => {
    const newGuests = [...guests];
    newGuests[index] = value;
    setGuests(newGuests);
  };

  const removeGuest = (index: number) => {
    const newGuests = [...guests];
    newGuests.splice(index, 1);
    setGuests(newGuests);
  };

  return (
    <div className="p-4 bg-black text-white">
      <h2 className="text-xl mb-4">Test Form</h2>
      
      <div className="mb-4">
        <label className="block mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded bg-transparent border border-white text-white"
          placeholder="Enter name"
        />
      </div>

      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <label>Guests</label>
          <button
            type="button"
            onClick={addGuest}
            className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
          >
            Add Guest
          </button>
        </div>
        
        {guests.map((guest, index) => (
          <div key={index} className="flex mb-2">
            <input
              type="text"
              value={guest}
              onChange={(e) => updateGuest(index, e.target.value)}
              className="flex-1 p-2 rounded-l bg-transparent border border-white text-white"
              placeholder={`Guest ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => removeGuest(index)}
              className="px-2 py-1 bg-red-500 text-white rounded-r"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 rounded bg-transparent border border-white text-white h-24"
          placeholder="Enter message"
        />
      </div>

      <button
        type="button"
        onClick={() => console.log({ name, guests, message })}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default TestForm; 