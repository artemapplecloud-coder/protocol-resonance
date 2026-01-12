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
      // Прямой путь без window.location для обхода бага Safari
      const res = await fetch('/api/resonance', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: input }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setResponse(data.text || "Сигнал принят, но ответа нет.");
      } else {
        setResponse(`Ошибка системы (${res.status}): ${JSON.stringify(data)}`);
      }
    } catch (e: any) {
      // Выводим более детальную ошибку
      setResponse(`Ошибка канала: ${e.name} - ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '20px', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.2rem', fontWeight: '200', letterSpacing: '0.4em', textTransform: 'uppercase', opacity: 0.8 }}>Protocol Resonance</h1>
        
        {response && (
          <div style={{ 
            fontSize: '0.9rem', 
            color: response.includes('Ошибка') ? '#ff4d4d' : '#00ffcc', 
            padding: '20px', 
            border: '1px solid rgba(255,255,255,0.1)', 
            background: 'rgba(255,255,255,0.05)',
            lineHeight: '1.5'
          }}>
            {response}
          </div>
        )}

        <div style={{ width: '100%' }}>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Введите запрос..."
            style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #333', color: 'white', padding: '15px', outline: 'none', textAlign: 'center', fontSize: '16px' }} 
          />
          <button 
            onClick={syncResonance}
            disabled={loading}
            style={{ marginTop: '20px', width: '100%', border: '1px solid #444', padding: '15px', background: 'transparent', color: 'white', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.2em' }}
          >
            {loading ? 'Синхронизация...' : 'Установить Резонанс'}
          </button>
        </div>
      </div>
    </main>
  );
}
