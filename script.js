// =====================================================
// CodeinBrain - JavaScript Interactivity
// =====================================================

// ==================== HEADER SCROLL EFFECT ====================
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ==================== MOBILE MENU TOGGLE ====================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navSocial = document.querySelector('.nav-social');

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when link is clicked
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = navLinks.contains(event.target) || menuToggle.contains(event.target);
        if (!isClickInside && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

// ==================== FAQ ACCORDION ====================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', function() {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// ==================== SCROLL ANIMATION ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all scroll animation elements
document.querySelectorAll('.scroll-animation').forEach(element => {
    observer.observe(element);
});

// ==================== LEAD POPUP ====================
let leadPopupShown = false;

function closeLead() {
    const popup = document.getElementById('leadPopup');
    if (popup) {
        popup.classList.add('hidden');
        localStorage.setItem('leadPopupClosed', 'true');
    }
}

// Show lead popup after 5 seconds, only once per session
window.addEventListener('load', function() {
    setTimeout(function() {
        const popup = document.getElementById('leadPopup');
        if (popup && !localStorage.getItem('leadPopupClosed')) {
            popup.classList.remove('hidden');
            leadPopupShown = true;
        }
    }, 5000);
});

// Close popup when clicking outside
document.addEventListener('click', function(event) {
    const popup = document.getElementById('leadPopup');
    if (popup && !popup.contains(event.target) && event.target !== popup && 
        !event.target.closest('.lead-popup') && event.target.id !== 'leadPopup') {
        if (leadPopupShown && event.clientX > window.innerWidth * 0.3) {
            // Only close if click is not on the popup
        }
    }
});

// ==================== COUNTER ANIMATION ====================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                if (counter.textContent.includes('+')) {
                    counter.textContent = Math.floor(current) + '+';
                } else if (counter.textContent.includes('%')) {
                    counter.textContent = Math.floor(current) + '%';
                } else {
                    counter.textContent = Math.floor(current) + '+';
                }
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = counter.textContent; // Keep original
            }
        };
        
        // Start animation when element is in view
        observer.observe(counter);
    });
}

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== FORM HANDLING ====================
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Get form data
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');
    
    // Validate form
    if (!name || !email || !message) {
        alert('Please fill in all required fields!');
        return;
    }
    
    // Create WhatsApp message
    const whatsappMessage = `Hello CodeinBrain,\n\nI would like to discuss about your services.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;
    const whatsappUrl = `https://wa.me/919407519026?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    form.reset();
    alert('Thank you for your message! We will contact you shortly.');
}

// Attach form handlers
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', handleFormSubmit);
});

// ==================== COPY EMAIL ON CLICK ====================
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const email = this.getAttribute('href').replace('mailto:', '');
        console.log('Email:', email);
    });
});

// ==================== ANIMATION ON PAGE LOAD ====================
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// ==================== ACTIVE NAV LINK ====================
function setActiveNavLink() {
    const currentLocation = location.pathname;
    const menuItems = document.querySelectorAll('.nav-links a');
    
    menuItems.forEach(item => {
        let itemPath = item.getAttribute('href');
        
        // Remove query strings and hashes for comparison
        if (currentLocation.includes(itemPath.split('#')[0])) {
            item.style.color = 'var(--primary-color)';
            item.style.borderBottom = '2px solid var(--primary-color)';
        }
    });
}

setActiveNavLink();

// ==================== UTILITY FUNCTIONS ====================

// Throttle function for performance
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
    }
}

// Debounce function
function debounce(func, delay) {
    let timeoutId;
    return function() {
        const args = arguments;
        const context = this;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(context, args), delay);
    }
}

// Copy to clipboard function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        alert('Copied to clipboard!');
    }, function(err) {
        console.error('Could not copy text: ', err);
    });
}

// ==================== PERFORMANCE OPTIMIZATION ====================

// Lazy load images if supported
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== TRACKING & ANALYTICS (Optional) ====================

// You can add Google Analytics or other tracking codes here
// Example:
/*
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_ID');
*/

// ==================== KEYBOARD SHORTCUTS ====================

document.addEventListener('keydown', function(event) {
    // Press ? for help
    if (event.key === '?') {
        console.log('CodeinBrain Website - Keyboard Shortcuts');
        console.log('? - Show this help');
        console.log('H - Go to Home');
        console.log('C - Go to Contact');
    }
    
    // Press H to go home
    if (event.key === 'h' || event.key === 'H') {
        window.location.href = '/index.html';
    }
    
    // Press C to go to contact
    if (event.key === 'c' || event.key === 'C') {
        window.location.href = '/contact.html';
    }
});

// ==================== SERVICE FILTER (For Services Page) ====================

function filterServices(category) {
    const services = document.querySelectorAll('.service-card');
    
    services.forEach(service => {
        if (category === 'all') {
            service.style.display = 'block';
            setTimeout(() => service.classList.add('visible'), 10);
        } else {
            if (service.dataset.category === category) {
                service.style.display = 'block';
                setTimeout(() => service.classList.add('visible'), 10);
            } else {
                service.style.display = 'none';
                service.classList.remove('visible');
            }
        }
    });
}

// ==================== CONSULTATION FORM HANDLER ====================

function submitConsultationForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.querySelector('input[name="name"]')?.value;
    const email = form.querySelector('input[name="email"]')?.value;
    const phone = form.querySelector('input[name="phone"]')?.value;
    const service = form.querySelector('select[name="service"]')?.value;
    const budget = form.querySelector('select[name="budget"]')?.value;
    const message = form.querySelector('textarea[name="message"]')?.value;
    
    if (!name || !email || !service) {
        alert('Please fill in all required fields!');
        return;
    }
    
    // Create WhatsApp message for consultation
    const consultationMessage = `Hi CodeinBrain,\n\nI would like to book a free consultation.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService Interested: ${service}\nBudget Range: ${budget}\n\nMessage: ${message}`;
    const whatsappUrl = `https://wa.me/919407519026?text=${encodeURIComponent(consultationMessage)}`;    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    form.reset();
    alert('Thank you! Our team will contact you within 24 hours to confirm your consultation.');
}

// ==================== DEMO MODE ====================

console.log('%c CodeinBrain - Modern IT Solutions', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%c Ready to build your digital presence?', 'color: #0066ff; font-size: 14px;');
console.log('%c Contact us at: hello@codeinbrain.com', 'color: #a0a0a0; font-size: 12px;');
