import { useEffect } from 'react';

/**
 * Performance monitoring component
 * Logs core web vitals to console (in production, send to analytics)
 */
export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    // Web Vitals monitoring
    const reportWebVitals = (metric: any) => {
      console.log(`[Performance] ${metric.name}:`, metric.value, metric.rating);
      
      // In production, send to analytics service:
      // window.gtag?.('event', metric.name, {
      //   value: Math.round(metric.value),
      //   metric_id: metric.id,
      //   metric_value: metric.value,
      //   metric_delta: metric.delta,
      // });
    };

    // Largest Contentful Paint (LCP) - should be < 2.5s
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const lcp = entry as PerformanceEntry & { renderTime: number; loadTime: number };
        reportWebVitals({
          name: 'LCP',
          value: lcp.renderTime || lcp.loadTime,
          rating: (lcp.renderTime || lcp.loadTime) < 2500 ? 'good' : 'needs-improvement',
          id: `lcp-${Date.now()}`,
          delta: 0,
        });
      }
    });

    try {
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      // LCP observer not supported
    }

    // First Input Delay (FID) - should be < 100ms
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fid = entry as PerformanceEventTiming;
        const delay = fid.processingStart - fid.startTime;
        reportWebVitals({
          name: 'FID',
          value: delay,
          rating: delay < 100 ? 'good' : 'needs-improvement',
          id: `fid-${Date.now()}`,
          delta: 0,
        });
      }
    });

    try {
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {
      // FID observer not supported
    }

    // Cumulative Layout Shift (CLS) - should be < 0.1
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const cls = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
        if (!cls.hadRecentInput) {
          clsValue += cls.value;
        }
      }
      reportWebVitals({
        name: 'CLS',
        value: clsValue,
        rating: clsValue < 0.1 ? 'good' : 'needs-improvement',
        id: `cls-${Date.now()}`,
        delta: 0,
      });
    });

    try {
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      // CLS observer not supported
    }

    // Page Load Time
    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (perfData) {
        const loadTime = perfData.loadEventEnd - perfData.fetchStart;
        console.log('[Performance] Page Load Time:', Math.round(loadTime), 'ms');
        
        const domReady = perfData.domContentLoadedEventEnd - perfData.fetchStart;
        console.log('[Performance] DOM Ready:', Math.round(domReady), 'ms');
      }
    });

    return () => {
      observer.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
}
