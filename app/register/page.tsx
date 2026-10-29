'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Mail, UserRound } from 'lucide-react';

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: '',
    display_name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Inscription impossible.');
      }

      setMessage('Compte créé. Vérifiez votre email puis connectez-vous.');
      setForm({ username: '', display_name: '', email: '', password: '' });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-xl items-center justify-center px-4 py-10">
      <div className="w-full rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600">
          <ArrowLeft className="h-4 w-4" /> Retour
        </Link>

        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">LMGUAF</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Créer un compte</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Prénom / nom
              <input
                type="text"
                value={form.display_name}
                onChange={(event) => setForm((current) => ({ ...current, display_name: event.target.value }))}
                placeholder="Votre nom"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Nom d’utilisateur
              <input
                type="text"
                value={form.username}
                onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))}
                placeholder="nomutilisateur"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none"
                required
              />
            </label>
          </div>

          <label className="block text-sm font-medium text-slate-700">
            Email
            <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
              <Mail className="h-4 w-4 text-slate-400" />
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                placeholder="vous@lmguaf.fr"
                className="w-full bg-transparent text-sm outline-none"
                required
              />
            </div>
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Mot de passe
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              placeholder="Minimum 8 caractères"
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none"
              required
            />
          </label>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4" />
              <span>Vérification du compte et sécurisation des routes privées.</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Création...' : 'Créer mon compte'}
          </button>
        </form>

        {message ? <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">{message}</div> : null}
      </div>
    </main>
  );
}
