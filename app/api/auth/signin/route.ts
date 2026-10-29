import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';

    if (!email || !password) {
      return NextResponse.json({ error: 'Email et mot de passe requis.' }, { status: 400 });
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.user) {
      return NextResponse.json({ error: error?.message || 'Les identifiants sont invalides.' }, { status: 401 });
    }

    return NextResponse.json({ ok: true, user: data.user.id, email }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur de connexion.' }, { status: 400 });
  }
}
