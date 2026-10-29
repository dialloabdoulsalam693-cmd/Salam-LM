import './globals.css';
import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import Link from 'next/link';
import { MobileNav } from '@/components/mobile-nav';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'LMGUAF',
  description: 'Connecte-toi. Partage. Crée. Évolue.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable} min-h-screen bg-slate-100 text-slate-900 antialiased`}>
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(108,92,231,0.14),transparent_35%),#f8f9fc]">
          <div className="mx-auto max-w-7xl px-3 pb-24 pt-4 sm:px-6 lg:px-8">{children}</div>
        </div>
        <MobileNav />
      </body>
    </html>
  );
}
