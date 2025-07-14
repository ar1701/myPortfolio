document.addEventListener("DOMContentLoaded", function () {
  // Loading screen management
  const loadingScreen = document.getElementById("loading-screen");
  const mainContent = document.getElementById("main-content");

  // Show loading screen initially
  if (loadingScreen && mainContent) {
    loadingScreen.style.display = "flex";
    mainContent.style.display = "none";

    // Simulate loading time and then show content
    setTimeout(() => {
      loadingScreen.style.opacity = "0";
      setTimeout(() => {
        loadingScreen.style.display = "none";
        mainContent.style.display = "block";

        // Initialize AOS after content is shown
        if (typeof AOS !== "undefined") {
          AOS.init({
            duration: 800,
            easing: "ease-out-cubic",
            once: true,
            offset: 100,
          });
        }
      }, 500);
    }, 1500);
  } else {
    // If no loading screen, initialize AOS immediately
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 800,
        easing: "ease-out-cubic",
        once: true,
        offset: 100,
      });
    }
  }

  // Mobile menu functionality
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    // Toggle mobile menu
    mobileMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = mobileMenu.classList.contains("active");
      
      mobileMenu.classList.toggle("active");
      mobileMenuBtn.classList.toggle("active");
      document.body.classList.toggle("menu-open");

      // Update accessibility attributes
      mobileMenuBtn.setAttribute("aria-expanded", !isOpen);
      
      // Add haptic feedback
      simulateHapticFeedback();

      // Animate hamburger menu with enhanced styling
      const spans = mobileMenuBtn.querySelectorAll("span");
      if (!isOpen) {
        spans[0].style.transform = "rotate(45deg) translate(6px, 6px)";
        spans[0].style.background = "var(--secondary-color)";
        spans[1].style.opacity = "0";
        spans[1].style.transform = "scale(0)";
        spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
        spans[2].style.background = "var(--secondary-color)";
      } else {
        spans[0].style.transform = "none";
        spans[0].style.background = "var(--text-primary)";
        spans[1].style.opacity = "1";
        spans[1].style.transform = "scale(1)";
        spans[2].style.transform = "none";
        spans[2].style.background = "var(--text-primary)";
      }
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (mobileMenu.classList.contains("active") && 
          !mobileMenu.contains(e.target) && 
          !mobileMenuBtn.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close menu on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
        closeMobileMenu();
      }
    });
  }

  // Close mobile menu when clicking on a link
  const mobileLinks = document.querySelectorAll(".mobile-link");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Navbar background change on scroll
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        navbar.style.background = "rgba(15, 23, 42, 0.98)";
        navbar.style.boxShadow = "0 4px 6px -1px rgb(0 0 0 / 0.1)";
      } else {
        navbar.style.background = "rgba(15, 23, 42, 0.95)";
        navbar.style.boxShadow = "none";
      }
    });
  }

  // Update last modified date
  const lastUpdatedElement = document.getElementById("last-updated");
  if (lastUpdatedElement) {
    const lastUpdated = new Date(document.lastModified);
    const formattedDate = lastUpdated.toLocaleDateString("en-GB");
    lastUpdatedElement.textContent = formattedDate;
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe all sections
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    observer.observe(section);
  });

  // Performance: Lazy load images
  const images = document.querySelectorAll('img[loading="lazy"]');
  if (images.length > 0) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // Add loading state to external links
  const externalLinks = document.querySelectorAll('a[href^="http"]');
  externalLinks.forEach((link) => {
    link.addEventListener("click", function () {
      this.style.opacity = "0.7";
      this.style.pointerEvents = "none";
      setTimeout(() => {
        this.style.opacity = "1";
        this.style.pointerEvents = "auto";
      }, 1000);
    });
  });

  // Typing animation for hero text
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = "";
    let i = 0;

    setTimeout(() => {
      const typeWriter = () => {
        if (i < text.length) {
          heroTitle.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        }
      };
      typeWriter();
    }, 2000); // Start after loading screen
  }

  // Parallax effect for hero section
  const heroSection = document.querySelector(".hero-section");
  if (heroSection) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      if (scrolled < window.innerHeight) {
        heroSection.style.transform = `translateY(${rate}px)`;
      }
    });
  }

  // Skill progress animation
  const skillCards = document.querySelectorAll(".skill-card");
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "fadeInUp 0.6s ease-out forwards";
        }
      });
    },
    { threshold: 0.3 }
  );

  skillCards.forEach((card) => {
    skillObserver.observe(card);
  });

  // Experience cards animation
  const experienceCards = document.querySelectorAll(".experience-card");
  experienceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
  });

  // Project cards hover effect enhancement
  const projectCards = document.querySelectorAll(".project-card, .group");
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Floating background elements
  const createFloatingElements = () => {
    const floatingBg = document.createElement("div");
    floatingBg.className = "floating-bg";

    const techIcons = [
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    ];

    for (let i = 0; i < 5; i++) {
      const img = document.createElement("img");
      img.src = techIcons[i % techIcons.length];
      img.style.left = Math.random() * 100 + "%";
      img.style.animationDelay = Math.random() * 20 + "s";
      img.style.width = "40px";
      img.style.height = "40px";
      img.style.opacity = "0.1";
      floatingBg.appendChild(img);
    }

    document.body.appendChild(floatingBg);
  };

  // Initialize floating elements after a delay
  setTimeout(createFloatingElements, 3000);

  // Contact form enhancement (if exists)
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // Add form submission logic here
      this.style.opacity = "0.7";
      setTimeout(() => {
        this.style.opacity = "1";
        alert("Message sent successfully!");
      }, 1000);
    });
  }

  // Theme switcher (optional)
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      localStorage.setItem(
        "theme",
        document.body.classList.contains("light-theme") ? "light" : "dark"
      );
    });

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.body.classList.add("light-theme");
    }
  }

  // Performance monitoring
  const performanceObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      if (entry.entryType === "measure") {
        console.log(`${entry.name}: ${entry.duration}ms`);
      }
    });
  });

  if (window.PerformanceObserver) {
    performanceObserver.observe({ entryTypes: ["measure"] });
  }
});

