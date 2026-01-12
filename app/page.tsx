'use client';
import { useState } from 'react';

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
      setAnswer(data.answer);
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
      fontFamily: 'system-ui, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h1 style={{ fontWeight: '200', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '40px' }}>
        Навигатор Выбора
      </h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Опиши ситуацию, где нужен выбор..."
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
          lineHeight: '1.5',
          outline: 'none',
          marginBottom: '30px'
        }}
      />

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button 
          onClick={() => askUniverse('point')}
          disabled={loading}
          style={buttonStyle(activeMode === 'point')}
        >
          Точка Выбора
        </button>
        <button 
          onClick={() => askUniverse('quantum')}
          disabled={loading}
          style={buttonStyle(activeMode === 'quantum')}
        >
          Квант
        </button>
        <button 
          onClick={() => askUniverse('voice')}
          disabled={loading}
          style={buttonStyle(activeMode === 'voice')}
        >
          Голос
        </button>
      </div>

      {loading && (
        <div style={{ marginTop: '40px', color: '#666', fontStyle: 'italic' }}>
          Считывание линий вероятности...
        </div>
      )}

      {answer && (
        <div style={{
          marginTop: '50px',
          maxWidth: '600px',
          lineHeight: '1.8',
          fontSize: '1.1rem',
          color: '#ddd',
          padding: '30px',
          borderTop: '1px solid #222',
          whiteSpace: 'pre-wrap'
        }}>
          {answer}
          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <button 
              onClick={() => { setText(''); setAnswer(''); setActiveMode(''); }}
              style={{ background: 'none', border: '1px solid #444', color: '#666', padding: '8px 16px', cursor: 'pointer', borderRadius: '4px' }}
            >
              Очистить путь
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function buttonStyle(isActive: boolean) {
  return {
    padding: '12px 24px',
    backgroundColor: isActive ? '#fff' : 'transparent',
    color: isActive ? '#000' : '#fff',
    border: '1px solid #fff',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    textTransform: 'uppercase' as const,
    transition: 'all 0.3s ease',
    opacity: isActive ? 1 : 0.7
  };
}
