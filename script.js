document.addEventListener('DOMContentLoaded', () => {

    // --- Lenis Smooth Scroll Initialization ---
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // --- Hero Heading Animation on page load ---
    const heroHeading = new SplitType('.hero-heading', { types: 'chars' });
    gsap.to(heroHeading.chars, {
        y: 0,
        stagger: 0.04,
        delay: 0.5, // Small delay for content to render
        duration: .1,
        ease: 'power4.out',
    });


    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // --- Mobile Menu ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // --- On-Scroll Reveal Animation Logic ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });


    // --- Project Data ---
    const designProjects = [
        { type: 'image', src: './Assets/dobby.png', title: 'Typography' },
        { type: 'image', src: './Assets/salena gomez.jpg', title: 'Typography' },
        { type: 'image', src: './Assets/sundari.jpg', title: 'Typography' },
        { type: 'image', src: './Assets/work out.jpg', title: 'Typography' },
        { type: 'image', src: './Assets/BANNER 1.jpg', title: 'BANNER' },
        { type: 'image', src: './Assets/BANNER 2.jpg', title: 'BANNER' },
        { type: 'image', src: './Assets/Mumbai.png', title: 'Selena Poster' },
        { type: 'image', src: './Assets/Jewellery.png', title: 'Jewellery' },     
    ];

    const motionProjects = [
        { type: 'video', src: './Assets/fashion1.mp4', title: 'Fashion Post' },
        { type: 'video', src: './Assets/Bridal Makeup.mp4', title: 'Bridal Makeup' },
        { type: 'video', src: './Assets/Deepas makeup.mp4', title: 'Deepas Makeup' },
        { type: 'video', src: './Assets/Bridal Makeup Photo Collage Instagram Story.mp4', title: 'Collage Instagram Story' },
        { type: 'video', src: './Assets/Logo motion.mp4', title: 'Logo motion' },
        { type: 'video', src: './Assets/Strategy plan.mp4', title: 'Strategy plan' },
        { type: 'video', src: './Assets/Logo motion 2.mp4', title: 'Logo motion2' },
    ];
    
    const threeDProjects = [
        { type: 'image', src: './Assets/billboard-jewelry.jpeg', title: 'Jewelry Billboard 3D' },
    ];

    // --- Gallery & Lightbox Logic ---
    const tabs = document.querySelectorAll('.tab-btn');
    const galleries = document.querySelectorAll('.project-gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightbox-content');
    const lightboxClose = document.getElementById('lightbox-close');

    function createProjectItem(project) {
        const item = document.createElement('div');
        item.className = 'project-item reveal';
        
        let mediaElement;
        if (project.type === 'image') {
            mediaElement = `<img src="${project.src}" alt="${project.title}" onerror="this.style.display='none'; this.parentElement.classList.add('is-broken');">`;
        } else { // video
            mediaElement = `<video loop muted playsinline autoplay><source src="${project.src}" type="video/mp4"></video>`;
        }
        item.innerHTML = mediaElement;

        item.addEventListener('click', () => openLightbox(project));
        return item;
    }

    function populateGallery(galleryId, projects) {
        const gallery = document.getElementById(galleryId);
        gallery.innerHTML = '';
        projects.forEach(project => {
            const item = createProjectItem(project)
            gallery.appendChild(item);
            revealObserver.observe(item);
        });
    }

    // Populate all galleries on page load
    populateGallery('design-gallery', designProjects);
    populateGallery('motion-gallery', motionProjects);
    populateGallery('3d-gallery', threeDProjects);

    // Tab switching functionality
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            galleries.forEach(gallery => {
                gallery.classList.remove('active');
                if (gallery.id === `${tabName}-gallery`) {
                    gallery.classList.add('active');
                }
            });
        });
    });
    
    // Lightbox functionality
    function openLightbox(project) {
        let mediaElement;
        if (project.type === 'image') {
            mediaElement = `<img src="${project.src}" alt="${project.title}">`;
        } else {
            mediaElement = `<video src="${project.src}" controls autoplay></video>`;
        }
        lightboxContent.innerHTML = mediaElement;
        lightbox.classList.add('active');
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightboxContent.innerHTML = '';
    }

    if (lightbox) {
      lightboxClose.addEventListener('click', closeLightbox);
      lightbox.addEventListener('click', (e) => {
          if (e.target === lightbox) {
              closeLightbox();
          }
      });
    }
});