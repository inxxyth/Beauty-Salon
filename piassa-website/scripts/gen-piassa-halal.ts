import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUT_DIR = '/home/z/my-project/public/luxe';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

type Job = { name: string; prompt: string; size: string; force?: boolean };

const STYLE_SUFFIX =
  ', cinematic lighting, ultra-detailed, professional beauty photography, color palette deep aubergine plum royal purple lavender mist and champagne gold, luxury editorial, no watermark, high quality, 8k';

// HALAL-APPROVED IMAGERY — no faces, no bodies, focus on craft / products / atmosphere / hands
// Team portraits: modest professional women (some hijabi for inclusivity), high neckline, long sleeves
const jobs: Job[] = [
  {
    // Replace hero — was woman's face; now macro lips+serum drop, no face
    name: 'hero-portrait.png',
    force: true,
    prompt:
      'Ultra macro beauty shot of plump glossy plum lips with a single champagne gold serum drop catching light on the lower lip, dewy luminous skin fragment only, NO eyes NO nose NO full face, deep aubergine background with golden bokeh, extreme close-up luxury editorial, mystery and luxury' +
      STYLE_SUFFIX,
    size: '768x1344',
  },
  {
    // Replace bridal — was woman profile; now henna hands + veil fabric, modest
    name: 'bridal-portrait.png',
    force: true,
    prompt:
      'Elegant veiled bride hands with intricate deep plum and gold henna patterns covering fingers and palms, delicate gold rings, ivory silk veil fabric softly draped in background, modest bridal editorial photography, warm champagne gold rim lighting, deep plum background, NO face visible' +
      STYLE_SUFFIX,
    size: '864x1152',
  },
  {
    // Replace gallery-1 — was vogue model face; now macro lip + skin fragment, no full face
    name: 'gallery-1.png',
    force: true,
    prompt:
      'Ultra macro beauty editorial of glossy plum lips and dewy bronzed skin fragment with gold highlighter on cheekbone, NO eyes NO nose NO full face, deep purple background with golden bokeh, extreme close-up luxury macro photography' +
      STYLE_SUFFIX,
    size: '768x1344',
  },
  {
    // Replace service-facial — was woman receiving facial; now spa still life, no person
    name: 'service-facial.png',
    force: true,
    prompt:
      'Serene luxury spa still life with glass bowl of glowing golden serum, rolled white towels, lit candle with soft purple flame, delicate orchid petals scattered, marble surface, deep plum velvet background, calm ambiance editorial photography, NO people NO hands' +
      STYLE_SUFFIX,
    size: '1024x1024',
  },
  {
    // Replace service-makeup — was eye close-up; now makeup products flatlay, no people
    name: 'service-makeup.png',
    force: true,
    prompt:
      'Luxury makeup product flatlay on dark aubergine silk fabric, plum and gold eyeshadow palette with mirror, gold shimmer compact, deep plum lipstick tube, makeup brushes with rose gold handles, scattered orchid petals, top-down editorial product photography, NO people' +
      STYLE_SUFFIX,
    size: '1024x1024',
  },
  // Team / stylists — 4 modest professional women (2 hijabi for inclusivity)
  {
    name: 'team-1.png',
    prompt:
      'Professional portrait of a confident Middle Eastern woman creative director wearing elegant beige hijab and high-neck cream blouse, soft natural makeup, warm champagne gold lighting, deep aubergine background, modest professional editorial photography, head and shoulders only, serene expression' +
      STYLE_SUFFIX,
    size: '864x1152',
  },
  {
    name: 'team-2.png',
    prompt:
      'Professional portrait of an elegant South Asian woman master colorist wearing deep burgundy hijab and high-neck cream blouse, soft natural makeup, warm champagne gold lighting, deep aubergine background, modest professional editorial photography, head and shoulders only, focused confident expression' +
      STYLE_SUFFIX,
    size: '864x1152',
  },
  {
    name: 'team-3.png',
    prompt:
      'Professional portrait of an elegant Middle Eastern woman senior aesthetician with sleek dark hair pulled back, wearing high-neck long-sleeve ivory silk blouse, soft natural makeup, warm champagne gold lighting, deep aubergine background, modest professional editorial photography, head and shoulders only, warm expression' +
      STYLE_SUFFIX,
    size: '864x1152',
  },
  {
    name: 'team-4.png',
    prompt:
      'Professional portrait of a confident Arab woman lead makeup artist with sleek dark hair pulled back in low chignon, wearing high-neck long-sleeve deep plum blouse, soft natural makeup, warm champagne gold lighting, deep aubergine background, modest professional editorial photography, head and shoulders only, focused expression' +
      STYLE_SUFFIX,
    size: '864x1152',
  },
  // Process section — abstract tools/products for the 4-step ritual
  {
    name: 'process-tools.png',
    prompt:
      'Elegant flat lay of luxury beauty tools on dark aubergine silk: gold scissors, makeup brushes with rose gold handles, glass pipette dropper with golden serum, orchid petal, marble palette, top-down editorial product photography, calm and considered composition' +
      STYLE_SUFFIX,
    size: '1344x768',
  },
];

async function main() {
  const zai = await ZAI.create();
  let ok = 0;
  let failed = 0;

  for (const job of jobs) {
    const outPath = path.join(OUT_DIR, job.name);
    if (!job.force && fs.existsSync(outPath)) {
      console.log(`→ skip ${job.name} (exists)`);
      ok++;
      continue;
    }
    try {
      console.log(`→ generating ${job.name} (${job.size})`);
      const response = await zai.images.generations.create({
        prompt: job.prompt,
        size: job.size as any,
      });
      const b64 = response.data[0].base64;
      const buf = Buffer.from(b64, 'base64');
      fs.writeFileSync(outPath, buf);
      console.log(`  ✓ saved ${job.name} (${(buf.length / 1024).toFixed(1)} KB)`);
      ok++;
    } catch (e: any) {
      console.error(`  ✗ failed ${job.name}: ${e.message}`);
      failed++;
    }
  }

  console.log(`\nDone. ${ok} ok, ${failed} failed. Output: ${OUT_DIR}`);
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
