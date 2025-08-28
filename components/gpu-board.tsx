'use client'

import { GPUBoard } from '@/lib/types'
import { Package, Clock, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react'
import { t, Language } from '@/lib/translations'
import { motion } from 'framer-motion'

interface GPUBoardComponentProps {
  board: GPUBoard
  onClick: () => void
  index: number
  lang: Language
}

export default function GPUBoardComponent({ board, onClick, index, lang }: GPUBoardComponentProps) {
  const { product, suppliers, buyers, demandSupplyRatio } = board
  
  const totalSupply = suppliers.reduce((acc, s) => acc + s.monthlyCapacity, 0)
  const totalDemand = buyers.reduce((acc, b) => acc + b.quantity, 0)
  const totalStock = suppliers.reduce((acc, s) => acc + s.estimatedStock, 0)
  
  const getSupplyStatus = (ratio: number) => {
    if (ratio >= 2) return { color: 'text-red-500', bg: 'bg-red-500', label: t(lang, 'severeShortage') }
    if (ratio >= 1.5) return { color: 'text-orange-500', bg: 'bg-orange-500', label: t(lang, 'moderateShortage') }
    if (ratio >= 0.8) return { color: 'text-yellow-500', bg: 'bg-yellow-500', label: t(lang, 'wellBalanced') }
    return { color: 'text-green-500', bg: 'bg-green-500', label: t(lang, 'oversupply') }
  }
  
  const status = getSupplyStatus(demandSupplyRatio)
  const leadTimeDisplay = product.leadTime === '0' 
    ? t(lang, 'immediate')
    : `${product.leadTime}${t(lang, 'months')}`
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 cursor-pointer 
                 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {product.manufacturer} {product.model}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {product.memory} {product.memoryType}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ${product.price.toLocaleString()}
          </p>
          <div className={`flex items-center justify-end gap-1 mt-1 ${product.priceChange > 0 ? 'text-red-500' : 'text-green-500'}`}>
            {product.priceChange > 0 ? 
              <TrendingUp className="w-4 h-4" /> : 
              <TrendingDown className="w-4 h-4" />
            }
            <span className="text-sm font-medium">
              {product.priceChange > 0 ? '+' : ''}${Math.abs(product.priceChange).toLocaleString()}
              ({product.priceChange > 0 ? '+' : ''}{product.priceChangePercent.toFixed(1)}%)
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="border-r border-gray-200 dark:border-gray-700 pr-4">
          <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wider">
            {t(lang, 'supply')} (Supply)
          </h4>
          <div className="space-y-2">
            {suppliers.map(supplier => (
              <div key={supplier.id} className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{supplier.name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {supplier.monthlyCapacity.toLocaleString()}{t(lang, 'units')}{t(lang, 'month')}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {t(lang, 'yield')}: {supplier.yieldRate}%
                </p>
              </div>
            ))}
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Package className="w-3 h-3" />
              <span>{t(lang, 'estimatedStock')}: {totalStock.toLocaleString()}{t(lang, 'units')}</span>
            </div>
          </div>
        </div>
        
        <div className="pl-4">
          <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wider">
            {t(lang, 'demand')} (Demand)
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {buyers.slice(0, 4).map(buyer => (
              <div key={buyer.id} className="bg-orange-50 dark:bg-orange-900/20 rounded p-2">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{buyer.name}</p>
                  {!buyer.verified && (
                    <span title={t(lang, 'unverified')}>
                      <AlertCircle className="w-3 h-3 text-yellow-500" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {buyer.quantity.toLocaleString()}{t(lang, 'units')}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {buyer.newsSource} ({buyer.newsDate})
                </p>
              </div>
            ))}
            {buyers.length > 4 && (
              <p className="text-xs text-gray-500 text-center">
                {lang === 'ja' ? `他${buyers.length - 4}社...` : `${buyers.length - 4} more...`}
              </p>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-600 dark:text-gray-400">{t(lang, 'supplyDemandBalance')}</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {demandSupplyRatio.toFixed(1)}x
          </span>
        </div>
        <div className="relative h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div 
            className={`absolute left-0 top-0 h-full ${status.bg} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(demandSupplyRatio * 33.33, 100)}%` }}
            transition={{ delay: index * 0.1 + 0.3 }}
          />
          <div className="absolute inset-0 flex items-center">
            <div className="w-full flex justify-between px-2">
              <div className="w-px h-3 bg-gray-400" style={{ marginLeft: '33.33%' }} />
              <div className="w-px h-3 bg-gray-400" style={{ marginLeft: '33.33%' }} />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">0x</span>
          <span className={`text-xs font-medium ${status.color}`}>{status.label}</span>
          <span className="text-xs text-gray-500">3x+</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          <span>{t(lang, 'leadTime')}: {leadTimeDisplay}</span>
        </div>
        <div className="text-xs text-gray-400">
          {t(lang, 'demand')}: {totalDemand.toLocaleString()} / {t(lang, 'supply')}: {totalSupply.toLocaleString()}
        </div>
      </div>
    </motion.div>
  )
}