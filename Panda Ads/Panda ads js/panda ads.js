// ============================================
// DOM Ready Function
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const hamburgerLines = document.querySelectorAll('.hamburger-line');
    
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function() {
            // Toggle mobile menu visibility
            mobileNav.classList.toggle('active');
            
            // Toggle hamburger animation
            this.classList.toggle('active');
            
            // Animate hamburger lines
            if (this.classList.contains('active')) {
                hamburgerLines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                hamburgerLines[1].style.opacity = '0';
                hamburgerLines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                hamburgerLines[0].style.transform = 'none';
                hamburgerLines[1].style.opacity = '1';
                hamburgerLines[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.mobile-nav-item a').forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                hamburgerLines[0].style.transform = 'none';
                hamburgerLines[1].style.opacity = '1';
                hamburgerLines[2].style.transform = 'none';
            });
        });
    }
    
    // ============================================
    // SEARCH FUNCTIONALITY
    // ============================================
    
    const searchBtn = document.getElementById('searchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    
    // Open search overlay
    if (searchBtn && searchOverlay) {
        searchBtn.addEventListener('click', function() {
            searchOverlay.classList.add('active');
            searchInput.focus();
            
            // Close mobile menu if open
            if (mobileNav && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                hamburgerLines[0].style.transform = 'none';
                hamburgerLines[1].style.opacity = '1';
                hamburgerLines[2].style.transform = 'none';
            }
        });
    }
    
    // Close search overlay
    if (searchClose && searchOverlay) {
        searchClose.addEventListener('click', function() {
            searchOverlay.classList.remove('active');
        });
    }
    
    // Close search overlay when clicking outside
    if (searchOverlay) {
        searchOverlay.addEventListener('click', function(e) {
            if (e.target === searchOverlay) {
                searchOverlay.classList.remove('active');
            }
        });
    }
    
    // Handle search form submission
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            
            if (query) {
                console.log('Searching for:', query);
                // Here you would typically make an AJAX request or redirect to search results
                alert(`Searching for: ${query}`);
                searchOverlay.classList.remove('active');
                searchInput.value = '';
            }
        });
    }
    
    // Close search with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
        }
    });
    
    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ============================================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ============================================
    
    function highlightActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-item a, .mobile-nav-item a');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage || 
                (currentPage === '' && linkHref === 'index.html') ||
                (currentPage === 'index.html' && linkHref === './index.html')) {
                link.parentElement.classList.add('active');
            } else {
                link.parentElement.classList.remove('active');
            }
        });
    }
    
    // Call initially
    highlightActiveNavLink();
    
    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only process anchor links (not empty or different pages)
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (mobileNav && mobileNav.classList.contains('active')) {
                        mobileNav.classList.remove('active');
                        mobileMenuToggle.classList.remove('active');
                        hamburgerLines[0].style.transform = 'none';
                        hamburgerLines[1].style.opacity = '1';
                        hamburgerLines[2].style.transform = 'none';
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ============================================
    // ANIMATE STATS COUNTER
    // ============================================
    
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const originalText = stat.textContent;
            // Extract numbers only
            const targetNumber = parseInt(originalText.replace(/[^0-9]/g, '')) || 0;
            // Extract everything that's not a number (like M, +, etc.)
            const nonNumericParts = originalText.replace(/[0-9]/g, '');
            
            // Reset for animation
            stat.textContent = '0' + nonNumericParts;
            
            // Animate counter
            let current = 0;
            const increment = targetNumber / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= targetNumber) {
                    current = targetNumber;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + nonNumericParts;
            }, 30);
        });
    }
    
    // Trigger animation when stats section is in view
    const statsSection = document.querySelector('.stats-section');
    if (statsSection && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
    
    // ============================================
    // CASE STUDY HOVER EFFECTS
    // ============================================
    
    const caseStudyCards = document.querySelectorAll('.case-study-card');
    caseStudyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ============================================
    // BRANDS LOGO ANIMATION
    // ============================================
    
    const brandLogos = document.querySelectorAll('.brand-logo');
    brandLogos.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });
        
        logo.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });
    
    // ============================================
    // SOLUTIONS SECTION INTERACTIVE EFFECTS
    // ============================================
    
    const solutionItems = document.querySelectorAll('.solution-item');
    solutionItems.forEach(item => {
        const image = item.querySelector('.solution-image img');
        const content = item.querySelector('.solution-content');
        
        if (image && content) {
            item.addEventListener('mouseenter', function() {
                image.style.transform = 'scale(1.05)';
                content.style.transform = 'translateY(-5px)';
            });
            
            item.addEventListener('mouseleave', function() {
                image.style.transform = 'scale(1)';
                content.style.transform = 'translateY(0)';
            });
        }
    });
    
    // ============================================
    // FORM VALIDATION
    // ============================================
    
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });
    
    // ============================================
    // COPYRIGHT YEAR UPDATE
    // ============================================
    
    const copyrightElement = document.querySelector('.copyright');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = `&copy; ${currentYear} Foodpanda`;
    }
    
    // ============================================
    // LAZY LOAD IMAGES
    // ============================================
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
    
             // ============================================
    // SIMPLE SLIDER WITH SWIPE ANIMATION
    // ============================================
    
    const sliderContainer = document.getElementById('sliderContainer');
    const sliderPills = document.querySelectorAll('.slider-pill');
    const sliderSlides = document.querySelectorAll('.slider-slide');
    const sliderPrev = document.getElementById('sliderPrev');
    const sliderNext = document.getElementById('sliderNext');
    
    if (sliderContainer && sliderSlides.length > 0) {
        let currentSlide = 0;
        let isAnimating = false;
        
        // Function to change slide with animation
        function goToSlide(slideIndex, direction = 'next') {
            if (isAnimating || slideIndex === currentSlide) return;
            
            isAnimating = true;
            
            // Get current and new slides
            const current = sliderSlides[currentSlide];
            const next = sliderSlides[slideIndex];
            
            // Remove active class from current slide
            current.classList.remove('active');
            
            // Set animation classes based on direction
            if (direction === 'next') {
                current.classList.add('slide-out-left');
                next.classList.add('slide-in-right');
            } else {
                current.classList.add('slide-out-right');
                next.classList.add('slide-in-left');
            }
            
            // After animation completes
            setTimeout(() => {
                // Remove all animation classes
                current.classList.remove('slide-out-left', 'slide-out-right');
                next.classList.remove('slide-in-right', 'slide-in-left');
                
                // Add active class to new slide
                next.classList.add('active');
                
                // Update pills
                updateActivePill(slideIndex);
                
                isAnimating = false;
            }, 500);
            
            currentSlide = slideIndex;
        }
        
        // Update active pill
        function updateActivePill(index) {
            sliderPills.forEach(pill => pill.classList.remove('active'));
            sliderPills[index].classList.add('active');
        }
        
        // Next slide function
        function nextSlide() {
            const nextIndex = (currentSlide + 1) % sliderSlides.length;
            goToSlide(nextIndex, 'next');
        }
        
        // Previous slide function
        function prevSlide() {
            const prevIndex = (currentSlide - 1 + sliderSlides.length) % sliderSlides.length;
            goToSlide(prevIndex, 'prev');
        }
        
        // Add click events to pills
        sliderPills.forEach((pill, index) => {
            pill.addEventListener('click', () => {
                const direction = index > currentSlide ? 'next' : 'prev';
                goToSlide(index, direction);
            });
        });
        
        // Navigation arrows
        if (sliderNext) {
            sliderNext.addEventListener('click', nextSlide);
        }
        
        if (sliderPrev) {
            sliderPrev.addEventListener('click', prevSlide);
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
        
        // Touch/swipe functionality
        let startX = 0;
        let endX = 0;
        const swipeThreshold = 50;
        
        sliderContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        
        sliderContainer.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        }, { passive: true });
        
        sliderContainer.addEventListener('touchend', () => {
            const diffX = startX - endX;
            
            if (Math.abs(diffX) > swipeThreshold) {
                if (diffX > 0) {
                    // Swipe left
                    nextSlide();
                } else {
                    // Swipe right
                    prevSlide();
                }
            }
        });
        
        // Mouse drag/swipe functionality for desktop
        let mouseDown = false;
        let mouseStartX = 0;
        let mouseEndX = 0;
        
        sliderContainer.addEventListener('mousedown', (e) => {
            mouseDown = true;
            mouseStartX = e.clientX;
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!mouseDown) return;
            mouseEndX = e.clientX;
        });
        
        document.addEventListener('mouseup', () => {
            if (!mouseDown) return;
            
            const diffX = mouseStartX - mouseEndX;
            
            if (Math.abs(diffX) > swipeThreshold) {
                if (diffX > 0) {
                    // Swipe left
                    nextSlide();
                } else {
                    // Swipe right
                    prevSlide();
                }
            }
            
            mouseDown = false;
        });
    }
});
    
   

