// Main JavaScript file for Foodpanda Clone

// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const locationSelector = document.querySelector('.location-selector');
const locationModal = document.getElementById('locationModal');
const closeModal = document.querySelector('.close-modal');
const locationItems = document.querySelectorAll('.location-item');
const currentLocationSpan = document.getElementById('current-location');
const locationInput = document.getElementById('location-input');
const cartIcon = document.querySelector('.cart-icon');
const floatingCart = document.querySelector('.floating-cart');
const closeCart = document.querySelector('.close-cart');
const restaurantsGrid = document.getElementById('restaurants-grid');

// Restaurant data
const restaurants = [
    {
        id: 1,
        name: "Pizza Palace",
        cuisine: "Pizza, Italian",
        rating: 4.5,
        deliveryTime: "25-35 min",
        deliveryFee: "₱49",
        minOrder: "₱200",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Burger Barn",
        cuisine: "Burgers, American",
        rating: 4.3,
        deliveryTime: "20-30 min",
        deliveryFee: "₱29",
        minOrder: "₱150",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Sushi Sensation",
        cuisine: "Japanese, Sushi",
        rating: 4.7,
        deliveryTime: "30-40 min",
        deliveryFee: "₱59",
        minOrder: "₱250",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Taco Fiesta",
        cuisine: "Mexican, Tacos",
        rating: 4.2,
        deliveryTime: "25-35 min",
        deliveryFee: "₱39",
        minOrder: "₱180",
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "Noodle House",
        cuisine: "Asian, Noodles",
        rating: 4.4,
        deliveryTime: "20-30 min",
        deliveryFee: "₱35",
        minOrder: "₱150",
        image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Healthy Bites",
        cuisine: "Healthy, Salads",
        rating: 4.6,
        deliveryTime: "30-40 min",
        deliveryFee: "₱49",
        minOrder: "₱220",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        name: "Curry Corner",
        cuisine: "Indian, Curry",
        rating: 4.5,
        deliveryTime: "35-45 min",
        deliveryFee: "₱55",
        minOrder: "₱200",
        image: "https://images.unsplash.com/photo-1585937421612-70ca003675ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        name: "Dessert Delight",
        cuisine: "Desserts, Bakery",
        rating: 4.8,
        deliveryTime: "20-30 min",
        deliveryFee: "₱39",
        minOrder: "₱120",
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    initializeLocationSelector();
    initializeRestaurants();
    initializeCart();
    initializeSmoothScrolling();
    
    // Set initial location
    currentLocationSpan.textContent = "Manila";
});

// Mobile Menu Toggle
function initializeMobileMenu() {
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileNav.style.display = mobileNav.style.display === 'flex' ? 'none' : 'flex';
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileNav.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                mobileNav.style.display = 'none';
                mobileMenuToggle.querySelector('i').classList.remove('fa-times');
                mobileMenuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    }
}

// Location Selector Functionality
function initializeLocationSelector() {
    // Open location modal
    if (locationSelector) {
        locationSelector.addEventListener('click', function() {
            locationModal.style.display = 'flex';
        });
    }
    
    // Close location modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            locationModal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    locationModal.addEventListener('click', function(event) {
        if (event.target === locationModal) {
            locationModal.style.display = 'none';
        }
    });
    
    // Select location from list
    locationItems.forEach(item => {
        item.addEventListener('click', function() {
            const locationName = this.querySelector('h4').textContent;
            currentLocationSpan.textContent = locationName;
            locationModal.style.display = 'none';
            
            // Update all location items active state
            locationItems.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Location input functionality
    if (locationInput) {
        locationInput.addEventListener('focus', function() {
            locationModal.style.display = 'flex';
        });
    }
}

// Initialize Restaurants Grid
function initializeRestaurants() {
    if (restaurantsGrid) {
        restaurantsGrid.innerHTML = '';
        
        restaurants.forEach(restaurant => {
            const restaurantCard = document.createElement('div');
            restaurantCard.className = 'restaurant-card';
            restaurantCard.innerHTML = `
                <img src="${restaurant.image}" alt="${restaurant.name}" class="restaurant-image">
                <div class="restaurant-info">
                    <h3 class="restaurant-name">${restaurant.name}</h3>
                    <p class="restaurant-cuisine">${restaurant.cuisine}</p>
                    <div class="restaurant-details">
                        <div class="rating">
                            <i class="fas fa-star"></i>
                            <span>${restaurant.rating}</span>
                        </div>
                        <div class="delivery-info">
                            <span><i class="fas fa-clock"></i> ${restaurant.deliveryTime}</span>
                            <span><i class="fas fa-truck"></i> ${restaurant.deliveryFee}</span>
                        </div>
                    </div>
                    <div class="restaurant-footer">
                        <span class="price">Min: ${restaurant.minOrder}</span>
                        <button class="btn-order" data-restaurant-id="${restaurant.id}">Order Now</button>
                    </div>
                </div>
            `;
            
            restaurantsGrid.appendChild(restaurantCard);
        });
        
        // Add event listeners to order buttons
        document.querySelectorAll('.btn-order').forEach(button => {
            button.addEventListener('click', function() {
                const restaurantId = this.getAttribute('data-restaurant-id');
                alert(`Redirecting to restaurant ${restaurantId}...`);
                // In a real app, this would redirect to restaurant-detail.html
                window.location.href = `pages/restaurant-detail.html?id=${restaurantId}`;
            });
        });
    }
}

// Cart Functionality
function initializeCart() {
    // Toggle cart visibility
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            floatingCart.style.display = 'flex';
        });
    }
    
    // Close cart
    if (closeCart) {
        closeCart.addEventListener('click', function() {
            floatingCart.style.display = 'none';
        });
    }
    
    // Close cart when clicking outside
    document.addEventListener('click', function(event) {
        if (!floatingCart.contains(event.target) && !cartIcon.contains(event.target)) {
            floatingCart.style.display = 'none';
        }
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form validation for newsletter (if added later)
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Update cart count
function updateCartCount(count) {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = count;
    }
}

// Initialize cart count from localStorage
const cart = JSON.parse(localStorage.getItem('foodpandaCart')) || [];
updateCartCount(cart.length);
// JavaScript for restaurants page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize page
    initializeRestaurantsPage();
    initializeFilters();
    initializeSorting();
    
    // Update page location based on selected location
    const currentLocation = document.getElementById('current-location');
    const pageLocation = document.getElementById('page-location');
    if (currentLocation && pageLocation) {
        pageLocation.textContent = currentLocation.textContent;
    }
});

