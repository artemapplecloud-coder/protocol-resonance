import { NextResponse } from 'next/server';
import Groq from "groq-sdk";

// Эта строка заставляет Vercel считать этот файл динамическим API
export const dynamic = 'force-dynamic';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "Ты — Вселенная. Отвечай мудро и коротко." },
        { role: "user", content: message }
      ],
      model: "llama3-8b-8192",
    });

    const responseText = completion.choices[0]?.message?.content || "Сигнал принят.";
    return NextResponse.json({ text: responseText });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ text: "Ошибка на стороне API: " + error.message }, { status: 500 });
  }
}
