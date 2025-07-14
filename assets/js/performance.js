// Performance monitoring script
document.addEventListener('DOMContentLoaded', function() {
    // Start performance monitoring
    performance.mark('dom-content-loaded');
    
    // Monitor page loading time
    window.addEventListener('load', function() {
        performance.mark('page-fully-loaded');
        
        // Calculate metrics
        const navigation = performance.getEntriesByType('navigation')[0];
        const domContentLoadedTime = navigation.domContentLoadedEventEnd - navigation.navigationStart;
        const pageLoadTime = navigation.loadEventEnd - navigation.navigationStart;
        
        console.log('Performance Metrics:');
        console.log('DOM Content Loaded:', domContentLoadedTime + 'ms');
        console.log('Page Fully Loaded:', pageLoadTime + 'ms');
        console.log('First Contentful Paint:', navigation.domContentLoadedEventEnd - navigation.fetchStart + 'ms');
        
        // Monitor resource loading
        const resources = performance.getEntriesByType('resource');
        console.log('Total Resources Loaded:', resources.length);
        
        let totalResourceTime = 0;
        resources.forEach(resource => {
            totalResourceTime += resource.responseEnd - resource.startTime;
        });
        console.log('Total Resource Load Time:', totalResourceTime + 'ms');
        
        // Create performance report
        const report = {
            domContentLoaded: domContentLoadedTime,
            pageLoad: pageLoadTime,
            resourceCount: resources.length,
            totalResourceTime: totalResourceTime,
            timestamp: new Date().toISOString()
        };
        
        // Store in localStorage for analysis
        localStorage.setItem('portfolioPerformance', JSON.stringify(report));
        
        // Show performance badge if load time is good
        if (pageLoadTime < 3000) {
            showPerformanceBadge('Fast Loading! ⚡');
        }
    });
});

function showPerformanceBadge(message) {
    const badge = document.createElement('div');
    badge.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #3b82f6);
        color: white;
        padding: 10px 15px;
        border-radius: 25px;
        font-size: 14px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.5s ease-out;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    badge.textContent = message;
    document.body.appendChild(badge);
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Remove badge after 3 seconds
    setTimeout(() => {
        badge.style.animation = 'slideIn 0.5s ease-out reverse';
        setTimeout(() => badge.remove(), 500);
    }, 3000);
}
