'use client';
import React, { useState, useEffect } from 'react';

export default function ResonanceMirror() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Предотвращает ошибки гидратации на iPhone
  useEffect(() => {
    setMounted(true);
  }, []);

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
      
      const data = await res.json();
      
      if (res.ok) {
        setResponse(data.text || "Сигнал принят. Резонанс установлен.");
      } else {
        setResponse(`Ошибка ${res.status}: ${JSON.stringify(data)}`);
      }
    } catch (e: any) {
      setResponse(`Сбой канала связи: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <main style={{
      backgroundColor: 'black',
      color: 'white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '500px', width: '100%', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        
        <h1 style={{ 
          fontSize: '1rem', 
          fontWeight: '200', 
          letterSpacing: '0.6em', 
          textTransform: 'uppercase',
          opacity: 0.7,
          margin: 0
        }}>
          Protocol Resonance
        </h1>

        <div style={{
          minHeight: '140px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '25px',
          border: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '2px'
        }}>
          {response ? (
            <p style={{ 
              fontSize: '1.1rem', 
              fontStyle: 'italic', 
              lineHeight: '1.6', 
              color: response.includes('Ошибка') ? '#ff4d4d' : '#00ffd5',
              margin: 0 
            }}>
              {response}
            </p>
          ) : (
            <p style={{ fontSize: '0.8rem', opacity: 0.3, letterSpacing: '0.2em', margin: 0 }}>
              {loading ? 'СИНХРОНИЗАЦИЯ...' : 'ОЖИДАНИЕ ИМПУЛЬСА'}
            </p>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && syncResonance()}
            placeholder="Введите ваш запрос..."
            style={{ 
              width: '100%', 
              background: 'transparent', 
              border: 'none', 
              borderBottom: '1px solid #333', 
              color: 'white', 
              padding: '15px', 
              outline: 'none', 
              textAlign: 'center',
              fontSize: '16px',
              borderRadius: 0
            }}
          />
          
          <button 
            onClick={syncResonance}
            disabled={loading}
            style={{ 
              padding: '20px', 
              background: 'transparent', 
              border: '1px solid #444', 
              color: 'white', 
              textTransform: 'uppercase', 
              fontSize: '11px', 
              letterSpacing: '0.4em',
              cursor: loading ? 'default' : 'pointer',
              opacity: loading ? 0.4 : 1
            }}
          >
            {loading ? 'СВЯЗЬ...' : 'УСТАНОВИТЬ РЕЗОНАНС'}
          </button>
        </div>

        <p style={{ marginTop: '20px', fontSize: '8px', opacity: 0.2, letterSpacing: '0.3em' }}>
          12.01.2026 | ZERO POINT CORE
        </p>
      </div>
    </main>
  );
}

