'use client';
import React, { useState, useEffect } from 'react';

export default function ResonanceMirror() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Исправляет ошибки отображения на мобильных устройствах
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
        setResponse(data.text || "Резонанс установлен. Сигнал чист.");
      } else {
        setResponse(`Ошибка ${res.status}: Попробуйте позже.`);
      }
    } catch (e: any) {
      setResponse(`Сбой связи: Проверьте настройки API`);
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
      fontFamily: 'sans-serif',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '500px', width: '100%', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        
        <h1 style={{ 
          fontSize: '1.2rem', 
          fontWeight: '200', 
          letterSpacing: '0.5em', 
          textTransform: 'uppercase',
          opacity: 0.7 
        }}>
          Protocol Resonance
        </h1>

        <div style={{
          minHeight: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          border: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(255,255,255,0.02)',
          borderRadius: '4px'
        }}>
          {response ? (
            <p style={{ fontSize: '1.1rem', fontStyle: 'italic', lineHeight: '1.6', color: '#00ffd5' }}>
              {response}
            </p>
          ) : (
            <p style={{ fontSize: '0.8rem', opacity: 0.4, letterSpacing: '0.1em' }}>
              {loading ? 'СИНХРОНИЗАЦИЯ...' : 'ОЖИДАНИЕ СИГНАЛА'}
            </p>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && syncResonance()}
            placeholder="Введите запрос..."
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
              padding: '18px', 
              background: 'transparent', 
              border: '1px solid #444', 
              color: 'white', 
              textTransform: 'uppercase', 
              fontSize: '11px', 
              letterSpacing: '0.3em',
              cursor: 'pointer',
              opacity: loading ? 0.5 : 1
            }}
          >
            {loading ? 'СВЯЗЬ...' : 'УСТАНОВИТЬ РЕЗОНАНС'}
          </button>
        </div>

        <p style={{ marginTop: '20px', fontSize: '9px', opacity: 0.2, letterSpacing: '0.2em' }}>
          12.01.2026 | STABLE BUILD
        </p>
      </div>
    </main>
  );
}
