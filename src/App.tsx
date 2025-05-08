import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import RsvpForm from "./pages/RsvpForm";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import TestForm from './components/TestForm';
import TestButton from './components/TestButton';

// Password Protected Route Component
const ProtectedDashboard = () => {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Oppa') {
      setIsAuthorized(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  if (isAuthorized) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full p-6 rounded-lg border border-wedding-gold/30 bg-black/60 backdrop-blur-sm">
        <h2 className="text-2xl font-script text-transparent bg-gold-gradient bg-clip-text mb-6 text-center">Dashboard Access</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-white mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md bg-black/70 border border-wedding-gold/30 text-white px-4 py-2 focus:border-wedding-gold focus:ring-1 focus:ring-wedding-gold/30"
              placeholder="Enter password"
            />
          </div>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <button
            type="submit"
            className="w-full bg-gold-gradient text-black py-2 rounded-md hover:opacity-90 transition-opacity"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/rsvp-form" element={<RsvpForm />} />
            <Route path="/dashboard" element={<ProtectedDashboard />} />
            <Route path="/test-form" element={<TestForm />} />
            <Route path="/test-button" element={<TestButton />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </>
  );
};

export default App;
