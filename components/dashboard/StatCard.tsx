interface StatCardProps {
  label: string
  value: number
  color: 'blue' | 'yellow' | 'green' | 'red'
}

export function StatCard({ label, value, color }: StatCardProps) {
  const colors = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    green: 'bg-green-500/10 text-green-400 border-green-500/20',
    red: 'bg-red-500/10 text-red-400 border-red-500/20',
  }

  return (
    <div
      className={`p-4 rounded-xl border ${colors[color]} flex flex-col items-center justify-center transition-all hover:scale-105`}
    >
      <span className="text-3xl font-bold mb-1">{value}</span>
      <span className="text-xs uppercase tracking-wider opacity-70">
        {label}
      </span>
    </div>
  )
}
