// Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('loaded');
    }, 4000);
});

// Scroll spy for Hex Nav
const sections = document.querySelectorAll('.screen-section');
const navLinks = document.querySelectorAll('.hex-link');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });

            // Animate intro
            entry.target.classList.add('visible');
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });

}, { threshold: 0.2 });

sections.forEach(sec => {
    sec.style.opacity = 0;
    sec.style.transform = "translateY(50px)";
    sec.style.transition = "all 0.8s ease-out";
    observer.observe(sec);
});

// Smooth Scroll
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dynamic Role Typing Animation
const roles = [
    "SOFTWARE DEVELOPER",
    "RESEARCHER",
    "AI ENGINEER",
    "PROBLEM SOLVER"
];

const roleText = document.getElementById("role-text");
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeRole() {
    if (!roleText) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
        roleText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Faster deletion
    } else {
        roleText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100; // Normal typing
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before new word
    }

    setTimeout(typeRole, typeSpeed);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Start Typing
    setTimeout(typeRole, 1000);
});

// Dossier Tabs
document.querySelectorAll('.dossier-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        document.querySelectorAll('.dossier-tab').forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');

        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        // Show target content
        const target = tab.getAttribute('data-target');
        document.getElementById(target).classList.add('active');
    });
});

