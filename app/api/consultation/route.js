import { NextResponse } from 'next/server';
import { pool } from '../../../lib/db';

export const runtime = 'nodejs';
const hits = new Map(); // basic in-memory rate limit (use Redis in multi-server setups)

export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'local';
    const now = Date.now();
    const recent = (hits.get(ip) || []).filter((t) => now - t < 600000);
    if (recent.length >= 5) return NextResponse.json({ error: 'Too many requests. Please try later.' }, { status: 429 });
    hits.set(ip, [...recent, now]);

    const b = await req.json();
    if (b.website) return NextResponse.json({ ok: true }); // honeypot
    const clean = (v, n) => String(v ?? '').trim().slice(0, n);
    const d = {
      name: clean(b.name, 120), email: clean(b.email, 160), phone: clean(b.phone, 40),
      country: clean(b.country, 80), service: clean(b.service, 80), message: clean(b.message, 2000),
    };
    if (!d.name || !d.phone || !d.service || !/^\S+@\S+\.\S+$/.test(d.email))
      return NextResponse.json({ error: 'Please enter a valid name, email, phone and matter.' }, { status: 400 });

    await pool.query(
      'INSERT INTO consultations (name,email,phone,country,service,message) VALUES ($1,$2,$3,$4,$5,$6)',
      [d.name, d.email, d.phone, d.country, d.service, d.message]
    );
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error. Please contact us on WhatsApp.' }, { status: 500 });
  }
}
