# Lintang Study - Project Skeleton (Next.js + Supabase)

Ini adalah skeleton awal proyek **Lintang Study** sesuai request.
Semua file disiapkan agar kamu tinggal isi credential, jalankan, dan kembangkan.

## Cara pakai (singkat)
1. Salin file `.env.local.example` menjadi `.env.local` dan isi kredensial (Supabase + OpenAI).
2. Jalankan `npm install`
3. Jalankan `npm run dev`
4. Buka `http://localhost:3000`

## Struktur penting
- `pages/` - halaman Next.js (login, dashboard)
- `pages/api/` - API routes (admin-create-user, auth, courses, progress, comments, ai/chat)
- `lib/supabase.ts` - client Supabase
- `components/` - React components (CourseCard)
- `db/schema.sql` - SQL untuk create tables di Supabase

## Catatan
- Endpoint admin-create-user menggunakan SUPABASE_SERVICE_ROLE_KEY (server-side). Pastikan hanya admin bisa mengaksesnya di production.
- AI Chat menggunakan OPENAI_API_KEY; jangan commit key ke repo.
- Sertifikat dan monetisasi tidak termasuk di skeleton ini (sesuai permintaan).
