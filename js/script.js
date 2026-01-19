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

            // Trigger internal animations
            const animatableElements = entry.target.querySelectorAll('.scroll-animate');
            animatableElements.forEach((el, index) => {
                setTimeout(() => {
                    // Only animate in if parent is still visible (avoids race condition if quick scroll)
                    if (entry.target.classList.contains('visible')) {
                        el.classList.add('animate-in');
                    }
                }, index * 100); // Stagger effect
            });
        } else {
            // RESET animations for replay (Vice Versa)
            entry.target.classList.remove('visible');
            entry.target.style.opacity = 0;
            entry.target.style.transform = "translateY(50px)";

            const animatableElements = entry.target.querySelectorAll('.scroll-animate');
            animatableElements.forEach(el => {
                el.classList.remove('animate-in');
            });
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

// Certificate Data (Clearance Archives)
const certData = {
    'az900': {
        title: 'AZURE FUNDAMENTALS',
        subtitle: 'Cloud Security & Architectural Patterns',
        issuer: 'Microsoft',
        id: 'AZ-900',
        icon: 'fa-brands fa-microsoft',
        desc: 'Demonstrated foundational knowledge of cloud services and how those services are provided with Microsoft Azure. Mastered cloud concepts, core Azure services, and Azure management and governance tools.'
    },
    'ai900': {
        title: 'AZURE AI FUNDAMENTALS',
        subtitle: 'Artificial Intelligence Solutions',
        issuer: 'Microsoft',
        id: 'AI-900',
        icon: 'fa-solid fa-brain',
        desc: 'Validated execution of machine learning and artificial intelligence workloads on Azure. Covered computer vision, natural language processing, and conversational AI workloads.'
    },
    'ccst': {
        title: 'CCST CYBERSECURITY',
        subtitle: 'Cisco Certified Support Technician',
        issuer: 'Cisco',
        id: 'CCST-CYBER',
        icon: 'fa-solid fa-shield-halved',
        desc: 'Verified skills in cybersecurity principles, network security, endpoint security concepts, vulnerability assessment, and risk management. Entry-level tactical security operations clearance.'
    },
    'its': {
        title: 'IT SPECIALIST CYBERSECURITY',
        subtitle: 'Network Defense & Security',
        issuer: 'Pearson VUE',
        id: 'ITS-CYBER',
        icon: 'fa-solid fa-user-shield',
        desc: 'Comprehensive understanding of security layers, operating system security, network security software, and security audit policies. Specialized defense tactics.'
    },
    'fsd': {
        title: 'FULL STACK DEVELOPMENT',
        subtitle: 'Django & Angular Systems',
        issuer: 'Infosys',
        id: 'FSD-INF',
        icon: 'fa-solid fa-code',
        desc: 'Advanced training in building scalable web applications using Python Django for backend architecture and Angular for dynamic frontend interfaces. REST API integration mastery.'
    },
    'genai': {
        title: 'GENERATIVE AI STRATEGY',
        subtitle: 'Demystifying Generative AI',
        issuer: 'Infosys',
        id: 'GEN-AI',
        icon: 'fa-solid fa-wand-magic-sparkles',
        desc: 'Strategic overview of Generative AI capabilities, large language models (LLMs), and prompt engineering techniques for enterprise solutions.'
    },
    'java': {
        title: 'JAVA SERVLETS ADVANCED',
        subtitle: 'Backend Architecture',
        issuer: 'Infosys Springboard',
        id: 'J-WEB',
        icon: 'fa-brands fa-java',
        desc: 'Deep dive into server-side Java development using Servlets and JSP. Implemented MVC architecture and session management for robust web applications.'
    },
    'jdbc': {
        title: 'JDBC CONNECTIVITY',
        subtitle: 'Database Integration',
        issuer: 'Infosys',
        id: 'JDBC-CORE',
        icon: 'fa-solid fa-database',
        desc: 'Mastered Java Database Connectivity (JDBC) for efficient database operations. Implemented connection pooling, transaction management, and optimized SQL queries.'
    }
};

function selectCert(key) {
    const data = certData[key];
    if (!data) return;

    // Update List Active State
    document.querySelectorAll('.archive-item').forEach(item => {
        item.classList.remove('active');
    });
    const clickedItem = document.querySelector(`.archive-item[data-cert="${key}"]`);
    if (clickedItem) clickedItem.classList.add('active');

    // Update Viewer Content
    const contentArea = document.getElementById('cert-content-area');

    // Animate Out
    const display = contentArea.querySelector('.cert-display');
    if (display) {
        display.style.opacity = '0';
        display.style.transform = 'translateY(10px)';
    }

    setTimeout(() => {
        contentArea.innerHTML = `
            <div class="cert-display active-display">
                <div class="cert-icon-large"><i class="${data.icon}"></i></div>
                <h3 class="cd-title">${data.title}</h3>
                <p class="cd-subtitle">${data.subtitle}</p>
                <div class="cd-meta">
                    <div class="cd-row">
                        <span class="cd-label">ISSUER:</span>
                        <span class="cd-val">${data.issuer}</span>
                    </div>
                    <div class="cd-row">
                        <span class="cd-label">ID:</span>
                        <span class="cd-val">${data.id}</span>
                    </div>
                    <div class="cd-row">
                        <span class="cd-label">STATUS:</span>
                        <span class="cd-val highlight">VERIFIED</span>
                    </div>
                </div>
                <div class="cd-desc">
                    ${data.desc}
                </div>
            </div>
        `;
    }, 200);
}

// Mainframe Rack Toggle Logic
function toggleRack(element) {
    // If the clicked element is already active, close it
    if (element.classList.contains('active')) {
        element.classList.remove('active');
        return;
    }

    // Close all other rack units
    const allUnits = document.querySelectorAll('.rack-unit');
    allUnits.forEach(unit => {
        unit.classList.remove('active');
    });

    // Open the clicked one
    element.classList.add('active');

    // Optional: Scroll slightly if it's vastly out of view (UX nuance)
    // element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Radial Reactor Logic
function activateNode(element, key) {
    if (!certData[key]) return;

    // Update Active Node State
    document.querySelectorAll('.orbit-node').forEach(node => node.classList.remove('active'));
    element.classList.add('active');

    // Update HUD display
    const data = certData[key];
    const display = document.getElementById('holo-display');
    const content = display.querySelector('.hud-content');

    // Animate Out
    content.classList.remove('active');

    setTimeout(() => {
        // Replace Content
        display.innerHTML = `
            <div class="hud-content">
                <div class="hud-header">
                    <span class="serial-no">ID: ${data.id}</span>
                    <h3 class="hud-title">${data.title}</h3>
                </div>
                <div class="hud-body">
                    <div class="hud-row">
                        <span class="label">ISSUER:</span>
                        <span class="value">${data.issuer}</span>
                    </div>
                    <div class="hud-row">
                        <span class="label">STATUS:</span>
                        <span class="value success">VERIFIED ACTIVE</span>
                    </div>
                    <p class="hud-desc">${data.desc}</p>
                </div>
                <div class="hud-footer">
                     <div class="scan-bar"></div>
                </div>
            </div>
        `;

        // Animate In (small delay for DOM reflow)
        setTimeout(() => {
            display.querySelector('.hud-content').classList.add('active');
        }, 50);

    }, 300);
}

// Neural Matrix Flip Logic
function flipHex(element) {
    // Toggle the 'flipped' class on the clicked element
    element.classList.toggle('flipped');

    // Optional: Auto-flip back others?
    // Not strictly necessary for this UI pattern as multiple can be open
    // But if we want 'exclusive' focus:
    /*
    document.querySelectorAll('.hex-inner').forEach(hex => {
        if(hex !== element) hex.classList.remove('flipped');
    });
    */
}

// Holo-Projector Logic
let currentCertIndex = 0;
const certKeys = Object.keys(certData); // Assuming certData is defined from previous steps

// Extend certData if needed or just iterate keys
// For safety, let's ensure certData exists or redefine strict subset
if (typeof certData === 'undefined') {
    console.error("certData missing, please ensure it is loaded.");
}

function renderHoloCard(key) {
    const data = certData[key];
    return `
        <div class="holo-card active">
            <div class="holo-visual">
                <i class="${data.icon}"></i>
                <div class="holo-glitch"></div>
            </div>
            <div class="holo-info">
                <div class="holo-header">
                    <span class="holo-id">ID: ${data.id}</span>
                    <h2>${data.title}</h2>
                </div>
                <div class="holo-status">
                    <div class="status-dot"></div>
                    <span>VERIFIED AUTHENTIC</span>
                </div>
                <p class="holo-desc">
                    ${data.desc}
                </div>
                <div class="holo-meta">
                    <span><i class="fa-solid fa-building"></i> ${data.issuer}</span>
                    <span><i class="fa-solid fa-calendar"></i> ACTIVE</span>
                </div>
            </div>
        </div>
    `;
}

function updateProjector(newIndex) {
    const display = document.getElementById('hologram-display');
    const currentCard = display.querySelector('.holo-card');

    // 1. Animate Out
    if (currentCard) {
        currentCard.classList.remove('active');
        currentCard.classList.add('leaving');
    }

    // 2. Wait for animation
    setTimeout(() => {
        // Update Index
        currentCertIndex = newIndex;
        const key = certKeys[currentCertIndex];

        // Render New
        display.innerHTML = renderHoloCard(key);

        // Update Dots
        document.querySelectorAll('.holo-pagination .dot').forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentCertIndex);
        });

    }, 400); // Matches CSS transition time roughly
}

