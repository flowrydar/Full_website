import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, Filter, Eye, Download, Calendar, Trash2, Users } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { RsvpResponse, clearRsvpData } from '@/api/routes/rsvp';
import * as XLSX from 'xlsx';
import { toast } from 'sonner';

interface RSVPListViewProps {
  isLoading: boolean;
  rsvpData: RsvpResponse[];
  onFilterChange?: (value: 'all' | 'attending' | 'not-attending') => void;
  onDateFilterChange?: (value: 'all' | 'today' | 'week' | 'month') => void;
  currentFilter?: 'all' | 'attending' | 'not-attending';
  currentDateFilter?: 'all' | 'today' | 'week' | 'month';
  onRefresh?: () => void;
}

const RSVPListView = ({ 
  isLoading, 
  rsvpData, 
  onFilterChange,
  onDateFilterChange,
  currentFilter = 'all',
  currentDateFilter = 'all',
  onRefresh
}: RSVPListViewProps) => {
  
  const handleClearData = async () => {
    if (window.confirm('Are you sure you want to clear all RSVP data? This action cannot be undone.')) {
      try {
        const result = await clearRsvpData();
        if (result.success) {
          toast.success('All RSVP data has been cleared');
          if (onRefresh) {
            onRefresh();
          }
        } else {
          toast.error('Failed to clear RSVP data');
        }
      } catch (error) {
        console.error('Error clearing RSVP data:', error);
        toast.error('An error occurred while clearing RSVP data');
      }
    }
  };

  const exportToExcel = () => {
    try {
      const exportData = rsvpData.map(rsvp => ({
        'Primary Guest': rsvp.guest_name,
        'Additional Guests': rsvp.additional_guests_data && rsvp.additional_guests_data.length > 0
          ? rsvp.additional_guests_data.map(g => g.name).join(', ')
          : 'None',
        'Email': rsvp.email || 'Not provided',
        'Phone': rsvp.phone || 'Not provided',
        'Total Guests': rsvp.number_of_guests,
        'Status': rsvp.is_attending ? 'Attending' : 'Not Attending',
        'Wants Aso Ebi': rsvp.wants_aso_ebi ? 'Yes' : 'No',
        'Notes': rsvp.notes || 'No notes',
        'Date': formatDate(rsvp.created_at)
      }));

      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'RSVP Responses');
      
      // Set column widths
      const colWidths = [
        { wch: 20 }, // Primary Guest
        { wch: 30 }, // Additional Guests
        { wch: 25 }, // Email
        { wch: 15 }, // Phone
        { wch: 12 }, // Total Guests
        { wch: 15 }, // Status
        { wch: 15 }, // Wants Aso Ebi
        { wch: 30 }, // Notes
        { wch: 20 }, // Date
      ];
      ws['!cols'] = colWidths;

      XLSX.writeFile(wb, 'wedding-rsvp-responses.xlsx');
      toast.success('Successfully exported to Excel');
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      toast.error('Failed to export Excel file');
    }
  };

  const exportToCSV = () => {
    try {
      const headers = ['Primary Guest', 'Additional Guests', 'Email', 'Phone', 'Total Guests', 'Status', 'Wants Aso Ebi', 'Notes', 'Date'];
      const csvRows = [
        headers,
        ...rsvpData.map(rsvp => [
          rsvp.guest_name,
          rsvp.additional_guests_data && rsvp.additional_guests_data.length > 0
            ? rsvp.additional_guests_data.map(g => g.name).join(', ')
            : 'None',
          rsvp.email || 'Not provided',
          rsvp.phone || 'Not provided',
          rsvp.number_of_guests.toString(),
          rsvp.is_attending ? 'Attending' : 'Not Attending',
          rsvp.wants_aso_ebi ? 'Yes' : 'No',
          (rsvp.notes || 'No notes').replace(/,/g, ';'), // Replace commas with semicolons in notes
          formatDate(rsvp.created_at)
        ])
      ];

      const csvContent = csvRows.map(row => 
        row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
      ).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'wedding-rsvp-responses.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Successfully exported to CSV');
    } catch (error) {
      console.error('Error exporting to CSV:', error);
      toast.error('Failed to export CSV file');
    }
  };

  return (
    <Card className="border-wedding-gold/20 bg-black/60 backdrop-blur-sm shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between border-b border-wedding-gold/10 pb-4">
        <div>
          <CardTitle className="text-wedding-gold font-serif">RSVP Responses</CardTitle>
          <CardDescription className="text-wedding-lilac-light">Complete list of all wedding RSVPs</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          {onDateFilterChange && (
            <div className="flex items-center mr-2">
              <Select 
                value={currentDateFilter} 
                onValueChange={(value) => onDateFilterChange(value as 'all' | 'today' | 'week' | 'month')}
              >
                <SelectTrigger className="w-[180px] border-wedding-gold/30 bg-black text-wedding-lilac">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-wedding-gold" />
                    <SelectValue placeholder="Filter by date" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-black border-wedding-gold/30">
                  <SelectItem value="all" className="text-wedding-lilac hover:bg-wedding-gold/10">All Time</SelectItem>
                  <SelectItem value="today" className="text-wedding-lilac hover:bg-wedding-gold/10">Today</SelectItem>
                  <SelectItem value="week" className="text-wedding-lilac hover:bg-wedding-gold/10">Past Week</SelectItem>
                  <SelectItem value="month" className="text-wedding-lilac hover:bg-wedding-gold/10">Past Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {onFilterChange && (
            <div className="flex items-center mr-2">
              <Select 
                value={currentFilter} 
                onValueChange={(value) => onFilterChange(value as 'all' | 'attending' | 'not-attending')}
              >
                <SelectTrigger className="w-[180px] border-wedding-gold/30 bg-black text-wedding-lilac">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-wedding-gold" />
                    <SelectValue placeholder="Filter by status" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-black border-wedding-gold/30">
                  <SelectItem value="all" className="text-wedding-lilac hover:bg-wedding-gold/10">All Responses</SelectItem>
                  <SelectItem value="attending" className="text-wedding-lilac hover:bg-wedding-gold/10">Attending Only</SelectItem>
                  <SelectItem value="not-attending" className="text-wedding-lilac hover:bg-wedding-gold/10">Not Attending Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 hover:border-red-500/50"
            onClick={handleClearData}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Data
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="border-wedding-gold/30 text-wedding-gold hover:bg-wedding-gold/10">
                <Download className="h-4 w-4 mr-2" />
                Export
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 bg-black border-wedding-gold/30">
              <div className="flex flex-col gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="justify-start text-wedding-lilac hover:bg-wedding-gold/10 hover:text-wedding-gold"
                  onClick={exportToExcel}
                >
                  Export to Excel
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="justify-start text-wedding-lilac hover:bg-wedding-gold/10 hover:text-wedding-gold"
                  onClick={exportToCSV}
                >
                  Export to CSV
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
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
                <TableHead className="text-wedding-gold">Name</TableHead>
                <TableHead className="text-wedding-gold">Email</TableHead>
                <TableHead className="text-wedding-gold">Phone</TableHead>
                <TableHead className="text-wedding-gold">Additional Guests</TableHead>
                <TableHead className="text-wedding-gold">Total</TableHead>
                <TableHead className="text-wedding-gold">Status</TableHead>
                <TableHead className="text-wedding-gold">Aso Ebi</TableHead>
                <TableHead className="text-wedding-gold">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rsvpData.map((rsvp) => (
                <TableRow key={rsvp.id}>
                  <TableCell className="font-medium text-white">{rsvp.guest_name}</TableCell>
                  <TableCell className="text-white">{rsvp.email || 'N/A'}</TableCell>
                  <TableCell className="text-white">{rsvp.phone || 'N/A'}</TableCell>
                  <TableCell className="text-white">
                    {rsvp.additional_guests_data && rsvp.additional_guests_data.length > 0 
                      ? rsvp.additional_guests_data.map(g => g.name).join(', ')
                      : 'None'
                    }
                  </TableCell>
                  <TableCell className="text-white">
                    <span className="text-white">{rsvp.number_of_guests}</span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      rsvp.is_attending 
                        ? "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400"
                        : "bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-400"
                    }`}>
                      {rsvp.is_attending ? "Attending" : "Not Attending"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      rsvp.wants_aso_ebi 
                        ? "bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-400"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400"
                    }`}>
                      {rsvp.wants_aso_ebi ? "Yes" : "No"}
                    </span>
                  </TableCell>
                  <TableCell className="text-white">{formatDate(rsvp.created_at)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default RSVPListView;
