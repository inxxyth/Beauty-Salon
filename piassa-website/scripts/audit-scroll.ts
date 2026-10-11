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
  const positions = [0, 1000, 2000, 4000, 6000, 8000, 10000, 12000, 13800];
  for (const y of positions) {
    const p = `/home/z/my-project/scripts/scroll-${y}.png`;
    if (!fs.existsSync(p)) continue;
    console.log(`\n=== AT SCROLL ${y}px ===`);
    const r = await vlm(p, `This is a screenshot of a a beauty salon website scrolled to Y=${y}px. In 2-3 sentences, describe exactly what is visible in this viewport. If you see content (text, images, sections), name the section. If you see mostly empty dark background, say "EMPTY VOID - no visible content". Be concise.`);
    console.log(r);
  }
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
