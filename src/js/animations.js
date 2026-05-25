export async function initAnimations() {
  try {
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);
    window.gsap = gsap;
    window.ScrollTrigger = ScrollTrigger;

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

    if (document.querySelector('#porque .glass')) {
      const porqueTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#porque',
          start: 'top bottom',
          toggleActions: 'play none none none',
          once: true,
          markers: false
        }
      });

      porqueTl.from('#porque .glass', {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out',
        immediateRender: false
      });
    }

    if (document.getElementById('galeria')) {
      animateGalleryCards();
    }
  } catch (err) {
    console.warn('GSAP failed to load or initialize:', err);
  }
}

export function animateGalleryCards() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap) return;

  const cards = document.querySelectorAll('#galeria .gallery-card');
  if (cards.length === 0) return;

  if (ScrollTrigger) {
    gsap.fromTo(cards,
      { opacity: 0, scale: 0.95, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        overwrite: 'auto',
        scrollTrigger: {
          trigger: '#gallery-grid',
          start: 'top 92%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  } else {
    gsap.fromTo(cards,
      { opacity: 0, scale: 0.95, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out', overwrite: 'auto' }
    );
  }
}

window.animateGalleryCards = animateGalleryCards;