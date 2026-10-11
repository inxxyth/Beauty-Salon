import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// POST /api/subscribers — newsletter / loyalty signup
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email || '').toString().trim().toLowerCase();
    const name = body.name ? body.name.toString().trim() : null;
    const source = (body.source || 'footer').toString();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ ok: false, error: 'Valid email required' }, { status: 400 });
    }

    // Upsert — don't fail on duplicate email
    const existing = await db.subscriber.findUnique({ where: { email } });
    if (existing) {
      // reactivate if was inactive
      if (!existing.active) {
        await db.subscriber.update({
          where: { email },
          data: { active: true, name: name || existing.name },
        });
      }
      return NextResponse.json({ ok: true, existed: true });
    }

    await db.subscriber.create({
      data: { email, name, source },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}

// GET /api/subscribers — list (protected)
export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization');
  const token = process.env.ADMIN_TOKEN || 'luxe-admin-secret';
  if (auth !== `Bearer ${token}`) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const subs = await db.subscriber.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
      take: 500,
    });
    return NextResponse.json({ ok: true, subscribers: subs });
  } catch {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
