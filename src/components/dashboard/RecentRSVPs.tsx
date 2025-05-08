import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from '@/lib/utils';
import { RsvpResponse } from '@/api/routes/rsvp';

interface RecentRSVPsProps {
  isLoading: boolean;
  rsvpData: RsvpResponse[];
}

const RecentRSVPs = ({ isLoading, rsvpData }: RecentRSVPsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent RSVPs</CardTitle>
        <CardDescription>Your most recent wedding responses</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="py-12 text-center text-gray-500">
            Loading RSVP data...
          </div>
        ) : rsvpData.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            No RSVP responses yet
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Additional Guests</TableHead>
                <TableHead>Total Guests</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rsvpData.map((rsvp) => (
                <TableRow key={rsvp.id}>
                  <TableCell className="font-medium">{rsvp.guest_name}</TableCell>
                  <TableCell>
                    {rsvp.additional_guests_data && rsvp.additional_guests_data.length > 0 ? (
                      <div className="text-sm">
                        {rsvp.additional_guests_data.map((guest, index) => (
                          <div key={index} className="text-gray-400">
                            {guest.name}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400">None</span>
                    )}
                  </TableCell>
                  <TableCell>{rsvp.number_of_guests}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      rsvp.is_attending 
                        ? "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400"
                        : "bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-400"
                    }`}>
                      {rsvp.is_attending ? "Attending" : "Not Attending"}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(rsvp.created_at)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentRSVPs;
