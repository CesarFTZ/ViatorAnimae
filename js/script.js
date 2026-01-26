document.addEventListener('DOMContentLoaded', () => {
    console.log('Viator Animae initialized');

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
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

    // Client-side image transparency (remove black background)
    const logoImg = document.getElementById('header-logo');
    if (logoImg) {
        logoImg.onload = function () {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = logoImg.naturalWidth;
                canvas.height = logoImg.naturalHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(logoImg, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                // Iterate through every pixel
                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    // If pixel is close to black, make it transparent
                    if (r < 30 && g < 30 && b < 30) {
                        data[i + 3] = 0; // Alpha to 0
                    }
                }

                ctx.putImageData(imageData, 0, 0);
                logoImg.src = canvas.toDataURL();
            } catch (e) {
                console.warn('Could not process image transparency (likely CORS/file-protocol restriction). CSS blend-mode will handle it.');
            }
        };

        // If cached
        if (logoImg.complete) logoImg.onload();
    }
});
