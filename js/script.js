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
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function() {
            // Toggle mobile menu visibility
            mobileNav.classList.toggle('active');
            
            // Toggle hamburger animation
            this.classList.toggle('active');
            
            // Animate hamburger lines
            if (this.classList.contains('active')) {
                hamburgerLines[0].classList.add('rotate-45');
                hamburgerLines[1].classList.add('opacity-0');
                hamburgerLines[2].classList.add('rotate--45');
            } else {
                hamburgerLines[0].classList.remove('rotate-45');
                hamburgerLines[1].classList.remove('opacity-0');
                hamburgerLines[2].classList.remove('rotate--45');
                
                // Close all dropdowns when closing main menu
                document.querySelectorAll('.mobile-dropdown-menu').forEach(menu => {
                    menu.classList.remove('active');
                });
                document.querySelectorAll('.mobile-dropdown-toggle i').forEach(icon => {
                    icon.classList.remove('rotate-180');
                });
            }
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.mobile-nav-item a').forEach(link => {
            link.addEventListener('click', function(e) {
                // Don't close if it's a dropdown toggle
                if (!this.classList.contains('mobile-dropdown-toggle')) {
                    mobileNav.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                    hamburgerLines[0].classList.remove('rotate-45');
                    hamburgerLines[1].classList.remove('opacity-0');
                    hamburgerLines[2].classList.remove('rotate--45');
                }
            });
        });
    }
    
    // ============================================
    // MOBILE DROPDOWN TOGGLE
    // ============================================
    
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const dropdownMenu = this.nextElementSibling;
            const chevronIcon = this.querySelector('i');
            
            // Toggle current dropdown
            dropdownMenu.classList.toggle('active');
            chevronIcon.classList.toggle('rotate-180');
            
            // Close other dropdowns
            document.querySelectorAll('.mobile-dropdown-menu').forEach(menu => {
                if (menu !== dropdownMenu) {
                    menu.classList.remove('active');
                }
            });
            
            document.querySelectorAll('.mobile-dropdown-toggle i').forEach(icon => {
                if (icon !== chevronIcon) {
                    icon.classList.remove('rotate-180');
                }
            });
        });
    });
    
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
                hamburgerLines[0].classList.remove('rotate-45');
                hamburgerLines[1].classList.remove('opacity-0');
                hamburgerLines[2].classList.remove('rotate--45');
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
                // For now, just log and close
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
    // NEWS SLIDER FUNCTIONALITY
    // ============================================
    
    const sliderWrapper = document.querySelector('.news-slider-wrapper');
    const slides = document.querySelectorAll('.news-slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (sliderWrapper && slides.length > 0 && prevBtn && nextBtn) {
        let currentSlide = 0;
        let slidesPerView = 3; // Default for desktop
        let totalSlides = slides.length;
        let slideWidth = 0;
        let gap = 0;
        
        // Calculate slides per view based on screen width
        function updateSlidesPerView() {
            if (window.innerWidth <= 767) {
                slidesPerView = 1;
            } else if (window.innerWidth <= 1199) {
                slidesPerView = 2;
            } else {
                slidesPerView = 3;
            }
            
            // Update slide width calculation
            if (slides[0]) {
                const slideStyle = getComputedStyle(slides[0]);
                slideWidth = slides[0].offsetWidth;
                gap = parseInt(getComputedStyle(sliderWrapper).gap) || 0;
            }
        }
        
        // Update slider position
        function updateSliderPosition() {
            if (slideWidth === 0) updateSlidesPerView();
            
            const totalWidth = slideWidth + gap;
            const translateX = -currentSlide * totalWidth;
            sliderWrapper.style.transform = `translateX(${translateX}px)`;
            
            // Update button states
            updateButtonStates();
        }
        
        // Update button states (enable/disable)
        function updateButtonStates() {
            if (prevBtn) {
                prevBtn.disabled = currentSlide === 0;
                prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
                prevBtn.style.cursor = currentSlide === 0 ? 'not-allowed' : 'pointer';
            }
            
            if (nextBtn) {
                const maxSlide = Math.max(0, totalSlides - slidesPerView);
                nextBtn.disabled = currentSlide >= maxSlide;
                nextBtn.style.opacity = currentSlide >= maxSlide ? '0.5' : '1';
                nextBtn.style.cursor = currentSlide >= maxSlide ? 'not-allowed' : 'pointer';
            }
        }
        
        // Next slide
        function nextSlide() {
            const maxSlide = Math.max(0, totalSlides - slidesPerView);
            if (currentSlide < maxSlide) {
                currentSlide++;
                updateSliderPosition();
            }
        }
        
        // Previous slide
        function prevSlide() {
            if (currentSlide > 0) {
                currentSlide--;
                updateSliderPosition();
            }
        }
        
        // Event listeners for navigation buttons
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                updateSlidesPerView();
                // Reset to first slide if current slide would be out of bounds
                const maxSlide = Math.max(0, totalSlides - slidesPerView);
                if (currentSlide > maxSlide) {
                    currentSlide = maxSlide;
                }
                updateSliderPosition();
            }, 250);
        });
        
        // Initialize
        updateSlidesPerView();
        updateButtonStates();
        
        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        sliderWrapper.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        sliderWrapper.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});
        
        function handleSwipe() {
            const swipeThreshold = 50;
            
            if (touchStartX - touchEndX > swipeThreshold) {
                // Swipe left - next slide
                nextSlide();
            }
            
            if (touchEndX - touchStartX > swipeThreshold) {
                // Swipe right - previous slide
                prevSlide();
            }
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
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
                        hamburgerLines[0].classList.remove('rotate-45');
                        hamburgerLines[1].classList.remove('opacity-0');
                        hamburgerLines[2].classList.remove('rotate--45');
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Adjust for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ============================================
    // LAZY LOAD IMAGES
    // ============================================
    
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    }
    
    // ============================================
    // RESPONSIVE IMAGE HANDLING
    // ============================================
    
    function handleResponsiveImages() {
        // You can add responsive image handling here if needed
        // For example, swapping images based on screen size
    }
    
    // Initial call
    handleResponsiveImages();
    
    // Call on resize
    window.addEventListener('resize', handleResponsiveImages);
    
    // ============================================
    // FORM VALIDATION (if you have forms)
    // ============================================
    
    // Example form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Add your form validation logic here
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'red';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });
    
    // ============================================
    // ADDITIONAL ENHANCEMENTS
    // ============================================
    
    // Add loading state to buttons
    document.querySelectorAll('.btn, .search-submit').forEach(button => {
        button.addEventListener('click', function() {
            // You can add a loading spinner here if needed
            // this.classList.add('loading');
        });
    });
    
    // Add hover effects for dropdowns (desktop)
    const desktopDropdowns = document.querySelectorAll('.dropdown');
    desktopDropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            const menu = this.querySelector('.dropdown-menu');
            if (menu) menu.style.display = 'block';
        });
        
        dropdown.addEventListener('mouseleave', function() {
            const menu = this.querySelector('.dropdown-menu');
            if (menu) menu.style.display = 'none';
        });
    });
    
    // Close dropdowns when clicking outside (desktop)
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
            });
        }
    });
    
    // ============================================
    // PERFORMANCE OPTIMIZATION
    // ============================================
    
    // Debounce function for resize events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Optimized resize handler
    const optimizedResize = debounce(function() {
        // Handle responsive updates here
        if (typeof updateSlidesPerView === 'function') {
            updateSlidesPerView();
        }
        handleResponsiveImages();
    }, 250);
    
    window.addEventListener('resize', optimizedResize);
    
    // ============================================
    // NEW: CLEAN SLIDER FUNCTIONALITY
    // ============================================
    
    // Initialize all sliders on the page
    initializeSliders();

});

