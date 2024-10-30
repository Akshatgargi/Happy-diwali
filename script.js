const fireworksContainer = document.getElementById('fireworks-container');
const confettiCanvas = document.getElementById('confetti-canvas');
const ctx = confettiCanvas.getContext('2d');

confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

// Function to resize canvas
function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}

// Call resize function on window resize
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Initial call to set size

// Ask for the person's name
let personName = prompt("Please enter your name:", "Akshat");
if (personName === null || personName === "") {
    personName = "Friend"; // Default name if user cancels or leaves empty
}

// Update the message with the name
const messageDiv = document.querySelector('.message');
messageDiv.innerHTML = `<h1 class="m">Happy Diwali</h1><h4>To ${personName}</h4>`;

// Function to create a firework
function createFirework() {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = Math.random() * 100 + 'vw'; // Random horizontal position
    firework.style.top = Math.random() * 100 + 'vh'; // Random vertical position
    firework.style.backgroundColor = getRandomColor(); // Random color

    document.body.appendChild(firework);

    // Animation
    firework.animate(
        [
            { transform: 'scale(0)', opacity: 1 },
            { transform: 'scale(1.5)', opacity: 0.5 },
            { transform: 'scale(0)', opacity: 0 }
        ],
        {
            duration: 1500,
            easing: 'ease-out',
            fill: 'forwards'
        }
    );

    // Remove firework after animation
    setTimeout(() => {
        firework.remove();
    }, 1500);
}

// Function to get random colors for fireworks
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Create fireworks every 300ms
setInterval(createFirework, 100);

// Confetti animation
const particles = [];
const colors = ['#FF5733', '#FFC300', '#DAF7A6', '#900C3F', '#581845'];

function createParticle() {
    const size = Math.random() * 5 + 5;
    particles.push({
        x: Math.random() * confettiCanvas.width,
        y: 0,
        radius: size,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 2 + 1,
        angle: Math.random() * (Math.PI * 2)
    });
}

function drawParticles() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    particles.forEach((particle, index) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        particle.y += particle.speed * Math.sin(particle.angle); // Gravity effect
        particle.x += particle.speed * Math.cos(particle.angle); // Wind effect

        // Remove particles that go off-screen
        if (particle.y > confettiCanvas.height || particle.x < 0 || particle.x > confettiCanvas.width) {
            particles.splice(index, 1);
        }
    });
}

function animateConfetti() {
    if (Math.random() < 0.1) createParticle(); // Create particle with random frequency
    drawParticles();
    requestAnimationFrame(animateConfetti);
}

// Play music when the page loads
const audio = document.getElementById('diwali-music');
audio.volume = 0.5; // Set volume
audio.play().catch((error) => {
    console.log("Autoplay failed, user interaction required to play audio.");
});

animateConfetti();
