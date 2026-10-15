/**
 * ESGBOX - Dynamic Interaction Script (Orange Edition v2.1)
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SCROLL REVEAL - Sekce se plynule "vnořují" při skrolování
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(40px)";
        section.style.transition = "all 0.7s cubic-bezier(0.17, 0.67, 0.83, 0.67)";
        revealObserver.observe(section);
    });

    // Dynamické přidání CSS třídy pro viditelnost
    const style = document.createElement('style');
    style.innerHTML = `
        .is-visible { 
            opacity: 1 !important; 
            transform: translateY(0) !important; 
        }
    `;
    document.head.appendChild(style);


    // 2. MAGNETIC LOGO - Logo reaguje na blízkost kurzoru
    const logo = document.querySelector('.logo');
    if (logo) {
        document.addEventListener('mousemove', (e) => {
            const rect = logo.getBoundingClientRect();
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // Výpočet vzdálenosti od loga
            const distanceX = mouseX - (rect.left + rect.width / 2);
            const distanceY = mouseY - (rect.top + rect.height / 2);
            const distance = Math.sqrt(distanceX**2 + distanceY**2);

            // Pokud je myš blízko (méně než 150px), logo se přitáhne
            if (distance < 150) {
                const force = (150 - distance) / 150;
                logo.style.transform = `translate(${distanceX * force * 0.3}px, ${distanceY * force * 0.3}px)`;
            } else {
                logo.style.transform = `translate(0, 0)`;
            }
        });
    }


    // 3. SERVICE CARDS HOVER - Jemné sledování světla (Spotlight efekt)
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.background = `
                radial-gradient(600px circle at ${x}px ${y}px, rgba(255, 107, 0, 0.06), transparent 40%),
                var(--card-bg)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = `var(--card-bg)`;
        });
    });


    // 4. SMOOTH SCROLL - Hladké přechody pro všechny interní kotvy (#)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.length > 1 && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    window.scrollTo({
                        top: target.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

});
