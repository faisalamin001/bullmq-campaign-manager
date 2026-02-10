import { Play, Pause, RefreshCw, Trash2 } from 'lucide-react'
import { QueueAction } from '@/types/queue'

interface QueueControlsProps {
  onAction: (action: QueueAction) => Promise<void>
}

export function QueueControls({ onAction }: QueueControlsProps) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <RefreshCw className="w-5 h-5 text-purple-400" />
        Queue Controls
      </h2>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onAction('pause')}
          className="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg flex flex-col items-center justify-center gap-1 transition-colors"
        >
          <Pause className="w-5 h-5 text-yellow-400" />
          <span className="text-xs font-medium">Pause</span>
        </button>
        <button
          onClick={() => onAction('resume')}
          className="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg flex flex-col items-center justify-center gap-1 transition-colors"
        >
          <Play className="w-5 h-5 text-green-400" />
          <span className="text-xs font-medium">Resume</span>
        </button>
        <button
          onClick={() => onAction('clear')}
          className="col-span-2 bg-gray-700 hover:bg-gray-600 p-3 rounded-lg flex items-center justify-center gap-2 transition-colors text-red-400 hover:text-red-300"
        >
          <Trash2 className="w-4 h-4" />
          <span className="text-sm">Clear All Jobs</span>
        </button>
      </div>
    </div>
  )
}
