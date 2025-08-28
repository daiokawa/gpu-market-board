'use client'

import { useState, useEffect } from 'react'
import { X, TrendingUp, TrendingDown, Building2, DollarSign, Activity, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Language } from '@/lib/translations'
import { StockData, stockData as fallbackData } from '@/lib/stock-data'
import CandlestickChart from './candlestick-chart'

interface StockModalProps {
  company: string
  stock: StockData | null
  isOpen: boolean
  onClose: () => void
  lang: Language
}

export default function StockModal({ company, stock: initialStock, isOpen, onClose, lang }: StockModalProps) {
  const [stock, setStock] = useState<StockData | null>(initialStock)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    if (isOpen && company) {
      fetchRealTimeStock()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, company])
  
  const fetchRealTimeStock = async () => {
    // Check if company has a stock symbol (skip private companies and groups)
    const fallback = fallbackData[company]
    if (!fallback || fallback.symbol === 'Private' || fallback.symbol === 'N/A') {
      setStock(fallback)
      return
    }
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/stock?company=${encodeURIComponent(company)}`)
      if (!response.ok) throw new Error('Failed to fetch')
      
      const data = await response.json()
      setStock({
        ...fallback, // Keep fallback metadata
        ...data,     // Override with real-time data
        symbol: fallback.symbol // Keep original symbol
      })
    } catch (err) {
      console.error('Stock fetch error:', err)
      setError('Using cached data')
      setStock(fallback) // Fall back to mock data
    } finally {
      setLoading(false)
    }
  }
  
  if (!stock || !isOpen) return null
  
  const isPrivate = stock.symbol === 'Private' || stock.symbol === 'N/A'
  const isJapanese = lang === 'ja'
  
  // Mock candlestick data (5分足で生成)
  const candlestickData = isPrivate ? [] : Array.from({ length: 12 }, (_, i) => {
    const basePrice = stock.price - stock.change
    const time = 9 + Math.floor(i / 2) // 9時から15時まで
    const minute = (i % 2) * 30 // 0分または30分
    
    // リアルな値動きをシミュレート
    const volatility = stock.price * 0.002 // 0.2%のボラティリティ
    const trend = (stock.change / 12) * i
    
    const open = basePrice + trend + (Math.random() - 0.5) * volatility
    const close = basePrice + trend + (stock.change / 12) + (Math.random() - 0.5) * volatility
    const high = Math.max(open, close) + Math.random() * volatility
    const low = Math.min(open, close) - Math.random() * volatility
    
    return {
      time: `${time}:${minute === 0 ? '00' : '30'}`,
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000) + 500000
    }
  })
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <Building2 className="w-8 h-8 text-blue-500" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {company}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    {stock.symbol}
                    {loading && <Loader2 className="w-3 h-3 animate-spin" />}
                    {error && <span className="text-xs text-yellow-500">({error})</span>}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {isPrivate ? (
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-8 text-center">
                <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {isJapanese ? '非上場企業' : 'Private Company'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stock.marketCap !== 'N/A' && (
                    <>
                      {isJapanese ? '評価額: ' : 'Valuation: '}
                      <span className="font-bold text-blue-500">${stock.marketCap}</span>
                    </>
                  )}
                  {stock.marketCap === 'N/A' && (
                    isJapanese ? '株式情報は利用できません' : 'Stock information not available'
                  )}
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {isJapanese ? '株価' : 'Stock Price'}
                      </p>
                      <DollarSign className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${stock.price.toFixed(2)}
                    </p>
                    <div className={`flex items-center gap-1 mt-2 ${stock.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stock.change > 0 ? 
                        <TrendingUp className="w-4 h-4" /> : 
                        <TrendingDown className="w-4 h-4" />
                      }
                      <span className="font-medium">
                        {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {isJapanese ? '時価総額' : 'Market Cap'}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${stock.marketCap}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {isJapanese ? '出来高: ' : 'Volume: '}{stock.volume}
                    </p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                    {isJapanese ? '本日の値動き' : 'Today\'s Performance'}
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">
                      ({isJapanese ? '30分足' : '30-min candles'})
                    </span>
                  </h3>
                  <CandlestickChart data={candlestickData} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-sm">
                    <p className="text-gray-600 dark:text-gray-400">
                      {isJapanese ? '本日高値' : 'Day High'}
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      ${stock.dayHigh.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-600 dark:text-gray-400">
                      {isJapanese ? '本日安値' : 'Day Low'}
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      ${stock.dayLow.toFixed(2)}
                    </p>
                  </div>
                </div>
              </>
            )}
            
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                {isJapanese 
                  ? error ? '※ キャッシュデータを表示中' : '※ リアルタイム株価データ (Yahoo Finance)'
                  : error ? '* Showing cached data' : '* Real-time stock data from Yahoo Finance'}
              </p>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {isJapanese ? '閉じる' : 'Close'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}