function initializeRestaurantsPage() {
    const allRestaurantsGrid = document.getElementById('all-restaurants-grid');
    
    if (allRestaurantsGrid) {
        // Load all restaurants
        const allRestaurants = [
            // ... (same restaurant data as in script.js, but more for this page)
            {
                id: 1,
                name: "Pizza Palace",
                cuisine: "Pizza, Italian",
                rating: 4.5,
                deliveryTime: "25-35 min",
                deliveryFee: "₱49",
                minOrder: "₱200",
                image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            },
            // Add more restaurants...
        ];
        
        // Display first 12 restaurants
        displayRestaurants(allRestaurants.slice(0, 12));
        
        // Load more functionality
        const loadMoreBtn = document.querySelector('.btn-load-more');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function() {
                // In a real app, this would load more from an API
                const additionalRestaurants = allRestaurants.slice(12, 24);
                displayRestaurants(additionalRestaurants);
                this.style.display = 'none'; // Hide after loading
            });
        }
    }
}

function displayRestaurants(restaurants) {
    const allRestaurantsGrid = document.getElementById('all-restaurants-grid');
    
    restaurants.forEach(restaurant => {
        const restaurantCard = document.createElement('div');
        restaurantCard.className = 'restaurant-card';
        restaurantCard.innerHTML = `
            <img src="${restaurant.image}" alt="${restaurant.name}" class="restaurant-image">
            <div class="restaurant-info">
                <h3 class="restaurant-name">${restaurant.name}</h3>
                <p class="restaurant-cuisine">${restaurant.cuisine}</p>
                <div class="restaurant-details">
                    <div class="rating">
                        <i class="fas fa-star"></i>
                        <span>${restaurant.rating}</span>
                    </div>
                    <div class="delivery-info">
                        <span><i class="fas fa-clock"></i> ${restaurant.deliveryTime}</span>
                        <span><i class="fas fa-truck"></i> ${restaurant.deliveryFee}</span>
                    </div>
                </div>
                <div class="restaurant-footer">
                    <span class="price">Min: ${restaurant.minOrder}</span>
                    <button class="btn-order" data-restaurant-id="${restaurant.id}">Order Now</button>
                </div>
            </div>
        `;
        
        allRestaurantsGrid.appendChild(restaurantCard);
    });
    
    // Add event listeners to new order buttons
    document.querySelectorAll('.btn-order').forEach(button => {
        button.addEventListener('click', function() {
            const restaurantId = this.getAttribute('data-restaurant-id');
            window.location.href = `restaurant-detail.html?id=${restaurantId}`;
        });
    });
}

function initializeFilters() {
    const applyFiltersBtn = document.querySelector('.btn-apply-filters');
    const clearFiltersBtn = document.querySelector('.btn-clear-filters');
    
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            // Get selected filters
            const selectedRatings = Array.from(document.querySelectorAll('input[name="rating"]:checked'))
                .map(checkbox => checkbox.value);
            const selectedDeliveryTimes = Array.from(document.querySelectorAll('input[name="delivery-time"]:checked'))
                .map(checkbox => checkbox.value);
            const selectedDeliveryFees = Array.from(document.querySelectorAll('input[name="delivery-fee"]:checked'))
                .map(checkbox => checkbox.value);
            const selectedCuisines = Array.from(document.querySelectorAll('input[name="cuisine"]:checked'))
                .map(checkbox => checkbox.value);
            
            // Apply filters (in a real app, this would filter the restaurant list)
            alert(`Filters applied:\nRatings: ${selectedRatings.join(', ')}\nDelivery Times: ${selectedDeliveryTimes.join(', ')}\nDelivery Fees: ${selectedDeliveryFees.join(', ')}\nCuisines: ${selectedCuisines.join(', ')}`);
        });
    }
    
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            // Clear all checkboxes
            document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
        });
    }
}

function initializeSorting() {
    const sortSelect = document.getElementById('sort-by');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            alert(`Sorting by: ${this.options[this.selectedIndex].text}`);
            
            // In a real app, this would sort the restaurant list
            // Based on sortValue: 'rating', 'delivery-time', 'delivery-fee', etc.
        });
    }
}