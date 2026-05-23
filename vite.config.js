import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

function htmlComponentsPlugin() {
  return {
    name: 'html-components-plugin',
    transformIndexHtml(html) {
      return html.replace(/<div id="component-(.*?)"><\/div>/g, (match, componentName) => {
        const componentPath = resolve(__dirname, `src/components/${componentName}.html`);
        if (fs.existsSync(componentPath)) {
          return fs.readFileSync(componentPath, 'utf-8');
        }
        return match;
      });
    }
  }
}

export default defineConfig({
  plugins: [htmlComponentsPlugin()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        adhesivos: resolve(__dirname, 'servicios/adhesivos/index.html'),
        'corte-electronico': resolve(__dirname, 'servicios/corte-electronico/index.html'),
        etiquetas: resolve(__dirname, 'servicios/etiquetas/index.html'),
        instalacion: resolve(__dirname, 'servicios/instalacion/index.html'),
        'letras-caja': resolve(__dirname, 'servicios/letras-caja/index.html'),
        'letras-planas-laser': resolve(__dirname, 'servicios/letras-planas-laser/index.html'),
        lonas: resolve(__dirname, 'servicios/lonas/index.html'),
        mantenimiento: resolve(__dirname, 'servicios/mantenimiento/index.html'),
        microperforados: resolve(__dirname, 'servicios/microperforados/index.html'),
        'placas-acrilicas': resolve(__dirname, 'servicios/placas-acrilicas/index.html'),
        'placas-pvc': resolve(__dirname, 'servicios/placas-pvc/index.html'),
        reparacion: resolve(__dirname, 'servicios/reparacion/index.html'),
        'roller-up': resolve(__dirname, 'servicios/roller-up/index.html'),
        'rotulacion-vehicular': resolve(__dirname, 'servicios/rotulacion-vehicular/index.html'),
        'rotulos-luminosos': resolve(__dirname, 'servicios/rotulos-luminosos/index.html'),
        'rotulos-marco-lona': resolve(__dirname, 'servicios/rotulos-marco-lona/index.html'),
        'rotulos-metalicos': resolve(__dirname, 'servicios/rotulos-metalicos/index.html'),
        sandblasting: resolve(__dirname, 'servicios/sandblasting/index.html')
      }
    }
  }
});
