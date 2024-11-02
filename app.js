// Select all sections and navbar links
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

// Create Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove("nav-active"));
            
            // Add active class to the link corresponding to the current section
            const id = entry.target.getAttribute("id");
            const correspondingLink = document.querySelector(`nav a[href="#${id}"]`);
            if (correspondingLink) {
                correspondingLink.classList.add("nav-active");
            }
        }
    });
}, { threshold: 0.7 });

// Observe each section
sections.forEach(section => {
    observer.observe(section);
});

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
});

// Modified smooth scrolling - only for internal navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        // Only prevent default for internal navigation links
        const targetId = this.getAttribute("href");
        if (targetId !== "#" && document.querySelector(targetId)) {
            e.preventDefault();
            document.querySelector(targetId).scrollIntoView({
                behavior: "smooth",
            });
        }
    });
});

// Add background to navbar on scroll
window.addEventListener("scroll", function () {
    const nav = document.querySelector("nav");
    if (window.scrollY > 50) {
        nav.classList.add("bg-gray-900/95");
    } else {
        nav.classList.remove("bg-gray-900/95");
    }
});

// Mobile menu functionality
const mobileMenuButton = document.querySelector("button");
const mobileMenu = document.querySelector(".md\\:hidden.hidden");

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
        });
    });
}