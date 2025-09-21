import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!

const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  // TODO: proteksi endpoint ini dengan middleware admin di production
  const { email, password, username, full_name, role = 'user' } = req.body
  if (!email || !password || !username) return res.status(400).json({ error: 'Lengkapi field' })
  try {
    const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { full_name }
    })
    if (createError) throw createError

    const { error: profileErr } = await supabaseAdmin.from('profiles').insert({
      id: userData.user?.id,
      username,
      full_name,
      role
    })
    if (profileErr) throw profileErr

    return res.status(200).json({ ok: true, user: { id: userData.user?.id, email, username } })
  } catch (e: any) {
    return res.status(500).json({ error: e.message || e })
  }
}
