'use client';

import React, { useState } from 'react';

export default function NavigatorPage() {
  const [text, setText] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeMode, setActiveMode] = useState('');

  const askUniverse = async (mode: string) => {
    if (!text) return;
    setLoading(true);
    setActiveMode(mode);
    setAnswer('');

    try {
      const response = await fetch('/api/resonance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ situation: text, mode }),
      });
      const data = await response.json();
      setAnswer(data.answer || 'Резонанс установлен, но тишина сохранена.');
    } catch (error) {
      setAnswer('Обрыв ткани реальности. Попробуй снова войти в поток.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#000', 
      color: '#fff', 
      minHeight: '100vh', 
      padding: '60px 20px', 
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h1 style={{ fontWeight: '200', letterSpacing: '6px', textTransform: 'uppercase', marginBottom: '10px', textAlign: 'center' }}>
        Protocol Resonance
      </h1>
      <p style={{ color: '#444', letterSpacing: '2px', marginBottom: '50px', fontSize: '0.8rem' }}>V 1.1 — НАВИГАТОР ВЫБОРА</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Опиши ситуацию, требующую вмешательства Вселенной..."
        style={{
          width: '100%',
          maxWidth: '700px',
          minHeight: '180px',
          backgroundColor: '#050505',
          border: '1px solid #222',
          borderRadius: '4px',
          color: '#fff',
          padding: '25px',
          fontSize: '1.1rem',
          lineHeight: '1.6',
          outline: 'none',
          marginBottom: '30px',
          transition: 'border-color 0.3s'
        }}
        onFocus={(e) => e.target.style.borderColor = '#444'}
        onBlur={(e) => e.target.style.borderColor = '#222'}
      />

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '800px' }}>
        <button onClick={() => askUniverse('point')} disabled={loading} style={btnStyle(activeMode === 'point')}>Точка</button>
        <button onClick={() => askUniverse('quantum')} disabled={loading} style={btnStyle(activeMode === 'quantum')}>Квант</button>
        <button onClick={() => askUniverse('voice')} disabled={loading} style={btnStyle(activeMode === 'voice')}>Голос</button>
        <button onClick={() => askUniverse('probability')} disabled={loading} style={btnStyle(activeMode === 'probability', '#3b82f6')}>Вероятность</button>
        <button onClick={() => askUniverse('injection')} disabled={loading} style={btnStyle(activeMode === 'injection', '#ef4444')}>Инъекция</button>
      </div>

      {loading && (
        <div style={{ marginTop: '50px', color: '#666', letterSpacing: '3px', fontSize: '0.9rem', animate: 'pulse 2s infinite' }}>
          Считывание Квантовых Линий...
        </div>
      )}

      {answer && (
        <div style={{ 
          marginTop: '60px', 
          maxWidth: '700px', 
          borderTop: '1px solid #111', 
          paddingTop: '40px', 
          whiteSpace: 'pre-wrap',
          lineHeight: '1.8',
          color: '#bbb',
          fontSize: '1.1rem',
          textAlign: 'left'
        }}>
          {answer}
          
          <div style={{ marginTop: '50px', textAlign: 'center' }}>
            <button 
              onClick={() => { setText(''); setAnswer(''); setActiveMode(''); }}
              style={{ background: 'none', border: '1px solid #222', color: '#333', padding: '10px 20px', cursor: 'pointer', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase' }}
            >
              Очистить Протокол
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function btnStyle(active: boolean, specialColor?: string) {
  const baseColor = specialColor || '#fff';
  return {
    padding: '12px 24px',
    backgroundColor: active ? baseColor : 'transparent',
    color: active ? '#000' : baseColor,
    border: `1px solid ${baseColor}`,
    borderRadius: '2px',
    cursor: 'pointer',
    textTransform: 'uppercase' as const,
    fontSize: '0.75rem',
    letterSpacing: '2px',
    transition: 'all 0.4s ease',
    opacity: active ? 1 : 0.6
  };
}
