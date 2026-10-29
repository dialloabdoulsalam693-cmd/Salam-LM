'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, Lock, Mail, Sparkles, UserRound } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Connexion impossible.');
      }

      window.location.href = '/profile';
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center justify-center px-4 py-10">
      <div className="w-full rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600">
          <ArrowLeft className="h-4 w-4" /> Retour
        </Link>

        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">LMGUAF</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Connexion</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Email
            <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
              <Mail className="h-4 w-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="vous@lmguaf.fr"
                className="w-full bg-transparent text-sm outline-none"
                required
              />
            </div>
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Mot de passe
            <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
              <Lock className="h-4 w-4 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-sm outline-none"
                required
              />
            </div>
          </label>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600">
              <input type="checkbox" className="rounded border-slate-300" /> Se souvenir de moi
            </label>
            <Link href="/forgot-password" className="font-medium text-brand-700">Mot de passe oublié ?</Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        {message ? (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{message}</div>
        ) : null}

        <div className="mt-6 rounded-2xl bg-brand-50 p-3 text-sm text-brand-800">
          <div className="flex items-center gap-2 font-medium">
            <Sparkles className="h-4 w-4" />
            Le mode IA est protégé côté serveur.
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-slate-600">
          Pas encore membre ? <Link href="/register" className="font-semibold text-brand-700">Créer un compte</Link>
        </p>
      </div>
    </main>
  );
}
