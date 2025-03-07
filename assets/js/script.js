document.addEventListener("DOMContentLoaded", () => {
    // ========== VARIABLES GLOBALES ==========
    const header = document.querySelector("header");
    const navMenu = document.getElementById("nav-menu");
    const menuToggle = document.getElementById("menu-toggle");
    const loader = document.createElement("div");
    loader.className = "loader";

    // ========== LOADER ==========
    document.body.prepend(loader);
    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.style.opacity = "0";
            setTimeout(() => loader.remove(), 500);
        }, 1500);
    });

    // ========== MENÚ MÓVIL ==========
    const toggleMenu = (isActive) => {
        navMenu.classList.toggle("active", isActive);
        menuToggle.setAttribute("aria-expanded", isActive);
        document.body.style.overflow = isActive ? "hidden" : "auto";
    };

    menuToggle.addEventListener("click", () => toggleMenu(!navMenu.classList.contains("active")));
    
    // Cerrar menú con Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navMenu.classList.contains("active")) {
            toggleMenu(false);
        }
    });

    // ========== SCROLL SUAVE ==========
    document.querySelectorAll("nav a").forEach(anchor => {
        anchor.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                window.scrollTo({
                    top: targetSection.offsetTop - headerHeight,
                    behavior: "smooth"
                });
                if (window.innerWidth <= 768) toggleMenu(false);
            }
        });
    });

    // ========== ANIMACIÓN DE SECCIONES ==========
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll("section").forEach(section => observer.observe(section));

    // ========== EFECTO HEADER DINÁMICO ==========
    let lastScroll = 0;
    const handleScroll = () => {
        const currentScroll = window.scrollY;
        
        // Sombra dinámica
        header.style.boxShadow = currentScroll > 50 
            ? "0 4px 20px rgba(27, 79, 114, 0.15)" 
            : "none";
        
        // Ocultar/mostrar header al hacer scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = "translateY(-100%)";
        } else {
            header.style.transform = "translateY(0)";
        }
        lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);

    // ========== FORMULARIO ==========
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            // Validación honeypot
            if (form.querySelector("[name=honeypot]").value !== "") return;
            
            // Simular envío
            const submitBtn = form.querySelector("button[type=submit]");
            submitBtn.disabled = true;
            submitBtn.innerHTML = "Enviando...";

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = "¡Mensaje Enviado!";
                form.reset();
                setTimeout(() => submitBtn.innerHTML = "Enviar Mensaje", 2000);
            }, 1500);
        });
    }

    // ========== OPTIMIZACIÓN DE EVENTOS ==========
    const debounce = (func, wait = 100) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    window.addEventListener("resize", debounce(() => {
        if (window.innerWidth > 768 && navMenu.classList.contains("active")) {
            toggleMenu(false);
        }
    }));

    // ========== EFECTO DE PARPADEO EN TÍTULOS ==========
    const titleEffects = () => {
        document.querySelectorAll("h1, h2, h3").forEach(title => {
            title.style.setProperty("--glow-color", `hsl(${Math.random() * 360}, 70%, 60%)`);
        });
    };
    titleEffects();
});