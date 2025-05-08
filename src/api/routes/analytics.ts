import { supabase } from '@/integrations/supabase/client';

export interface PageView {
  id: string;
  page: string;
  user_session_id: string;
  created_at: string;
  referrer: string | null;
  browser: string | null;
  device: string | null;
}

export interface VisitorData {
  date: string;
  visitors: number;
  pageViews: number;
}

export interface DeviceBreakdown {
  mobile: number;
  desktop: number;
  tablet: number;
  other: number;
}

export interface PageViewData {
  page: string;
  views: number;
  percentage: number;
}

export interface AnalyticsResponse {
  totalVisitors: number;
  totalPageViews: number;
  dailyVisitors: VisitorData[];
  deviceBreakdown: DeviceBreakdown;
  topPages: PageViewData[];
}

/**
 * Add a new page view to the analytics data
 */
export async function recordPageView(pageData: {
  page: string;
  referrer?: string;
  browser?: string;
  device?: string;
  sessionId: string;
}) {
  try {
    const { data, error } = await supabase
      .from('page_views')
      .insert({
        page: pageData.page,
        user_session_id: pageData.sessionId,
        referrer: pageData.referrer || null,
        browser: pageData.browser || null,
        device: pageData.device || null
      });
    
    if (error) {
      console.error('Error recording page view:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Exception recording page view:', error);
    return false;
  }
}

/**
 * Fetch analytics data with optional date range filtering
 */
export async function fetchAnalytics(startDate?: string, endDate?: string) {
  try {
    // Build the query with date filtering if provided
    let query = supabase.from('page_views').select('*');
    
    if (startDate) {
      query = query.gte('created_at', startDate);
    }
    
    if (endDate) {
      query = query.lte('created_at', endDate);
    }
    
    // Execute the query
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching analytics data:', error);
      throw new Error(`Failed to fetch analytics data: ${error.message}`);
    }
    
    const pageViews = data || [];
    
    // Get unique visitor count by session ID
    const uniqueVisitors = new Set(pageViews.map(view => view.user_session_id)).size;
    
    // Calculate daily visitor data for the past 30 days
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const dailyData = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(thirtyDaysAgo.getTime() + i * 24 * 60 * 60 * 1000);
      const dateString = date.toISOString().split('T')[0];
      
      const dayViews = pageViews.filter(view => {
        const viewDate = view.created_at.split('T')[0];
        return viewDate === dateString;
      });
      
      const uniqueDayVisitors = new Set(dayViews.map(view => view.user_session_id)).size;
      
      return {
        date: dateString,
        visitors: uniqueDayVisitors,
        pageViews: dayViews.length
      };
    });
    
    // Calculate device breakdown
    const deviceCounts = {
      mobile: 0,
      desktop: 0,
      tablet: 0,
      other: 0
    };
    
    pageViews.forEach(view => {
      const device = view.device?.toLowerCase() || '';
      if (device.includes('mobile') || device.includes('phone')) {
        deviceCounts.mobile++;
      } else if (device.includes('desktop')) {
        deviceCounts.desktop++;
      } else if (device.includes('tablet') || device.includes('ipad')) {
        deviceCounts.tablet++;
      } else {
        deviceCounts.other++;
      }
    });
    
    // Calculate top pages
    const pageViewMap = new Map<string, number>();
    
    pageViews.forEach(view => {
      const page = view.page;
      const currentCount = pageViewMap.get(page) || 0;
      pageViewMap.set(page, currentCount + 1);
    });
    
    const topPages = Array.from(pageViewMap.entries())
      .map(([page, views]) => ({
        page,
        views,
        percentage: (views / pageViews.length) * 100
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);
    
    return {
      totalVisitors: uniqueVisitors,
      totalPageViews: pageViews.length,
      dailyVisitors: dailyData,
      deviceBreakdown: deviceCounts,
      topPages
    };
  } catch (error) {
    console.error('Exception when fetching analytics data:', error);
    throw new Error('An unexpected error occurred when fetching analytics data');
  }
}

/**
 * For demo purposes, generate mock analytics data
 */
export function generateMockAnalytics(): AnalyticsResponse {
  // Generate random visitor counts for the past 30 days
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  const dailyVisitors = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(thirtyDaysAgo.getTime() + i * 24 * 60 * 60 * 1000);
    const dateString = date.toISOString().split('T')[0];
    const visitors = Math.floor(Math.random() * 50) + 20; // Random between 20-70
    const pageViews = visitors + Math.floor(Math.random() * 50); // More page views than visitors
    
    return {
      date: dateString,
      visitors,
      pageViews
    };
  });
  
  // Calculate totals
  const totalVisitors = dailyVisitors.reduce((sum, day) => sum + day.visitors, 0);
  const totalPageViews = dailyVisitors.reduce((sum, day) => sum + day.pageViews, 0);
  
  // Mock device breakdown
  const deviceBreakdown = {
    mobile: Math.floor(totalVisitors * 0.6), // 60% mobile
    desktop: Math.floor(totalVisitors * 0.3), // 30% desktop
    tablet: Math.floor(totalVisitors * 0.08), // 8% tablet
    other: Math.floor(totalVisitors * 0.02) // 2% other
  };
  
  // Mock top pages
  const topPages = [
    { page: '/', views: Math.floor(totalPageViews * 0.4), percentage: 40 },
    { page: '/rsvp-form', views: Math.floor(totalPageViews * 0.25), percentage: 25 },
    { page: '/gallery', views: Math.floor(totalPageViews * 0.15), percentage: 15 },
    { page: '/schedule', views: Math.floor(totalPageViews * 0.1), percentage: 10 },
    { page: '/directions', views: Math.floor(totalPageViews * 0.05), percentage: 5 },
    { page: '/registry', views: Math.floor(totalPageViews * 0.03), percentage: 3 },
    { page: '/accommodation', views: Math.floor(totalPageViews * 0.02), percentage: 2 }
  ];
  
  return {
    totalVisitors,
    totalPageViews,
    dailyVisitors,
    deviceBreakdown,
    topPages
  };
} 