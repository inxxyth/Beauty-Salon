import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function gen(name: string, prompt: string, size: string) {
  const outPath = `/home/z/my-project/public/luxe/${name}`;
  const zai = await ZAI.create();
  console.log(`→ generating ${name} (${size})`);
  const r = await zai.images.generations.create({ prompt, size: size as any });
  const buf = Buffer.from(r.data[0].base64, 'base64');
  fs.writeFileSync(outPath, buf);
  console.log(`  ✓ saved (${(buf.length / 1024).toFixed(1)} KB)`);
}

async function main() {
  // Hero — pure abstract macro: golden serum drop on aubergine silk, NO human features
  await gen(
    'hero-portrait.png',
    'Ultra macro luxury beauty still life: a single glowing golden serum drop falling onto deep aubergine silk fabric, soft champagne gold light, delicate orchid petal beside it, extreme close-up, cinematic lighting, abstract luxury editorial, NO human features NO lips NO face NO hands, pure product macro photography, color palette deep plum royal purple lavender and champagne gold, high quality 8k',
    '768x1344'
  );

  // Gallery 1 — abstract macro: gold oil swirling in plum, ink-drop style
  await gen(
    'gallery-1.png',
    'Abstract luxury macro: swirling liquid gold and deep plum violet oil on black background, ink-drop style, mesmerizing premium art, single golden droplet creating ripples, no subjects no people, ultra detailed editorial, color palette aubergine plum orchid lavender champagne gold, high quality 8k',
    '768x1344'
  );
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
