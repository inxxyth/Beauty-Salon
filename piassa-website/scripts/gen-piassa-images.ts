import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUT_DIR = '/home/z/my-project/public/luxe';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

type Job = { name: string; prompt: string; size: string };

const STYLE_SUFFIX =
  ', cinematic lighting, ultra-detailed, professional beauty photography, color palette deep aubergine plum royal purple lavender mist and champagne gold, luxury editorial, no watermark, high quality, 8k';

const jobs: Job[] = [
  {
    name: 'hero-portrait.png',
    prompt:
      'Cinematic beauty portrait of an elegant woman with dewy radiant skin, eyes closed serene expression, single drop of glowing serum catching light on her cheek, soft rim lighting in royal purple and champagne gold, deep aubergine background with golden bokeh, macro close-up, mystery and luxury, no face text' +
      STYLE_SUFFIX,
    size: '768x1344',
  },
  {
    name: 'salon-interior.png',
    prompt:
      'Luxurious modern beauty salon interior, plush velvet chairs in royal purple and cream, brass and gold accents, soft warm lighting, marble counter with elegant mirrors, orchid flowers, calm spa atmosphere, wide interior photography' +
      STYLE_SUFFIX,
    size: '1536x768',
  },
  {
    name: 'products-flatlay.png',
    prompt:
      'Luxury beauty product flat lay on dark aubergine silk, glass serum bottles with gold caps, perfume bottles, makeup brushes with rose gold handles, scattered orchid petals, champagne gold reflections, top-down editorial product photography' +
      STYLE_SUFFIX,
    size: '1344x768',
  },
  {
    name: 'bridal-portrait.png',
    prompt:
      'Elegant bridal beauty portrait, soft romantic makeup with dewy glow, intricate low chignon hairstyle with delicate orchid and baby breath flowers, ivory veil softly draped, warm champagne gold rim lighting, deep plum background, editorial bridal photography, profile three-quarter view' +
      STYLE_SUFFIX,
    size: '864x1152',
  },
  {
    name: 'service-hair.png',
    prompt:
      'Macro close-up of luxurious healthy brunette hair being styled by an elegant hand, glossy silky strands catching champagne gold light, deep aubergine background, salon editorial photography, ultra-detailed hair texture' +
      STYLE_SUFFIX,
    size: '1024x1024',
  },
  {
    name: 'service-facial.png',
    prompt:
      'Macro close-up of a serene woman receiving a luxury facial treatment, glowing radiant skin, gentle hands applying golden serum droplets, dewy luminous complexion, soft purple lighting, spa luxury editorial, ultra detailed skin texture' +
      STYLE_SUFFIX,
    size: '1024x1024',
  },
  {
    name: 'service-makeup.png',
    prompt:
      'Macro close-up of an elegant eye with smoky plum eyeshadow and gold shimmer inner corner, long curled lashes, perfect eyebrow, single champagne gold glitter tear drop catching light, ultra detailed, beauty editorial macro photography, deep aubergine background' +
      STYLE_SUFFIX,
    size: '1024x1024',
  },
  {
    name: 'service-nails.png',
    prompt:
      'Macro close-up of elegant manicured feminine hands with glossy deep plum nails and gold chrome accent fingertips, resting on cream silk fabric, delicate gold rings, soft champagne lighting, luxury beauty editorial photography' +
      STYLE_SUFFIX,
    size: '1024x1024',
  },
  {
    name: 'service-spa.png',
    prompt:
      'Serene luxury spa atmosphere, lit candles with soft purple flames, folded white towels, orchid petals scattered, eucalyptus branches, glass bowl with golden oil, soft warm champagne lighting, deep plum velvet background, calm ambiance editorial photography' +
      STYLE_SUFFIX,
    size: '1024x1024',
  },
  {
    name: 'gallery-1.png',
    prompt:
      'Editorial beauty close-up of model with glossy plum lipstick, dewy bronzed skin, gold highlighter on cheekbones, hair slicked back, deep purple background with golden bokeh, vogue editorial style, no text' +
      STYLE_SUFFIX,
    size: '768x1344',
  },
  {
    name: 'gallery-2.png',
    prompt:
      'Cinematic beauty ritual moment, hand with elegant gold rings holding a glass pipette dropper releasing a single golden serum drop, deep aubergine silk background with soft lavender glow, ultra macro, luxury editorial' +
      STYLE_SUFFIX,
    size: '1024x1024',
  },
  {
    name: 'gallery-3.png',
    prompt:
      'Abstract luxury texture macro, swirling liquid gold and deep plum violet oil on black, ink drop style, mesmerizing premium background, ultra detailed, no text' +
      STYLE_SUFFIX,
    size: '1344x768',
  },
  {
    name: 'cta-bg.png',
    prompt:
      'Abstract atmospheric luxury background, smooth flowing gradients of deep aubergine plum royal purple and champagne gold, soft lavender mist highlights, dreamy ethereal cinematic, ultra wide, no text, no subjects' +
      STYLE_SUFFIX,
    size: '1536x768',
  },
];

async function main() {
  const zai = await ZAI.create();
  let ok = 0;
  let failed = 0;

  for (const job of jobs) {
    const outPath = path.join(OUT_DIR, job.name);
    if (fs.existsSync(outPath)) {
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
