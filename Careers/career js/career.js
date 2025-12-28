// DOM Elements
const cookieBanner = document.getElementById('cookie-banner');
const acceptCookiesBtn = document.getElementById('accept-cookies');
const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
const closeMobileNavBtn = document.getElementById('close-mobile-nav');
const shortlistToggleBtn = document.getElementById('shortlist-toggle');
const shortlistModal = document.getElementById('shortlist-modal');
const closeShortlistBtn = document.getElementById('close-shortlist');
const shortlistItemsContainer = document.getElementById('shortlist-items');
const shortlistCount = document.querySelector('.shortlist-count');
const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
const statNumbers = document.querySelectorAll('.stat-number');

// App State
let shortlistedJobs = JSON.parse(localStorage.getItem('shortlistedJobs')) || [];
let cookieAccepted = localStorage.getItem('cookieAccepted') === 'true';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    animateStats();
});

// Initialize App
function initializeApp() {
    // Show cookie banner if not accepted
    if (!cookieAccepted) {
        setTimeout(() => {
            cookieBanner.style.display = 'block';
        }, 1000);
    }
    
    // Update shortlist count
    updateShortlistCount();
    
    // Update shortlist modal content
    updateShortlistModal();
    
    // Mark already shortlisted jobs
    markShortlistedJobs();
}

// Setup Event Listeners
function setupEventListeners() {
    // Cookie banner
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', acceptCookies);
    }
    
    // Mobile navigation - FIXED
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileNav);
    }
    
    if (closeMobileNavBtn) {
        closeMobileNavBtn.addEventListener('click', toggleMobileNav);
    }
    
    // Close mobile nav when clicking outside
    if (mobileNav) {
        mobileNav.addEventListener('click', (e) => {
            if (e.target === mobileNav) {
                toggleMobileNav();
            }
        });
    }
    
    // Shortlist functionality
    if (shortlistToggleBtn) {
        shortlistToggleBtn.addEventListener('click', toggleShortlistModal);
    }
    
    if (closeShortlistBtn) {
        closeShortlistBtn.addEventListener('click', toggleShortlistModal);
    }
    
    // Close modal when clicking outside
    if (shortlistModal) {
        shortlistModal.addEventListener('click', (e) => {
            if (e.target === shortlistModal) {
                toggleShortlistModal();
            }
        });
    }
    
    // Mobile nav dropdowns
    mobileNavItems.forEach(item => {
        const link = item.querySelector('.mobile-nav-link');
        const submenu = item.querySelector('.mobile-submenu');
        
        if (submenu) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                submenu.classList.toggle('active');
                
                // Toggle icon
                const icon = link.querySelector('i');
                icon.classList.toggle('fa-chevron-down');
                icon.classList.toggle('fa-chevron-up');
            });
        }
    });
    
    // Job shortlist buttons
    document.querySelectorAll('.shortlist-job').forEach(button => {
        button.addEventListener('click', (e) => {
            const jobId = e.currentTarget.dataset.jobid;
            toggleJobShortlist(jobId, e.currentTarget);
        });
    });
    
    // Search functionality
    document.querySelectorAll('.search-btn').forEach(button => {
        button.addEventListener('click', performSearch);
    });
    
    // Allow Enter key in search inputs
    document.querySelectorAll('.search-box input').forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch(e);
            }
        });
    });
    
    // Hero search functionality
    const heroSearchInput = document.getElementById('hero-search-input');
    const searchIcon = document.querySelector('.search-icon');
    
    if (heroSearchInput && searchIcon) {
        // Change icon color on focus
        heroSearchInput.addEventListener('focus', function() {
            searchIcon.style.color = 'var(--primary-dark-pink)';
        });
        
        heroSearchInput.addEventListener('blur', function() {
            searchIcon.style.color = 'var(--primary-pink)';
        });
        
        // Handle search on Enter key
        heroSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performHeroSearch(this.value);
            }
        });
        
        // Handle search on icon click (optional)
        searchIcon.addEventListener('click', function() {
            performHeroSearch(heroSearchInput.value);
        });
    }
    
    // Close mobile nav on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            toggleMobileNav();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileNav.classList.contains('active')) {
            toggleMobileNav();
        }
    });
    
    // Close mobile nav when clicking a link (except dropdown toggles)
    document.querySelectorAll('.mobile-nav-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (!e.target.querySelector('i') && !e.currentTarget.querySelector('i')) {
                toggleMobileNav();
            }
        });
    });
}

// Cookie Functions
function acceptCookies() {
    cookieAccepted = true;
    localStorage.setItem('cookieAccepted', 'true');
    cookieBanner.style.display = 'none';
    
    console.log('Cookies accepted. Analytics can be initialized.');
}

