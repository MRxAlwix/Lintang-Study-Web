import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('courses').select('*')
    if (error) return res.status(500).json({ error })
    return res.status(200).json(data)
  }
  if (req.method === 'POST') {
    const payload = req.body
    const { data, error } = await supabase.from('courses').insert(payload).select().single()
    if (error) return res.status(500).json({ error })
    return res.status(201).json(data)
  }
  res.status(405).end()
}
