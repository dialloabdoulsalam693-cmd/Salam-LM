'use client';

import { useEffect, useMemo, useState } from 'react';

type Todo = {
  id: number;
  text: string;
  done: boolean;
  createdAt: number;
};

const STORAGE_KEY = 'lmguaf-todos';

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Todo[];
        if (Array.isArray(parsed)) {
          setTodos(parsed);
        }
      }
    } catch {
      setTodos([]);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos, hydrated]);

  const remaining = useMemo(
    () => todos.filter((todo) => !todo.done).length,
    [todos]
  );

  const completed = useMemo(
    () => todos.filter((todo) => todo.done).length,
    [todos]
  );

  function addTodo() {
    const value = input.trim();
    if (!value) return;

    const newTodo: Todo = {
      id: Date.now() + Math.random(),
      text: value,
      done: false,
      createdAt: Date.now(),
    };

    setTodos((prev) => [newTodo, ...prev]);
    setInput('');
  }

  function toggleTodo(id: number) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  function removeTodo(id: number) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  function clearCompleted() {
    setTodos((prev) => prev.filter((todo) => !todo.done));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addTodo();
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #111827 30%, #1e1b4b 100%)',
        color: '#f8fafc',
        display: 'grid',
        placeItems: 'center',
        padding: '24px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '760px',
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          borderRadius: '28px',
          boxShadow: '0 30px 80px rgba(15, 23, 42, 0.45)',
          padding: '28px',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div>
            <p style={{ margin: 0, fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c4b5fd', fontWeight: 700 }}>
              LMGUAF
            </p>
            <h1 style={{ margin: '10px 0 0', fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1 }}>
              To-do list
            </h1>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              borderRadius: '999px',
              background: 'rgba(99, 102, 241, 0.18)',
              border: '1px solid rgba(165, 180, 252, 0.25)',
              padding: '10px 14px',
              fontSize: '0.9rem',
              color: '#e0e7ff',
            }}
          >
            <span>{remaining} restantes</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Ajouter une tâche..."
            style={{
              flex: 1,
              borderRadius: '16px',
              border: '1px solid rgba(148, 163, 184, 0.25)',
              background: 'rgba(15, 23, 42, 0.8)',
              color: '#f8fafc',
              padding: '16px 18px',
              fontSize: '1rem',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              border: 'none',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #22d3ee 100%)',
              color: '#fff',
              fontWeight: 700,
              padding: '0 18px',
              cursor: 'pointer',
            }}
          >
            Ajouter
          </button>
        </form>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <p style={{ margin: 0, color: '#cbd5e1', fontSize: '0.95rem' }}>
            {todos.length} tâche(s) au total
          </p>

          {completed > 0 && (
            <button
              onClick={clearCompleted}
              style={{
                border: '1px solid rgba(148, 163, 184, 0.4)',
                background: 'transparent',
                color: '#e2e8f0',
                borderRadius: '999px',
                padding: '8px 12px',
                cursor: 'pointer',
              }}
            >
              Supprimer terminées
            </button>
          )}
        </div>

        <div style={{ display: 'grid', gap: '12px' }}>
          {todos.length === 0 ? (
            <div
              style={{
                border: '1px dashed rgba(148, 163, 184, 0.4)',
                borderRadius: '18px',
                padding: '28px',
                textAlign: 'center',
                color: '#cbd5e1',
                background: 'rgba(15, 23, 42, 0.5)',
              }}
            >
              Aucune tâche enregistrée pour le moment.
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  padding: '14px 16px',
                  borderRadius: '18px',
                  background: todo.done ? 'rgba(34, 197, 94, 0.12)' : 'rgba(15, 23, 42, 0.6)',
                  border: todo.done ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(148, 163, 184, 0.18)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => toggleTodo(todo.id)}
                    style={{ width: '18px', height: '18px', accentColor: '#22c55e' }}
                  />

                  <span
                    style={{
                      flex: 1,
                      textDecoration: todo.done ? 'line-through' : 'none',
                      color: todo.done ? '#a7f3d0' : '#f8fafc',
                      fontSize: '1rem',
                      wordBreak: 'break-word',
                    }}
                  >
                    {todo.text}
                  </span>
                </div>

                <button
                  onClick={() => removeTodo(todo.id)}
                  style={{
                    border: 'none',
                    background: 'rgba(239, 68, 68, 0.12)',
                    color: '#fecaca',
                    borderRadius: '10px',
                    padding: '8px 10px',
                    cursor: 'pointer',
                  }}
                >
                  Supprimer
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