// ============================================
// CLEAN SLIDER CLASS
// ============================================

class CleanSlider {
    constructor(containerSelector = '.slider-wrapper') {
        // DOM Elements
        this.container = document.querySelector(containerSelector);
        if (!this.container) {
            console.error(`Slider container not found: ${containerSelector}`);
            return;
        }
        
        this.slider = this.container.querySelector('.slider');
        this.slides = Array.from(this.container.querySelectorAll('.slide'));
        this.prevBtn = this.container.querySelector('.slider-prev');
        this.nextBtn = this.container.querySelector('.slider-next');
        this.paginationDots = Array.from(this.container.querySelectorAll('.pagination-dot'));
        
        // State
        this.currentSlideIndex = 0;
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 seconds
        this.isTransitioning = false;
        this.transitionDuration = 500; // milliseconds
        
        // Initialize
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) {
            console.error('No slides found');
            return;
        }
        
        // Show first slide
        this.showSlide(0);
        
        // Event Listeners
        this.setupEventListeners();
        
        // Start autoplay
        this.startAutoPlay();
        
        // Add keyboard navigation
        this.setupKeyboardNavigation();
    }
    
    setupEventListeners() {
        // Previous button
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prevSlide();
                this.resetAutoPlay();
            });
            
            // Add touch/click feedback
            this.prevBtn.addEventListener('mousedown', () => this.addButtonPressEffect(this.prevBtn));
            this.prevBtn.addEventListener('mouseup', () => this.removeButtonPressEffect(this.prevBtn));
            this.prevBtn.addEventListener('mouseleave', () => this.removeButtonPressEffect(this.prevBtn));
        }
        
        // Next button
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.resetAutoPlay();
            });
            
            // Add touch/click feedback
            this.nextBtn.addEventListener('mousedown', () => this.addButtonPressEffect(this.nextBtn));
            this.nextBtn.addEventListener('mouseup', () => this.removeButtonPressEffect(this.nextBtn));
            this.nextBtn.addEventListener('mouseleave', () => this.removeButtonPressEffect(this.nextBtn));
        }
        
        // Pagination dots
        this.paginationDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoPlay();
            });
            
            // Add touch/click feedback
            dot.addEventListener('mousedown', () => this.addButtonPressEffect(dot));
            dot.addEventListener('mouseup', () => this.removeButtonPressEffect(dot));
            dot.addEventListener('mouseleave', () => this.removeButtonPressEffect(dot));
        });
        
        // Pause autoplay on hover
        this.container.addEventListener('mouseenter', () => this.pauseAutoPlay());
        this.container.addEventListener('mouseleave', () => this.resumeAutoPlay());
        
        // Touch/swipe support
        this.setupTouchEvents();
    }
    
    setupKeyboardNavigation() {
        const handleKeydown = (e) => {
            if (!document.activeElement.closest('.slider-wrapper')) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.prevSlide();
                    this.resetAutoPlay();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextSlide();
                    this.resetAutoPlay();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(0);
                    this.resetAutoPlay();
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.totalSlides - 1);
                    this.resetAutoPlay();
                    break;
                case ' ':
                case 'Spacebar':
                    e.preventDefault();
                    this.toggleAutoPlay();
                    break;
            }
        };
        
        this.handleKeydown = handleKeydown;
        document.addEventListener('keydown', handleKeydown);
    }
    
    setupTouchEvents() {
        let touchStartX = 0;
        let touchEndX = 0;
        const minSwipeDistance = 50;
        
        this.container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            this.pauseAutoPlay();
        }, { passive: true });
        
        this.container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX, minSwipeDistance);
            this.resumeAutoPlay();
        }, { passive: true });
    }
    
    handleSwipe(startX, endX, minDistance) {
        const distance = startX - endX;
        
        if (Math.abs(distance) < minDistance) return;
        
        if (distance > 0) {
            // Swipe left - next slide
            this.nextSlide();
        } else {
            // Swipe right - previous slide
            this.prevSlide();
        }
        
        this.resetAutoPlay();
    }
    
    showSlide(index) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        // Hide all slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
            slide.setAttribute('aria-hidden', 'true');
            slide.removeAttribute('aria-current');
        });
        
        // Update pagination dots
        this.paginationDots.forEach((dot, dotIndex) => {
            dot.classList.remove('active');
            dot.setAttribute('aria-selected', 'false');
            
            if (dotIndex === index) {
                dot.classList.add('active');
                dot.setAttribute('aria-selected', 'true');
            }
        });
        
        // Show current slide
        this.slides[index].classList.add('active');
        this.slides[index].setAttribute('aria-hidden', 'false');
        this.slides[index].setAttribute('aria-current', 'true');
        
        // Update slide label for screen readers
        this.updateSlideLabel(index);
        
        // Animate slide transition
        this.animateSlideTransition(index);
        
        // Update current index
        this.currentSlideIndex = index;
        
        // Reset transitioning flag after animation
        setTimeout(() => {
            this.isTransitioning = false;
        }, this.transitionDuration);
    }
    
    animateSlideTransition(index) {
        // Remove any existing animation classes
        this.slides.forEach(slide => {
            slide.classList.remove('slide-in-left', 'slide-in-right');
        });
        
        // Determine animation direction
        const animationClass = index > this.currentSlideIndex ? 'slide-in-right' : 'slide-in-left';
        
        // Add animation class to new slide
        this.slides[index].classList.add(animationClass);
        
        // Remove animation class after animation completes
        setTimeout(() => {
            this.slides[index].classList.remove(animationClass);
        }, this.transitionDuration);
    }
    
    updateSlideLabel(index) {
        const slide = this.slides[index];
        const slideNumber = index + 1;
        const totalSlides = this.totalSlides;
        
        // Update aria-label for screen readers
        slide.setAttribute('aria-label', `Slide ${slideNumber} of ${totalSlides}`);
    }
    
    prevSlide() {
        if (this.isTransitioning) return;
        
        let newIndex = this.currentSlideIndex - 1;
        if (newIndex < 0) {
            newIndex = this.totalSlides - 1; // Loop to last slide
        }
        
        this.showSlide(newIndex);
    }
    
    nextSlide() {
        if (this.isTransitioning) return;
        
        let newIndex = this.currentSlideIndex + 1;
        if (newIndex >= this.totalSlides) {
            newIndex = 0; // Loop to first slide
        }
        
        this.showSlide(newIndex);
    }
    
    goToSlide(index) {
        if (this.isTransitioning || index < 0 || index >= this.totalSlides) return;
        
        this.showSlide(index);
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
    
    pauseAutoPlay() {
        this.stopAutoPlay();
    }
    
    resumeAutoPlay() {
        this.startAutoPlay();
    }
    
    toggleAutoPlay() {
        if (this.autoPlayInterval) {
            this.stopAutoPlay();
        } else {
            this.startAutoPlay();
        }
    }
    
    addButtonPressEffect(button) {
        button.style.transform = 'scale(0.95)';
        button.style.transition = 'transform 0.1s ease';
    }
    
    removeButtonPressEffect(button) {
        button.style.transform = 'scale(1)';
    }
    
    // Public methods for external control
    play() {
        this.startAutoPlay();
    }
    
    pause() {
        this.stopAutoPlay();
    }
    
    getCurrentSlide() {
        return this.currentSlideIndex;
    }
    
    getTotalSlides() {
        return this.totalSlides;
    }
    
    // Cleanup method
    destroy() {
        this.stopAutoPlay();
        
        // Remove event listeners
        if (this.handleKeydown) {
            document.removeEventListener('keydown', this.handleKeydown);
        }
    }
}

