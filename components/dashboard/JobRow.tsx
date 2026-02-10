import { Job } from '@/types/queue'

interface JobRowProps {
  job: Job
}

export function JobRow({ job }: JobRowProps) {
  const statusColors = {
    active: 'text-blue-400 bg-blue-400/10',
    waiting: 'text-yellow-400 bg-yellow-400/10',
    completed: 'text-green-400 bg-green-400/10',
    failed: 'text-red-400 bg-red-400/10',
    delayed: 'text-purple-400 bg-purple-400/10',
    paused: 'text-gray-400 bg-gray-400/10',
  }

  return (
    <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700/50 flex items-center justify-between group hover:border-gray-600 transition-colors">
      <div className="flex flex-col gap-1">
        <span className="font-medium text-gray-300 text-sm">
          {job.data.email || `Job #${job.id}`}
        </span>
        <span className="text-xs text-gray-500 font-mono">ID: {job.id}</span>
      </div>

      <div className="flex items-center gap-4">
        {job.status === 'active' && (
          <div className="w-24 h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 animate-pulse"
              style={{ width: `${Math.max(job.progress || 5, 5)}%` }}
            />
          </div>
        )}

        <span
          className={`px-2 py-1 rounded text-xs font-medium uppercase ${statusColors[job.status]}`}
        >
          {job.status}
        </span>
      </div>
    </div>
  )
}
