import Link from 'next/link'

export default function CourseCard({ course }: { course: any }) {
  return (
    <div className="p-4 bg-gray-800 rounded">
      <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
      <p className="text-sm mb-3">{course.description}</p>
      <div className="flex gap-2">
        <Link href={`/courses/${course.id}`}><a className="px-3 py-1 border rounded">Lihat</a></Link>
      </div>
    </div>
  )
}
