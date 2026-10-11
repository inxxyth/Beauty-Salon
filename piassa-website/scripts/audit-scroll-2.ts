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
  const positions = [3000, 3500, 4500, 5000, 5500, 6500, 7000, 7500, 8500, 9000, 9500, 10500, 11000, 11500, 12500, 13000];
  for (const y of positions) {
    const p = `/home/z/my-project/scripts/scroll-${y}.png`;
    if (!fs.existsSync(p)) continue;
    console.log(`\n=== SCROLL ${y}px ===`);
    const r = await vlm(p, `This is a screenshot of a a beauty salon website scrolled to Y=${y}px. In 1-2 sentences describe what section is visible. If empty/dark background only, say "EMPTY VOID".`);
    console.log(r);
  }
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
