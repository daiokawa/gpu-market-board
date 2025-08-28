'use client'

import { useState } from 'react'

interface CandlestickData {
  time: string
  open: number
  high: number
  low: number
  close: number
  volume?: number
}

interface CandlestickChartProps {
  data: CandlestickData[]
}

export default function CandlestickChart({ data }: CandlestickChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  // Calculate chart dimensions
  const width = 600
  const height = 250
  const padding = { top: 20, right: 20, bottom: 40, left: 20 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom
  
  // Calculate Y scale
  const yMin = Math.min(...data.map(d => d.low)) - 5
  const yMax = Math.max(...data.map(d => d.high)) + 5
  const yScale = (value: number) => {
    return padding.top + chartHeight - ((value - yMin) / (yMax - yMin)) * chartHeight
  }
  
  // Calculate X scale
  const xScale = (index: number) => {
    const barWidth = chartWidth / data.length
    return padding.left + index * barWidth + barWidth / 2
  }
  
  const barWidth = (chartWidth / data.length) * 0.6
  
  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* Grid lines */}
        <g>
          {[0, 1, 2, 3, 4].map(i => {
            const y = padding.top + (chartHeight / 4) * i
            return (
              <line
                key={`grid-h-${i}`}
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="#e5e7eb"
                strokeDasharray="3 3"
              />
            )
          })}
        </g>
        
        {/* Candlesticks */}
        {data.map((item, index) => {
          const isGreen = item.close >= item.open
          const color = isGreen ? '#10b981' : '#ef4444'
          const x = xScale(index)
          const highY = yScale(item.high)
          const lowY = yScale(item.low)
          const openY = yScale(item.open)
          const closeY = yScale(item.close)
          const bodyTop = Math.min(openY, closeY)
          const bodyBottom = Math.max(openY, closeY)
          const bodyHeight = Math.max(bodyBottom - bodyTop, 1)
          
          return (
            <g 
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Upper wick */}
              <line
                x1={x}
                y1={highY}
                x2={x}
                y2={bodyTop}
                stroke={color}
                strokeWidth={1}
              />
              {/* Lower wick */}
              <line
                x1={x}
                y1={bodyBottom}
                x2={x}
                y2={lowY}
                stroke={color}
                strokeWidth={1}
              />
              {/* Body */}
              <rect
                x={x - barWidth / 2}
                y={bodyTop}
                width={barWidth}
                height={bodyHeight}
                fill={isGreen ? color : 'white'}
                stroke={color}
                strokeWidth={1}
              />
            </g>
          )
        })}
        
        {/* X axis labels */}
        {data.map((item, index) => {
          if (index % 2 === 0 || index === data.length - 1) {
            const x = xScale(index)
            return (
              <text
                key={`label-${index}`}
                x={x}
                y={height - 10}
                textAnchor="middle"
                fontSize="11"
                fill="#6b7280"
              >
                {item.time}
              </text>
            )
          }
          return null
        })}
      </svg>
      
      {/* Tooltip */}
      {hoveredIndex !== null && (
        <div className="absolute top-2 left-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 pointer-events-none z-10">
          <p className="text-xs font-semibold text-gray-900 dark:text-white mb-1">
            {data[hoveredIndex].time}
          </p>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between gap-4">
              <span className="text-gray-600 dark:text-gray-400">Open:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                ${data[hoveredIndex].open.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-600 dark:text-gray-400">High:</span>
              <span className="font-medium text-green-600 dark:text-green-400">
                ${data[hoveredIndex].high.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-600 dark:text-gray-400">Low:</span>
              <span className="font-medium text-red-600 dark:text-red-400">
                ${data[hoveredIndex].low.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-600 dark:text-gray-400">Close:</span>
              <span className={`font-medium ${data[hoveredIndex].close >= data[hoveredIndex].open ? 'text-green-600' : 'text-red-600'}`}>
                ${data[hoveredIndex].close.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}