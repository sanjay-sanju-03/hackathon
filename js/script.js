    
    // Carousel initialization
    document.addEventListener('DOMContentLoaded', function() {
        var splide = new Splide('#main-slider', {
            type: 'fade',
            heightRatio: 0.5,
            pagination: false,
            arrows: false,
            cover: true,
            autoplay: true,
            interval: 4000,
            rewind: true,
            speed: 1000,
        });

        // Progress bar functionality
        // var bar = document.querySelector('.my-slider-progress-bar');
        
        // splide.on('mounted move', function() {
        //     var end = splide.Components.Controller.getEnd() + 1;
        //     var rate = Math.min((splide.index + 1) / end, 1);
        //     bar.style.width = String(100 * rate) + '%';
        // });

        splide.mount();

        // Filter functionality
        const filterButtons = document.querySelectorAll('.filter-btn');
        const cards = document.querySelectorAll('.card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                cards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const searchSuggestions = document.querySelector('.search-suggestions');

        // Define searchable items
        const searchableItems = [
            { text: 'Home', url: '#Home' },
            { text: 'Cuisine', url: 'cuisine.html' },
            { text: 'Experiences', url: 'experience.html' },
            { text: 'Events', url: 'events.html' },
            { text: 'Houseboats', url: 'house.html' },
            { text: 'Made in Kasaragod', url: 'made-in-kasaragod.html' },
            { text: 'Bekal Fort', url: 'bekal.html' },
            { text: 'Anantapura Lake Temple', url: 'anantapura.html' },
            { text: 'ASAP Community Skill Park', url: '#ASAP' },
            { text: 'Nileshwar HouseBoats', url: 'house.html' }
        ];

        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const suggestions = searchableItems.filter(item => 
                item.text.toLowerCase().includes(searchTerm)
            );

            // Update suggestions display
            if (searchTerm.length > 0 && suggestions.length > 0) {
                searchSuggestions.innerHTML = suggestions
                    .map(item => `<div class="suggestion-item" data-url="${item.url}">${item.text}</div>`)
                    .join('');
                searchSuggestions.classList.add('active');
            } else {
                searchSuggestions.classList.remove('active');
            }

            // Filter cards
            cards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });

        // Handle suggestion clicks
        searchSuggestions.addEventListener('click', function(e) {
            if (e.target.classList.contains('suggestion-item')) {
                const url = e.target.dataset.url;
                if (url.startsWith('#')) {
                    // Scroll to section
                    const element = document.querySelector(url);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    // Navigate to page
                    window.location.href = url;
                }
                searchInput.value = '';
                searchSuggestions.classList.remove('active');
            }
        });

        // Close suggestions when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-wrapper')) {
                searchSuggestions.classList.remove('active');
            }
        });

        // Clear search when clicking the search icon
        document.querySelector('.search-icon').addEventListener('click', function() {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
        });
    });
    // Mobile menu toggle
    document.addEventListener('DOMContentLoaded', function() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav-left') && !event.target.closest('.search-wrapper')) {
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
    });