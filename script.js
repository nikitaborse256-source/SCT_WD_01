document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar & Menu Logic ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navbar = document.getElementById('navbar');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Dynamic Hotels Data ---
    const hotels = [
        {
            name: 'The Azure Palace',
            amenities: 'Infinity Pool, Spa, Fine Dining',
            image: 'The Azure Palace.jpg',
            altText: 'A stunning luxury hotel with a grand entrance and ocean view.',
            vibe: 'Luxury',
            location: 'Santorini, Greece',
            price: '$$$$',
            detailedDescription: 'Perched on the cliffs of Santorini, The Azure Palace offers unparalleled views and five-star service. With a world-class spa, an infinity pool overlooking the caldera, and a Michelin-starred restaurant, it is the epitome of luxury and romance.'
        },
        {
            name: 'The Artisan Loft',
            amenities: 'Rooftop Bar, Art Gallery, Local Decor',
            image: 'The Artisan Loft.jpg',
            altText: 'A stylish boutique hotel room with unique, artistic furniture.',
            vibe: 'Boutique',
            location: 'Kyoto, Japan',
            price: '$$$',
            detailedDescription: 'The Artisan Loft is a celebration of local craftsmanship and modern design. Each room is uniquely decorated by local artists. Its intimate atmosphere and central location make it the perfect base for exploring the historic city of Kyoto.'
        },
        {
            name: 'Palm Grove Resort',
            amenities: 'Private Beach, Water Sports, Kids Club',
            image: 'Palm Grove Resor.jpg',
            altText: 'A tropical resort with palm trees and bungalows leading to a white sand beach.',
            vibe: 'Resort',
            location: 'Maldives',
            price: '$$$$$',
            detailedDescription: 'Escape to a private paradise at Palm Grove Resort. Surrounded by turquoise waters, our overwater bungalows offer direct ocean access. Enjoy a wide range of water sports, relax on the pristine beach, or rejuvenate at our serene spa.'
        },
        {
            name: 'The Highlander Inn',
            amenities: 'Fireplace, Mountain Views, Hiking Trails',
            image: 'The Highlander Inn.webp',
            altText: 'A cozy inn with a stone fireplace and views of snow-capped mountains.',
            vibe: 'Boutique',
            location: 'Scottish Highlands, UK',
            price: '$$',
            detailedDescription: 'Nestled in the heart of the Scottish Highlands, The Highlander Inn offers a cozy retreat from the everyday. With roaring fireplaces, breathtaking mountain views, and easy access to scenic hiking trails, it\'s the perfect getaway for nature lovers.'
        }
    ];

    const hotelsGrid = document.getElementById('hotels-grid');

    // --- Render Hotels ---
    function renderHotels(hotelArray) {
        hotelsGrid.innerHTML = '';
        if (!hotelArray || hotelArray.length === 0) {
            hotelsGrid.innerHTML = '<p class="no-results">No hotels match this style. Try another!</p>';
            return;
        }
        
        hotelArray.forEach(hotel => {
            const card = document.createElement('div');
            card.className = 'cafe-card';
            card.innerHTML = `
                <div class="image-container">
                    <img src="${hotel.image}" alt="${hotel.altText}" loading="lazy">
                </div>
                <div class="cafe-info">
                    <h4>${hotel.name}</h4>
                    <p>${hotel.location}</p>
                    <div class="vibe-badge">${hotel.vibe}</div>
                </div>
            `;
            
            card.addEventListener('click', () => {
                showHotelModal(hotel);
            });
            
            hotelsGrid.appendChild(card);
        });
    }

    // --- Filter button logic ---
    const filterButtons = document.querySelectorAll('.filters .btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Manage active button style
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            const filter = e.target.dataset.filter;
            if (filter === 'all') {
                renderHotels(hotels);
            } else {
                const filteredHotels = hotels.filter(hotel => hotel.vibe === filter);
                renderHotels(filteredHotels);
            }
        });
    });

    // --- Modal Functionality ---
    const modal = document.getElementById('hotel-modal');
    const closeModal = document.getElementById('close-modal');
    
    function showHotelModal(hotel) {
        document.getElementById('modal-title').textContent = hotel.name;
        document.getElementById('modal-image').src = hotel.image;
        document.getElementById('modal-image').alt = hotel.altText;
        document.getElementById('modal-location').textContent = hotel.location;
        document.getElementById('modal-specialty').textContent = hotel.amenities;
        document.getElementById('modal-hours').textContent = hotel.price;
        document.getElementById('modal-vibe').textContent = hotel.vibe;
        document.getElementById('modal-description').textContent = hotel.detailedDescription;
        
        modal.classList.add('active');
    }
    
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // --- Initial render ---
    renderHotels(hotels);
});