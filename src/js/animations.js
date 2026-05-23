/**
 * Initializes animations using GSAP. GSAP is dynamically imported to defer heavy JS.
 */
export async function initAnimations() {
  try {
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    // Hero section entrance animation timeline
    const heroTl = gsap.timeline();

    if (document.getElementById('hero-title')) {
      heroTl.fromTo('#hero-title',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }
      );
    }

    if (document.getElementById('hero-subtitle')) {
      heroTl.fromTo('#hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );
    }

    if (document.getElementById('hero-buttons')) {
      heroTl.fromTo('#hero-buttons',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );
    }

    // Stagger entry cards scroll timelines for standard grid divisions

    // Services entries
    if (document.querySelector('#servicios .card-premium')) {
      gsap.from('#servicios .card-premium', {
        scrollTrigger: {
          trigger: '#servicios',
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out'
      });
    }

    // Why Choose Us entries
    if (document.querySelector('#porque .glass')) {
      gsap.from('#porque .glass', {
        scrollTrigger: {
          trigger: '#porque',
          start: 'top 80%',
        },
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out'
      });
    }

    // Gallery entries
    if (document.querySelector('#galeria .gallery-card')) {
      gsap.from('#galeria .gallery-card', {
        scrollTrigger: {
          trigger: '#galeria',
          start: 'top 80%',
        },
        opacity: 0,
        scale: 0.9,
        stagger: 0.1,
        duration: 0.6,
        ease: 'back.out(1.2)'
      });
    }
  } catch (err) {
    // Fail gracefully if GSAP cannot load
    console.warn('GSAP failed to load or initialize:', err);
  }
}

// Note: The synchronous legacy init was removed to avoid duplicate declarations.
