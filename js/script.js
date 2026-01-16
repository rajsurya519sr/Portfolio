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

// Toggle Full Skills Scan
document.getElementById('skill-toggle-btn').addEventListener('click', function () {
    const fullList = document.getElementById('full-skills-list');
    const coreGrid = document.getElementById('core-skills');
    const btn = this;

    // Toggle visibility
    if (fullList.classList.contains('visible')) {
        fullList.classList.remove('visible');
        setTimeout(() => {
            fullList.style.display = 'none';
            coreGrid.style.display = 'flex';
            // Slight delay to allow fade out
            setTimeout(() => {
                coreGrid.style.opacity = '1';
                coreGrid.style.transform = 'translateY(0)';
            }, 50);
        }, 500);

        btn.innerHTML = '<i class="fa-solid fa-expand"></i> INITIALIZE FULL SCAN';
    } else {
        // Hide Core Grid
        coreGrid.style.transition = '0.5s';
        coreGrid.style.opacity = '0';
        coreGrid.style.transform = 'translateY(-20px)';

        setTimeout(() => {
            coreGrid.style.display = 'none';
            fullList.style.display = 'block';

            // Trigger Node Animations
            const nodes = fullList.querySelectorAll('.circuit-node');
            nodes.forEach((node, index) => {
                node.classList.remove('scanned'); // Reset
                node.style.animationDelay = `${index * 0.1}s`;
                setTimeout(() => {
                    node.classList.add('scanned');
                }, 50);
            });

            // Force reflow
            void fullList.offsetWidth;
            fullList.classList.add('visible');
        }, 500);

        btn.innerHTML = '<i class="fa-solid fa-compress"></i> COLLAPSE DATA';
    }
});

