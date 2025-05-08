import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Star, Calendar, Info } from 'lucide-react';

interface StatCardsProps {
  totalRsvps: number;
  attendingGuests: number;
  notAttendingRsvps: number;
  totalVisitors: number;
}

const StatCards = ({ totalRsvps, attendingGuests, notAttendingRsvps, totalVisitors }: StatCardsProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-wedding-gold/20 bg-black/60 backdrop-blur-sm shadow-lg hover:border-wedding-gold/40 transition-all">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-wedding-lilac">Total RSVPs</CardTitle>
          <Users className="h-4 w-4 text-wedding-gold" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{totalRsvps}</div>
          <p className="text-xs text-wedding-lilac-light">Responses received</p>
        </CardContent>
      </Card>
      
      <Card className="border-wedding-gold/20 bg-black/60 backdrop-blur-sm shadow-lg hover:border-wedding-gold/40 transition-all">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-wedding-lilac">Guest Count</CardTitle>
          <Star className="h-4 w-4 text-wedding-gold" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{attendingGuests}</div>
          <p className="text-xs text-wedding-lilac-light">Confirmed attendees</p>
        </CardContent>
      </Card>
      
      <Card className="border-wedding-gold/20 bg-black/60 backdrop-blur-sm shadow-lg hover:border-wedding-gold/40 transition-all">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-wedding-lilac">Not Attending</CardTitle>
          <Calendar className="h-4 w-4 text-wedding-gold" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{notAttendingRsvps}</div>
          <p className="text-xs text-wedding-lilac-light">Declined invitations</p>
        </CardContent>
      </Card>
      
      <Card className="border-wedding-gold/20 bg-black/60 backdrop-blur-sm shadow-lg hover:border-wedding-gold/40 transition-all">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-wedding-lilac">Website Visits</CardTitle>
          <Info className="h-4 w-4 text-wedding-gold" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{totalVisitors}</div>
          <p className="text-xs text-wedding-lilac-light">Total page views</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;
