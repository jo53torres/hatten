 document.addEventListener('DOMContentLoaded', () => {
            const canvas = document.getElementById('particles');
            const ctx = canvas.getContext('2d');
            
            // Ajustar tamaño del canvas
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // Configuración de partículas mejorada
            const particles = [];
            const particleCount = window.innerWidth < 768 ? 30 : 60; // Menos partículas para mayor elegancia
            const colors = ['rgba(90, 191, 146, 0.8)', 'rgba(108, 110, 123, 0.6)', 'rgba(255, 255, 255, 0.7)', 'rgba(25, 44, 68, 0.5)'];
            
            // Clase de partícula mejorada
            class Particle {
                constructor() {
                    this.reset(true);
                    this.history = []; // Para almacenar posiciones anteriores y crear la estela
                    this.maxHistory = Math.floor(Math.random() * 15 + 10); // Longitud variable de la estela
                }
                
                reset(initial = false) {
                    this.x = Math.random() * canvas.width;
                    this.y = initial ? Math.random() * canvas.height : canvas.height + 10;
                    this.size = Math.random() * 2 + 0.5; // Partículas más pequeñas
                    this.speedY = Math.random() * 0.5 + 0.3; // Movimiento más lento
                    this.speedX = (Math.random() * 0.2 - 0.1) * (Math.random() > 0.5 ? 1 : -1);
                    this.color = colors[Math.floor(Math.random() * colors.length)];
                    this.opacity = Math.random() * 0.4 + 0.3; // Opacidad más uniforme
                }
                
                update() {
                    // Guardar posición actual en el historial
                    this.history.push({x: this.x, y: this.y});
                    if (this.history.length > this.maxHistory) {
                        this.history.shift();
                    }
                    
                    // Mover partícula
                    this.y -= this.speedY;
                    this.x += this.speedX;
                    
                    // Reiniciar partícula cuando sale de la pantalla
                    if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
                        this.reset();
                        this.history = [];
                    }
                }
                
                draw() {
                    // Dibujar estela
                    if (this.history.length > 1) {
                        ctx.beginPath();
                        ctx.moveTo(this.history[0].x, this.history[0].y);
                        
                        for (let i = 1; i < this.history.length; i++) {
                            const point = this.history[i];
                            const progress = i / this.history.length;
                            const currentOpacity = this.opacity * progress * progress; // Opacidad decreciente
                            
                            ctx.strokeStyle = this.color.replace(/[\d\.]+\)$/, currentOpacity + ')');
                            ctx.lineWidth = this.size * progress;
                            ctx.lineTo(point.x, point.y);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(point.x, point.y);
                        }
                    }
                    
                    // Dibujar cabeza de la partícula (punto principal)
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
            
            // Función de animación mejorada
            function animate() {
                // Limpiar con un fade sutil para crear estelas persistentes
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
