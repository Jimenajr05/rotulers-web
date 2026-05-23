export function initServiciosCotizacion() {
  const btn = document.getElementById("btn-cotizar");

  if (!btn) return;

  btn.addEventListener("click", () => {
    // 1. Obtener todos los checkboxes seleccionados
    const checks = document.querySelectorAll(".servicio-check:checked");

    // 2. Validar que haya al menos uno
    if (checks.length === 0) {
      alert("Por favor selecciona al menos un servicio para cotizar.");
      return;
    }

    // 3. Formatear la lista de servicios
    const servicios = Array.from(checks).map(c => `• ${c.value}`);
    const listaServicios = servicios.join('\n');

    // 4. Autorellenar el textarea del formulario
    const mensajeTextarea = document.getElementById("mensaje");
    if (mensajeTextarea) {
      mensajeTextarea.value = `Hola, me interesa cotizar los siguientes servicios:\n\n${listaServicios}\n\nPor favor brindarme más información.`;
    }

    // 5. Hacer scroll suave hacia la sección de contacto
    const contactoSection = document.getElementById("contacto");
    if (contactoSection) {
      contactoSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}