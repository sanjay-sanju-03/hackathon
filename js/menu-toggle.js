document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navBtn = document.querySelector('.tglbtn'); // The <i> inside the button

    if (menuToggle && navLinks && navBtn) {
        // Add event listener directly instead of cloning
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // Toggle menu visibility
            navLinks.classList.toggle('active');

            // Toggle icon
            navBtn.classList.toggle('fa-bars');
            navBtn.classList.toggle('fa-times');

            console.log('Menu toggled');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav-left') && !event.target.closest('.menu-toggle')) {
                navLinks.classList.remove('active');
                navBtn.classList.remove('fa-times');
                navBtn.classList.add('fa-bars'); // Reset icon when closing
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                navBtn.classList.remove('fa-times');
                navBtn.classList.add('fa-bars'); // Reset icon
            });
        });

        // Fix for iOS touch support
        menuToggle.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navLinks.classList.toggle('active');
            navBtn.classList.toggle('fa-bars');
            navBtn.classList.toggle('fa-times');
            console.log('Menu toggled (touch)');
        }, { passive: false });
    }
});