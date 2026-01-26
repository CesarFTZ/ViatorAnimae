document.addEventListener('DOMContentLoaded', () => {
    console.log('Viator Animae initialized');

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement){
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple intersection observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Apply to sections elements if needed
    // const sections = document.querySelectorAll('section');
    // sections.forEach(section => {
    //     section.style.opacity = '0';
    //     section.style.transform = 'translateY(20px)';
    //     section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    //     observer.observe(section);
    // });
});