function cycleCert(direction) {
    let newIndex = currentCertIndex + direction;
    if (newIndex >= certKeys.length) newIndex = 0;
    if (newIndex < 0) newIndex = certKeys.length - 1;
    updateProjector(newIndex);
}

function jumpToCert(index) {
    if (index === currentCertIndex) return;
    updateProjector(index);
}

// Strategic Carousel Logic
let carouselIndex = 0;
// We rely on certKeys from previous step or re-fetch active nodes
const cardElements = document.querySelectorAll('.carousel-card');
const totalCards = cardElements.length;

// Initialize indicators
const indicatorsContainer = document.querySelector('.c-indicators');
if (indicatorsContainer) {
    indicatorsContainer.innerHTML = '';
    for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement('div');
        dot.className = 'c-dot';
        dot.onclick = () => jumpCarousel(i);
        indicatorsContainer.appendChild(dot);
    }
}

function updateCarousel() {
    cardElements.forEach((card, index) => {
        // Reset classes
        card.className = 'carousel-card';

        // Calculate Distance
        // Handling wrap-around logic is tricky for CSS classes
        // Let's use a simpler "relative distance" approach

        let offset = index - carouselIndex;

        // Simple View Logic: only show -2 to +2 range approx
        // or handle wrap around? let's do simple linear first, or clamp?

        // Wrap-around logic for infinite feel?
        // If total is 8, and index is 0. offset for 7 should be -1.
        if (offset > totalCards / 2) offset -= totalCards;
        if (offset < -totalCards / 2) offset += totalCards;

        if (offset === 0) card.classList.add('active');
        else if (offset === -1) card.classList.add('prev-1');
        else if (offset === 1) card.classList.add('next-1');
        else if (offset === -2) card.classList.add('prev-2');
        else if (offset === 2) card.classList.add('next-2');
        else card.classList.add('hidden');

        // Click to jump
        card.onclick = () => {
            if (offset !== 0) jumpCarousel(index);
        };
    });

    // Update Dots
    document.querySelectorAll('.c-dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === carouselIndex);
    });

    // Update Info Panel
    const infoTitle = document.getElementById('c-title');
    const infoDesc = document.getElementById('c-desc');
    // Map idx to data keys if we reuse certData, or just grab from DOM
    // Let's reuse certData for rich text if available, or fallback

    // We need map index -> key
    const keys = Object.keys(certData);
    const key = keys[carouselIndex];
    if (key && certData[key] && infoTitle && infoDesc) {
        infoTitle.textContent = certData[key].title;
        infoDesc.textContent = certData[key].desc;
    }
}

