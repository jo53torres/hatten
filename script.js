        document.addEventListener('DOMContentLoaded', () => {
            const canvas = document.getElementById('particles');
            const ctx = canvas.getContext('2d');
            
            // Ajustar tamaño del canvas
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // Configuración de partículas
            const particles = [];
            const particleCount = window.innerWidth < 768 ? 20 : 40;
            const colors = [
                {r: 90, g: 191, b: 146},  // Mint
                {r: 255, g: 255, b: 255}, // White
                {r: 108, g: 110, b: 123}  // Dim Gray
            ];
            
            // Clase de partícula con efecto de estrella fugaz realista
            class ShootingStar {
                constructor() {
                    this.reset(true);
                    this.trail = [];
                    this.maxTrailLength = 25 + Math.random() * 15;
                    this.decayRate = 0.02 + Math.random() * 0.03;
                }
                
                reset(initial = false) {
                    this.x = Math.random() * canvas.width;
                    this.y = initial ? Math.random() * canvas.height : canvas.height + 50;
                    this.size = 1 + Math.random() * 2;
                    this.speedY = 1 + Math.random() * 2;
                    this.speedX = (Math.random() - 0.5) * 0.8;
                    this.color = colors[Math.floor(Math.random() * colors.length)];
                    this.brightness = 0.7 + Math.random() * 0.3;
                    this.trail = [];
                    this.active = true;
                }
                
                update() {
                    if (!this.active) return;
                    
                    // Guardar posición actual
                    this.trail.unshift({
                        x: this.x,
                        y: this.y,
                        brightness: this.brightness
                    });
                    
                    // Limitar longitud de la estela y reducir brillo
                    if (this.trail.length > this.maxTrailLength) {
                        this.trail.pop();
                    }
                    
                    for (let i = 0; i < this.trail.length; i++) {
                        this.trail[i].brightness -= this.decayRate;
                        if (this.trail[i].brightness <= 0) {
                            this.trail[i].brightness = 0;
                        }
                    }
                    
                    // Mover partícula
                    this.y -= this.speedY;
                    this.x += this.speedX;
                    
                    // Desactivar cuando la estela se ha desvanecido completamente
                    if (this.trail.length > 0 && this.trail[this.trail.length-1].brightness <= 0) {
                        this.active = false;
                    }
                    
                    // Reiniciar cuando sale de pantalla o se desvanece
                    if (this.y < -20 || this.x < -20 || this.x > canvas.width + 20 || !this.active) {
                        this.reset();
                    }
                }
                
                draw() {
                    if (!this.active) return;
                    
                    // Dibujar estela con degradado natural
                    for (let i = 0; i < this.trail.length - 1; i++) {
                        const p1 = this.trail[i];
                        const p2 = this.trail[i + 1];
                        
                        if (p1.brightness > 0 && p2.brightness > 0) {
                            const alpha1 = p1.brightness;
                            const alpha2 = p2.brightness;
                            
                            ctx.beginPath();
                            ctx.moveTo(p1.x, p1.y);
                            ctx.lineTo(p2.x, p2.y);
                            
                            // Crear gradiente para transición suave
                            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
                            gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha1})`);
                            gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha2})`);
                            
                            ctx.strokeStyle = gradient;
                            ctx.lineWidth = this.size * (1 - i/this.trail.length) * 0.8;
                            ctx.lineCap = 'round';
                            ctx.stroke();
                        }
                    }
                    
                    // Dibujar cabeza brillante
                    if (this.brightness > 0) {
                        ctx.beginPath();
                        ctx.arc(this.x, this.y, this.size * 1.2, 0, Math.PI * 2);
                        
                        // Brillo central más intenso
                        const gradient = ctx.createRadialGradient(
                            this.x, this.y, 0,
                            this.x, this.y, this.size * 1.2
                        );
                        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.brightness})`);
                        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);
                        
                        ctx.fillStyle = gradient;
                        ctx.fill();
                    }
                }
            }
            
            // Inicializar estrellas fugaces
            for (let i = 0; i < particleCount; i++) {
                particles.push(new ShootingStar());
                // Espaciar la aparición inicial
                particles[i].x = Math.random() * canvas.width;
                particles[i].y = Math.random() * canvas.height * 1.5;
            }
            
            // Animación
            function animate() {
                // Limpiar con opacidad para efecto de persistencia
                ctx.fillStyle = 'rgba(27, 30, 40, 0.15)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Actualizar y dibujar
                particles.forEach(star => {
                    star.update();
                    star.draw();
                });
                
                requestAnimationFrame(animate);
            }
            
            animate();
            
            // Redimensionar
            window.addEventListener('resize', () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            });
        });

   // Cuenta regresiva al 15 de mayo de 2025
        function updateCountdown() {
            const targetDate = new Date('2025-05-19T00:00:00');
            const now = new Date();
            const diff = targetDate - now;
            
            if (diff <= 0) {
                document.getElementById('days').textContent = '00';
                document.getElementById('hours').textContent = '00';
                document.getElementById('minutes').textContent = '00';
                document.getElementById('seconds').textContent = '00';
                return;
            }
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }

        // Actualizar cada segundo
        updateCountdown();
        setInterval(updateCountdown, 1000);
