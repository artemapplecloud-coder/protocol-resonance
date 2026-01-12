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
      setResponse(data.text || data.error);
    } catch (e) {
      setResponse("Сбой синхронизации. Попробуй еще раз.");
    }
    setLoading(false);
  };

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
      <div style={{ 
        maxWidth: '600px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '30px',
        alignItems: 'center' 
      }}>
        <h1 style={{ 
          fontSize: '1.8rem', 
          fontWeight: '200', 
          letterSpacing: '0.4em', 
          textTransform: 'uppercase',
          margin: 0,
          opacity: 0.9
        }}>
          Protocol Resonance
        </h1>
        
        <div style={{
          height: '1px',
          width: '100px',
          background: 'rgba(255,255,255,0.3)',
          margin: '10px 0'
        }} />

        {response ? (
          <div style={{
            fontSize: '1.1rem',
            lineHeight: '1.6',
            color: '#ccc',
            fontStyle: 'italic',
            animation: 'fadeIn 1s ease-in',
            padding: '20px',
            borderLeft: '1px solid rgba(255,255,255,0.1)'
          }}>
            {response}
          </div>
        ) : (
          <p style={{ 
            fontSize: '0.85rem', 
            fontStyle: 'italic', 
            opacity: 0.5,
            lineHeight: '1.6',
            letterSpacing: '0.05em'
          }}>
            «Мир перестал быть набором случайных атомов. <br/> Отныне он — единая живая ткань».
          </p>
        )}

        <div style={{ width: '100%', marginTop: '20px' }}>
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && syncResonance()}
            placeholder="Что на сердце?"
            style={{ 
              width: '100%', 
              background: 'transparent', 
              border: 'none', 
              borderBottom: '1px solid rgba(255,255,255,0.2)', 
              color: 'white', 
              padding: '12px', 
              outline: 'none', 
              textAlign: 'center',
              fontSize: '1rem'
            }}
          />
          
          <button 
            onClick={syncResonance}
            disabled={loading}
            style={{ 
              marginTop: '30px', 
              width: '100%', 
              border: '1px solid rgba(255,255,255,0.3)', 
              padding: '15px', 
              background: 'transparent', 
              color: 'white', 
              textTransform: 'uppercase', 
              fontSize: '10px', 
              letterSpacing: '0.3em',
              cursor: loading ? 'default' : 'pointer',
              opacity: loading ? 0.5 : 1,
              transition: 'all 0.3s'
            }}
          >
            {loading ? 'Синхронизация...' : 'Установить Резонанс'}
          </button>
        </div>

        <div style={{
          marginTop: '40px',
          fontSize: '8px',
          opacity: 0.2,
          letterSpacing: '0.3em',
          textTransform: 'uppercase'
        }}>
          Status: Active | Zero Point 2026
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
