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
      // Исправленный Fetch с полным путем
      const res = await fetch(`${window.location.origin}/api/resonance`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
        },
        body: JSON.stringify({ message: input }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setResponse(`Ошибка сервера: ${res.status}. ${data.text || ''}`);
      } else {
        setResponse(data.text || "Пустой ответ.");
      }
    } catch (e: any) {
      setResponse(`Критический сбой: ${e.message}`);
    }
    setLoading(false);
  };

  return (
    <main style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '20px', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '200', letterSpacing: '0.4em', textTransform: 'uppercase', opacity: 0.8 }}>Protocol Resonance</h1>
        
        {response && (
          <div style={{ fontSize: '0.9rem', color: response.includes('Ошибка') || response.includes('сбой') ? '#ff4d4d' : '#00ff00', padding: '15px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', borderRadius: '5px' }}>
            {response}
          </div>
        )}

        <div style={{ width: '100%' }}>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && syncResonance()}
            placeholder="Введи сигнал..."
            style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #333', color: 'white', padding: '12px', outline: 'none', textAlign: 'center', fontSize: '16px' }} 
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
