// Debugging code to check CSS loading
console.log('JavaScript file loaded successfully');

// Check if CSS is loaded
window.addEventListener('load', function() {
    // Get computed style for body
    const bodyStyle = window.getComputedStyle(document.body);
    console.log('Body background color:', bodyStyle.backgroundColor);
    
    // Check if CSS variables are working
    const rusticRedColorTest = document.createElement('div');
    rusticRedColorTest.style.color = 'var(--rustic-red)';
    document.body.appendChild(rusticRedColorTest);
    console.log('Rustic red applied:', window.getComputedStyle(rusticRedColorTest).color);
    document.body.removeChild(rusticRedColorTest);
    
    // Check for specific styles that should be applied
    const headerEl = document.querySelector('header');
    console.log('Header styles:', window.getComputedStyle(headerEl));
    
    // Log document URL for path debugging
    console.log('Document URL:', document.URL);
    console.log('Base URL:', window.location.origin + window.location.pathname);
});

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    const heroSection = document.querySelector('#hero');
    
    function checkScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Initial check
    checkScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', checkScroll);
    
    // Fade-in elements on scroll
    const fadeElements = document.querySelectorAll('.gallery-item, .process-steps .step, .about-content p');
    
    const fadeInOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
        fadeInObserver.observe(element);
    });
    
    // Gallery item hover effect
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            galleryItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.add('dimmed');
                }
            });
        });
        
        item.addEventListener('mouseleave', function() {
            galleryItems.forEach(otherItem => {
                otherItem.classList.remove('dimmed');
            });
        });
    });
    
    // Process section animation
    const processSteps = document.querySelectorAll('.step');
    
    processSteps.forEach((step, index) => {
        setTimeout(() => {
            step.classList.add('step-visible');
        }, 300 * (index + 1));
    });
    
    // Color theme toggle (for future implementation)
    function setColorTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setColorTheme(savedTheme);
    }
    
    // Add active state to navigation based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    function highlightNavOnScroll() {
        const scrollPosition = window.scrollY + 100; // Adding offset for header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // Initialize on page load
    highlightNavOnScroll();
}); 