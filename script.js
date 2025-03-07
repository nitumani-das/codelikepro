/*const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeText = document.getElementById('themeText');

function updateTheme(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeIcon.textContent = isDark ? '☀️' : '🌙';
    themeText.textContent = isDark ? 'Light Mode' : 'Dark Mode';
}

themeToggle.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark-mode');
    updateTheme(isDark);
});

// Load theme preference on page load
window.onload = () => {
    const savedTheme = localStorage.getItem('theme');
    updateTheme(savedTheme === 'dark');
};

*/

//header


        const canvas = document.getElementById("heroCanvas");
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray = [];
        const mouse = {
            x: null,
            y: null,
            radius: 100
        };

        window.addEventListener("mousemove", function(event) {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        window.addEventListener("click", function(event) {
            for (let i = 0; i < 10; i++) {
                let size = Math.random() * 6 + 2;
                let speedX = (Math.random() - 0.5) * 5;
                let speedY = (Math.random() - 0.5) * 5;
                particlesArray.push(new Particle(event.x, event.y, size, speedX, speedY));
            }
        });

        class Particle {
            constructor(x, y, size, speedX, speedY) {
                this.x = x;
                this.y = y;
                this.baseSize = size;
                this.size = size;
                this.speedX = speedX;
                this.speedY = speedY;
                this.growing = true;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.growing) {
                    this.size += 0.1;
                    if (this.size > this.baseSize * 1.5) this.growing = false;
                } else {
                    this.size -= 0.1;
                    if (this.size < this.baseSize * 0.5) this.growing = true;
                }

                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    this.x -= dx * 0.05;
                    this.y -= dy * 0.05;
                }
            }
            draw() {
                ctx.fillStyle = 'rgba(0, 255, 255, 0.7)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
        }

        function initParticles() {
            particlesArray = [];
            for (let i = 0; i < 200; i++) {
                let size = Math.random() * 6 + 2;
                let x = Math.random() * canvas.width;
                let y = Math.random() * canvas.height;
                let speedX = (Math.random() - 0.5) * 3;
                let speedY = (Math.random() - 0.5) * 3;
                particlesArray.push(new Particle(x, y, size, speedX, speedY));
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            requestAnimationFrame(animate);
        }

        initParticles();
        animate();

        window.addEventListener("resize", function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        });





        //preloader
        
        let loadPercentage = 0;
        const loadingText = document.getElementById("loading-percentage");
        const loadingInterval = setInterval(() => {
            loadPercentage += 1;
            loadingText.innerText = `${loadPercentage}%`;
            if (loadPercentage >= 100) {
                clearInterval(loadingInterval);
            }
        }, 30);

        window.addEventListener("load", function() {
            setTimeout(() => {
                document.getElementById("preloader").style.opacity = "0";
                setTimeout(() => {
                    document.getElementById("preloader").style.display = "none";
                }, 500);
            }, 3000);
        });