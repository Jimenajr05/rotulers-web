# ROTÚLERS

Sitio web oficial de **ROTÚLERS**, empresa costarricense especializada en el diseño, fabricación e instalación de rótulos, señalización y publicidad exterior, ubicada en Cedral de Ciudad Quesada, San Carlos, Alajuela, Costa Rica.

Este proyecto ha sido optimizado para ofrecer una alta velocidad de carga, interactividad fluida y un excelente posicionamiento en buscadores (SEO).

---

## Tecnologías Utilizadas

El proyecto utiliza un conjunto moderno de herramientas de desarrollo web para garantizar un rendimiento óptimo:

* **Estructura y Lógica:** HTML5, JavaScript moderno (ES6+) y CSS3.
* **Compilador y Empaquetador:** [Vite v5](https://vitejs.dev/) para la compilación, minificación de código y carga diferida de módulos.
* **Sistema de Estilos:** [Tailwind CSS v3](https://tailwindcss.com/) y PostCSS para un desarrollo responsivo y consistente.
* **Interactividad y Efectos:** [GSAP (GreenSock Animation Platform)](https://gsap.com/) para microanimaciones de la interfaz.
* **Optimización SEO:** Datos estructurados JSON-LD (Schema.org), etiquetas Open Graph y Twitter Cards.

---

## Estructura del Proyecto

El código fuente está organizado de forma modular para simplificar la mantenibilidad y expansión del sitio:

```text
├── dist/                    # Directorio de producción (generado al compilar)
├── public/                  # Archivos estáticos transferidos directamente al build
│   ├── logo.png             # Logo oficial del negocio
│   ├── optimized/           # Galería de imágenes optimizadas para la web
│   ├── robots.txt           # Configuración de rastreo para buscadores
│   └── sitemap.xml          # Mapa del sitio web para indexación SEO
├── servicios/               # Archivos fuente de páginas de servicios (SEO Landing Pages)
│   ├── adhesivos/           # Página del servicio de Viniles Adhesivos
│   ├── letras-caja/         # Página del servicio de Letras de Caja
│   ├── mantenimiento/       # Página del servicio de Mantenimiento
│   └── ... (18 en total)    # Catálogo de servicios individuales
├── src/                     # Código fuente de desarrollo
│   ├── components/          # Fragmentos HTML reutilizables (Navbar, Footer, etc.)
│   ├── js/                  # Scripts e interactividad de la interfaz
│   │   ├── animations.js    # Lógica de animaciones interactivas (GSAP)
│   │   ├── contact.js       # Validación del formulario de contacto
│   │   ├── gallery.js       # Visualizador de imágenes y efecto Lightbox
│   │   ├── menu.js          # Control de navegación en móviles
│   │   └── servicios.js     # Cotizador y vinculación automática al formulario
│   ├── main.js              # Punto de entrada de JavaScript
│   └── style.css            # Estilos globales y directivas de Tailwind
├── tailwind.config.js       # Configuración de temas, fuentes y colores corporativos
└── vite.config.js           # Configuración del empaquetador y plugin de componentes
```

---

## Arquitectura y Sistema de Plantillas

Para evitar la redundancia de código en páginas estáticas, el proyecto implementa un sistema modular a través del archivo de configuración `vite.config.js`.

### Procesamiento de Componentes HTML
El compilador busca elementos con marcas específicas en los archivos HTML del proyecto:
```html
<div id="component-navbar"></div>
<div id="component-footer"></div>
```
Durante el proceso de compilación, el plugin `htmlComponentsPlugin` reemplaza dinámicamente estos marcadores por el contenido de los archivos de origen en `src/components/navbar.html` y `src/components/footer.html`. Esto permite gestionar la barra de navegación y el pie de página de forma centralizada.

---

## Lógica y Funcionalidades del Sitio

### Cotizador por WhatsApp
La sección de servicios incluye un flujo interactivo:
1. El usuario selecciona los servicios que desea cotizar mediante casillas de verificación.
2. Al presionar el botón de cotización, el sistema genera de forma automática un mensaje estructurado con la lista de servicios seleccionados y lo inserta en el área de texto del formulario de contacto, realizando al mismo tiempo un desplazamiento suave hacia dicha sección.
3. El formulario permite al usuario enviar la información por correo o a través de un chat de WhatsApp personalizado que inicia con un mensaje adaptado al interés del cliente.

### Galería Multidispositivo
Presenta los proyectos de Rotúlers utilizando un visor (Lightbox) que facilita la visualización a pantalla completa de las imágenes del portafolio. Permite la navegación secuencial con gestos o botones y muestra descripciones de cada trabajo para mejorar la retención del usuario.

---

## Instrucciones de Uso y Compilación

### Requisitos
Es necesario contar con [Node.js](https://nodejs.org/) instalado (versión 18 o superior).

### Instalación de dependencias
Descargue los paquetes necesarios utilizando el gestor de paquetes de Node:
```bash
npm install
```

### Ejecución en desarrollo
Para iniciar el servidor local con soporte para recarga en tiempo real (Hot Module Replacement):
```bash
npm run dev
```
La aplicación estará disponible de forma predeterminada en `http://localhost:5173`.

### Compilación para producción
Para generar los archivos listos para el servidor de producción:
```bash
npm run build
```
Los archivos optimizados y minificados se escribirán en el directorio `/dist`.

### Previsualización de producción
Para verificar localmente el resultado de la carpeta compilada:
```bash
npm run preview
```

---

## Posicionamiento en Buscadores (SEO)

* **Descripciones específicas:** Títulos y meta descripciones únicas para cada página de servicio.
* **Marcado Estructurado:** Uso de JSON-LD (Schema.org) adaptado a un negocio local, especificando su localización geográfica (coordenadas de Cedral de Ciudad Quesada), contacto, horarios y especialidades.
* **URLs Canónicas:** Declaración explícita del enlace original en cada documento para evitar penalizaciones por contenido duplicado.
* **Optimización de Recursos:** Uso del formato de imágenes de última generación (`.webp` y `.avif`) y dimensiones establecidas para prevenir desajustes de diseño (Cumulative Layout Shift).

---

## Autor

Desarrollado y optimizado por **María Jimena Jara Rojas**.
