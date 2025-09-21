import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { user_id, module_id, content } = req.body
    const { data, error } = await supabase.from('comments').insert({ user_id, module_id, content }).select().single()
    if (error) return res.status(500).json({ error })
    return res.status(201).json(data)
  }
  if (req.method === 'GET') {
    const { module_id } = req.query
    const { data, error } = await supabase.from('comments').select('*').eq('module_id', module_id).order('created_at', { ascending: true })
    if (error) return res.status(500).json({ error })
    return res.status(200).json(data)
  }
  res.status(405).end()
}
