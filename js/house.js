document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navList = document.querySelector('nav ul');

    mobileMenu.addEventListener('click', function() {
        navList.classList.toggle('active');
    });

    // Booking Form Handling
    const bookingForm = document.getElementById('bookingForm');
    const checkInInput = document.getElementById('checkIn');
    const boatTypeSelect = document.getElementById('boatType');
    const guestsInput = document.getElementById('guests');
    const timeInput = document.getElementById('time');
    const modal = document.getElementById('bookingModal');

    // Houseboat configurations
    // Update the boatConfigs object
    const boatConfigs = {
        'nileswar': {
            maxGuests: 15,
            pricePerHour: 6500,
            name: 'Nileswar Premium',
            features: [
                'Luxury Master Suite with Private Balcony',
                'Gourmet Kitchen with Personal Chef',
                'Infinity Sundeck with Jacuzzi',
                'Premium Bar & Lounge Area',
                '24/7 Butler Service',
                'Spa & Wellness Center'
            ]
        },
        'valiyaparamba': {
            maxGuests: 12,
            pricePerHour: 5000,
            name: 'Valiyaparamba Explorer',
            features: ['4 AC Bedrooms', 'Premium Kerala Cuisine', 'Sundeck', 'Fishing Equipment']
        },
        'chandragiri': {
            maxGuests: 6,
            pricePerHour: 3500,
            name: 'Chandragiri Cruiser',
            features: ['2 AC Bedrooms', 'Traditional Meals', 'Upper Deck', 'Photography Points']
        },
        'payaswini': {
            maxGuests: 2,
            pricePerHour: 2500,
            name: 'Payaswini Royal',
            features: ['1 Premium Suite', 'Private Dining', 'Romantic Setup', 'Personal Butler']
        }
    };

    // Set minimum date for check-in to today
    const today = new Date().toISOString().split('T')[0];
    checkInInput.min = today;

    // Update booking details when boat type changes
    boatTypeSelect.addEventListener('change', function() {
        const selectedBoat = boatConfigs[this.value];
        if (selectedBoat) {
            guestsInput.max = selectedBoat.maxGuests;
            if (guestsInput.value > selectedBoat.maxGuests) {
                guestsInput.value = selectedBoat.maxGuests;
            }
            updateBookingSummary();
        }
    });

    // Update booking summary when inputs change
    [boatTypeSelect, guestsInput, document.getElementById('duration')].forEach(input => {
        input.addEventListener('change', updateBookingSummary);
    });

    function updateBookingSummary() {
        const selectedBoat = boatConfigs[boatTypeSelect.value];
        if (!selectedBoat) return;

        const duration = document.getElementById('duration').value;
        const total = selectedBoat.pricePerHour * (duration / 4);

        document.getElementById('selectedPackage').textContent = selectedBoat.name;
        document.getElementById('selectedDuration').textContent = `${duration} hours`;
        document.getElementById('totalPrice').textContent = `₹${total.toLocaleString('en-IN')}`;
    }

    // Set available time slots (8 AM to 4 PM)
    timeInput.addEventListener('focus', function() {
        this.min = '08:00';
        this.max = '16:00';
    });

    // Form Submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            boatType: boatTypeSelect.value,
            checkIn: checkInInput.value,
            duration: document.getElementById('duration').value,
            guests: guestsInput.value,
            time: timeInput.value,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        };

        if (validateForm(formData)) {
            showBookingConfirmation(formData);
        }
    });

    function showBookingConfirmation(data) {
        const selectedBoat = boatConfigs[data.boatType];
        const total = selectedBoat.pricePerHour * (data.duration / 4);

        const modalContent = `
            <h3>Booking Confirmation</h3>
            <div class="confirmation-details">
                <p><strong>Boat:</strong> ${selectedBoat.name}</p>
                <p><strong>Date:</strong> ${formatDate(data.checkIn)}</p>
                <p><strong>Time:</strong> ${formatTime(data.time)}</p>
                <p><strong>Duration:</strong> ${data.duration} hours</p>
                <p><strong>Guests:</strong> ${data.guests}</p>
                <p><strong>Total Amount:</strong> ₹${total.toLocaleString('en-IN')}</p>
                <div class="booking-features">
                    <h4>Included Features:</h4>
                    <ul>
                        ${selectedBoat.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <p class="confirmation-message">Thank you for choosing Kasargod Houseboats! We will contact you shortly to confirm your reservation.</p>
            <button onclick="closeModal()" class="modal-button">Close</button>
        `;

        document.getElementById('modalContent').innerHTML = modalContent;
        modal.style.display = 'block';
        bookingForm.reset();
    }

    function validateForm(data) {
        // Check if all required fields are filled
        for (let key in data) {
            if (!data[key]) {
                showError('Please fill in all required fields');
                return false;
            }
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showError('Please enter a valid email address');
            return false;
        }

        // Validate phone number (10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(data.phone.replace(/[^0-9]/g, ''))) {
            showError('Please enter a valid 10-digit phone number');
            return false;
        }

        // Validate guest count
        const selectedBoat = boatConfigs[data.boatType];
        if (data.guests > selectedBoat.maxGuests) {
            showError(`Maximum ${selectedBoat.maxGuests} guests allowed for ${selectedBoat.name}`);
            return false;
        }

        return true;
    }

    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        
        const existingError = document.querySelector('.error-message');
        if (existingError) existingError.remove();
        
        bookingForm.insertBefore(errorDiv, bookingForm.firstChild);
        setTimeout(() => errorDiv.remove(), 5000);
    }

    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    function formatTime(timeString) {
        return new Date(`2000/01/01 ${timeString}`).toLocaleTimeString('en-IN', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }

    // Close modal when clicking outside
    window.onclick = function(e) {
        if (e.target === modal) {
            closeModal();
        }
    };

    // Close modal function
    window.closeModal = function() {
        modal.style.display = 'none';
    };

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                navList.classList.remove('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('nav') && navList.classList.contains('active')) {
            navList.classList.remove('active');
        }
    });
});
