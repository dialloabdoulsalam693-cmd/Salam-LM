'use client';

import { useCallback, useEffect, useState } from 'react';

export default function HomePage() {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchJoke = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('/api/joke', {
        method: 'GET',
        cache: 'no-store',
      });

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
    <main style={{
      minHeight: '100vh',
      display: 'grid',
      placeItems: 'center',
      background: 'radial-gradient(circle at top, #312e81 0%, #111827 35%, #020617 100%)',
      color: '#f8fafc',
      padding: '24px',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '720px',
        background: 'rgba(15, 23, 42, 0.72)',
        border: '1px solid rgba(148, 163, 184, 0.26)',
        borderRadius: '24px',
        boxShadow: '0 24px 80px rgba(15, 23, 42, 0.4)',
        padding: '32px',
        backdropFilter: 'blur(10px)',
      }}>
        <p style={{
          margin: 0,
          fontSize: '12px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#a5b4fc',
          fontWeight: 700,
        }}>
          Random Joke Generator
        </p>

        <h1 style={{
          margin: '16px 0 20px',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          lineHeight: 1.1,
        }}>
          Une petite dose de bonne humeur
        </h1>

        <div style={{
          minHeight: '150px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px 18px',
          borderRadius: '18px',
          background: 'rgba(15, 118, 110, 0.16)',
          border: '1px solid rgba(45, 212, 191, 0.35)',
          color: '#ecfeff',
          fontSize: '1.08rem',
          lineHeight: 1.8,
          textAlign: 'center',
        }}>
          {loading ? 'Chargement d’une blague...' : joke || error}
        </div>

        <button
          onClick={fetchJoke}
          style={{
            marginTop: '22px',
            width: '100%',
            border: 'none',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #22d3ee 100%)',
            color: '#fff',
            fontSize: '1rem',
            fontWeight: 700,
            padding: '16px 18px',
            cursor: 'pointer',
            boxShadow: '0 14px 28px rgba(34, 211, 238, 0.25)',
          }}
        >
          {loading ? 'Chargement...' : 'Une autre blague'}
        </button>
      </div>
    </main>
  );
}
