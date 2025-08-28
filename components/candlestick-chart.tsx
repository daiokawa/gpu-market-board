'use client'

import { ResponsiveContainer, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar, Cell } from 'recharts'

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

// カスタムローソク足の描画
const CandlestickBar = (props: {
  x?: number
  y?: number
  width?: number
  height?: number
  payload?: {
    open: number
    close: number
    high: number
    low: number
    highY?: number
    lowY?: number
  }
}) => {
  const { x = 0, y = 0, width = 0, height = 0, payload } = props
  if (!payload) return null
  const isGreen = payload.close >= payload.open
  const color = isGreen ? '#10b981' : '#ef4444'
  
  // ローソクの実体部分の高さと位置を計算
  const bodyHeight = Math.abs(height)
  const bodyY = y
  
  return (
    <g>
      {/* 上ヒゲ */}
      <line
        x1={x + width / 2}
        y1={payload.highY}
        x2={x + width / 2}
        y2={bodyY}
        stroke={color}
        strokeWidth={1}
      />
      {/* 下ヒゲ */}
      <line
        x1={x + width / 2}
        y1={bodyY + bodyHeight}
        x2={x + width / 2}
        y2={payload.lowY}
        stroke={color}
        strokeWidth={1}
      />
      {/* ローソク本体 */}
      <rect
        x={x}
        y={bodyY}
        width={width}
        height={bodyHeight}
        fill={isGreen ? color : 'none'}
        stroke={color}
        strokeWidth={1}
      />
    </g>
  )
}

export default function CandlestickChart({ data }: CandlestickChartProps) {
  // データを変換（高値と安値の位置を計算）
  const processedData = data.map((item) => ({
    ...item,
    body: [Math.min(item.open, item.close), Math.max(item.open, item.close)],
    wick: [item.low, item.high],
    color: item.close >= item.open ? '#10b981' : '#ef4444'
  }))
  
  const CustomTooltip = ({ active, payload }: {
    active?: boolean
    payload?: Array<{
      payload: CandlestickData
    }>
  }) => {
    if (active && payload && payload[0]) {
      const data = payload[0].payload
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-xs font-semibold text-gray-900 dark:text-white mb-1">{data.time}</p>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between gap-4">
              <span className="text-gray-600 dark:text-gray-400">Open:</span>
              <span className="font-medium text-gray-900 dark:text-white">${data.open.toFixed(2)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-600 dark:text-gray-400">High:</span>
              <span className="font-medium text-green-600 dark:text-green-400">${data.high.toFixed(2)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-600 dark:text-gray-400">Low:</span>
              <span className="font-medium text-red-600 dark:text-red-400">${data.low.toFixed(2)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-600 dark:text-gray-400">Close:</span>
              <span className={`font-medium ${data.close >= data.open ? 'text-green-600' : 'text-red-600'}`}>
                ${data.close.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )
    }
    return null
  }
  
  return (
    <ResponsiveContainer width="100%" height={250}>
      <ComposedChart data={processedData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          dataKey="time" 
          tick={{ fontSize: 11 }}
          interval="preserveStartEnd"
        />
        <YAxis 
          domain={['dataMin - 5', 'dataMax + 5']}
          tick={{ fontSize: 11 }}
        />
        <Tooltip content={<CustomTooltip />} />
        
        {/* ローソク足のボディ */}
        <Bar dataKey="body" isAnimationActive={false}>
          {processedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
        
        {/* 高値・安値のヒゲ */}
        <Bar dataKey="wick" isAnimationActive={false} shape={CandlestickBar}>
          {processedData.map((entry, index) => (
            <Cell key={`wick-${index}`} fill={entry.color} stroke={entry.color} />
          ))}
        </Bar>
      </ComposedChart>
    </ResponsiveContainer>
  )
}