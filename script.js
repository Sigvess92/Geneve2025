// DOM Elements
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Carousel elements
const carouselSlides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Schedule elements
const scheduleNavBtns = document.querySelectorAll('.schedule-nav-btn');
const scheduleDays = document.querySelectorAll('.schedule-day');

// Mobile navigation toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Carousel functionality
let currentSlide = 0;
const totalSlides = carouselSlides.length;

function showSlide(index) {
    // Hide all slides
    carouselSlides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Show current slide
    carouselSlides[index].classList.add('active');
    indicators[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Carousel navigation
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Indicator navigation
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto-advance carousel
let carouselInterval = setInterval(nextSlide, 5000);

// Pause auto-advance on hover
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
});

carousel.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(nextSlide, 5000);
});

// Touch support for carousel
let startX = 0;
let endX = 0;

carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

carousel.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Prevent scrolling
});

carousel.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    const deltaX = startX - endX;

    if (Math.abs(deltaX) > 50) { // Minimum swipe distance
        if (deltaX > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
});

// Schedule navigation
function showScheduleDay(dayNumber) {
    // Hide all days
    scheduleDays.forEach(day => day.classList.remove('active'));
    scheduleNavBtns.forEach(btn => btn.classList.remove('active'));

    // Show selected day
    const selectedDay = document.getElementById(`day-${dayNumber}`);
    const selectedBtn = document.querySelector(`[data-day="${dayNumber}"]`);

    if (selectedDay && selectedBtn) {
        selectedDay.classList.add('active');
        selectedBtn.classList.add('active');
    }
}

// Schedule navigation event listeners
scheduleNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const dayNumber = btn.getAttribute('data-day');
        showScheduleDay(dayNumber);
    });
});

// Keyboard navigation for schedule (arrow keys)
document.addEventListener('keydown', (e) => {
    const activeBtn = document.querySelector('.schedule-nav-btn.active');
    if (!activeBtn) return;

    const currentDay = parseInt(activeBtn.getAttribute('data-day'));
    let newDay = currentDay;

    if (e.key === 'ArrowLeft' && currentDay > 1) {
        newDay = currentDay - 1;
    } else if (e.key === 'ArrowRight' && currentDay < scheduleNavBtns.length) {
        newDay = currentDay + 1;
    }

    if (newDay !== currentDay) {
        showScheduleDay(newDay);
    }
});

// Header background change on scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe info cards for animations
document.querySelectorAll('.info-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
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

// Throttled scroll handler for performance
let ticking = false;
function handleScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateActiveNavLink();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', handleScroll);

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Show first slide
    showSlide(0);

    // Show first day
    showScheduleDay(1);

    // Update nav on load
    updateActiveNavLink();
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu if open when resizing to desktop
    if (window.innerWidth > 768) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Prevent carousel auto-advance when page is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(carouselInterval);
    } else {
        carouselInterval = setInterval(nextSlide, 5000);
    }
});