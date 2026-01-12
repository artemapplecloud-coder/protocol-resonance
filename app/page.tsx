'use client';
import React, { useState, useEffect } from 'react';

export default function ResonanceMirror() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const syncResonance = async () => {
    if (!input || loading) return;
    setLoading(true);
    setResponse('');
    
    try {
      // Используем полный путь для Safari
      const origin = window.location.origin;
      const res = await fetch(`${origin}/api/resonance`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ message: input }),
      });
      
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      
      const data = await res.json();
      setResponse(data.text || "Резонанс установлен.");
    } catch (e: any) {
      // Если это Safari, выведем более понятную ошибку
      setResponse(`Ошибка канала: ${e.message === 'The string did not match the expected pattern' ? 'Safari Blocked Fetch' : e.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <main style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '20px', textAlign: 'center' }}>
      <div style={{ maxWidth: '500px', width: '100%', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <h1 style={{ fontSize: '1rem', fontWeight: '200', letterSpacing: '0.5em', textTransform: 'uppercase', opacity: 0.7 }}>Protocol Resonance</h1>
        <div style={{ minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
          <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#00ffd5' }}>{response || (loading ? 'СИНХРОНИЗАЦИЯ...' : 'ОЖИДАНИЕ СИГНАЛА')}</p>
        </div>
        <input 
          type="text" value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="Твой запрос..."
          style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #333', color: 'white', padding: '15px', textAlign: 'center', outline: 'none', fontSize: '16px' }}
        />
        <button onClick={syncResonance} disabled={loading} style={{ padding: '18px', background: 'transparent', border: '1px solid #444', color: 'white', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.3em', opacity: loading ? 0.5 : 1 }}>
          {loading ? 'СВЯЗЬ...' : 'УСТАНОВИТЬ РЕЗОНАНС'}
        </button>
      </div>
    </main>
  );
}

