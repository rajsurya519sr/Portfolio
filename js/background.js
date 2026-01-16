const canvas = document.getElementById('poly-bg');
const ctx = canvas.getContext('2d');

let width, height;
let points = [];
const pointCount = 50;

window.addEventListener('resize', resize);
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initPoints();
}

function initPoints() {
    points = [];
    for (let i = 0; i < pointCount; i++) {
        points.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        });
    }
}

// Mouse interaction
let mouse = { x: null, y: null };
window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function draw() {
    ctx.clearRect(0, 0, width, height);

    // Update Points
    points.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
    });

    // Draw Triangulation
    // Simple distance check - not true Delaunay but sufficient for visual
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.1)'; // faint gold
    ctx.lineWidth = 1;

    for (let i = 0; i < points.length; i++) {
        let p1 = points[i];

        // Draw point
        ctx.fillStyle = 'rgba(212, 175, 55, 0.5)';
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, 2, 0, Math.PI * 2);
        ctx.fill();

        // Connect to mouse
        if (mouse.x) {
            let dm = Math.hypot(p1.x - mouse.x, p1.y - mouse.y);
            if (dm < 200) {
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }

        // Connect to neighbors
        for (let j = i + 1; j < points.length; j++) {
            let p2 = points[j];
            let d = Math.hypot(p1.x - p2.x, p1.y - p2.y);
            if (d < 150) {
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(draw);
}

resize();
initPoints();
draw();
