export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '' });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "Ты — Protocol Resonance. Говори как Вселенная. Коротко и мудро." },
        { role: "user", content: message }
      ],
      model: "llama-3.3-70b-versatile",
    });
    return NextResponse.json({ text: completion.choices[0]?.message?.content || "Сигнал получен." });
  } catch (e: any) {
    return NextResponse.json({ text: "Ошибка: " + e.message }, { status: 500 });
  }
}
