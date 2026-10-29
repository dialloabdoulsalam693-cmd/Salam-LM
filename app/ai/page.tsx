import Link from 'next/link';
import { ArrowLeft, Sparkles, ShieldCheck, Lock } from 'lucide-react';

export default function AIPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-6 py-2">
      <header className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-brand-600">LMGUAF AI</p>
          <h1 className="text-2xl font-black text-slate-900">Assistant intelligent</h1>
        </div>
        <Link href="/ai/history" className="text-sm font-medium text-brand-700">
          Historique
        </Link>
      </header>

      <div className="container-card p-5">
        <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <ShieldCheck className="mt-0.5 h-5 w-5" />
          <div>
            <p className="font-semibold">Le mode IA réel est protégé et désactivé tant qu’aucune clé API n’est configurée.</p>
            <p className="mt-1">Aucun secret n’est exposé dans le navigateur. Les appels passent par une route serveur sécurisée.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="container-card p-5">
          <div className="flex items-center gap-2 text-brand-700">
            <Sparkles className="h-4 w-4" />
            <h2 className="font-bold text-slate-900">Suggestions</h2>
          </div>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <div className="rounded-2xl bg-slate-50 p-3">Rédiger une légende pour une publication photo.</div>
            <div className="rounded-2xl bg-slate-50 p-3">Créer 5 idées de reels premium.</div>
            <div className="rounded-2xl bg-slate-50 p-3">Aider à construire un calendrier éditorial.</div>
          </div>
        </section>

        <section className="container-card p-5">
          <div className="flex items-center gap-2 text-brand-700">
            <Lock className="h-4 w-4" />
            <h2 className="font-bold text-slate-900">Sécurité</h2>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>• Appels serveur uniquement</li>
            <li>• Variables d’environnement obligatoires</li>
            <li>• Validation de messages côté serveur</li>
            <li>• Limite de débit configurable</li>
          </ul>
        </section>
      </div>

      <div className="container-card p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">Conversation</p>
            <p className="text-xs text-slate-500">Aucune donnée privée n’est envoyée sans consentement.</p>
          </div>
          <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
            <ArrowLeft className="h-4 w-4" /> Retour
          </Link>
        </div>
      </div>
    </main>
  );
}
