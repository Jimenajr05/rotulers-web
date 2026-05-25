import { initMenu } from './js/menu.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Menu is immediately interactive
  initMenu();

  // 2. Set current year in copyright
  const copyrightYearEl = document.getElementById('copyright-year');
  if (copyrightYearEl) {
    copyrightYearEl.textContent = new Date().getFullYear();
  }

  // 3. Navbar scroll effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // 4. WhatsApp Click event tracker
  document.body.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;

    if (a.href && (a.href.includes('wa.me') || a.href.includes('api.whatsapp.com'))) {
      try {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: 'whatsapp_click', url: a.href });
      } catch (e) { }
    }
  });

  // 5. Lazy-load other scripts (Gallery, Contact, Services, Animations)
  
  // A. Lazy-load Animations (GSAP)
  const loadAnimations = () => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        import('./js/animations.js').then(mod => {
          if (mod.initAnimations) mod.initAnimations();
        }).catch(() => { });
      });
    } else {
      setTimeout(() => {
        import('./js/animations.js').then(mod => {
          if (mod.initAnimations) mod.initAnimations();
        }).catch(() => { });
      }, 1200);
    }
  };
  loadAnimations();

  // B. Lazy-load Gallery under demand
  const galleryGrid = document.getElementById('gallery-grid');
  if (galleryGrid) {
    if ('IntersectionObserver' in window) {
      const galleryObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            import('./js/gallery.js').then(async (mod) => {
              if (mod.initGalleryAsync) {
                await mod.initGalleryAsync();
              }
            }).catch(err => console.error('Error loading gallery:', err));
          }
        });
      }, { rootMargin: '400px' });
      
      const gallerySection = document.getElementById('galeria') || galleryGrid;
      galleryObserver.observe(gallerySection);
    } else {
      // Fallback
      import('./js/gallery.js').then(async (mod) => {
        if (mod.initGalleryAsync) await mod.initGalleryAsync();
      }).catch(() => {});
    }
  }

  // C. Lazy-load Contact Form under demand
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    if ('IntersectionObserver' in window) {
      const contactObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            import('./js/contact.js').then(mod => {
              if (mod.initContactForm) mod.initContactForm();
            }).catch(err => console.error('Error loading contact form:', err));
          }
        });
      }, { rootMargin: '400px' });
      
      const contactSection = document.getElementById('contacto') || contactForm;
      contactObserver.observe(contactSection);
    } else {
      // Fallback
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          import('./js/contact.js').then(mod => {
            if (mod.initContactForm) mod.initContactForm();
          }).catch(() => {});
        });
      } else {
        setTimeout(() => {
          import('./js/contact.js').then(mod => {
            if (mod.initContactForm) mod.initContactForm();
          }).catch(() => {});
        }, 1500);
      }
    }
  }

  // D. Lazy-load Services Quote under demand
  const btnCotizar = document.getElementById('btn-cotizar');
  if (btnCotizar) {
    if ('IntersectionObserver' in window) {
      const serviciosObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            import('./js/servicios.js').then(mod => {
              if (mod.initServiciosCotizacion) mod.initServiciosCotizacion();
            }).catch(err => console.error('Error loading services quote:', err));
          }
        });
      }, { rootMargin: '400px' });
      
      const serviciosSection = document.getElementById('servicios') || btnCotizar;
      serviciosObserver.observe(serviciosSection);
    } else {
      // Fallback
      import('./js/servicios.js').then(mod => {
        if (mod.initServiciosCotizacion) mod.initServiciosCotizacion();
      }).catch(() => {});
    }
  }
});