import { useState } from 'react'
import { Send, Zap } from 'lucide-react'

interface CampaignFormProps {
  onAdd: (count: number) => Promise<void>
  isLoading: boolean
}

export function CampaignForm({ onAdd, isLoading }: CampaignFormProps) {
  const [emailCount, setEmailCount] = useState(50)
  const [priority, setPriority] = useState('normal')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onAdd(emailCount)
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Send className="w-5 h-5 text-blue-400" />
        New Campaign
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Number of Emails
          </label>
          <input
            type="number"
            value={emailCount}
            onChange={(e) => setEmailCount(Number(e.target.value))}
            min="1"
            max="1000"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          >
            <option value="normal">Normal Priority</option>
            <option value="high">High Priority (VIP)</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? (
            'Queueing...'
          ) : (
            <>
              <Zap className="w-4 h-4" />
              Launch Campaign
            </>
          )}
        </button>
      </form>
    </div>
  )
}
