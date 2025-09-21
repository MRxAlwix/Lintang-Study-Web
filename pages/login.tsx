import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/router'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const submit = async () => {
    setError('')
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return setError('Login gagal, silakan periksa kembali username dan password Anda.')
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-card rounded-lg">
        <h1 className="text-2xl mb-4 text-white">Login Lintang Study</h1>
        <input className="w-full mb-2 p-2 rounded bg-gray-800 text-white" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="w-full mb-2 p-2 rounded bg-gray-800 text-white" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <div className="text-red-400 mb-2">{error}</div>}
        <button onClick={submit} className="w-full py-2 bg-primary rounded text-white">Masuk</button>
      </div>
    </div>
  )
}
