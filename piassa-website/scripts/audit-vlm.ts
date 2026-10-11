import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function vlm(imagePath: string, prompt: string) {
  const zai = await ZAI.create();
  const buf = fs.readFileSync(imagePath);
  const b64 = buf.toString('base64');
  const mime = imagePath.endsWith('.png') ? 'image/png' : 'image/jpeg';
  const r = await zai.chat.completions.createVision({
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          { type: 'image_url', image_url: { url: `data:${mime};base64,${b64}` } },
        ],
      },
    ],
    thinking: { type: 'disabled' },
  });
  return r.choices[0]?.message?.content;
}

async function main() {
  const full = '/home/z/my-project/scripts/audit-full.png';
  const hero = '/home/z/my-project/scripts/audit-hero.png';

  console.log('=== AUDIT 1: FULL PAGE (overall design + sections visible) ===');
  const fullAudit = await vlm(full, `You are a senior UI/UX design auditor and a luxury brand compliance reviewer. This is a screenshot of a full-page website for a a beauty salon called "Luxe Salon & Spa" (purple-gold luxury theme).

Please answer in plain text:
1. List every major section you can identify in the screenshot (in order).
2. Identify any obvious visual problems: empty gaps, broken layouts, overlapping elements, low-contrast text, awkward spacing, missing images.
3. HALAL AUDIT — flag ANY imagery or text that a Muslim owner might find immodest or non-sharia-compliant: women's faces shown seductively, exposed bodies (cleavage, bare shoulders, bare legs), alcohol, cross-gender touching, "model" / "vogue editorial" sexualized poses. Be strict.
4. List sections that are MISSING that a typical luxury beauty parlor website should have (e.g., team/stylists, pricing/membership, FAQ, process steps, why-choose-us, before/after).`);
  console.log(fullAudit);

  console.log('\n\n=== AUDIT 2: HERO CLOSE-UP ===');
  const heroAudit = await vlm(hero, `You are a UI/UX auditor and Muslim modesty reviewer. This is the hero section of a a beauty salon website.

Answer:
1. First impressions of the hero (1-2 sentences).
2. Any visual problems (alignment, contrast, image cropping, text overlap)?
3. HALAL: Is the hero image appropriate for a Muslim-owned beauty parlor in Dubai? Flag anything immodest. The image shows a woman — describe what is shown and rate 1-5 for modesty (5 = perfectly modest, 1 = needs replacement).
4. Loading speed impression — does the hero image look heavy (large file)?`);
  console.log(heroAudit);
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