// ============================================
// SLIDER INITIALIZATION FUNCTION
// ============================================

function initializeSliders() {
    const sliderContainers = document.querySelectorAll('.slider-wrapper:not(.news-slider-wrapper)');
    
    if (sliderContainers.length === 0) return;
    
    const sliders = [];
    
    sliderContainers.forEach((container, index) => {
        const slider = new CleanSlider(container);
        sliders.push(slider);
        
        // Add unique ID for debugging
        container.setAttribute('data-slider-id', index);
    });
    
    // Add CSS for animations if not already present
    addSliderAnimations();
    
    // Store sliders in global scope for debugging
    if (typeof window !== 'undefined') {
        window.cleanSliders = sliders;
    }
    
    return sliders;
}

// ============================================
// CSS ANIMATIONS FOR SLIDERS
// ============================================

function addSliderAnimations() {
    if (document.querySelector('#slider-animations')) return;
    
    const style = document.createElement('style');
    style.id = 'slider-animations';
    style.textContent = `
        /* Slide animations */
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .slide-in-left {
            animation: slideInLeft 0.5s ease forwards;
        }
        
        .slide-in-right {
            animation: slideInRight 0.5s ease forwards;
        }
        
        /* Button press effect */
        .slider-prev:active,
        .slider-next:active,
        .pagination-dot:active {
            transform: scale(0.95);
            transition: transform 0.1s ease;
        }
        
        /* Focus styles for accessibility */
        .slider-prev:focus-visible,
        .slider-next:focus-visible,
        .pagination-dot:focus-visible {
            outline: 2px solid var(--primary-color);
            outline-offset: 2px;
            box-shadow: 0 0 0 3px rgba(255, 43, 133, 0.2);
        }
        
        /* Disabled state for buttons during transition */
        .slider-prev.disabled,
        .slider-next.disabled {
            opacity: 0.5;
            cursor: not-allowed;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// PANDA ADS PAGE SPECIFIC FUNCTIONALITY
// ============================================

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // ANIMATE STATS COUNTER - FIXED VERSION
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
            const increment = targetNumber / 50; // Adjust speed
            const timer = setInterval(() => {
                current += increment;
                if (current >= targetNumber) {
                    current = targetNumber;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + nonNumericParts;
            }, 50);
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
    // TESTIMONIAL CAROUSEL (Optional)
    // ============================================
    
    function initializeTestimonialCarousel() {
        const testimonialGrid = document.querySelector('.testimonials-grid');
        if (!testimonialGrid) return;
        
        // Only enable on mobile
        if (window.innerWidth <= 767) {
            testimonialGrid.classList.add('testimonial-carousel');
            
            // Add navigation dots
            const testimonials = document.querySelectorAll('.testimonial-card');
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'carousel-dots';
            
            testimonials.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.className = 'carousel-dot';
                dot.setAttribute('data-index', index);
                dot.textContent = '○';
                
                dot.addEventListener('click', function() {
                    goToSlide(index);
                });
                
                dotsContainer.appendChild(dot);
            });
            
            testimonialGrid.parentNode.appendChild(dotsContainer);
            
            // Add next/prev buttons
            const prevBtn = document.createElement('button');
            prevBtn.className = 'carousel-prev';
            prevBtn.innerHTML = '‹';
            
            const nextBtn = document.createElement('button');
            nextBtn.className = 'carousel-next';
            nextBtn.innerHTML = '›';
            
            testimonialGrid.parentNode.appendChild(prevBtn);
            testimonialGrid.parentNode.appendChild(nextBtn);
            
            let currentSlide = 0;
            
            function goToSlide(index) {
                currentSlide = index;
                const translateX = -currentSlide * 100;
                testimonialGrid.style.transform = `translateX(${translateX}%)`;
                
                // Update active dot
                document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
                    dot.textContent = i === index ? '●' : '○';
                });
            }
            
            prevBtn.addEventListener('click', () => {
                if (currentSlide > 0) {
                    goToSlide(currentSlide - 1);
                }
            });
            
            nextBtn.addEventListener('click', () => {
                if (currentSlide < testimonials.length - 1) {
                    goToSlide(currentSlide + 1);
                }
            });
            
            // Add CSS for carousel
            const style = document.createElement('style');
            style.textContent = `
                .testimonial-carousel {
                    display: flex;
                    overflow: hidden;
                    transition: transform 0.5s ease;
                }
                
                .testimonial-carousel .testimonial-card {
                    flex: 0 0 100%;
                    min-width: 100%;
                }
                
                .carousel-dots {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    margin-top: 20px;
                }
                
                .carousel-dot {
                    background: none;
                    border: none;
                    font-size: 24px;
                    color: #ccc;
                    cursor: pointer;
                    padding: 0;
                    transition: color 0.3s ease;
                }
                
                .carousel-dot:hover {
                    color: var(--primary-color);
                }
                
                .carousel-prev,
                .carousel-next {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: var(--primary-color);
                    color: white;
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    font-size: 24px;
                    cursor: pointer;
                    z-index: 10;
                }
                
                .carousel-prev {
                    left: 10px;
                }
                
                .carousel-next {
                    right: 10px;
                }
                
                .testimonials {
                    position: relative;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Initialize on load and resize
    window.addEventListener('load', initializeTestimonialCarousel);
    window.addEventListener('resize', initializeTestimonialCarousel);
    
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
    // SMOOTH SCROLL TO CTA SECTION
    // ============================================
    
    const ctaButtons = document.querySelectorAll('a[href="#contact"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ============================================
    // FORM SUBMISSION FOR CONTACT
    // ============================================
    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    // Success message
                    showToast('Message sent successfully! We\'ll contact you soon.', 'success');
                    
                    // Reset form
                    this.reset();
                    
                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                showToast('Please fill in all required fields.', 'error');
            }
        });
        
        // Remove error class on input
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
            });
        });
    }
    
    // ============================================
    // ENHANCE ACCESSIBILITY FOR BRANDS SECTION
    // ============================================
    
    brandLogos.forEach(logo => {
        logo.setAttribute('role', 'button');
        logo.setAttribute('tabindex', '0');
        
        logo.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // ============================================
    // LAZY LOAD FOR CASE STUDY IMAGES
    // ============================================
    
    const caseStudyImages = document.querySelectorAll('.case-study-image img');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: '50px' });
        
        caseStudyImages.forEach(img => {
            if (img.dataset.src) {
                imageObserver.observe(img);
            }
        });
    }
    
    // ============================================
    // STICKY NAVIGATION HIGHLIGHT FOR SECTIONS
    // ============================================
    
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-item a');
    
    function highlightNavOnScroll() {
        let scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // ============================================
    // COPYRIGHT YEAR UPDATE
    // ============================================
    
    const copyrightElement = document.querySelector('.copyright');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace(/2025/g, currentYear);
    }
    
    // ============================================
    // SOCIAL SHARE FUNCTIONALITY
    // ============================================
    
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('aria-label').toLowerCase();
            const currentUrl = encodeURIComponent(window.location.href);
            const pageTitle = encodeURIComponent(document.title);
            
            let shareUrl = '';
            
            switch (platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}&title=${pageTitle}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${pageTitle}`;
                    break;
                default:
                    return;
            }
            
            window.open(shareUrl, '_blank', 'width=600,height=400');
        });
    });
    
    // ============================================
    // PRINT-FRIENDLY STYLES
    // ============================================
    
    const printBtn = document.createElement('button');
    printBtn.className = 'print-btn';
    printBtn.innerHTML = '<i class="fas fa-print"></i> Print Page';
    printBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 4px;
        cursor: pointer;
        z-index: 100;
        display: none;
    `;
    
    document.body.appendChild(printBtn);
    
    printBtn.addEventListener('click', function() {
        window.print();
    });
    
    // Show print button on desktop
    if (window.innerWidth > 768) {
        printBtn.style.display = 'block';
    }
    
    window.addEventListener('resize', function() {
        printBtn.style.display = window.innerWidth > 768 ? 'block' : 'none';
    });
    
    console.log('Panda Ads page JavaScript loaded successfully!');
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

