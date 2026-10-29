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

    const { error } = await supabase.auth.signOut();

    return NextResponse.json({ ok: true, message: 'Déconnexion réussie.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la déconnexion.' }, { status: 400 });
  }
}
