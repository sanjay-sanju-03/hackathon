    // Map initialization
    const map = L.map('map').setView([12.4996, 75.0023], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Cultural locations data
    const locations = [
        {
            name: "Bekal Fort",
            coords: [12.4280, 75.3616],
            type: "Historical"
        },
        {
            name: "Ananthapura Lake Temple",
            coords: [12.5182, 75.0141],
            type: "Religious"
        },
        {
            name: "ASAP Skill Park",
            coords: [12.4996, 75.0023],
            type: "Educational"
        }
        // Add more locations as needed
    ];

    // Add markers for all locations
    locations.forEach(location => {
        L.marker(location.coords)
            .bindPopup(`<b>${location.name}</b><br>${location.type}`)
            .addTo(map);
    });

    // Function to handle user's location
    function getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                const userLocation = [userLat, userLng];

                // Add user marker
                L.marker(userLocation)
                    .bindPopup('You are here!')
                    .addTo(map);

                // Center map on user
                map.setView(userLocation, 13);

                // Find nearest location
                const nearest = findNearestLocation(userLocation);
                
                // Show routing to nearest location
                showDirections(userLocation, nearest.coords);

                // Update location info
                document.getElementById('location-info').innerHTML = `
                    <h3>Your Location</h3>
                    <p>Latitude: ${userLat.toFixed(4)}</p>
                    <p>Longitude: ${userLng.toFixed(4)}</p>
                    <h3>Nearest Cultural Site</h3>
                    <p>${nearest.name} (${calculateDistance(userLocation, nearest.coords).toFixed(2)} km away)</p>
                `;
            });
        }
    }

    // Function to find nearest location
    function findNearestLocation(userLocation) {
        let nearest = locations[0];
        let shortestDistance = calculateDistance(userLocation, locations[0].coords);

        locations.forEach(location => {
            const distance = calculateDistance(userLocation, location.coords);
            if (distance < shortestDistance) {
                shortestDistance = distance;
                nearest = location;
            }
        });

        return nearest;
    }

    // Function to calculate distance
    function calculateDistance(point1, point2) {
        const lat1 = point1[0];
        const lon1 = point1[1];
        const lat2 = point2[0];
        const lon2 = point2[1];

        const R = 6371; // Earth's radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                 Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                 Math.sin(dLon/2) * Math.sin(dLon/2);
        return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    }

    // Function to show directions
    function showDirections(from, to) {
        L.Routing.control({
            waypoints: [
                L.latLng(from[0], from[1]),
                L.latLng(to[0], to[1])
            ],
            routeWhileDragging: true
        }).addTo(map);
    }

    // Initialize user location when page loads
    getUserLocation();

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

    // Function to handle "Show on Map" button clicks
    function showOnMap(lat, lng, locationName) {
        // Center the map on the location
        map.setView([lat, lng], 15);

        // Clear existing markers and routes
        map.eachLayer((layer) => {
            if (layer instanceof L.Marker || layer instanceof L.Routing.Control) {
                map.removeLayer(layer);
            }
        });

        // Add marker for the location
        L.marker([lat, lng])
            .bindPopup(locationName)
            .addTo(map)
            .openPopup();

        // Get user's location and show route
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;

                // Add marker for user's location
                L.marker([userLat, userLng])
                    .bindPopup('You are here!')
                    .addTo(map);

                // Show routing directions
                L.Routing.control({
                    waypoints: [
                        L.latLng(userLat, userLng),
                        L.latLng(lat, lng)
                    ],
                    routeWhileDragging: true
                }).addTo(map);

                // Scroll to map section
                document.querySelector('.map-section').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            });
        }
    }

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