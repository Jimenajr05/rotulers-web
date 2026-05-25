export function initContactForm() {
  const contactForm = document.getElementById('contact-form');

  if (!contactForm) return;

  const servicioSelect = document.getElementById('servicio');

  const fields = [
    { id: 'mensaje', errorId: 'error-mensaje' }
  ];

  const showError = (fieldId, errorId) => {
    const input = document.getElementById(fieldId);
    const errorEl = document.getElementById(errorId);
    if (input && !input.disabled) {
      input.classList.remove('border-transparent');
      input.classList.add('border-red-500');
    }
    if (errorEl) {
      errorEl.classList.remove('hidden');
      if (fieldId === 'servicio') {
        errorEl.textContent = 'Selecciona al menos un servicio.';
      }
    }
  };

  const clearError = (fieldId, errorId) => {
    const input = document.getElementById(fieldId);
    const errorEl = document.getElementById(errorId);
    if (input) {
      input.classList.remove('border-red-500');
      input.classList.add('border-transparent');
    }
    if (errorEl) {
      errorEl.classList.add('hidden');
    }
  };

  fields.forEach(f => {
    const input = document.getElementById(f.id);
    if (input) {
      input.addEventListener('input', () => clearError(f.id, f.errorId));
      input.addEventListener('change', () => clearError(f.id, f.errorId));
    }
  });

  const updateServicioSelect = () => {
    const checkedCount = document.querySelectorAll('.servicio-check:checked').length;

    if (!servicioSelect) return;

    if (checkedCount > 0) {
      servicioSelect.disabled = true;
      servicioSelect.classList.add('opacity-50', 'bg-gray-100', 'cursor-not-allowed');
      clearError('servicio', 'error-servicio');

      let opt = servicioSelect.querySelector('option[value="varios"]');
      if (!opt) {
        opt = document.createElement('option');
        opt.value = 'varios';
        opt.hidden = true;
        servicioSelect.appendChild(opt);
      }
      opt.textContent = `${checkedCount} servicio(s) seleccionado(s) arriba`;
      servicioSelect.value = 'varios';

    } else {
      servicioSelect.disabled = false;
      servicioSelect.classList.remove('opacity-50', 'bg-gray-100', 'cursor-not-allowed');
      if (servicioSelect.value === 'varios') {
        servicioSelect.value = '';
      }
    }
  };
  document.addEventListener('change', (e) => {
    if (e.target && e.target.classList.contains('servicio-check')) {
      updateServicioSelect();
    }
  });

  updateServicioSelect();

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let hasError = false;
    let firstErrorInput = null;

    fields.forEach(f => {
      const input = document.getElementById(f.id);

      if (!input || input.disabled) return;

      if (!input.value.trim()) {
        showError(f.id, f.errorId);
        hasError = true;
        if (!firstErrorInput) {
          firstErrorInput = input;
        }
      }
    });

    if (hasError) {
      if (firstErrorInput) {
        firstErrorInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstErrorInput.focus();
      }
      return;
    }

    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const emailEl = document.getElementById('email');
    const email = emailEl ? emailEl.value.trim() : '';
    let mensajeInput = document.getElementById('mensaje').value.trim();

    const checkedBoxes = document.querySelectorAll('.servicio-check:checked');
    const selectValue = servicioSelect && !servicioSelect.disabled ? servicioSelect.value : '';

    if (!mensajeInput.toLowerCase().includes("servicios")) {
      if (checkedBoxes.length > 0) {
        const lista = Array.from(checkedBoxes).map(c => `• ${c.value}`).join('\n');
        mensajeInput = `Me interesa cotizar los siguientes servicios:\n${lista}\n\nDetalles adicionales:\n${mensajeInput}`;
      } else if (selectValue) {
        mensajeInput = `Me interesa cotizar el servicio:\n• ${selectValue}\n\nDetalles adicionales:\n${mensajeInput}`;
      }
    }

    let textoWhatsApp = `Hola Rotulers 👋\n\n`;
    if (nombre) {
      textoWhatsApp += `Mi nombre es: ${nombre}\n\n`;
    }
    
    textoWhatsApp += `${mensajeInput}`;
    
    if (telefono || email) {
      textoWhatsApp += `\n\nMis datos de contacto:`;
      if (telefono) {
        textoWhatsApp += `\n📞 Teléfono: ${telefono}`;
      }
      if (email) {
        textoWhatsApp += `\n📧 Email: ${email}`;
      }
    }

    const numeroWhatsApp = "50689080161";
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoWhatsApp)}`;

    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'contact_submit',
        name: nombre
      });
    } catch (error) { }

    window.open(url, '_blank');
    contactForm.reset();

    if (checkedBoxes.length > 0) {
      checkedBoxes.forEach(chk => chk.checked = false);
      updateServicioSelect();
    }
  });
}