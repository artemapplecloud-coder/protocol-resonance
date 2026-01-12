import { NextResponse } from 'next/server';

export const runtime = 'edge'; 

export async function POST(req: Request) {
  try {
    const { situation, mode } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ answer: "🔐 Ошибка: GROQ_API_KEY не найден в переменных Netlify." });
    }

    const prompts: Record<string, string> = {
      point: "Ты — Точка Выбора. Твой закон — кратчайший путь. Прямой и жесткий ответ.",
      quantum: "Ты — Квантовый Навигатор. Опиши путь привычки и путь Резонанса.",
      voice: "Ты — Голос Вселенной. Твой ответ — откровение. Закон — Любовь."
    };

    // Явное создание объекта URL для обхода ошибки парсинга
    const endpoint = new URL("api.groq.com");

    const response = await fetch(endpoint.href, {
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
      return NextResponse.json({ answer: `⚠️ Ошибка Groq: ${errorData.error?.message || 'Сбой'}` });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    return NextResponse.json({ answer: content || "Вселенная пуста. Попробуй снова." });

  } catch (error: any) {
    return NextResponse.json({ answer: `🌀 Системный сбой: ${error.message}` });
  }
}
