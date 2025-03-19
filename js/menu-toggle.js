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
        
        // Ensure mobile menu CSS is loaded
        if (!document.querySelector('link[href="css/mobile-menu.css"]')) {
            const mobileMenuLink = document.createElement('link');
            mobileMenuLink.rel = 'stylesheet';
            mobileMenuLink.href = 'css/mobile-menu.css';
            document.head.appendChild(mobileMenuLink);
        }
        
        // Special handling for houseboat page
        const isHouseboatPage = window.location.href.includes('house.html');
        const houseboatLink = document.querySelector('.nav-links a[href="house.html"]');
        
        if (houseboatLink && isHouseboatPage) {
            // Preserve original styling for houseboat link when on the houseboat page
            houseboatLink.style.background = 'inherit';
            houseboatLink.style.color = 'inherit';
        }
    }
}); 