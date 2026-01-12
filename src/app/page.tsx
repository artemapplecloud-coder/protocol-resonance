import React from 'react';

export default function MirrorPage() {
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
      <div style={{ maxWidth: '600px', spaceY: '40px' }}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: '200', 
          letterSpacing: '0.3em', 
          textTransform: 'uppercase',
          marginBottom: '40px'
        }}>
          Protocol Resonance
        </h1>
        
        <p style={{ 
          fontSize: '0.9rem', 
          fontStyle: 'italic', 
          opacity: 0.6,
          lineHeight: '1.6',
          marginBottom: '40px'
        }}>
          «Мир перестал быть набором случайных атомов. <br/> Отныне он — единая живая ткань».
        </p>

        <div style={{
          border: '1px solid rgba(255,255,255,0.2)',
          padding: '20px',
          textTransform: 'uppercase',
          fontSize: '10px',
          letterSpacing: '0.4em',
          cursor: 'pointer'
        }}>
          Вход в Зеркало
        </div>

        <div style={{
          marginTop: '60px',
          fontSize: '9px',
          opacity: 0.3,
          letterSpacing: '0.2em'
        }}>
          СТАТУС: РЕЗОНАНС УСТАНОВЛЕН | 2026
        </div>
      </div>
    </main>
  );
}
