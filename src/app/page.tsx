'use client';
import React, { useState } from 'react';

export default function MirrorPage() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const syncResonance = async () => {
    if (!input) return;
    setLoading(true);
    setResponse('');
    try {
      const res = await fetch('/api/resonance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        // Если сервер вернул ошибку (404, 500 и т.д.)
        setResponse(`Ошибка сервера: ${res.status}. Детали: ${JSON.stringify(data)}`);
      } else {
        setResponse(data.text || "Пустой ответ от системы.");
      }
    } catch (e: any) {
      // Если запрос вообще не дошел до сервера
      setResponse(`Критический сбой: ${e.message}`);
    }
    setLoading(false);
  };

  return (
    <main style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '20px', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '200', letterSpacing: '0.4em', textTransform: 'uppercase', opacity: 0.8 }}>Protocol Resonance</h1>
        
        {response && (
          <div style={{ fontSize: '0.9rem', color: '#ff4d4d', padding: '15px', border: '1px solid #331111', background: '#110000', borderRadius: '5px' }}>
            <strong>ЛОГ:</strong> {response}
          </div>
        )}

        <div style={{ width: '100%' }}>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Введи сигнал..."
            style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #333', color: 'white', padding: '12px', outline: 'none', textAlign: 'center' }}
          />
          <button 
            onClick={syncResonance}
            disabled={loading}
            style={{ marginTop: '20px', width: '100%', border: '1px solid #444', padding: '15px', background: 'transparent', color: 'white', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.2em' }}
          >
            {loading ? 'Синхронизация...' : 'Послать импульс'}
          </button>
        </div>
      </div>
    </main>
  );
}
