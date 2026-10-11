import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// POST /api/leads — create a new lead from the booking form
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Basic validation
    const name = (body.name || '').toString().trim();
    const phone = (body.phone || '').toString().trim();
    const service = (body.service || '').toString().trim();
    const preferredDate = body.preferredDate ? body.preferredDate.toString() : null;
    const message = body.message ? body.message.toString() : null;
    const source = (body.source || 'website').toString();

    if (!name || name.length < 2) {
      return NextResponse.json({ ok: false, error: 'Name is required' }, { status: 400 });
    }
    if (!phone || phone.length < 6) {
      return NextResponse.json({ ok: false, error: 'Phone is required' }, { status: 400 });
    }
    if (!service) {
      return NextResponse.json({ ok: false, error: 'Service is required' }, { status: 400 });
    }

    const lead = await db.lead.create({
      data: {
        name,
        phone,
        service,
        preferredDate,
        message,
        source,
      },
    });

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}

// GET /api/leads — list leads (protected by admin token)
export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization');
  const token = process.env.ADMIN_TOKEN || 'luxe-admin-secret';
  if (auth !== `Bearer ${token}`) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get('limit') || '100', 10);
    const status = url.searchParams.get('status');

    const leads = await db.lead.findMany({
      where: status ? { status: status as any } : undefined,
      orderBy: { createdAt: 'desc' },
      take: Math.min(limit, 500),
    });

    return NextResponse.json({ ok: true, leads });
  } catch {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}

// PATCH /api/leads — update lead status
export async function PATCH(req: NextRequest) {
  const auth = req.headers.get('authorization');
  const token = process.env.ADMIN_TOKEN || 'luxe-admin-secret';
  if (auth !== `Bearer ${token}`) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json({ ok: false, error: 'id and status required' }, { status: 400 });
    }
    const updated = await db.lead.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ ok: true, lead: updated });
  } catch {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
