const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Config
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const OUT_MANIFEST = path.join(PUBLIC_DIR, '_image-manifest.json');
const widths = [400, 800, 1200];
const formats = ['avif', 'webp'];

function isImage(file) {
  return /\.(jpe?g|png|webp|avif|gif)$/i.test(file);
}

async function walk(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const sub = await walk(full);
      files.push(...sub);
    } else if (entry.isFile() && isImage(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

(async () => {
  try {
    const all = await walk(PUBLIC_DIR);
    const manifest = {};

    for (const file of all) {
      // skip manifest itself
      if (file.endsWith('_image-manifest.json')) continue;

      const rel = path.relative(PUBLIC_DIR, file).replace(/\\\\/g, '/');
      const ext = path.extname(file).toLowerCase();
      const basename = path.basename(file, ext);
      const dir = path.dirname(file);

      // create output entry
      const variants = { avif: [], webp: [], fallback: [] };

      for (const w of widths) {
        const outNameBase = `${basename}-${w}`;
        for (const fmt of formats) {
          const outPath = path.join(dir, `${outNameBase}.${fmt}`);
          await sharp(file)
            .resize({ width: w })
            .toFormat(fmt)
            .toFile(outPath);
          variants[fmt].push(`/${path.relative(PUBLIC_DIR, outPath).replace(/\\\\/g, '/')}`);
        }

        // fallback (keep original format)
        const outFallback = path.join(dir, `${outNameBase}${ext}`);
        await sharp(file)
          .resize({ width: w })
          .toFile(outFallback);
        variants.fallback.push(`/${path.relative(PUBLIC_DIR, outFallback).replace(/\\\\/g, '/')}`);
      }

      manifest[`/${rel}`] = {
        avif: variants.avif,
        webp: variants.webp,
        fallback: variants.fallback
      };
    }

    await fs.promises.writeFile(OUT_MANIFEST, JSON.stringify(manifest, null, 2), 'utf8');
    console.log('Generated image variants and manifest at', OUT_MANIFEST);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();