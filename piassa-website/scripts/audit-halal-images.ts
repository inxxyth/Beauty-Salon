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
  const checks = [
    { name: 'hero-portrait', path: '/home/z/my-project/public/luxe/hero-portrait.png' },
    { name: 'bridal-portrait', path: '/home/z/my-project/public/luxe/bridal-portrait.png' },
    { name: 'gallery-1', path: '/home/z/my-project/public/luxe/gallery-1.png' },
    { name: 'service-facial', path: '/home/z/my-project/public/luxe/service-facial.png' },
    { name: 'service-makeup', path: '/home/z/my-project/public/luxe/service-makeup.png' },
    { name: 'team-1', path: '/home/z/my-project/public/luxe/team-1.png' },
    { name: 'team-2', path: '/home/z/my-project/public/luxe/team-2.png' },
    { name: 'team-3', path: '/home/z/my-project/public/luxe/team-3.png' },
    { name: 'team-4', path: '/home/z/my-project/public/luxe/team-4.png' },
  ];

  for (const c of checks) {
    if (!fs.existsSync(c.path)) {
      console.log(`\n=== ${c.name} === MISSING`);
      continue;
    }
    console.log(`\n=== ${c.name} ===`);
    const r = await vlm(c.path, `Describe this image in 2-3 sentences. Is any human face or body visible? If yes, describe what's shown. Rate modesty 1-5 (5 = perfectly modest, no exposed body beyond hands/face). Is this image appropriate for a Muslim-owned a beauty salon?`);
    console.log(r);
  }
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