// ============================================
// HELPER FUNCTIONS
// ============================================

// Toast notification function
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#f44336' : type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 12px 24px;
        border-radius: 4px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add CSS animations for toast
if (!document.querySelector('#toast-animations')) {
    const style = document.createElement('style');
    style.id = 'toast-animations';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .error {
            border-color: #f44336 !important;
        }
        
        .error:focus {
            box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.2) !important;
        }
    `;
    document.head.appendChild(style);
}// Newsroom JavaScript - Modular and Clean
(function() {
    'use strict';

    // ============================================
    // CONFIGURATION
    // ============================================
    const CONFIG = {
        animationSpeed: 300,
        swipeThreshold: 50,
        debounceDelay: 200
    };

    // ============================================
    // DOM ELEMENT REFERENCES
    // ============================================
    const DOM = {
        filterTabs: null,
        newsCards: null,
        searchInput: null,
        backToTopBtn: null,
        featuredImage: null,
        newsImages: null
    };

    // ============================================
    // STATE MANAGEMENT
    // ============================================
    const STATE = {
        currentFilter: 'all',
        isLoading: false,
        searchTerm: ''
    };

    // ============================================
    // INITIALIZATION
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Newsroom page loaded');
        
        // Cache DOM elements
        cacheDomElements();
        
        // Initialize features
        initializeNewsFilter();
        initializeSearch();
        initializeBackToTop();
        initializeImageLoading();
        initializeActiveNav();
        
        // Set up event listeners
        setupEventListeners();
    });

    // ============================================
    // DOM ELEMENT CACHING
    // ============================================
    function cacheDomElements() {
        DOM.filterTabs = document.querySelectorAll('.filter-tab');
        DOM.newsCards = document.querySelectorAll('.news-card');
        DOM.searchInput = document.getElementById('searchInput');
        DOM.backToTopBtn = document.getElementById('backToTop');
        DOM.featuredImage = document.querySelector('.featured-image img');
        DOM.newsImages = document.querySelectorAll('.news-image img');
    }

    // ============================================
    // NEWS FILTER FUNCTIONALITY
    // ============================================
    function initializeNewsFilter() {
        if (!DOM.filterTabs || !DOM.newsCards) return;

        DOM.filterTabs.forEach(tab => {
            tab.addEventListener('click', handleFilterClick);
        });
    }

    function handleFilterClick(e) {
        const tab = e.currentTarget;
        const category = tab.dataset.category;
        
        if (STATE.currentFilter === category) return;
        
        // Update active tab
        DOM.filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update state
        STATE.currentFilter = category;
        
        // Filter news cards
        filterNewsCards(category);
    }

    function filterNewsCards(category) {
        DOM.newsCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const shouldShow = category === 'all' || cardCategory === category;
            
            if (shouldShow) {
                showCardWithAnimation(card);
            } else {
                hideCardWithAnimation(card);
            }
        });
    }

    function showCardWithAnimation(card) {
        card.style.display = 'flex';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }

    function hideCardWithAnimation(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.display = 'none';
        }, CONFIG.animationSpeed);
    }

    // ============================================
    // SEARCH FUNCTIONALITY
    // ============================================
    function initializeSearch() {
        if (!DOM.searchInput) return;

        const debouncedSearch = debounce(handleSearch, CONFIG.debounceDelay);
        DOM.searchInput.addEventListener('input', debouncedSearch);
    }

    function handleSearch(e) {
        STATE.searchTerm = e.target.value.toLowerCase().trim();
        
        DOM.newsCards.forEach(card => {
            const title = card.querySelector('.news-title').textContent.toLowerCase();
            const category = card.querySelector('.news-category').textContent.toLowerCase();
            const cardCategory = card.dataset.category;
            
            const matchesSearch = title.includes(STATE.searchTerm) || 
                                 category.includes(STATE.searchTerm);
            const matchesFilter = STATE.currentFilter === 'all' || 
                                 cardCategory === STATE.currentFilter;
            
            if (matchesSearch && matchesFilter) {
                showCardWithAnimation(card);
            } else {
                hideCardWithAnimation(card);
            }
        });
    }

    // ============================================
    // BACK TO TOP FUNCTIONALITY
    // ============================================
    function initializeBackToTop() {
        if (!DOM.backToTopBtn) return;

        window.addEventListener('scroll', toggleBackToTopButton);
        
        DOM.backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    function toggleBackToTopButton() {
        if (!DOM.backToTopBtn) return;
        
        if (window.pageYOffset > 300) {
            DOM.backToTopBtn.classList.add('visible');
        } else {
            DOM.backToTopBtn.classList.remove('visible');
        }
    }

    // ============================================
    // IMAGE LOADING AND ANIMATIONS
    // ============================================
    function initializeImageLoading() {
        const images = [...(DOM.newsImages || []), ...(DOM.featuredImage ? [DOM.featuredImage] : [])];
        
        images.forEach(img => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            if (img.complete) {
                img.style.opacity = '1';
            } else {
                img.addEventListener('load', function() {
                    this.style.opacity = '1';
                });
                
                img.addEventListener('error', function() {
                    console.warn('Failed to load image:', this.src);
                    this.style.opacity = '1';
                    this.style.filter = 'grayscale(100%)';
                });
            }
        });
    }

    // ============================================
    // ACTIVE NAVIGATION HIGHLIGHTING
    // ============================================
    function initializeActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'pandaads.html';
        const navItems = document.querySelectorAll('.nav-item a, .mobile-nav-item a');
        
        navItems.forEach(item => {
            const href = item.getAttribute('href');
            
            // Check if this link points to the current page
            if (href && (href.includes(currentPage) || 
                (currentPage === '' && href.includes('pandaads.html')))) {
                
                // Remove active class from all items
                navItems.forEach(i => i.parentElement.classList.remove('active'));
                
                // Add active class to current item
                item.parentElement.classList.add('active');
                
                // If it's in a dropdown, highlight the parent too
                const dropdown = item.closest('.dropdown');
                if (dropdown) {
                    dropdown.classList.add('active');
                }
            }
        });
    }

    // ============================================
    // EVENT LISTENER SETUP
    // ============================================
    function setupEventListeners() {
        // Keyboard navigation for filter tabs
        document.addEventListener('keydown', function(e) {
            if (e.target.classList.contains('filter-tab')) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.target.click();
                }
            }
            
            // Arrow key navigation for filter tabs
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                navigateFilterTabs(e.key);
            }
        });
        
        // Resize observer for responsive adjustments
        const resizeObserver = new ResizeObserver(debounce(handleResize, 250));
        resizeObserver.observe(document.body);
    }

    function navigateFilterTabs(direction) {
        if (!DOM.filterTabs.length) return;
        
        const currentIndex = Array.from(DOM.filterTabs).findIndex(tab => tab.classList.contains('active'));
        let newIndex;
        
        if (direction === 'ArrowRight') {
            newIndex = (currentIndex + 1) % DOM.filterTabs.length;
        } else if (direction === 'ArrowLeft') {
            newIndex = (currentIndex - 1 + DOM.filterTabs.length) % DOM.filterTabs.length;
        }
        
        if (newIndex !== undefined) {
            DOM.filterTabs[newIndex].click();
            DOM.filterTabs[newIndex].focus();
        }
    }

    function handleResize() {
        // Adjust card layout if needed
        DOM.newsCards.forEach(card => {
            if (window.innerWidth < 768) {
                card.style.minHeight = 'auto';
            } else {
                card.style.minHeight = '';
            }
        });
    }

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ============================================
    // EXPORT PUBLIC FUNCTIONS (if needed)
    // ============================================
    window.Newsroom = {
        filterByCategory: function(category) {
            if (DOM.filterTabs) {
                const tab = Array.from(DOM.filterTabs).find(t => t.dataset.category === category);
                if (tab) tab.click();
            }
        },
        
        search: function(term) {
            if (DOM.searchInput) {
                DOM.searchInput.value = term;
                DOM.searchInput.dispatchEvent(new Event('input'));
            }
        },
        
        refresh: function() {
            cacheDomElements();
            initializeNewsFilter();
        }
    };

    // ============================================
    // ERROR HANDLING
    // ============================================
    window.addEventListener('error', function(e) {
        console.error('Newsroom script error:', e.error);
    });

    // Log initialization
    console.log('Newsroom module initialized');
})();

// Optional: Intersection Observer for lazy loading
if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    // Observe lazy images
    document.querySelectorAll('img[data-src]').forEach(img => {
        lazyImageObserver.observe(img);
    });
}

// Optional: Add performance monitoring
if (window.performance) {
    window.addEventListener('load', function() {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Client-side validation
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Get submit button
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.textContent;

        // Show loading state
        button.textContent = 'Submitting...';
        button.disabled = true;

        // Simulate form submission (replace with real fetch/AJAX for production)
        setTimeout(() => {
            alert('Thank you! Your message has been sent successfully.');
            form.reset();
            button.textContent = originalText;
            button.disabled = false;
        }, 1500);
    });
});