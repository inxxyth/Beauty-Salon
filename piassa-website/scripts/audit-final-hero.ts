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
  // 1. Final hero check
  console.log('=== FINAL HERO AUDIT ===');
  const hero = await vlm('/home/z/my-project/scripts/final-hero.png',
    `This is the hero of a a beauty salon website owned by a Muslim. Describe what you see in 2-3 sentences. Is the hero image appropriate (no faces, no exposed bodies)? Rate the visual impact 1-10.`);
  console.log(hero);
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
