'use client';
import React, { useState } from 'react';

export default function MirrorPage() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const syncResonance = async () => {
    if (!input || loading) return;
    setLoading(true);
    setResponse('');
    
    try {
      const res = await fetch('/api/resonance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await res.json();
        if (res.ok) {
          setResponse(data.text || "Сигнал принят.");
        } else {
          setResponse(`Ошибка API: ${JSON.stringify(data)}`);
        }
      } else {
        const textError = await res.text();
        setResponse(`Сервер вернул не JSON (код ${res.status}). Возможно, путь не найден. Текст: ${textError.slice(0, 100)}`);
      }
    } catch (e: any) {
      setResponse(`Сбой сети: ${e.name} - ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '20px', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h1 style={{ fontSize: '1rem', letterSpacing: '0.4em', textTransform: 'uppercase', opacity: 0.6 }}>Protocol Resonance</h1>
        {response && (
          <div style={{ fontSize: '0.9rem', color: '#00ffcc', padding: '15px', border: '1px solid #333', background: '#0a0a0a' }}>
            {response}
          </div>
        )}
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Сигнал..."
          style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #333', color: 'white', padding: '15px', textAlign: 'center', outline: 'none', fontSize: '16px' }}
        />
        <button onClick={syncResonance} disabled={loading} style={{ border: '1px solid #555', padding: '15px', background: 'transparent', color: 'white', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.2em' }}>
          {loading ? 'Связь...' : 'Установить Резонанс'}
        </button>
      </div>
    </main>
  );
}
