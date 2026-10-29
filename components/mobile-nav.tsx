import Link from 'next/link';
import { Plus, Compass, Home, Search, User, Video, Sparkles, Bell, MessagesSquare, Bookmark } from 'lucide-react';

const items = [
  { href: '/', label: 'Accueil', icon: Home },
  { href: '/explore', label: 'Explorer', icon: Compass },
  { href: '/create', label: 'Créer', icon: Plus },
  { href: '/reels', label: 'Reels', icon: Video },
  { href: '/profile', label: 'Profil', icon: User }
];

export function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/90 px-2 py-2 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-5 gap-2">
        {items.map(({ href, label, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-medium text-slate-600 transition hover:bg-slate-100 hover:text-brand-700"
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function TopHeader({ title, actions }: { title: string; actions?: React.ReactNode }) {
  return (
    <header className="page-header">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">LMGUAF</p>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
      </div>
      {actions}
    </header>
  );
}

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {[
        { href: '/messages', label: 'Messages', icon: MessagesSquare },
        { href: '/notifications', label: 'Notifications', icon: Bell },
        { href: '/saved', label: 'Sauvegardés', icon: Bookmark },
        { href: '/ai', label: 'LMGUAF AI', icon: Sparkles }
      ].map(({ href, label, icon: Icon }) => (
        <Link
          key={label}
          href={href}
          className="container-card flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:border-brand-200"
        >
          <span>{label}</span>
          <Icon className="h-4 w-4 text-brand-600" />
        </Link>
      ))}
    </div>
  );
}
