import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

const OPENAI_KEY = process.env.OPENAI_API_KEY!

const ALLOWED_KEYWORDS = ['autocad','revit','sketchup','enscape','arsitektur','ui/ux','render','bim','cad']

function isAllowed(message: string) {
  const m = message.toLowerCase()
  return ALLOWED_KEYWORDS.some(k => m.includes(k))
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { user_id, message } = req.body
  if (!message) return res.status(400).json({ error: 'Pesan kosong' })
  if (!isAllowed(message)) {
    return res.status(200).json({ reply: "Maaf, saya hanya bisa membantu seputar dunia desain." })
  }

  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Kamu adalah asisten ahli desain. Jawaban praktis dan ringkas.' },
        { role: 'user', content: message }
      ],
      max_tokens: 500
    })
  })
  const data = await resp.json()
  const reply = data.choices?.[0]?.message?.content || 'Mohon maaf, terjadi kesalahan.'
  res.status(200).json({ reply })
}
