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

// Image Modal Function
function openFullscreen(imgSrc) {
    // Check if modal exists, if not create it
    let modal = document.getElementById('image-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'image-modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.95)';
        modal.style.zIndex = '10000';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.opacity = '0';
        modal.style.transition = 'opacity 0.3s';
        modal.style.backdropFilter = 'blur(10px)';
        modal.innerHTML = `
            <div style="position: relative; display: inline-block; max-width: 90%; max-height: 90%;">
                <button id="close-fs-btn" style="position:absolute; top:10px; right:10px; background:rgba(0,0,0,0.6); border:1px solid #d4af37; color:#d4af37; font-size:1.2rem; width:30px; height:30px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; z-index:10001;">&times;</button>
                <img id="modal-img" style="max-width:100%; max-height:90vh; border:2px solid #d4af37; box-shadow: 0 0 50px rgba(212,175,55,0.2); display: block;">
            </div>
        `;
        document.body.appendChild(modal);

        // Close on click (background or button)
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.closest('#close-fs-btn')) {
                modal.style.opacity = '0';
                setTimeout(() => { modal.style.display = 'none'; }, 300);
            }
        });
    }

    // Update image and show
    const modalImg = document.getElementById('modal-img');
    modalImg.src = imgSrc;
    modal.style.display = 'flex';
    // Trigger reflow for transition
    void modal.offsetWidth;
    modal.style.opacity = '1';
}

// Project Data Repository
const projectData = {
    'agri': {
        title: 'AgriAssist',
        subtitle: 'AI-Powered Smart Farming Platform',
        image: 'agri_assist.png',
        stack: ['Python', 'Flask', 'SQLAlchemy', 'Leaflet.js', 'OpenStreetMap', 'Open-Meteo', 'Bcrypt'],
        github: 'https://github.com/rajsurya519sr/Agri_Assist',
        live: 'https://agri-assistsr.vercel.app/',
        details: [
            'Developed a full-stack Python Flask application using SQLAlchemy for database management and Bcrypt with OTP email verification for secure user authentication.',
            'Engineered an interactive mapping module with JavaScript and Leaflet.js, enabling users to draw custom farm boundaries (polygons) with automatic area calculation.',
            'Integrated OpenStreetMap and Open-Meteo (Weather) APIs to design a rule-based AI engine, generating personalized farming advisories and predicting crop yields.'
        ]
    },
    'cbr': {
        title: 'Coding Battle Royale',
        subtitle: 'AI-Powered Multiplayer Game',
        image: 'cbr.png',
        stack: ['React (Vite)', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Socket.io', 'Gemini API'],
        github: 'https://github.com/rajsurya519sr/Coding-Battle-Royale',
        live: 'deployment_pending.html?id=cbr',
        details: [
            'Built a full-stack, real-time multiplayer game using React.js (with Vite) and Tailwind CSS for the frontend, and Node.js with a PostgreSQL database for the backend.',
            'Integrated the Gemini API to dynamically generate live coding challenges and provide AI-driven feedback to players during competitive sessions.',
            'Implemented real-time matchmaking, live leaderboards, and a websocket-based architecture to manage concurrent player states.'
        ]
    },
    'dine': {
        title: 'Dine In Hub',
        subtitle: 'Restaurant Dine-In Reservation Hub',
        image: 'Dine_In.png',
        stack: ['Java Swing', 'JDBC', 'MySQL', 'GUI Design'],
        github: 'https://github.com/rajsurya519sr/Dine-In-Java-',
        live: 'deployment_pending.html?id=dine',
        details: [
            'Developed a Java Swing desktop application to manage restaurant dine-in registrations, table assignments, and guest lists.',
            'Utilized JDBC to connect to a MySQL database, enabling all CRUD (Create, Read, Update, Delete) operations for data persistence.',
            'Designed a multi-panel GUI to handle new reservations, view current table occupancy, and manage customer check-in and check-out.'
        ]
    }
};

function openProjectDetails(id) {
    const data = projectData[id];
    if (!data) return;

    // Create or get modal
    let modal = document.getElementById('project-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'project-modal';
        modal.className = 'custom-modal';
        document.body.appendChild(modal);

        // Add close logic
        modal.onclick = (e) => {
            if (e.target === modal) closeProjectModal();
        };
    }

    // Build Content
    const stackHtml = data.stack.map(tech => `<span class="modal-chip">${tech}</span>`).join('');
    const pointsHtml = data.details.map(point => `<li>${point}</li>`).join('');

    modal.innerHTML = `
        <div class="modal-content schematic-theme">
            <button class="modal-close" onclick="closeProjectModal()">&times;</button>
            <div class="modal-header">
                <h2>${data.title}</h2>
                <div class="modal-subtitle">${data.subtitle}</div>
            </div>
            <div class="modal-body">
                <div class="modal-visual">
                    <img src="${data.image}" alt="${data.title}">
                    <div class="visual-border"></div>
                </div>
                <div class="modal-info">
                    <div class="modal-actions" style="display:flex; gap:15px; margin-bottom:15px; justify-content:center;">
                        <a href="${data.live}" target="_blank" class="modal-btn live-btn" style="text-decoration:none; color:#d4af37; border:1px solid #d4af37; padding:8px 16px; font-family:'Rajdhani'; letter-spacing:1px; transition:0.3s; display:flex; align-items:center; gap:8px;">
                            <i class="fa-solid fa-satellite-dish"></i> LIVE SYSTEM
                        </a>
                        <a href="${data.github}" target="_blank" class="modal-btn git-btn" style="text-decoration:none; color:#d4af37; border:1px solid #d4af37; padding:8px 16px; font-family:'Rajdhani'; letter-spacing:1px; transition:0.3s; display:flex; align-items:center; gap:8px;">
                            <i class="fa-brands fa-github"></i> SOURCE CODE
                        </a>
                    </div>
                    <div class="modal-stack">${stackHtml}</div>
                    <ul class="modal-desc">${pointsHtml}</ul>
                </div>
            </div>
        </div>
    `;

    // Show Modal
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = 'none', 300);
    }
}

