import { NextResponse } from 'next/server';

export const runtime = 'edge'; 

export async function POST(req: Request) {
  try {
    const { situation, mode } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ answer: "🔐 Ошибка: GROQ_API_KEY отсутствует в настройках Netlify." });
    }

    const prompts: Record<string, string> = {
      point: "Ты — Точка Выбора. Прямой и жесткий ответ. Закон — кратчайший путь.",
      quantum: "Ты — Квантовый Навигатор. Опиши два сценария: путь привычки и путь Резонанса.",
      voice: "Ты — Голос Вселенной. Твой ответ — откровение. Закон — Любовь."
    };

    // В 2026 году для Netlify Edge важно использовать полный URL с HTTPS
    const url = "api.groq.com";

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey.trim()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: prompts[mode as keyof typeof prompts] || prompts.voice },
          { role: "user", content: situation }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ answer: `⚠️ Ошибка Groq: ${errorData.error?.message || 'Сбой связи'}` });
    }

    const data = await response.json();
    // Безошибочное получение контента
    const content = data.choices[0]?.message?.content;

    return NextResponse.json({ answer: content || "Вселенная промолчала. Попробуй еще раз." });

  } catch (error: any) {
    return NextResponse.json({ answer: `🌀 Ошибка URL или сети: ${error.message}` });
  }
}
