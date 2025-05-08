import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface DashboardHeaderProps {
  onRefresh: () => void;
  isLoading: boolean;
}

const DashboardHeader = ({ onRefresh, isLoading }: DashboardHeaderProps) => {
  return (
    <header className="mb-8 flex justify-between items-center relative">
      <div>
        <h1 className="text-3xl font-serif text-wedding-gold mb-2 font-script">Wedding Dashboard</h1>
        <p className="text-wedding-lilac-light">Manage your wedding RSVP responses and site analytics</p>
        <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-wedding-gold to-transparent mt-3"></div>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={onRefresh}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 border-wedding-gold/50 text-wedding-gold hover:bg-wedding-gold/10 hover:text-white hover:border-wedding-gold"
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
