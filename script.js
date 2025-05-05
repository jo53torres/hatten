 document.addEventListener('DOMContentLoaded', () => {
            const canvas = document.getElementById('particles');
            const ctx = canvas.getContext('2d');
            
            // Ajustar tamaño del canvas
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // Configuración de partículas
            const particles = [];
            const particleCount = window.innerWidth < 768 ? 50 : 100;
            const colors = ['#5ABF92', '#6C6E7B', '#FFFFFF', '#192C44'];
            
            // Crear partículas
            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.size = Math.random() * 3 + 1;
                    this.speedY = Math.random() * 3 + 1;
                    this.speedX = Math.random() * 0.5 - 0.25;
                    this.color = colors[Math.floor(Math.random() * colors.length)];
                    this.opacity = Math.random() * 0.6 + 0.2;
                    this.tailLength = Math.random() * 20 + 10;
                }
                
                update() {
                    this.y -= this.speedY;
                    this.x += this.speedX;
                    
                    // Reiniciar partícula cuando sale de la pantalla
                    if (this.y < 0 || this.x < 0 || this.x > canvas.width) {
                        this.y = canvas.height;
                        this.x = Math.random() * canvas.width;
                    }
                }
                
                draw() {
                    ctx.beginPath();
                    
                    // Dibujar cola de la partícula (efecto de estrella fugaz)
                    ctx.strokeStyle = this.color;
                    ctx.lineWidth = this.size;
                    ctx.globalAlpha = this.opacity;
                    
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(
                        this.x - this.speedX * this.tailLength,
                        this.y + this.speedY * this.tailLength
                    );
                    ctx.stroke();
                    
                    // Dibujar cabeza de la partícula
                    ctx.globalAlpha = this.opacity + 0.3;
                    ctx.fillStyle = this.color;
                    ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            
            // Inicializar partículas
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
            
            // Función de animación
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Actualizar y dibujar partículas
                particles.forEach(particle => {
                    particle.update();
                    particle.draw();
                });
                
                requestAnimationFrame(animate);
            }
            
            animate();
            
            // Redimensionar canvas al cambiar tamaño de ventana
            window.addEventListener('resize', () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            });
        });