// Research Data & Logic
const researchData = {
    title: 'Coding Battle Royale: AI-Driven Gamified Learning',
    context: 'Published in ICICTA 2025',
    abstract: `Digital platforms for education and competition were reimagined with the introduction of gamified learning, artificial intelligence, and real-time interaction. However, competitive programming platforms that employ conventional techniques and have a tendency to remain stagnant have not evolved much from solving problems alone with nothing in the way of live interaction. Coding Battle Royale offers a novel approach to fixing these issues by fusing multi-player gamified learning based on the battle royale genre with AI-based adaptive learning.\n\nIn the exciting and captivating atmosphere of Coding Battle Royale, programmers compete in five progressively challenging elimination rounds. AI-generated tasks tailored to each player's skill level are introduced in each of the five rounds, and the player with the lowest performance is eliminated at the end of each round. The OpenAI API-based adaptive system offers individualized, context-aware tasks that change in real time based on player performance.\n\nIn addition to being entertaining, Coding Battle Royale fosters important skills like perseverance, productivity, and strategic thinking under duress—all of which are combined with real-world coding scenarios like hackathons and tech interviews. It has enormous learning potential as well; in classroom settings, it transforms assessments into dynamic, pressure-filled assessments that fairly gauge students' capacity for problem-solving.\n\nLastly, by fusing the discipline of competitive programming with the thrill of online gaming and the knowledge of artificial intelligence, Coding Battle Royale transforms the way programmers learn, compete, and advance. It is a powerful instructional tool for future educational programming in addition to being an entertaining product that engages viewers.`
};

function openResearchModal() {
    let modal = document.getElementById('research-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'research-modal';
        modal.className = 'custom-modal';
        document.body.appendChild(modal);

        modal.onclick = (e) => {
            if (e.target === modal) closeResearchModal();
        };
    }

    // Format abstract with paragraphs
    const formattedAbstract = researchData.abstract.split('\n\n').map(p => `<p class="modal-text" style="margin-bottom:15px; line-height:1.6; color:#ccc; text-align: justify; text-justify: inter-word;">${p}</p>`).join('');

    modal.innerHTML = `
        <div class="modal-content schematic-theme" style="max-width: 800px; width:90%;">
            <button class="modal-close" onclick="closeResearchModal()">&times;</button>
            <div class="modal-header">
                <h2>${researchData.title}</h2>
                <div class="modal-subtitle">${researchData.context}</div>
            </div>
            <div class="modal-body" style="align-items: flex-start; text-align: left; max-height: 70vh; overflow-y: auto;">
                <div class="modal-info" style="width: 100%;">
                    ${formattedAbstract}
                </div>
            </div>
        </div>
    `;

    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
}

function closeResearchModal() {
    const modal = document.getElementById('research-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = 'none', 300);
    }
}
