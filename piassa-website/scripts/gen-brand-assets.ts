import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function gen(name: string, prompt: string, size: string) {
  const outPath = `/home/z/my-project/public/${name}`;
  const zai = await ZAI.create();
  console.log(`→ generating ${name} (${size})`);
  const r = await zai.images.generations.create({ prompt, size: size as any });
  const buf = Buffer.from(r.data[0].base64, 'base64');
  fs.writeFileSync(outPath, buf);
  console.log(`  ✓ saved (${(buf.length / 1024).toFixed(1)} KB)`);
}

async function main() {
  // Favicon / app icon — Luxe monogram "P" on purple gradient
  await gen(
    'icon.png',
    'Minimal luxury logo: elegant serif letter "P" in champagne gold on deep royal purple gradient background with subtle grain texture, centered, premium brand mark, monogram style, no other text, square format, high quality vector style',
    '1024x1024'
  );
  await gen(
    'apple-icon.png',
    'Minimal luxury logo: elegant serif letter "P" in champagne gold with thin gold border ring, on deep aubergine purple background, centered, premium brand mark, monogram style, no other text, square format, high quality',
    '1024x1024'
  );
  // OG image — branded social share card
  await gen(
    'opengraph-image.png',
    'Premium social share card: deep aubergine plum gradient background with golden bokeh, elegant serif text "Luxe" in champagne gold at center, small subtitle "Salon & Spa" in cream below, subtle orchid petal accent, luxury editorial layout, 1200x630 format, no other text, high quality brand asset',
    '1344x768'
  );
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