// ============================================
// POLYFILLS (if needed for older browsers)
// ============================================

// IntersectionObserver polyfill
if (!('IntersectionObserver' in window)) {
    // Load polyfill or implement fallback
    console.warn('IntersectionObserver not supported in this browser');
}

// Smooth scroll polyfill
if (!('scrollBehavior' in document.documentElement.style)) {
    // Load polyfill or implement fallback
    console.warn('Smooth scroll not supported in this browser');
}

// Polyfill for forEach on NodeList for older browsers
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}document.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".slider-prev");
    const nextBtn = document.querySelector(".slider-next");
    const dots = document.querySelectorAll(".pagination-dot");

    let currentIndex = 0;
    let autoPlay;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        slides[index].classList.add("active");
        dots[index].classList.add("active");

        currentIndex = index;
    }

    function nextSlide() {
        let index = currentIndex + 1;
        if (index >= slides.length) index = 0;
        showSlide(index);
    }

    function prevSlide() {
        let index = currentIndex - 1;
        if (index < 0) index = slides.length - 1;
        showSlide(index);
    }

    function startAutoPlay() {
        autoPlay = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlay);
    }

    // Buttons
    nextBtn.addEventListener("click", () => {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
    });

    // Pagination
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });

    // Pause on hover
    document.querySelector(".slider-wrapper").addEventListener("mouseenter", stopAutoPlay);
    document.querySelector(".slider-wrapper").addEventListener("mouseleave", startAutoPlay);

    // Init
    showSlide(0);
    startAutoPlay();
});
