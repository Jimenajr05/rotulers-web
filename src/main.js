import { initContactForm } from './js/contact.js';
import { initGalleryAsync } from './js/gallery.js';
import { initMenu } from './js/menu.js';
import { initServiciosCotizacion } from './js/servicios.js';
document.addEventListener('DOMContentLoaded', async () => {

  initMenu();
  initContactForm();
  await initGalleryAsync();
  initServiciosCotizacion();

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

  const copyrightYearEl = document.getElementById('copyright-year');
  if (copyrightYearEl) {
    copyrightYearEl.textContent = new Date().getFullYear();
  }
});