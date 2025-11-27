document.addEventListener("DOMContentLoaded", function () {
    // Elementos del DOM
    const navLinks = document.querySelectorAll("nav ul li a");
    const sections = document.querySelectorAll("section");
    const header = document.querySelector("header");
    const typingElement = document.getElementById("typing-effect");
    
    // 1. Efecto de partículas en el header
    createParticles(header);
    
    // 2. Mostrar solo la sección de inicio al cargar
    document.getElementById("inicio").classList.add("visible");
    
    // 3. Efecto de máquina de escribir
    if (typingElement) {
        initTypeWriterEffect();
    } else {
        console.warn('Elemento typing-effect no encontrado');
    }
    
    // 4. Navegación suave entre secciones
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Remover clase active de todos los links
                navLinks.forEach(link => link.classList.remove("active"));
                
                // Agregar clase active al link clickeado
                this.classList.add("active");
                
                // Ocultar todas las secciones (solo visualmente)
                sections.forEach(section => {
                    section.classList.remove("visible");
                });
                
                // Mostrar la sección objetivo
                targetSection.classList.add("visible");
                
                // Desplazamiento suave
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: "smooth"
                });
            }
        });
    });
    
    // 5. Animación al hacer scroll
    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.classList.add("visible");
                
                // Actualizar link activo
                const id = section.getAttribute("id");
                const correspondingLink = document.querySelector(`nav ul li a[href="#${id}"]`);
                
                if (correspondingLink) {
                    navLinks.forEach(link => link.classList.remove("active"));
                    correspondingLink.classList.add("active");
                }
            }
        });
    }
    
    window.addEventListener("scroll", checkScroll);
    checkScroll(); // Verificar al cargar
    
    // 6. Efecto de descarga CV
    const downloadBtn = document.querySelector('.download-cv');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // URL directa de descarga de Google Drive
            const fileId = '1RFf6en6JnQ8keDhvnFIhGq5XUh2pjMH7';
            const directDownloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
            
            // Crear un enlace temporal para descarga
            const link = document.createElement('a');
            link.href = directDownloadUrl;
            link.setAttribute('download', 'CV-Wilmer-Batz.pdf'); 
            link.setAttribute('target', '_blank'); 
            
            // Simular click en el enlace
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
    
    // 7. Cerrar menú mobile al hacer click en un link
    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            const navbar = document.querySelector("nav");
            if (navbar && navbar.classList.contains("active")) {
                navbar.classList.remove("active");
            }
        });
    });

    // Funciones auxiliares
    function initTypeWriterEffect() {
        const texts = [
            "Hola, soy Wilmer Batz",
            "Desarrollador Web Jr",
            "Bienvenido a mi Portafolio"
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingTimeout;
        
        function typeWriter() {
            const currentText = texts[textIndex];
            
            clearTimeout(typingTimeout);
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingTimeout = setTimeout(typeWriter, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingTimeout = setTimeout(typeWriter, 100);
            } else {
                typingTimeout = setTimeout(
                    typeWriter, 
                    isDeleting ? 50 : 100
                );
            }
        }
        
        typeWriter();
    }

    function createParticles(container) {
    }
});