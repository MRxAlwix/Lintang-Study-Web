import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import CourseCard from '../components/CourseCard'

export default function Dashboard() {
  const [courses, setCourses] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/courses').then(r=>r.json()).then(setCourses)
  }, [])

  return (
    <div className="min-h-screen p-8">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map(c => <CourseCard key={c.id} course={c} />)}
      </div>
    </div>
  )
}
