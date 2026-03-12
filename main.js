// Reveal Animations on Scroll
const revealElements = document.querySelectorAll('[data-reveal]');

const reveal = () => {
    revealElements.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Newsletter Form Handling
const newsletterForm = document.getElementById('newsletter-form');
const formFeedback = document.getElementById('form-feedback');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        
        // Simulate API call
        formFeedback.innerText = "Welcome to the Inner Circle, " + email.split('@')[0] + "!";
        formFeedback.style.display = 'block';
        newsletterForm.reset();
        
        setTimeout(() => {
            formFeedback.style.display = 'none';
        }, 5000);
    });
}
