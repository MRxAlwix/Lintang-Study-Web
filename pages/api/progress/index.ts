import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { user_id, module_id, completed } = req.body
  if (!user_id || !module_id) return res.status(400).json({ error: 'Missing fields' })

  const { data, error } = await supabase.from('progress').upsert(
    { user_id, module_id, completed, completed_at: completed ? new Date().toISOString() : null },
    { onConflict: ['user_id', 'module_id'] }
  )
  if (error) return res.status(500).json({ error })
  return res.status(200).json(data)
}
