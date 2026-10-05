import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

function App() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(API_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        return res.json() as Promise<{ message: string }>;
      })
      .then((data) => setMessage(data.message))
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Unknown error');
      });

    return () => controller.abort();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-950 font-sans text-gray-100">
      <h1 className="text-3xl font-bold">GitHub Bot</h1>
      {error ? (
        <p className="mt-3 text-lg text-red-400">{error}</p>
      ) : (
        <p className="mt-3 text-lg text-gray-400">{message ?? 'Loading…'}</p>
      )}
    </main>
  );
}

export default App;
