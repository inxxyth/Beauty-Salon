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
  const full = '/home/z/my-project/scripts/audit-final-full.png';

  console.log('=== AUDIT (AFTER FIX): FULL PAGE ===');
  const fullAudit = await vlm(full, `You are a senior UI/UX design auditor and a luxury brand compliance reviewer. This is a screenshot of a full-page website for a a beauty salon called "Luxe Salon & Spa" (purple-gold luxury theme).

Please answer in plain text:
1. List every major section you can identify in the screenshot (in order top to bottom).
2. Are there any large empty / void / blank dark gaps between sections? (Yes/No, and if yes where)
3. Visual quality rating 1-10 — design polish, visual hierarchy, spacing.
4. HALAL AUDIT — flag ANY imagery that a strict Muslim owner might find immodest: women's faces shown seductively, exposed bodies (cleavage, bare shoulders, bare legs), alcohol, cross-gender touching, "model" / "vogue editorial" sexualized poses. Be strict. If clean, say "HALAL-COMPLIANT" and explain why.
5. List any sections that are still missing that a luxury beauty parlor should have.`);
  console.log(fullAudit);
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
