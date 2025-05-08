import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

export type RsvpResponse = Database['public']['Tables']['rsvp_responses']['Row'] & {
  additional_guests?: Array<{
    guest_name: string;
  }>;
};

interface RsvpQueryParams {
  attendanceStatus?: 'attending' | 'not-attending' | 'all';
  startDate?: string;
  endDate?: string;
  sortBy?: 'date' | 'name' | 'guests';
  sortDirection?: 'asc' | 'desc';
}

/**
 * Retrieve RSVP responses with optional filtering
 */
export async function fetchRsvpResponses({
  attendanceStatus = 'all',
  startDate,
  endDate,
  sortBy = 'date',
  sortDirection = 'desc'
}: RsvpQueryParams = {}) {
  try {
    // Start building the query - no need to join with additional_guests anymore
    let query = supabase
      .from('rsvp_responses')
      .select('*'); // Select all columns including additional_guests_data
    
    // Apply attendance filter
    if (attendanceStatus === 'attending') {
      query = query.eq('is_attending', true);
    } else if (attendanceStatus === 'not-attending') {
      query = query.eq('is_attending', false);
    }
    
    // Apply date filters if provided
    if (startDate) {
      query = query.gte('created_at', startDate);
    }
    
    if (endDate) {
      query = query.lte('created_at', endDate);
    }
    
    // Apply sorting
    let orderField: string;
    switch (sortBy) {
      case 'name':
        orderField = 'guest_name';
        break;
      case 'guests':
        orderField = 'number_of_guests';
        break;
      case 'date':
      default:
        orderField = 'created_at';
        break;
    }
    
    query = query.order(orderField, { ascending: sortDirection === 'asc' });
    
    // Execute the query
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching RSVP data:', error);
      throw new Error(`Failed to fetch RSVP data: ${error.message}`);
    }

    // Return empty array if no data
    if (!data || data.length === 0) {
      return [];
    }

    // Debug log
    console.log('RSVP Data from database:', JSON.stringify(data, null, 2));

    return data as RsvpResponse[];
  } catch (error) {
    console.error('Exception when fetching RSVP data:', error);
    throw error;
  }
}

interface RsvpStats {
  total: number;
  attending: number;
  notAttending: number;
  totalGuests: number;
  dailyRsvps: Array<{
    date: string;
    total: number;
    attending: number;
    notAttending: number;
  }>;
}

/**
 * Get aggregate statistics from RSVP data
 */
export async function fetchRsvpStatistics(): Promise<RsvpStats> {
  try {
    // Get all RSVP responses
    const { data, error } = await supabase
      .from('rsvp_responses')
      .select('*');
    
    if (error) {
      console.error('Error fetching RSVP statistics:', error);
      throw new Error(`Failed to fetch RSVP statistics: ${error.message}`);
    }
    
    // Return default stats if no data
    if (!data || data.length === 0) {
      return {
        total: 0,
        attending: 0,
        notAttending: 0,
        totalGuests: 0,
        dailyRsvps: Array.from({ length: 14 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (13 - i));
          return {
            date: date.toISOString().split('T')[0],
            total: 0,
            attending: 0,
            notAttending: 0
          };
        })
      };
    }
    
    const rsvps = data as RsvpResponse[];
    
    // Calculate statistics
    const totalRsvps = rsvps.length;
    const attendingRsvps = rsvps.filter(rsvp => rsvp.is_attending).length;
    const notAttendingRsvps = rsvps.filter(rsvp => !rsvp.is_attending).length;
    const totalGuests = rsvps
      .filter(rsvp => rsvp.is_attending)
      .reduce((sum, rsvp) => sum + (rsvp.number_of_guests || 0), 0);
    
    // Calculate daily statistics for the past 14 days
    const now = new Date();
    const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    
    const dailyRsvps = Array.from({ length: 14 }, (_, i) => {
      const date = new Date(fourteenDaysAgo.getTime() + i * 24 * 60 * 60 * 1000);
      const dateString = date.toISOString().split('T')[0];
      
      const dayRsvps = rsvps.filter(rsvp => {
        const rsvpDate = rsvp.created_at.split('T')[0];
        return rsvpDate === dateString;
      });
      
      return {
        date: dateString,
        total: dayRsvps.length,
        attending: dayRsvps.filter(rsvp => rsvp.is_attending).length,
        notAttending: dayRsvps.filter(rsvp => !rsvp.is_attending).length
      };
    });
    
    return {
      total: totalRsvps,
      attending: attendingRsvps,
      notAttending: notAttendingRsvps,
      totalGuests,
      dailyRsvps
    };
  } catch (error) {
    console.error('Exception when fetching RSVP statistics:', error);
    throw error; // Re-throw to handle in the component
  }
}

export const clearRsvpData = async () => {
  try {
    // Clear RSVP responses
    const { error: rsvpError } = await supabase
      .from('rsvp_responses')
      .delete()
      .neq('id', '0');

    if (rsvpError) {
      console.error('Error clearing RSVP responses:', rsvpError);
      return { success: false, error: rsvpError };
    }

    return { success: true };
  } catch (error) {
    console.error('Error in clearRsvpData:', error);
    return { success: false, error };
  }
}; 