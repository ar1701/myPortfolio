/**
 * Advanced Performance Monitoring & Optimization Suite
 * Comprehensive tracking and real-time optimization for portfolio website
 */

class AdvancedPerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.observers = [];
    this.resourceTimings = new Map();
    this.optimizations = new Set();
    this.init();
  }

  init() {
    this.setupResourceTiming();
    this.setupIntersectionObserver();

    // Wait for page to fully load before measuring
    window.addEventListener("load", () => {
      this.measurePerformance();
      this.setupContinuousMonitoring();
      this.applyOptimizations();
      this.schedulePerformanceReports();
    });
  }

  setupResourceTiming() {
    if ("PerformanceObserver" in window) {
      const resourceObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          this.resourceTimings.set(entry.name, {
            duration: entry.duration,
            size: entry.transferSize || 0,
            type: this.getResourceType(entry.name),
            startTime: entry.startTime,
          });
        });
        this.analyzeResourcePerformance();
      });
      resourceObserver.observe({ entryTypes: ["resource"] });
      this.observers.push(resourceObserver);
    }
  }

  setupIntersectionObserver() {
    // Monitor element visibility for lazy loading optimization
    this.visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.preloadNearbyContent(entry.target);
          }
        });
      },
      { rootMargin: "200px" }
    );

    // Observe key sections
    document
      .querySelectorAll("section, .project-card, .skill-item")
      .forEach((el) => {
        this.visibilityObserver.observe(el);
      });
  }

  preloadNearbyContent(element) {
    // Preload images and resources that will likely be needed soon
    const nearbyImages = element.querySelectorAll("img[data-src]");
    nearbyImages.forEach((img) => {
      if (!img.src && img.dataset.src) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = img.dataset.src;
        document.head.appendChild(link);
      }
    });
  }

  getResourceType(url) {
    if (url.match(/\.(css)$/i)) return "stylesheet";
    if (url.match(/\.(js)$/i)) return "script";
    if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) return "image";
    if (url.match(/\.(woff|woff2|ttf|otf)$/i)) return "font";
    if (url.includes("font")) return "font";
    return "other";
  }

  measurePerformance() {
    if ("performance" in window) {
      const navigation = performance.getEntriesByType("navigation")[0];
      const paint = performance.getEntriesByType("paint");

      this.metrics = {
        // Core Web Vitals
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded:
          navigation.domContentLoadedEventEnd -
          navigation.domContentLoadedEventStart,
        firstContentfulPaint:
          paint.find((entry) => entry.name === "first-contentful-paint")
            ?.startTime || 0,

        // Detailed Navigation Timing
        pageLoadTime: navigation.loadEventEnd - navigation.fetchStart,
        dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
        tcpConnection: navigation.connectEnd - navigation.connectStart,
        serverResponse: navigation.responseEnd - navigation.requestStart,
        domProcessing: navigation.domComplete - navigation.domLoading,

        // Resource Analysis
        totalResources: performance.getEntriesByType("resource").length,
        imageResources: performance
          .getEntriesByType("resource")
          .filter((r) => this.getResourceType(r.name) === "image").length,
        scriptResources: performance
          .getEntriesByType("resource")
          .filter((r) => this.getResourceType(r.name) === "script").length,
        styleResources: performance
          .getEntriesByType("resource")
          .filter((r) => this.getResourceType(r.name) === "stylesheet").length,

        // Memory & Connection
        memoryUsage: this.getMemoryUsage(),
        connectionType: this.getConnectionType(),

        // Custom Metrics
        criticalResourcesLoaded: this.countCriticalResources(),
        renderBlockingResources: this.countRenderBlockingResources(),

        // Timestamp
        timestamp: new Date().toISOString(),
      };

      this.calculatePerformanceScore();
      this.reportMetrics();
    }
  }

  countCriticalResources() {
    const critical = performance
      .getEntriesByType("resource")
      .filter(
        (r) =>
          r.name.includes("styles.css") ||
          r.name.includes("main.js") ||
          r.name.includes("profile") ||
          r.name.includes("fonts.googleapis.com")
      );
    return critical.length;
  }

  countRenderBlockingResources() {
    return performance
      .getEntriesByType("resource")
      .filter(
        (r) =>
          (this.getResourceType(r.name) === "stylesheet" ||
            this.getResourceType(r.name) === "script") &&
          r.startTime < this.metrics.firstContentfulPaint
      ).length;
  }

  analyzeResourcePerformance() {
    const slowResources = Array.from(this.resourceTimings.entries())
      .filter(([url, timing]) => timing.duration > 500)
      .sort((a, b) => b[1].duration - a[1].duration);

    if (slowResources.length > 0) {
      this.suggestResourceOptimizations(slowResources);
    }
  }

  suggestResourceOptimizations(slowResources) {
    if (this.isDevelopment()) {
      console.group("🐌 Slow Resource Analysis");
      slowResources.slice(0, 5).forEach(([url, timing]) => {
        console.log(
          `  ${timing.type}: ${url
            .split("/")
            .pop()} - ${timing.duration.toFixed(2)}ms (${this.formatBytes(
            timing.size
          )})`
        );
      });
      console.groupEnd();
    }
  }

  formatBytes(bytes) {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  getMemoryUsage() {
    if ("memory" in performance) {
      return {
        used: Math.round(performance.memory.usedJSHeapSize / 1048576), // MB
        total: Math.round(performance.memory.totalJSHeapSize / 1048576), // MB
        limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576), // MB
      };
    }
    return null;
  }

  getConnectionType() {
    if ("connection" in navigator) {
      return {
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt,
        saveData: navigator.connection.saveData,
      };
    }
    return null;
  }

  setupContinuousMonitoring() {
    if ("PerformanceObserver" in window) {
      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.largestContentfulPaint = lastEntry.startTime;
        this.updatePerformanceScore();
      });
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
      this.observers.push(lcpObserver);

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.metrics.firstInputDelay =
            entry.processingStart - entry.startTime;
          this.updatePerformanceScore();
        });
      });
      fidObserver.observe({ entryTypes: ["first-input"] });
      this.observers.push(fidObserver);

      // Cumulative Layout Shift
      let clsValue = 0;
      let clsEntries = [];
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            clsEntries.push(entry);
          }
        });
        this.metrics.cumulativeLayoutShift = clsValue;
        this.metrics.layoutShiftEntries = clsEntries.length;
        this.updatePerformanceScore();
      });
      clsObserver.observe({ entryTypes: ["layout-shift"] });
      this.observers.push(clsObserver);
    }

    // Monitor frame rate and responsiveness
    this.monitorFrameRate();
    this.monitorScrollPerformance();
  }

  monitorFrameRate() {
    let lastTime = performance.now();
    let frameCount = 0;
    const frameRates = [];

    const countFrames = (currentTime) => {
      frameCount++;
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        frameRates.push(fps);

        if (frameRates.length > 10) {
          const avgFps =
            frameRates.reduce((a, b) => a + b, 0) / frameRates.length;
          this.metrics.averageFPS = Math.round(avgFps);
          this.metrics.minFPS = Math.min(...frameRates);
          frameRates.splice(0, 5); // Keep last 5 measurements
        }

        frameCount = 0;
        lastTime = currentTime;
      }
      requestAnimationFrame(countFrames);
    };

    requestAnimationFrame(countFrames);
  }

  monitorScrollPerformance() {
    let scrollStart = null;
    let isScrolling = false;

    window.addEventListener(
      "scroll",
      () => {
        if (!isScrolling) {
          scrollStart = performance.now();
          isScrolling = true;
        }

        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
          if (scrollStart) {
            const scrollDuration = performance.now() - scrollStart;
            this.metrics.averageScrollDuration = this.metrics
              .averageScrollDuration
              ? (this.metrics.averageScrollDuration + scrollDuration) / 2
              : scrollDuration;
          }
          isScrolling = false;
        }, 100);
      },
      { passive: true }
    );
  }

  applyOptimizations() {
    this.optimizeImages();
    this.optimizeFonts();
    this.optimizeAnimations();
    this.enableResourceHints();
  }

  optimizeImages() {
    // Add intersection observer for lazy loading if not already present
    const lazyImages = document.querySelectorAll(
      "img[data-src]:not([data-optimized])"
    );
    if (lazyImages.length > 0) {
      const imageObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src;
              img.removeAttribute("data-src");
              img.setAttribute("data-optimized", "true");
              imageObserver.unobserve(img);
            }
          });
        },
        { rootMargin: "50px" }
      );

      lazyImages.forEach((img) => imageObserver.observe(img));
      this.optimizations.add("lazy-loading");
    }
  }

  optimizeFonts() {
    // Add font-display: swap to improve perceived performance
    const fontLinks = document.querySelectorAll(
      'link[href*="fonts.googleapis.com"]'
    );
    fontLinks.forEach((link) => {
      if (!link.href.includes("display=swap")) {
        link.href += "&display=swap";
        this.optimizations.add("font-display-swap");
      }
    });
  }

  optimizeAnimations() {
    // Reduce animations for users who prefer reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.style.setProperty(
        "--animation-duration",
        "0.01ms"
      );
      this.optimizations.add("reduced-motion");
    }
  }

  enableResourceHints() {
    // Add resource hints for better loading performance
    const hints = [
      { rel: "dns-prefetch", href: "//fonts.googleapis.com" },
      { rel: "dns-prefetch", href: "//fonts.gstatic.com" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: true,
      },
    ];

    hints.forEach((hint) => {
      if (!document.querySelector(`link[href="${hint.href}"]`)) {
        const link = document.createElement("link");
        Object.assign(link, hint);
        document.head.appendChild(link);
        this.optimizations.add(
          `${hint.rel}-${hint.href.replace(/[^a-zA-Z]/g, "")}`
        );
      }
    });
  }

  calculatePerformanceScore() {
    let score = 100;

    // Core Web Vitals scoring (Google Lighthouse style)
    if (this.metrics.firstContentfulPaint > 1800) score -= 15;
    else if (this.metrics.firstContentfulPaint > 3000) score -= 25;

    if (this.metrics.largestContentfulPaint > 2500) score -= 15;
    else if (this.metrics.largestContentfulPaint > 4000) score -= 25;

    if (this.metrics.firstInputDelay > 100) score -= 15;
    else if (this.metrics.firstInputDelay > 300) score -= 25;

    if (this.metrics.cumulativeLayoutShift > 0.1) score -= 15;
    else if (this.metrics.cumulativeLayoutShift > 0.25) score -= 25;

    // Additional performance factors
    if (this.metrics.pageLoadTime > 3000) score -= 10;
    if (this.metrics.totalResources > 50) score -= 5;
    if (this.metrics.averageFPS && this.metrics.averageFPS < 30) score -= 10;
    if (this.metrics.renderBlockingResources > 5) score -= 5;

    this.metrics.performanceScore = Math.max(0, Math.round(score));
    return this.metrics.performanceScore;
  }

  updatePerformanceScore() {
    this.calculatePerformanceScore();
    this.updatePerformanceBadge();
  }

  updatePerformanceBadge() {
    const existingBadge = document.getElementById("performance-badge");
    if (existingBadge && this.metrics.performanceScore) {
      const score = this.metrics.performanceScore;
      existingBadge.textContent = `Performance: ${score}/100 ${this.getGradeEmoji(
        score
      )}`;
      existingBadge.style.background = this.getScoreGradient(score);
    }
  }

  schedulePerformanceReports() {
    // Report every 30 seconds in development
    if (this.isDevelopment()) {
      setInterval(() => {
        this.reportMetrics();
      }, 30000);
    }
  }

  isDevelopment() {
    return (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname.includes("192.168")
    );
  }

  reportMetrics() {
    if (this.isDevelopment()) {
      console.group(
        `🚀 Performance Dashboard - Score: ${
          this.metrics.performanceScore
        }/100 ${this.getGradeEmoji(this.metrics.performanceScore)}`
      );

      console.log("📊 Core Web Vitals:");
      console.log(
        `  FCP: ${(this.metrics.firstContentfulPaint || 0).toFixed(
          2
        )}ms ${this.getMetricEmoji("FCP", this.metrics.firstContentfulPaint)}`
      );
      console.log(
        `  LCP: ${(this.metrics.largestContentfulPaint || 0).toFixed(
          2
        )}ms ${this.getMetricEmoji("LCP", this.metrics.largestContentfulPaint)}`
      );
      console.log(
        `  FID: ${(this.metrics.firstInputDelay || 0).toFixed(
          2
        )}ms ${this.getMetricEmoji("FID", this.metrics.firstInputDelay)}`
      );
      console.log(
        `  CLS: ${(this.metrics.cumulativeLayoutShift || 0).toFixed(
          4
        )} ${this.getMetricEmoji("CLS", this.metrics.cumulativeLayoutShift)}`
      );

      console.log("\n⏱️ Loading Performance:");
      console.log(
        `  Page Load: ${(this.metrics.pageLoadTime || 0).toFixed(2)}ms`
      );
      console.log(
        `  DOM Processing: ${(this.metrics.domProcessing || 0).toFixed(2)}ms`
      );
      console.log(
        `  Server Response: ${(this.metrics.serverResponse || 0).toFixed(2)}ms`
      );

      console.log("\n📦 Resource Analysis:");
      console.log(
        `  Total: ${this.metrics.totalResources} | Images: ${this.metrics.imageResources} | Scripts: ${this.metrics.scriptResources} | Styles: ${this.metrics.styleResources}`
      );
      console.log(
        `  Critical: ${this.metrics.criticalResourcesLoaded} | Render Blocking: ${this.metrics.renderBlockingResources}`
      );

      console.log("\n🎯 Performance Metrics:");
      console.log(
        `  Average FPS: ${this.metrics.averageFPS || "Calculating..."}${
          this.metrics.minFPS ? ` (Min: ${this.metrics.minFPS})` : ""
        }`
      );
      console.log(
        `  Scroll Performance: ${(
          this.metrics.averageScrollDuration || 0
        ).toFixed(2)}ms`
      );

      if (this.metrics.memoryUsage) {
        console.log("\n🧠 Memory Usage:");
        console.log(
          `  Used: ${this.metrics.memoryUsage.used}MB / ${
            this.metrics.memoryUsage.total
          }MB (${Math.round(
            (this.metrics.memoryUsage.used / this.metrics.memoryUsage.total) *
              100
          )}%)`
        );
      }

      if (this.metrics.connectionType) {
        console.log("\n🌐 Connection:");
        console.log(
          `  Type: ${this.metrics.connectionType.effectiveType} | Speed: ${this.metrics.connectionType.downlink}Mbps | RTT: ${this.metrics.connectionType.rtt}ms`
        );
        if (this.metrics.connectionType.saveData) {
          console.log("  📱 Data Saver: Enabled");
        }
      }

      if (this.optimizations.size > 0) {
        console.log("\n✅ Active Optimizations:");
        this.optimizations.forEach((opt) =>
          console.log(`  • ${opt.replace(/-/g, " ")}`)
        );
      }

      console.groupEnd();

      // Store metrics for analysis
      localStorage.setItem(
        "portfolioPerformanceAdvanced",
        JSON.stringify(this.metrics)
      );
    }

    // Show performance badge
    this.showPerformanceBadge();
  }

  getMetricEmoji(metric, value) {
    if (!value) return "⏳";

    const thresholds = {
      FCP: { good: 1800, poor: 3000 },
      LCP: { good: 2500, poor: 4000 },
      FID: { good: 100, poor: 300 },
      CLS: { good: 0.1, poor: 0.25 },
    };

    const threshold = thresholds[metric];
    if (!threshold) return "";

    if (value <= threshold.good) return "✅";
    if (value <= threshold.poor) return "⚠️";
    return "❌";
  }

  getGradeEmoji(score) {
    if (score >= 90) return "🏆";
    if (score >= 80) return "🥇";
    if (score >= 70) return "🥈";
    if (score >= 60) return "🥉";
    return "📈";
  }

  getScoreGradient(score) {
    if (score >= 90) return "linear-gradient(135deg, #10b981, #3b82f6)";
    if (score >= 80) return "linear-gradient(135deg, #f59e0b, #10b981)";
    if (score >= 70) return "linear-gradient(135deg, #f59e0b, #ef4444)";
    return "linear-gradient(135deg, #ef4444, #dc2626)";
  }

  showPerformanceBadge() {
    if (!this.isDevelopment()) return;

    const existingBadge = document.getElementById("performance-badge");
    if (existingBadge) return;

    const score = this.metrics.performanceScore || 0;
    const badge = document.createElement("div");
    badge.id = "performance-badge";
    badge.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${this.getScoreGradient(score)};
            color: white;
            padding: 8px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            z-index: 10000;
            animation: slideInRight 0.5s ease-out;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        `;

    badge.textContent = `Performance: ${score}/100 ${this.getGradeEmoji(
      score
    )}`;
    badge.title = "Click to view detailed performance metrics";

    badge.addEventListener("click", () => {
      this.reportMetrics();
    });

    badge.addEventListener("mouseenter", () => {
      badge.style.transform = "scale(1.05)";
    });

    badge.addEventListener("mouseleave", () => {
      badge.style.transform = "scale(1)";
    });

    document.body.appendChild(badge);

    // Add animation keyframes
    const style = document.createElement("style");
    style.textContent = `
            @keyframes slideInRight {
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
  }

  destroy() {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
    this.resourceTimings.clear();
    this.optimizations.clear();

    if (this.visibilityObserver) {
      this.visibilityObserver.disconnect();
    }

    const badge = document.getElementById("performance-badge");
    if (badge) badge.remove();
  }
}

// Initialize advanced performance monitoring
document.addEventListener("DOMContentLoaded", () => {
  window.performanceMonitor = new AdvancedPerformanceMonitor();
});

// Cleanup on page unload
window.addEventListener("beforeunload", () => {
  if (window.performanceMonitor) {
    window.performanceMonitor.destroy();
  }
});
