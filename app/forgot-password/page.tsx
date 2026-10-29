'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Erreur de réinitialisation.');
      }

      setMessage('Un email de réinitialisation a été envoyé.');
      setEmail('');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center justify-center px-4 py-10">
      <div className="w-full rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
        <Link href="/login" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600">
          Retour à la connexion
        </Link>

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">LMGUAF</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">Réinitialisation</h1>
        <p className="mt-3 text-sm text-slate-600">Saisissez votre email pour recevoir le lien de réinitialisation.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="votre@email.com"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Envoi...' : 'Envoyer le lien'}
          </button>
        </form>

        {message ? <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">{message}</div> : null}
      </div>
    </main>
  );
}
