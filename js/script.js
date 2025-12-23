// News Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const sliderWrapper = document.querySelector('.news-slider-wrapper');
    const slides = document.querySelectorAll('.news-slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (!sliderWrapper || !slides.length) return;
    
    let currentSlide = 0;
    let slidesPerView = 3; // Default for desktop
    let totalSlides = slides.length;
    
    // Calculate slides per view based on screen width
    function updateSlidesPerView() {
        if (window.innerWidth <= 767) {
            slidesPerView = 1;
        } else if (window.innerWidth <= 1199) {
            slidesPerView = 2;
        } else {
            slidesPerView = 3;
        }
    }
    
    // Initialize
    updateSlidesPerView();
    
    // Update slide position
    function updateSliderPosition() {
        const slideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(sliderWrapper).gap);
        const translateX = -currentSlide * slideWidth;
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
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
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
    
    // Initialize button states
    updateButtonStates();
    
    // Optional: Auto-slide functionality (uncomment if needed)
    /*
    let autoSlideInterval;
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(function() {
            const maxSlide = Math.max(0, totalSlides - slidesPerView);
            if (currentSlide >= maxSlide) {
                currentSlide = 0;
            } else {
                currentSlide++;
            }
            updateSliderPosition();
        }, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Start auto-slide
    startAutoSlide();
    
    // Pause auto-slide on hover
    sliderWrapper.addEventListener('mouseenter', stopAutoSlide);
    sliderWrapper.addEventListener('mouseleave', startAutoSlide);
    
    // Pause auto-slide when interacting with buttons
    if (nextBtn) {
        nextBtn.addEventListener('mouseenter', stopAutoSlide);
        nextBtn.addEventListener('mouseleave', startAutoSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('mouseenter', stopAutoSlide);
        prevBtn.addEventListener('mouseleave', startAutoSlide);
    }
    */
});