export function initContactForm() {
  const contactForm = document.getElementById('contact-form');

  if (!contactForm) return;

  const servicioSelect = document.getElementById('servicio');

  // Campos requeridos a validar
  const fields = [
    { id: 'nombre', errorId: 'error-nombre' },
    { id: 'telefono', errorId: 'error-telefono' },
    { id: 'servicio', errorId: 'error-servicio' },
    { id: 'mensaje', errorId: 'error-mensaje' }
  ];

  // Función para mostrar el error visualmente en el input
  const showError = (fieldId, errorId) => {
    const input = document.getElementById(fieldId);
    const errorEl = document.getElementById(errorId);
    if (input && !input.disabled) {
      input.classList.remove('border-transparent');
      input.classList.add('border-red-500');
    }
    if (errorEl) {
      errorEl.classList.remove('hidden');
      // Asegurar que el mensaje diga "al menos un servicio" si es el select
      if (fieldId === 'servicio') {
        errorEl.textContent = 'Selecciona al menos un servicio.';
      }
    }
  };

  // Función para limpiar el error
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

  // Limpiar el error en cuanto el usuario empiece a corregirlo
  fields.forEach(f => {
    const input = document.getElementById(f.id);
    if (input) {
      input.addEventListener('input', () => clearError(f.id, f.errorId));
      input.addEventListener('change', () => clearError(f.id, f.errorId));
    }
  });

  // --- LÓGICA DINÁMICA DE SERVICIOS ---
  const updateServicioSelect = () => {
    const checkedCount = document.querySelectorAll('.servicio-check:checked').length;

    if (!servicioSelect) return;

    if (checkedCount > 0) {
      // Si hay checkboxes marcados, el select deja de ser obligatorio
      servicioSelect.disabled = true;
      servicioSelect.classList.add('opacity-50', 'bg-gray-100', 'cursor-not-allowed');
      clearError('servicio', 'error-servicio');

      // Mostrar feedback visual en el select
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
      // Si no hay checkboxes, el select vuelve a ser normal y obligatorio
      servicioSelect.disabled = false;
      servicioSelect.classList.remove('opacity-50', 'bg-gray-100', 'cursor-not-allowed');
      if (servicioSelect.value === 'varios') {
        servicioSelect.value = '';
      }
    }
  };

  // Escuchar globalmente si el usuario marca/desmarca checkboxes
  document.addEventListener('change', (e) => {
    if (e.target && e.target.classList.contains('servicio-check')) {
      updateServicioSelect();
    }
  });

  // Inicializar estado del select al cargar
  updateServicioSelect();

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let hasError = false;
    let firstErrorInput = null;

    // Ejecutar validación sobre todos los campos
    fields.forEach(f => {
      const input = document.getElementById(f.id);

      // Si el input está deshabilitado (ej. el select cuando hay checkboxes), no validarlo
      if (!input || input.disabled) return;

      if (!input.value.trim()) {
        showError(f.id, f.errorId);
        hasError = true;
        if (!firstErrorInput) {
          firstErrorInput = input;
        }
      }
    });

    // Si hay algún error, detenemos el envío
    if (hasError) {
      if (firstErrorInput) {
        firstErrorInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstErrorInput.focus();
      }
      return;
    }

    // --- Si pasa la validación, procedemos a generar el WhatsApp ---
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const emailEl = document.getElementById('email');
    const email = emailEl ? emailEl.value.trim() : '';
    let mensajeInput = document.getElementById('mensaje').value.trim();

    // Lógica inteligente para inyectar servicios si no se autorellenaron en el textarea
    const checkedBoxes = document.querySelectorAll('.servicio-check:checked');
    const selectValue = servicioSelect && !servicioSelect.disabled ? servicioSelect.value : '';

    // Verificamos si el textarea ya incluye la palabra "servicios" (proveniente del btn-cotizar)
    if (!mensajeInput.toLowerCase().includes("servicios")) {
      if (checkedBoxes.length > 0) {
        const lista = Array.from(checkedBoxes).map(c => `• ${c.value}`).join('\n');
        mensajeInput = `Me interesa cotizar los siguientes servicios:\n${lista}\n\nDetalles adicionales:\n${mensajeInput}`;
      } else if (selectValue) {
        mensajeInput = `Me interesa cotizar el servicio:\n• ${selectValue}\n\nDetalles adicionales:\n${mensajeInput}`;
      }
    }

    // Construcción del mensaje final ordenado y profesional
    const textoWhatsApp = `Hola Rotulers 👋\n\nMi nombre es: ${nombre}\n\n${mensajeInput}\n\nMis datos de contacto:\n📞 Teléfono: ${telefono}\n${email ? `📧 Email: ${email}` : ''}`;

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

    // Al resetear el form, limpiamos los checkboxes globales
    if (checkedBoxes.length > 0) {
      checkedBoxes.forEach(chk => chk.checked = false);
      updateServicioSelect();
    }
  });
}