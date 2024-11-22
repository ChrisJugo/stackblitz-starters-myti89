interface CircularProgressProps {
  value: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  label?: string
}

export function CircularProgress({ value, size = 'md', color = 'blue', label }: CircularProgressProps) {
  const radius = size === 'sm' ? 20 : size === 'md' ? 30 : size === 'lg' ? 40 : 50
  const strokeWidth = size === 'sm' ? 4 : size === 'md' ? 6 : size === 'lg' ? 8 : 10
  const circumference = 2 * Math.PI * radius

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="transform -rotate-90" width={radius * 2 + strokeWidth} height={radius * 2 + strokeWidth}>
        <circle
          className="text-gray-300"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
        />
        <circle
          className={`text-${color}-600`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (value / 100) * circumference}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
        />
      </svg>
      <span className="absolute text-xl font-semibold">{value}%</span>
      {label && <span className="absolute mt-8 text-sm">{label}</span>}
    </div>
  )
}

