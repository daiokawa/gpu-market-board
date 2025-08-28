'use client'

import { GPUBoard } from '@/lib/types'
import { X } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion, AnimatePresence } from 'framer-motion'
import { t, Language } from '@/lib/translations'

interface GPUDetailModalProps {
  board: GPUBoard | null
  isOpen: boolean
  onClose: () => void
  lang: Language
}

export default function GPUDetailModal({ board, isOpen, onClose, lang }: GPUDetailModalProps) {
  if (!board) return null
  
  const chartData = board.product.priceHistory.map(item => ({
    date: new Date(item.date).toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-US', { month: 'short', day: 'numeric' }),
    price: item.price
  }))
  
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
            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {board.product.manufacturer} {board.product.model}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {board.product.memory} {board.product.memoryType}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                {t(lang, 'priceHistory')}
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#2563eb" 
                    strokeWidth={2}
                    dot={{ fill: '#2563eb' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  {t(lang, 'supply')}
                </h3>
                <div className="space-y-3">
                  {board.suppliers.map(supplier => (
                    <div key={supplier.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                      <p className="font-medium text-gray-900 dark:text-white">{supplier.name}</p>
                      <div className="mt-2 space-y-1 text-sm">
                        <p className="text-gray-600 dark:text-gray-400">
                          {t(lang, 'supply')}: {supplier.monthlyCapacity.toLocaleString()}{t(lang, 'units')}{t(lang, 'month')}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {t(lang, 'yield')}: {supplier.yieldRate}%
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {t(lang, 'estimatedStock')}: {supplier.estimatedStock.toLocaleString()}{t(lang, 'units')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  {t(lang, 'demand')}
                </h3>
                <div className="space-y-3">
                  {board.buyers.map(buyer => (
                    <div key={buyer.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {buyer.name}
                        {!buyer.verified && (
                          <span className="ml-2 text-xs text-yellow-600 dark:text-yellow-400">
                            ({t(lang, 'unverified')})
                          </span>
                        )}
                      </p>
                      <div className="mt-2 space-y-1 text-sm">
                        <p className="text-gray-600 dark:text-gray-400">
                          {t(lang, 'demand')}: {buyer.quantity.toLocaleString()}{t(lang, 'units')}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {t(lang, 'source')}: {buyer.newsSource} ({buyer.newsDate})
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {t(lang, 'close')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}