// Mobile Navigation - FIXED VERSION
function toggleMobileNav() {
    const isActive = mobileNav.classList.contains('active');
    
    // Toggle mobile nav
    mobileNav.classList.toggle('active');
    
    // Toggle hamburger animation
    const spans = mobileMenuBtn.querySelectorAll('span');
    if (!isActive) {
        // Menu opening
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        document.body.style.overflow = 'hidden';
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
    } else {
        // Menu closing
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        document.body.style.overflow = '';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
}

// Shortlist Functions
function toggleShortlistModal() {
    shortlistModal.style.display = shortlistModal.style.display === 'flex' ? 'none' : 'flex';
}

function toggleJobShortlist(jobId, button) {
    const jobIndex = shortlistedJobs.indexOf(jobId);
    
    if (jobIndex === -1) {
        // Add to shortlist
        shortlistedJobs.push(jobId);
        button.classList.add('shortlisted');
        button.innerHTML = '<i class="fas fa-heart"></i> Shortlisted';
        showNotification('Job added to shortlist!');
    } else {
        // Remove from shortlist
        shortlistedJobs.splice(jobIndex, 1);
        button.classList.remove('shortlisted');
        button.innerHTML = '<i class="far fa-heart"></i> Shortlist';
        showNotification('Job removed from shortlist!');
    }
    
    // Update local storage
    localStorage.setItem('shortlistedJobs', JSON.stringify(shortlistedJobs));
    
    // Update UI
    updateShortlistCount();
    updateShortlistModal();
}

function updateShortlistCount() {
    if (shortlistCount) {
        shortlistCount.textContent = shortlistedJobs.length;
    }
}

function updateShortlistModal() {
    if (!shortlistItemsContainer) return;
    
    if (shortlistedJobs.length === 0) {
        shortlistItemsContainer.innerHTML = '<p class="empty-shortlist">Your shortlist is empty</p>';
        return;
    }
    
    // Get all job cards that are shortlisted
    let shortlistHTML = '';
    
    shortlistedJobs.forEach(jobId => {
        const jobCard = document.querySelector(`.shortlist-job[data-jobid="${jobId}"]`)?.closest('.job-card');
        if (jobCard) {
            const jobTitle = jobCard.querySelector('h3 a').textContent;
            const jobLocation = jobCard.querySelector('.job-location').textContent;
            
            shortlistHTML += `
                <div class="shortlist-item">
                    <h4>${jobTitle}</h4>
                    <p>${jobLocation}</p>
                    <button onclick="removeFromShortlist('${jobId}')" class="btn-remove">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            `;
        }
    });
    
    shortlistItemsContainer.innerHTML = shortlistHTML;
}

function markShortlistedJobs() {
    shortlistedJobs.forEach(jobId => {
        const button = document.querySelector(`.shortlist-job[data-jobid="${jobId}"]`);
        if (button) {
            button.classList.add('shortlisted');
            button.innerHTML = '<i class="fas fa-heart"></i> Shortlisted';
        }
    });
}

// This function will be called from the shortlist modal
window.removeFromShortlist = function(jobId) {
    const button = document.querySelector(`.shortlist-job[data-jobid="${jobId}"]`);
    if (button) {
        toggleJobShortlist(jobId, button);
    }
};

// Search Functionality
function performSearch(e) {
    e.preventDefault();
    
    let searchInput;
    if (e.target.classList.contains('search-btn')) {
        searchInput = e.target.previousElementSibling;
    } else if (e.target.tagName === 'INPUT') {
        searchInput = e.target;
    }
    
    if (searchInput) {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            console.log('Searching for:', searchTerm);
            showNotification(`Searching for "${searchTerm}"...`);
            
            // Example: Redirect to jobs page with search term
            // window.location.href = `/jobs?search=${encodeURIComponent(searchTerm)}`;
        } else {
            showNotification('Please enter a search term', 'error');
        }
    }
}

// Hero Search Functionality
function performHeroSearch(query) {
    if (query && query.trim()) {
        console.log('Hero search for:', query.trim());
        showNotification(`Searching for "${query.trim()}"...`);
        
        // Example redirect (uncomment when needed):
        // window.location.href = `/jobs?search=${encodeURIComponent(query.trim())}`;
    } else {
        // If search is empty, redirect to jobs page
        // window.location.href = '/jobs';
    }
}

// Animations
function animateStats() {
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        const target = parseInt(text.replace('+', ''));
        if (!isNaN(target)) {
            animateNumber(stat, 0, target, 1500);
        }
    });
}

function animateNumber(element, start, end, duration) {
    let startTimestamp = null;
    const suffix = element.textContent.includes('+') ? '+' : '';
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = currentValue + suffix;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

// Utility Functions
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        min-width: 250px;
        max-width: 350px;
    `;
    
    // Add close button styles
    notification.querySelector('button').style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        font-size: 14px;
        opacity: 0.8;
        transition: opacity 0.2s;
    `;
    
    notification.querySelector('button').addEventListener('mouseenter', function() {
        this.style.opacity = '1';
    });
    
    notification.querySelector('button').addEventListener('mouseleave', function() {
        this.style.opacity = '0.8';
    });
    
    // Add animation keyframes if not already added
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 3000);
}

// Expose functions to global scope if needed
window.toggleMobileNav = toggleMobileNav;
window.toggleShortlistModal = toggleShortlistModal;