import { v4 as uuidv4 } from 'uuid';
import { recordPageView } from '@/api/routes/analytics';

// Unique session ID for this user's visit
let sessionId = '';

// Initialize the analytics
export function initAnalytics(): void {
  // Generate or retrieve session ID
  if (!sessionId) {
    const storedSessionId = localStorage.getItem('weddingSessionId');
    if (storedSessionId) {
      sessionId = storedSessionId;
    } else {
      sessionId = uuidv4();
      localStorage.setItem('weddingSessionId', sessionId);
    }
  }
  
  // Track initial page view
  trackPageView(window.location.pathname);
  
  // Listen for route changes if using client-side routing
  window.addEventListener('popstate', () => {
    trackPageView(window.location.pathname);
  });
}

/**
 * Track a page view
 */
export function trackPageView(page: string): void {
  // Ensure we have a session ID
  if (!sessionId) {
    const storedSessionId = localStorage.getItem('weddingSessionId');
    sessionId = storedSessionId || uuidv4();
    if (!storedSessionId) {
      localStorage.setItem('weddingSessionId', sessionId);
    }
  }
  
  // Get browser and device info
  const userAgent = navigator.userAgent;
  const isMobile = /Mobile|Android|iPhone|iPad|iPod/i.test(userAgent);
  const isTablet = /Tablet|iPad/i.test(userAgent);
  
  let deviceType = 'desktop';
  if (isMobile && !isTablet) {
    deviceType = 'mobile';
  } else if (isTablet) {
    deviceType = 'tablet';
  }
  
  // Get the referrer
  const referrer = document.referrer;
  
  // Send the page view data to our API
  try {
    recordPageView({
      page,
      referrer,
      browser: navigator.userAgent,
      device: deviceType,
      sessionId
    });
  } catch (error) {
    console.error('Failed to record page view:', error);
  }
}

/**
 * Initialize mock analytics data for demo purposes
 */
export function initMockAnalytics(): void {
  console.log('Mock analytics initialized!');
  sessionId = uuidv4();
  
  // Log a page view for the demo
  console.log(`Tracked page view: ${window.location.pathname}`);
} 