import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full p-8 bg-card rounded">
        <h1 className="text-3xl font-bold mb-4">Lintang Study</h1>
        <p className="mb-6">Platform pembelajaran desain (semi-private).</p>
        <div className="flex gap-3">
          <Link href="/login"><a className="px-4 py-2 bg-primary rounded">Login</a></Link>
          <Link href="/dashboard"><a className="px-4 py-2 border rounded">Dashboard (demo)</a></Link>
        </div>
      </div>
    </div>
  )
}
