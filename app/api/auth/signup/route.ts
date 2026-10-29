import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { isValidPassword, normalizeUsername } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    const username = typeof body.username === 'string' ? normalizeUsername(body.username) : '';
    const display_name = typeof body.display_name === 'string' ? body.display_name.trim() : '';

    if (!email || !password || !username) {
      return NextResponse.json({ error: 'Email, mot de passe et nom d’utilisateur sont obligatoires.' }, { status: 400 });
    }

    if (!isValidPassword(password)) {
      return NextResponse.json({ error: 'Le mot de passe doit contenir au moins 8 caractères.' }, { status: 400 });
    }

    if (username.length < 3) {
      return NextResponse.json({ error: 'Le nom d’utilisateur doit contenir au moins 3 caractères.' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          display_name: display_name || username,
          email
        }
      }
    });

    if (error || !data.user) {
      return NextResponse.json({ error: error?.message || 'Impossible de créer le compte.' }, { status: 400 });
    }

    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert([
        {
          user_id: data.user.id,
          username,
          display_name: display_name || username,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);

    if (profileError) {
      return NextResponse.json({ error: 'Compte créé mais profil non synchronisé : ' + profileError.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true, userId: data.user.id, email }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur de requête.' }, { status: 400 });
  }
}