function rotateCarousel(dir) {
    carouselIndex += dir;
    if (carouselIndex < 0) carouselIndex = totalCards - 1;
    if (carouselIndex >= totalCards) carouselIndex = 0;
    updateCarousel();
}

function jumpCarousel(idx) {
    carouselIndex = idx;
    updateCarousel();
}

// Init
setTimeout(updateCarousel, 100);

// Cyber-Dock Logic

// Reuse existing certData or define fallback
// Fallback removed to avoid redeclaration error

// Map array index to keys if keys are not numeric
const certKeysArray = Object.keys(certData);

function loadDeckItem(index) {
    const key = certKeysArray[index];
    const data = certData[key];
    if (!data) return;

    const content = document.getElementById('reader-content');

    // Animate Out
    content.classList.remove('active');

    // Small delay for swap
    setTimeout(() => {
        document.getElementById('r-icon').className = data.icon;
        document.getElementById('r-title').textContent = data.title;
        document.getElementById('r-id').textContent = 'ID: ' + data.id;
        document.getElementById('r-desc').textContent = data.desc;

        // Animate In
        content.classList.add('active');
    }, 200);
}

// Fisheye Effect Logic
const dockItems = document.querySelectorAll('.dock-item');
const maxScale = 1.8;
const minScale = 1.0;
const range = 2; // How many neighbors affect

