'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { StatCard } from '@/components/dashboard/StatCard'
import { CampaignForm } from '@/components/dashboard/CampaignForm'
import { QueueControls } from '@/components/dashboard/QueueControls'
import { JobFeed } from '@/components/dashboard/JobFeed'
import { QueueAction, QueueStatus } from '@/types/queue'
import { addCampaignAction, performQueueAction } from './actions'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function QueueDashboard() {
  const [isLoading, setIsLoading] = useState(false)

  // Use SWR for polling status. This replaces useEffect + setInterval.
  const { data: status, mutate } = useSWR<QueueStatus>('/api/status', fetcher, {
    refreshInterval: 3000,
    fallbackData: {
      active: 0,
      waiting: 0,
      completed: 0,
      failed: 0,
      jobs: [],
    },
  })

  // Safe access to status data
  const currentStatus = status!

  const handleAddCampaign = async (count: number) => {
    setIsLoading(true)
    try {
      const emails = Array.from(
        { length: count },
        (_, i) => `user${Math.floor(Math.random() * 100000)}@example.com`,
      )

      const result = await addCampaignAction(emails)
      if (result.success) {
        // Trigger an immediate re-fetch to show new jobs
        mutate()
      } else {
        console.error(result.error)
      }
    } catch (error) {
      console.error('Failed to add campaign:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleQueueAction = async (action: QueueAction) => {
    try {
      const result = await performQueueAction(action)
      if (result.success) {
        // Trigger an immediate re-fetch to reflect status change
        mutate()
      } else {
        console.error(result.error)
      }
    } catch (error) {
      console.error(`Failed to perform action ${action}:`, error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-600">
              Email Campaign Manager
            </h1>
            <p className="text-gray-400 mt-1">Redis + BullMQ Queue Dashboard</p>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg flex items-center gap-3 border border-gray-700">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium">Worker Status: Active</span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Controls */}
          <div className="lg:col-span-1 space-y-6">
            <CampaignForm onAdd={handleAddCampaign} isLoading={isLoading} />
            <QueueControls onAction={handleQueueAction} />
          </div>

          {/* Right Column: Stats & Monitoring */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard
                label="Active"
                value={currentStatus.active}
                color="blue"
              />
              <StatCard
                label="Waiting"
                value={currentStatus.waiting}
                color="yellow"
              />
              <StatCard
                label="Completed"
                value={currentStatus.completed}
                color="green"
              />
              <StatCard
                label="Failed"
                value={currentStatus.failed}
                color="red"
              />
            </div>

            <JobFeed jobs={currentStatus.jobs} />
          </div>
        </div>
      </div>
    </div>
  )
}
