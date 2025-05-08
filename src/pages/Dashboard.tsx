import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchRsvpResponses, fetchRsvpStatistics, RsvpResponse } from '@/api/routes/rsvp';
import { generateMockAnalytics, AnalyticsResponse } from '@/api/routes/analytics';
import { toast } from 'sonner';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatCards from '@/components/dashboard/StatCards';
import RecentRSVPs from '@/components/dashboard/RecentRSVPs';
import RSVPListView from '@/components/dashboard/RSVPListView';
import AnalyticsView from '@/components/dashboard/AnalyticsView';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [rsvpData, setRsvpData] = useState<RsvpResponse[]>([]);
  const [rsvpStats, setRsvpStats] = useState({
    total: 0,
    attending: 0,
    notAttending: 0,
    totalGuests: 0,
    dailyRsvps: []
  });
  const [analyticsData, setAnalyticsData] = useState<AnalyticsResponse | null>(null);
  const [attendanceFilter, setAttendanceFilter] = useState<'all' | 'attending' | 'not-attending'>('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filterRsvpsByDate = (data: RsvpResponse[]) => {
    if (dateFilter === 'all') return data;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date(today);
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    return data.filter(rsvp => {
      const rsvpDate = new Date(rsvp.created_at);
      switch (dateFilter) {
        case 'today':
          return rsvpDate >= today;
        case 'week':
          return rsvpDate >= weekAgo;
        case 'month':
          return rsvpDate >= monthAgo;
        default:
          return true;
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, [dateFilter, attendanceFilter]);
  
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch RSVP responses first
      const responses = await fetchRsvpResponses({ attendanceStatus: attendanceFilter });
      if (!responses) {
        setRsvpData([]);
      } else {
        const filteredResponses = filterRsvpsByDate(responses);
        setRsvpData(filteredResponses);
      }

      // Fetch statistics
      const stats = await fetchRsvpStatistics();
      if (!stats) {
        setRsvpStats({
          total: 0,
          attending: 0,
          notAttending: 0,
          totalGuests: 0,
          dailyRsvps: []
        });
      } else {
        setRsvpStats(stats);
      }

      // Generate analytics data
      const analytics = await generateMockAnalytics();
      setAnalyticsData(analytics);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError(error instanceof Error ? error.message : 'Failed to load dashboard data');
      toast.error('Failed to load dashboard data. Please try refreshing.');
      
      // Set default values for all states
      setRsvpData([]);
      setRsvpStats({
        total: 0,
        attending: 0,
        notAttending: 0,
        totalGuests: 0,
        dailyRsvps: []
      });
      setAnalyticsData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchData();
  };

  const handleFilterChange = (value: 'all' | 'attending' | 'not-attending') => {
    setAttendanceFilter(value);
  };

  const handleDateFilterChange = (value: 'all' | 'today' | 'week' | 'month') => {
    setDateFilter(value);
  };
  
  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Wedding-themed decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-wedding-gold to-transparent opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-wedding-gold to-transparent opacity-30"></div>
          <div className="absolute top-1/4 left-1/3 w-32 h-32 rounded-full bg-wedding-gold/5 blur-xl"></div>
          <div className="absolute top-2/3 right-1/4 w-48 h-48 rounded-full bg-wedding-lilac/5 blur-xl"></div>
          <div className="absolute bottom-1/4 left-1/2 w-40 h-40 rounded-full bg-wedding-gold/5 blur-xl"></div>
        </div>
      </div>
      
      <div className="relative z-10">
        <DashboardHeader 
          onRefresh={handleRefresh}
          isLoading={isLoading}
        />
        
        {error ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-wedding-gold text-black rounded hover:bg-wedding-gold/80 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-black border border-wedding-gold/30">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-wedding-gold data-[state=active]:text-black data-[state=active]:shadow-none data-[state=active]:border-wedding-gold text-wedding-gold hover:text-wedding-lilac"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="rsvps" 
                className="data-[state=active]:bg-wedding-gold data-[state=active]:text-black data-[state=active]:shadow-none data-[state=active]:border-wedding-gold text-wedding-gold hover:text-wedding-lilac"
              >
                RSVPs
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="data-[state=active]:bg-wedding-gold data-[state=active]:text-black data-[state=active]:shadow-none data-[state=active]:border-wedding-gold text-wedding-gold hover:text-wedding-lilac"
              >
                Analytics
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <StatCards 
                totalRsvps={rsvpStats.total}
                attendingGuests={rsvpStats.totalGuests}
                notAttendingRsvps={rsvpStats.notAttending}
                totalVisitors={analyticsData?.totalVisitors || 0}
              />
              
              {rsvpData.length === 0 && !isLoading ? (
                <div className="text-center p-8">
                  <p className="text-wedding-gold mb-2">No RSVP responses yet</p>
                  <p className="text-gray-400">Responses will appear here once guests start RSVPing</p>
                </div>
              ) : (
                <RecentRSVPs 
                  isLoading={isLoading}
                  rsvpData={rsvpData.slice(0, 5)} 
                />
              )}
            </TabsContent>
            
            <TabsContent value="rsvps" className="space-y-6">
              <RSVPListView 
                isLoading={isLoading}
                rsvpData={rsvpData}
                onFilterChange={handleFilterChange}
                onDateFilterChange={handleDateFilterChange}
                currentFilter={attendanceFilter}
                currentDateFilter={dateFilter}
              />
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-6">
              {analyticsData && (
                <AnalyticsView 
                  analyticsData={analyticsData}
                />
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
