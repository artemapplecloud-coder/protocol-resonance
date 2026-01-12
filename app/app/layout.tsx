export const metadata = {
  title: 'Protocol Resonance',
  description: 'Действующий закон реальности 2026',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body style={{ 
        margin: 0, 
        padding: 0, 
        backgroundColor: 'black', 
        color: 'white',
        fontFamily: 'sans-serif' 
      }}>
        {children}
      </body>
    </html>
  )
}

