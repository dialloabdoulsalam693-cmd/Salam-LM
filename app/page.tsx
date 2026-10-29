'use client';

import { useCallback, useEffect, useState } from 'react';

const stats = [
  { label: 'Utilisateurs actifs', value: '18.4K' },
  { label: 'Posts partagés', value: '249K' },
  { label: 'IA générée', value: '92%' },
];

const features = [
  'Flux social mobile-first',
  'Stories, reels et publications',
  'Assistant IA LMGUAF AI',
  'Authentification sécurisée',
  'Messages privés protégés',
  'Dashboard admin dédié',
];

export default function HomePage() {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchJoke = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('/api/joke', { method: 'GET', cache: 'no-store' });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Impossible de récupérer une blague.');
      }

      setJoke(data.joke || 'Aucune blague disponible pour le moment.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur inconnue est survenue.');
      setJoke('');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJoke();
  }, [fetchJoke]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-10 flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 font-black text-lg text-white">
              L
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-violet-300">LMGUAF</p>
              <p className="text-sm text-slate-300">Connecte-toi. Partage. Crée. Évolue.</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#features" className="transition hover:text-white">Fonctionnalités</a>
            <a href="#ai" className="transition hover:text-white">IA</a>
            <a href="#joke" className="transition hover:text-white">Blague</a>
          </nav>
        </header>

        <section className="grid items-center gap-8 pb-12 pt-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-violet-200">
              Social media modernisé
            </div>

            <h1 className="max-w-xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Un réseau social premium avec IA intégrée.
            </h1>

            <p className="mt-5 max-w-xl text-lg text-slate-300">
              LMGUAF réunit publication, stories, messages, reels, inspirations créatives et un assistant intelligent pour aider les créateurs à produire davantage.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#features"
                className="rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]"
              >
                Explorer les fonctionnalités
              </a>
              <a
                href="#joke"
                className="rounded-full border border-slate-700 bg-slate-900/70 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-violet-400 hover:text-white"
              >
                Voir une blague
              </a>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-violet-900/20 backdrop-blur-md">
            <div className="rounded-[24px] bg-gradient-to-br from-violet-600 via-indigo-500 to-cyan-500 p-6">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-white/90">
                  Live
                </span>
                <span className="text-sm text-white/80">LMGUAF AI</span>
              </div>

              <div className="mt-8 space-y-4">
                <div className="rounded-2xl bg-black/15 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-violet-100">Suggestion</p>
                  <p className="mt-2 text-xl font-bold text-white">Rédiger une légende pour une publication photo</p>
                </div>
                <div className="rounded-2xl bg-black/15 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-100">Calendrier</p>
                  <p className="mt-2 text-xl font-bold text-white">3 idées de reels pour ce mois</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-10">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-violet-300">Ce que tu peux faire</p>
              <h2 className="mt-2 text-3xl font-black text-white">Une base solide pour une vraie plateforme sociale</h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <div key={feature} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-sm font-bold text-white">
                  ✓
                </div>
                <p className="text-lg font-semibold text-white">{feature}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="ai" className="py-10">
          <div className="rounded-[28px] border border-violet-500/30 bg-gradient-to-br from-violet-600/20 via-slate-900 to-cyan-500/10 p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-violet-200">LMGUAF AI</p>
                <h3 className="mt-3 text-3xl font-black text-white">Un assistant intelligent, but sécurisé.</h3>
              </div>

              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                Appels serveur uniquement • clé API non exposée
              </div>
            </div>
          </div>
        </section>

        <section id="joke" className="py-10">
          <div className="rounded-[30px] border border-white/10 bg-slate-900/80 p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Mini feature</p>
                <h3 className="mt-2 text-2xl font-black text-white">Générateur de blagues</h3>
              </div>
              <button
                onClick={fetchJoke}
                className="rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]"
              >
                {loading ? 'Chargement...' : 'Nouvelle blague'}
              </button>
            </div>

            <div className="min-h-[140px] rounded-2xl border border-white/10 bg-black/20 p-5 text-lg leading-8 text-slate-100">
              {loading ? 'Chargement d’une blague...' : (joke || error || 'Aucune blague disponible pour le moment.')}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
