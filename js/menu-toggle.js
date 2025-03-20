/**
 * Mobile menu toggle functionality
 * Include this script on all pages to enable mobile menu toggle
 */
document.addEventListener('DOMContentLoaded', function() {
    // Make sure any existing menu toggle listener is removed first
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        // Remove any existing click listeners from menu toggle
        const newMenuToggle = menuToggle.cloneNode(true);
        menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);
        
        // Add new event listener
        newMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navLinks.classList.toggle('active');
            console.log('Menu toggled');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav-left') && !event.target.closest('.menu-toggle')) {
                navLinks.classList.remove('active');
            }
        });
        
        // Close menu when clicking a link
        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
        
        // Fix for iOS - ensure touch events work
        newMenuToggle.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navLinks.classList.toggle('active');
            console.log('Menu toggled (touch)');
        }, { passive: false });
        
        // Force menu visibility on mobile
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            @media (max-width: 768px) {
                .menu-toggle {
                    display: block !important;
                }
                .nav-links {
                    position: absolute !important;
                    top: 100% !important;
                    left: 0 !important;
                    width: 100% !important;
                    background: white !important;
                    flex-direction: column !important;
                    padding: 1rem !important;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1) !important;
                    opacity: 0 !important;
                    pointer-events: none !important;
                    transform: translateY(-10px) !important;
                    transition: all 0.3s ease !important;
                    z-index: 1000 !important;
                }
                .nav-links.active {
                    opacity: 1 !important;
                    pointer-events: all !important;
                    transform: translateY(0) !important;
                }
                .nav-links a {
                    width: 100% !important;
                    padding: 0.8rem 1rem !important;
                    border-bottom: 1px solid #eee !important;
                }
                .nav-links a:last-child {
                    border-bottom: none !important;
                }
            }
        `;
        document.head.appendChild(styleElement);
    }
}); 