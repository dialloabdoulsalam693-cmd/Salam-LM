export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg items-center justify-center px-4 py-10">
      <div className="container-card w-full p-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">LMGUAF</p>
        <h1 className="mt-4 text-4xl font-black text-slate-900">404</h1>
        <p className="mt-3 text-slate-600">Cette page n’existe pas ou a été déplacée.</p>
        <a href="/" className="mt-6 inline-flex rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-soft hover:bg-brand-700">
          Retour à l’accueil
        </a>
      </div>
    </main>
  );
}
