import { json } from '@sveltejs/kit';
import { GROQ_API_KEY } from '$env/static/private';

export async function POST({ request }) {
  const { question, context } = await request.json();

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      temperature: 0.3,
      messages: [
        { role: 'system', content: context },
        { role: 'user', content: question }
      ]
    })
  });

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content || "Sorry, I had trouble with that!";

  return json({ reply });
}