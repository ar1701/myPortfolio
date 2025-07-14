/**
 * Advanced Image Optimization with WebP Support
 * Provides progressive image loading and format detection
 */

class ImageOptimizer {
  constructor() {
    this.webpSupported = this.checkWebPSupport();
    this.init();
  }

  checkWebPSupport() {
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        resolve(webP.height === 2);
      };
      webP.src =
        "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    });
  }

  async init() {
    const isWebPSupported = await this.webpSupported;
    this.setupLazyLoading();
    this.setupProgressiveLoading();
    this.preloadCriticalImages();
  }

  setupLazyLoading() {
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            this.loadImage(img);
            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: "50px 0px",
        threshold: 0.01,
      }
    );

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }

  loadImage(img) {
    const placeholder = img.previousElementSibling;

    img.onload = () => {
      img.style.opacity = "1";
      if (placeholder && placeholder.classList.contains("image-placeholder")) {
        placeholder.style.opacity = "0";
        setTimeout(() => placeholder.remove(), 300);
      }
    };

    img.onerror = () => {
      console.warn(`Failed to load image: ${img.dataset.src}`);
      img.style.opacity = "0.5";
    };

    img.src = img.dataset.src;
    img.removeAttribute("data-src");
  }

  setupProgressiveLoading() {
    // Add blur-to-clear effect for images
    const style = document.createElement("style");
    style.textContent = `
            .progressive-image {
                transition: opacity 0.3s ease;
                opacity: 0;
            }
            
            .progressive-image.loaded {
                opacity: 1;
            }
            
            .image-placeholder {
                background: linear-gradient(90deg, #334155 25%, #475569 50%, #334155 75%);
                background-size: 200% 100%;
                animation: shimmer 1.5s infinite;
                border-radius: var(--border-radius);
            }
            
            @keyframes shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
            }
        `;
    document.head.appendChild(style);
  }

  preloadCriticalImages() {
    const criticalImages = [
      "./assets/images/Ayush_Raj_CodeCrew.png",
      "./assets/images/profile-pic.jpg",
    ];

    criticalImages.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    });
  }

  static createPlaceholder(width, height) {
    const placeholder = document.createElement("div");
    placeholder.className = "image-placeholder";
    placeholder.style.width = width + "px";
    placeholder.style.height = height + "px";
    placeholder.style.position = "absolute";
    placeholder.style.top = "0";
    placeholder.style.left = "0";
    return placeholder;
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ImageOptimizer();
});
