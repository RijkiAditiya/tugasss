// ==================== 1. TYPING EFFECT ====================
const typingText = document.getElementById('typing-text');
if (typingText) {
    const words = ['SEWA MOBIL MEWAH', 'DENGAN SOPIR DI JAKARTA'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typingText.innerHTML = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.innerHTML = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeEffect, 500);
        } else {
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
    }
    typeEffect();
}

// ==================== 2. SCROLL REVEAL ANIMATION ====================
const revealElements = document.querySelectorAll('.feature-card, .service-item, .car-card, .mini-car-card');

const revealOnScroll = () => {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight - 100) {
            el.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// ==================== 3. CAROUSEL / SLIDER ====================
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.carousel-dots');
let currentSlide = 0;
let autoSlideInterval;

function updateCarousel() {
    const wrapper = document.querySelector('.carousel-wrapper');
    if (wrapper) {
        wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
    resetAutoSlide();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
    resetAutoSlide();
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 5000);
}

if (dotsContainer && slides.length > 0) {
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
            resetAutoSlide();
        });
        dotsContainer.appendChild(dot);
    });
}

if (prevBtn) prevBtn.addEventListener('click', prevSlide);
if (nextBtn) nextBtn.addEventListener('click', nextSlide);

if (slides.length > 0) {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

// ==================== 4. FILTER MOBIL (BERFUNGSI) ====================
const filterChips = document.querySelectorAll('.filter-chip');
const carList = document.getElementById('car-list');
let allCars = [];

if (carList) {
    allCars = Array.from(carList.querySelectorAll('.mini-car-card'));
    const originalOrder = [...allCars];
    
    filterChips.forEach(chip => {
        chip.addEventListener('click', function() {
            filterChips.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            allCars.forEach(car => {
                const category = car.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    car.style.display = 'block';
                    car.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    car.style.display = 'none';
                }
            });
            
            if (filterValue !== 'all') {
                const filteredCars = allCars.filter(car => car.getAttribute('data-category') === filterValue);
                const otherCars = allCars.filter(car => car.getAttribute('data-category') !== filterValue);
                const reordered = [...filteredCars, ...otherCars];
                reordered.forEach(car => carList.appendChild(car));
            } else {
                originalOrder.forEach(car => carList.appendChild(car));
            }
        });
    });
}

// ==================== 5. COUNTER ANIMATION ====================
const counters = document.querySelectorAll('.feature-number-circle');
let counted = false;

function animateCounters() {
    if (counted) return;
    
    counters.forEach(counter => {
        const target = counter.getAttribute('data-count');
        let current = 0;
        const increment = target / 30;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                setTimeout(updateCounter, 30);
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    });
    counted = true;
}

const featuresSection = document.querySelector('.features-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
});
if (featuresSection) observer.observe(featuresSection);

// ==================== 6. PULSE ANIMATION ON BUTTON ====================
const pulseBtn = document.querySelector('.pulse-btn');
if (pulseBtn) {
    setInterval(() => {
        pulseBtn.classList.add('pulse-animation');
        setTimeout(() => {
            pulseBtn.classList.remove('pulse-animation');
        }, 500);
    }, 3000);
}

// ==================== 7. SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==================== 8. TOMBOL PESAN ====================
const allPesan = document.querySelectorAll('.btn-primary, .top-cta, .btn-outline');
allPesan.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
        
        alert('Terima kasih! Tim VIP akan menghubungi Anda untuk pemesanan mobil mewah.');
    });
});

// ==================== 9. FEATURE LINK ====================
const featureLinks = document.querySelectorAll('.feature-link');
featureLinks.forEach(link => {
    link.addEventListener('click', () => {
        alert('Info lebih lanjut tentang layanan ini akan segera kami sampaikan.');
    });
});

// ==================== 10. PARALLAX EFFECT ON HERO ====================
window.addEventListener('scroll', () => {
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        const scrolled = window.pageYOffset;
        heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// ==================== 11. SOCIAL MEDIA CLICK ====================
const socialIcons = document.querySelectorAll('.social-icons i');
socialIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        alert('Terhubung dengan media sosial kami untuk informasi terbaru!');
    });
});

console.log('VIP Luxury Car Rental - Website Loaded Successfully!');
