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
      setAnswer(data.answer || 'Резонанс установлен.');
    } catch (error) {
      setAnswer('Обрыв ткани реальности.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '60px 20px', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontWeight: '200', letterSpacing: '6px', textTransform: 'uppercase', textAlign: 'center' }}>Protocol Resonance</h1>
      <p style={{ color: '#444', marginBottom: '50px' }}>V 1.1 — НАВИГАТОР ВЫБОРА</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Опиши ситуацию..."
        style={{ width: '100%', maxWidth: '700px', minHeight: '180px', backgroundColor: '#050505', border: '1px solid #222', color: '#fff', padding: '25px', fontSize: '1.1rem', marginBottom: '30px', outline: 'none' }}
      />

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '800px' }}>
        {/* НОВЫЕ КНОПКИ ПЕРВЫМИ В СПИСКЕ */}
        <button onClick={() => askUniverse('probability')} disabled={loading} style={btnStyle(activeMode === 'probability', '#3b82f6')}>ВЕРОЯТНОСТЬ</button>
        <button onClick={() => askUniverse('injection')} disabled={loading} style={btnStyle(activeMode === 'injection', '#ef4444')}>ИНЪЕКЦИЯ</button>
        
        {/* СТАРЫЕ КНОПКИ */}
        <button onClick={() => askUniverse('point')} disabled={loading} style={btnStyle(activeMode === 'point')}>Точка</button>
        <button onClick={() => askUniverse('quantum')} disabled={loading} style={btnStyle(activeMode === 'quantum')}>Квант</button>
        <button onClick={() => askUniverse('voice')} disabled={loading} style={btnStyle(activeMode === 'voice')}>Глос</button>
      </div>

      {loading && <div style={{ marginTop: '50px', color: '#666' }}>Считывание Квантовых Линий...</div>}

      {answer && (
        <div style={{ marginTop: '60px', maxWidth: '700px', borderTop: '1px solid #111', paddingTop: '40px', whiteSpace: 'pre-wrap', lineHeight: '1.8', color: '#bbb' }}>
          {answer}
          <div style={{ marginTop: '50px', textAlign: 'center' }}>
            <button onClick={() => { setText(''); setAnswer(''); setActiveMode(''); }} style={{ background: 'none', border: '1px solid #222', color: '#333', padding: '10px 20px', cursor: 'pointer', fontSize: '0.7rem', textTransform: 'uppercase' }}>Очистить</button>
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
    cursor: 'pointer',
    textTransform: 'uppercase' as const,
    fontSize: '0.75rem',
    opacity: active ? 1 : 0.6,
    transition: '0.3s'
  };
}