function hoverDock(e, hoveredItem) {
    // Only apply on desktop?
    if (window.innerWidth < 700) return;

    // Calculate relative distance for smooth scaling
    // Actually, simple neighbor logic is easier and robust
    const index = parseInt(hoveredItem.getAttribute('data-idx'));

    dockItems.forEach((item) => {
        const itemIdx = parseInt(item.getAttribute('data-idx'));
        const diff = Math.abs(index - itemIdx);

        let scale = minScale;
        if (diff === 0) scale = maxScale;
        else if (diff === 1) scale = 1.5;
        else if (diff === 2) scale = 1.2;

        item.style.width = (50 * scale) + 'px';
        item.style.height = (50 * scale) + 'px';
        item.style.transform = `translateY(-${(scale - 1) * 10}px)`; // Move up slightly

        const icon = item.querySelector('i');
        icon.style.fontSize = (1.2 * scale) + 'rem';
    });
}

function resetDock() {
    dockItems.forEach(item => {
        item.style.width = '50px';
        item.style.height = '50px';
        item.style.transform = 'translateY(0)';
        item.querySelector('i').style.fontSize = '1.2rem';
    });
}

// Crystal Form Interactivity (Golden Glass) with EmailJS
const crystalForm = document.getElementById('crystal-form');
if (crystalForm) {
    crystalForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = crystalForm.querySelector('.gold-btn-glass');
        const originalContent = btn.innerHTML;

        // Loading State
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> SENDING...';
        btn.style.opacity = '0.8';
        btn.disabled = true;

        try {
            // Replace these with your actual IDs from EmailJS
            const serviceID = 'service_msv6sdk';
            const userTemplateID = 'template_j36z9mo'; // Auto-Reply to User
            const adminTemplateID = 'template_4kwf7mk'; // Admin Notification

            // Get current date for the admin template
            const date = new Date().toLocaleString();

            // Construct payload manually to avoid 422 errors from form parsing
            // Note: We're passing 'date' as an extra parameter
            const params = {
                name: crystalForm.querySelector('input[name="name"]').value,
                email: crystalForm.querySelector('input[name="email"]').value,
                message: crystalForm.querySelector('textarea[name="message"]').value,
                date: date
            };

            // Send both emails simultaneously
            // 1. Auto-Reply to User
            const sendUser = emailjs.send(serviceID, userTemplateID, params);

            // 2. Notification to Admin
            const sendAdmin = emailjs.send(serviceID, adminTemplateID, params);

            // Wait for both
            await Promise.all([sendUser, sendAdmin]);

            // If we get here, at least one (likely both) succeeded. 
            // In a strict sense, Promise.all fails if ANY fail.
            // This is good because if the admin doesn't get the mail, it's an error.

            // Success State
            btn.innerHTML = '<i class="fa-solid fa-check"></i> MESSAGE SENT';
            btn.style.background = '#39ff14';
            btn.style.color = 'black';
            btn.style.borderColor = '#39ff14';
            btn.style.boxShadow = '0 0 30px #39ff14';

            crystalForm.reset();
        } catch (error) {
            console.error("Transmission Error:", error);
            // Show more specific error in console if available
            if (error.text) console.error("EmailJS Error Details:", error.text);

            btn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> ERROR';
            btn.style.background = '#ff3333';
            btn.style.color = 'white';
            btn.style.borderColor = '#ff3333';
            btn.style.boxShadow = '0 0 20px #ff3333';
        }

        // Reset Button
        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.style.background = '';
            btn.style.color = '';
            btn.style.borderColor = '';
            btn.style.boxShadow = '';
            btn.style.opacity = '1';
            btn.disabled = false;
        }, 4000);
    });
}

