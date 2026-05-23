import { initContactForm } from './js/contact.js';
import { initGallery } from './js/gallery.js';
import { initMenu } from './js/menu.js';
import { initServiciosCotizacion } from './js/servicios.js'; // 🔥 NUEVO

document.addEventListener('DOMContentLoaded', () => {

  // 🔥 INICIALIZACIONES
  initMenu();
  initContactForm();
  initGallery();
  initServiciosCotizacion(); // 🔥 IMPORTANTE (esto activa los checkboxes)

  // Navbar scroll
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

  // Animaciones diferidas
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
    }, 1500);
  }

  // Tracking WhatsApp
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

  // Año dinámico
  const copyrightYearEl = document.getElementById('copyright-year');
  if (copyrightYearEl) {
    copyrightYearEl.textContent = new Date().getFullYear();
  }
});