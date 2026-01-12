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
      setAnswer(data.answer || 'Связь установилась, но ответ скрыт.');
    } catch (error) {
      setAnswer('Обрыв связи. Попробуй снова войти в Резонанс.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#000', 
      color: '#fff', 
      minHeight: '100vh', 
      padding: '40px 20px', 
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h1 style={{ fontWeight: '200', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '40px', textAlign: 'center' }}>
        Навигатор Выбора
      </h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Опиши ситуацию..."
        style={{
          width: '100%',
          maxWidth: '600px',
          minHeight: '150px',
          backgroundColor: '#0a0a0a',
          border: '1px solid #333',
          borderRadius: '8px',
          color: '#fff',
          padding: '20px',
          fontSize: '1rem',
          outline: 'none',
          marginBottom: '30px'
        }}
      />

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={() => askUniverse('point')} disabled={loading} style={btnStyle(activeMode === 'point')}>Точка Выбора</button>
        <button onClick={() => askUniverse('quantum')} disabled={loading} style={btnStyle(activeMode === 'quantum')}>Квант</button>
        <button onClick={() => askUniverse('voice')} disabled={loading} style={btnStyle(activeMode === 'voice')}>Голос</button>
      </div>

      {loading && <div style={{ marginTop: '40px', color: '#666' }}>Считывание вероятностей...</div>}
      {answer && (
        <div style={{ marginTop: '40px', maxWidth: '600px', borderTop: '1px solid #222', paddingTop: '20px', whiteSpace: 'pre-wrap' }}>
          {answer}
        </div>
      )}
    </div>
  );
}

function btnStyle(active: boolean) {
  return {
    padding: '10px 20px',
    backgroundColor: active ? '#fff' : 'transparent',
    color: active ? '#000' : '#fff',
    border: '1px solid #fff',
    cursor: 'pointer',
    textTransform: 'uppercase' as const
  };
}

