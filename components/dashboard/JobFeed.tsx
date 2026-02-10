import { Job } from '@/types/queue'
import { JobRow } from './JobRow'

interface JobFeedProps {
  jobs: Job[]
}

export function JobFeed({ jobs }: JobFeedProps) {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden flex flex-col h-[500px]">
      <div className="p-4 border-b border-gray-700 bg-gray-800/50 backdrop-blur sticky top-0">
        <h3 className="font-semibold text-gray-200">Live Job Feed</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {jobs.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            No active jobs found.
          </div>
        ) : (
          jobs.map((job) => <JobRow key={job.id} job={job} />)
        )}
      </div>
    </div>
  )
}
