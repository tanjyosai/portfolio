// ─── CLOCK ───
function updateClock() {
    const clock = document.getElementById('clock');
    if (clock) clock.innerText = new Date().toLocaleTimeString('en-GB');
}
updateClock();
setInterval(updateClock, 1000);

// ─── MATRIX RAIN ───
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ<>{}[];:';
const fontSize = 14;
let drops = [];

function initDrops() {
    const cols = Math.floor(canvas.width / fontSize);
    drops = Array.from({ length: cols }, () => Math.random() * -50);
}
initDrops();

function matrix() {
    ctx.fillStyle = 'rgba(2, 3, 5, 0.12)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${fontSize}px monospace`;

    drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        // Lead char is brighter
        ctx.fillStyle = y * fontSize < fontSize ? '#00f3ff' : '#003322';
        ctx.fillText(char, i * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i] += 0.5;
    });
}

setInterval(matrix, 50);

window.addEventListener('resize', () => {
    resizeCanvas();
    initDrops();
});

// ─── PANEL ENTRY ANIMATION ───
document.addEventListener('DOMContentLoaded', () => {
    const panels = document.querySelectorAll('.panel');
    panels.forEach((panel, i) => {
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(8px)';
        panel.style.transition = `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s`;
        setTimeout(() => {
            panel.style.opacity = '1';
            panel.style.transform = 'translateY(0)';
        }, 50);
    });
});