// Helper function to close mobile menu
function closeMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");

  if (mobileMenu && mobileMenuBtn) {
    mobileMenu.classList.remove("active");
    mobileMenuBtn.classList.remove("active");
    document.body.classList.remove("menu-open");
    mobileMenuBtn.setAttribute("aria-expanded", "false");
    
    // Reset hamburger animation
    const spans = mobileMenuBtn.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[0].style.background = "var(--text-primary)";
    spans[1].style.opacity = "1";
    spans[1].style.transform = "scale(1)";
    spans[2].style.transform = "none";
    spans[2].style.background = "var(--text-primary)";
  }
}

// Handle experience section toggle
function toggleDetails(id) {
  const details = document.getElementById(id);
  const button = details?.nextElementSibling;

  if (details && button) {
    if (details.style.display === "none" || details.style.display === "") {
      details.style.display = "block";
      details.style.animation = "fadeInUp 0.3s ease-out";
      button.textContent = "View Less";
    } else {
      details.style.display = "none";
      button.textContent = "View More";
    }
  }
}

// Optimize performance
window.addEventListener("load", () => {
  // Remove loading classes after page load
  document.body.classList.add("loaded");

  // Start any deferred animations
  const deferredElements = document.querySelectorAll("[data-defer]");
  deferredElements.forEach((el) => {
    el.classList.add("animate-in");
  });

  // Measure performance
  performance.mark("page-loaded");
});

// Handle resize events efficiently
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Refresh AOS on resize
    if (typeof AOS !== "undefined") {
      AOS.refresh();
    }

    // Recalculate any position-dependent elements
    const navbar = document.querySelector(".navbar");
    if (navbar && window.innerWidth > 768) {
      const mobileMenu = document.getElementById("mobile-menu");
      if (mobileMenu) {
        mobileMenu.classList.remove("active");
      }
    }
  }, 250);
});

// Error handling for images
document.addEventListener(
  "error",
  function (e) {
    if (e.target.tagName === "IMG") {
      e.target.style.display = "none";
      console.log("Image failed to load:", e.target.src);
    }
  },
  true
);

// Preload critical images
const preloadImages = [
  "./assets/images/Ayush_Raj_CodeCrew.png",
  "./assets/images/coder.gif",
];

preloadImages.forEach((src) => {
  const img = new Image();
  img.src = src;
});

// Service worker registration for PWA (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

// Touch/swipe support for mobile menu
let touchStartX = 0;
let touchEndX = 0;

// Add swipe gesture support
document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 100;
  const swipeDistance = touchEndX - touchStartX;
  
  // Swipe right to close menu (when menu is open)
  if (swipeDistance > swipeThreshold && mobileMenu.classList.contains('active')) {
    closeMobileMenu();
  }
  // Swipe left from right edge to open menu
  else if (swipeDistance < -swipeThreshold && !mobileMenu.classList.contains('active') && touchStartX > window.innerWidth - 50) {
    mobileMenu.classList.add('active');
    mobileMenuBtn.classList.add('active');
    document.body.classList.add('menu-open');
    
    // Animate hamburger
    const spans = mobileMenuBtn.querySelectorAll("span");
    spans[0].style.transform = "rotate(45deg) translate(6px, 6px)";
    spans[0].style.background = "var(--secondary-color)";
    spans[1].style.opacity = "0";
    spans[1].style.transform = "scale(0)";
    spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
    spans[2].style.background = "var(--secondary-color)";
  }
}

// Haptic feedback simulation for mobile devices
function simulateHapticFeedback() {
  if ('vibrate' in navigator) {
    navigator.vibrate(50); // Light vibration for 50ms
  }
}

// Enhanced mobile menu click feedback
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('touchstart', () => {
    mobileMenuBtn.style.transform = 'scale(0.95)';
  });

  mobileMenuBtn.addEventListener('touchend', () => {
    setTimeout(() => {
      mobileMenuBtn.style.transform = 'scale(1)';
    }, 100);
  });
}

// Add haptic feedback to all mobile links
const mobileLinks = document.querySelectorAll('.mobile-link');
mobileLinks.forEach(link => {
  link.addEventListener('touchstart', () => {
    simulateHapticFeedback();
    link.style.transform = 'translateX(15px) scale(0.98)';
  });

  link.addEventListener('touchend', () => {
    setTimeout(() => {
      link.style.transform = 'translateX(10px)';
    }, 100);
  });
});
