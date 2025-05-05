 document.addEventListener('DOMContentLoaded', () => {
            const canvas = document.getElementById('particles');
            const ctx = canvas.getContext('2d');
            
            // Ajustar tamaño del canvas
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // Configuración de partículas mejorada
            const particles = [];
            const particleCount = window.innerWidth < 768 ? 30 : 60;
            const colors = [
                'rgba(90, 191, 146, 0.8)', 
                'rgba(108, 110, 123, 0.6)', 
                'rgba(255, 255, 255, 0.7)', 
                'rgba(25, 44, 68, 0.5)'
            ];
            
            // Clase de partícula con estela que desaparece
            class Particle {
                constructor() {
                    this.reset(true);
                    this.trail = []; // Array para almacenar los puntos de la estela
                    this.maxTrailLength = Math.floor(Math.random() * 20 + 15); // Longitud variable de la estela
                    this.fadeSpeed = Math.random() * 0.02 + 0.01; // Velocidad de desvanecimiento
                }
                
                reset(initial = false) {
                    this.x = Math.random() * canvas.width;
                    this.y = initial ? Math.random() * canvas.height : canvas.height + 10;
                    this.size = Math.random() * 2 + 0.5;
                    this.speedY = Math.random() * 0.5 + 0.3;
                    this.speedX = (Math.random() * 0.2 - 0.1);
                    this.color = colors[Math.floor(Math.random() * colors.length)];
                    this.opacity = Math.random() * 0.4 + 0.3;
                    this.trail = []; // Reiniciar la estela
                }
                
                update() {
                    // Agregar nueva posición al inicio del array
                    this.trail.unshift({
                        x: this.x,
                        y: this.y,
                        opacity: this.opacity
                    });
                    
                    // Eliminar puntos antiguos de la estela
                    if (this.trail.length > this.maxTrailLength) {
                        this.trail.pop();
                    }
                    
                    // Reducir opacidad de los puntos de la estela
                    for (let i = 0; i < this.trail.length; i++) {
                        this.trail[i].opacity -= this.fadeSpeed;
                        if (this.trail[i].opacity < 0) {
                            this.trail[i].opacity = 0;
                        }
                    }
                    
                    // Mover partícula
                    this.y -= this.speedY;
                    this.x += this.speedX;
                    
                    // Reiniciar partícula cuando sale de la pantalla
                    if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
                        this.reset();
                    }
                }
                
                draw() {
                    // Dibujar estela
                    ctx.beginPath();
                    for (let i = 0; i < this.trail.length - 1; i++) {
                        const point = this.trail[i];
                        const nextPoint = this.trail[i + 1];
                        
                        if (point.opacity > 0 && nextPoint.opacity > 0) {
                            const gradient = ctx.createLinearGradient(
                                point.x, point.y, 
                                nextPoint.x, nextPoint.y
                            );
                            
                            gradient.addColorStop(0, this.color.replace(/[\d\.]+\)$/, point.opacity + ')'));
                            gradient.addColorStop(1, this.color.replace(/[\d\.]+\)$/, nextPoint.opacity + ')'));
                            
                            ctx.strokeStyle = gradient;
                            ctx.lineWidth = this.size * (i / this.trail.length);
                            ctx.moveTo(point.x, point.y);
                            ctx.lineTo(nextPoint.x, nextPoint.y);
                            ctx.stroke();
                        }
                    }
                    
                    // Dibujar cabeza de la partícula
                    ctx.fillStyle = this.color;
                    ctx.globalAlpha = this.opacity;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            
            // Inicializar partículas
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
            
            // Función de animación
            function animate() {
                // Limpiar canvas con opacidad para efecto de desvanecimiento
                ctx.fillStyle = 'rgba(27, 30, 40, 0.1)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Actualizar y dibujar partículas
                particles.forEach(particle => {
                    particle.update();
                    particle.draw();
                });
                
                requestAnimationFrame(animate);
            }
            
            animate();
            
            // Redimensionar canvas
            window.addEventListener('resize', () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            });
        });
