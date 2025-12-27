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
    acceptCookiesBtn.addEventListener('click', acceptCookies);
    
    // Mobile navigation
    mobileMenuBtn.addEventListener('click', toggleMobileNav);
    closeMobileNavBtn.addEventListener('click', toggleMobileNav);
    
    // Shortlist functionality
    shortlistToggleBtn.addEventListener('click', toggleShortlistModal);
    closeShortlistBtn.addEventListener('click', toggleShortlistModal);
    
    // Close modal when clicking outside
    shortlistModal.addEventListener('click', (e) => {
        if (e.target === shortlistModal) {
            toggleShortlistModal();
        }
    });
    
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
}

// Cookie Functions
function acceptCookies() {
    cookieAccepted = true;
    localStorage.setItem('cookieAccepted', 'true');
    cookieBanner.style.display = 'none';
    
    // You can add analytics initialization here
    console.log('Cookies accepted. Analytics can be initialized.');
}

// Mobile Navigation
function toggleMobileNav() {
    mobileNav.classList.toggle('active');
    
    // Toggle hamburger animation
    const spans = mobileMenuBtn.querySelectorAll('span');
    if (mobileNav.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
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
    shortlistCount.textContent = shortlistedJobs.length;
}

function updateShortlistModal() {
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
            // In a real app, this would make an API call
            console.log('Searching for:', searchTerm);
            showNotification(`Searching for "${searchTerm}"...`);
            
            // Example: Redirect to jobs page with search term
            // window.location.href = `/jobs?search=${encodeURIComponent(searchTerm)}`;
        } else {
            showNotification('Please enter a search term', 'error');
        }
    }
}

// Animations
function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.count);
        const suffix = stat.textContent.includes('+') ? '+' : '';
        animateNumber(stat, 0, target, 1500);
    });
}

function animateNumber(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = currentValue + (element.textContent.includes('+') ? '+' : '');
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

// Utility Functions
function showNotification(message, type = 'success') {
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
        gap: 12px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation keyframes
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// Add notification styles to head
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    
    .notification button {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        font-size: 14px;
    }
`;
document.head.appendChild(notificationStyles);

// Close mobile nav when clicking a link
document.querySelectorAll('.mobile-nav-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (!e.target.querySelector('i')) { // Don't close for dropdown toggles
            toggleMobileNav();
        }
    });
});

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
});// Hero search functionality
const heroSearchInput = document.getElementById('hero-search-input');
const searchIcon = document.querySelector('.search-icon');

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
        performSearch(this.value);
    }
});

// Handle search on icon click (optional)
searchIcon.addEventListener('click', function() {
    performSearch(heroSearchInput.value);
});

function performSearch(query) {
    if (query.trim()) {
        // Redirect to jobs page with search query
        window.location.href = `/jobs?search=${encodeURIComponent(query.trim())}`;
    } else {
        // Redirect to jobs page without query
        window.location.href = '/jobs';
    }
}