// Holo-Terminal Interactivity (Contact Form)
const holoForm = document.getElementById('holo-contact-form');
if (holoForm) {
    holoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = holoForm.querySelector('.transmit-btn');
        const btnContent = btn.querySelector('.btn-content');
        const originalContent = btnContent.innerHTML;

        // 1. Processing State
        btnContent.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> ENCRYPTING & TRANSMITTING...';
        btn.style.opacity = '0.8';
        btn.style.cursor = 'wait';

        // Simulate Network Request
        setTimeout(() => {
            // 2. Success State
            btnContent.innerHTML = '<i class="fa-solid fa-check"></i> TRANSMISSION COMPLETE';
            btn.style.background = '#39ff14';
            btn.style.color = 'black';
            btn.style.borderColor = '#39ff14';
            btn.style.boxShadow = '0 0 30px #39ff14';

            // Clear inputs
            holoForm.reset();

            // 3. Revert after delay
            setTimeout(() => {
                btnContent.innerHTML = originalContent;
                btn.style.background = ''; // Revert to CSS default
                btn.style.color = '';
                btn.style.borderColor = '';
                btn.style.boxShadow = '';
                btn.style.opacity = '1';
                btn.style.cursor = 'pointer';
            }, 3000);

        }, 2000);
    });
}

// Add random glitch effect to terminal occasionally
function triggerGlitch() {
    const terminal = document.querySelector('.holo-terminal');
    if (!terminal) return;

    if (Math.random() > 0.95) { // 5% chance per tick
        terminal.style.transform = `rotateX(5deg) translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
        setTimeout(() => {
            terminal.style.transform = 'rotateX(5deg)'; // Reset
        }, 100);
    }
}
setInterval(triggerGlitch, 2000);
document.querySelectorAll('.orbit-badge').forEach((badge) => {
    const randomDelay = Math.random() * 5; // 0 to 5s delay
    badge.style.animationDelay = `${randomDelay}s`;
    // Randomize duration slightly too
    const randomDuration = 5 + Math.random() * 2; // 5 to 7s
    badge.style.animationDuration = `${randomDuration}s`;
});
