export function initServiciosCotizacion() {
  const btn = document.getElementById("btn-cotizar");

  if (!btn) return;

  btn.addEventListener("click", () => {
    const checks = document.querySelectorAll(".servicio-check:checked");

    if (checks.length === 0) {
      alert("Por favor selecciona al menos un servicio para cotizar.");
      return;
    }

    const servicios = Array.from(checks).map(c => `• ${c.value}`);
    const listaServicios = servicios.join('\n');

    const mensajeTextarea = document.getElementById("mensaje");
    if (mensajeTextarea) {
      mensajeTextarea.value = `Hola, me interesa cotizar los siguientes servicios:\n\n${listaServicios}\n\nPor favor brindarme más información.`;
    }

    const contactoSection = document.getElementById("contacto");
    if (contactoSection) {
      contactoSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}