'use client'

import { useState, useMemo } from 'react'
import { Activity, TrendingUp, Package, Clock, Globe } from 'lucide-react'
import GPUBoardComponent from '@/components/gpu-board'
import GPUDetailModal from '@/components/gpu-detail-modal'
import AdBanner from '@/components/ad-banner'
import StockModal from '@/components/stock-modal'
import { mockGPUBoards } from '@/lib/mock-data'
import { GPUBoard } from '@/lib/types'
import { t, Language } from '@/lib/translations'
import { stockData } from '@/lib/stock-data'

export default function Home() {
  const [filter, setFilter] = useState<'all' | 'shortage' | 'balanced'>('all')
  const [selectedBoard, setSelectedBoard] = useState<GPUBoard | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [language, setLanguage] = useState<Language>('en')
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null)
  const [stockModalOpen, setStockModalOpen] = useState(false)
  
  const filteredBoards = useMemo(() => {
    switch (filter) {
      case 'shortage':
        return mockGPUBoards.filter(b => b.demandSupplyRatio >= 1.5)
      case 'balanced':
        return mockGPUBoards.filter(b => b.demandSupplyRatio < 1.5)
      default:
        return mockGPUBoards
    }
  }, [filter])
  
  const stats = useMemo(() => {
    const totalDemand = mockGPUBoards.reduce((acc, board) => {
      return acc + board.buyers.reduce((sum, buyer) => sum + buyer.quantity, 0)
    }, 0)
    
    const totalSupply = mockGPUBoards.reduce((acc, board) => {
      return acc + board.suppliers.reduce((sum, supplier) => sum + supplier.monthlyCapacity, 0)
    }, 0)
    
    const avgRatio = mockGPUBoards.reduce((acc, board) => acc + board.demandSupplyRatio, 0) / mockGPUBoards.length
    
    return { totalDemand, totalSupply, avgRatio }
  }, [])
  
  const handleBoardClick = (board: GPUBoard) => {
    setSelectedBoard(board)
    setModalOpen(true)
  }
  
  const handleBuyerClick = (buyerName: string) => {
    setSelectedCompany(buyerName)
    setStockModalOpen(true)
  }
  
  const lastUpdate = new Date().toLocaleString(language === 'ja' ? 'ja-JP' : 'en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
  
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Activity className="w-8 h-8 text-blue-500" />
                {t(language, 'title')}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {t(language, 'subtitle')}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setLanguage(language === 'en' ? 'ja' : 'en')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 
                         rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label={t(language, 'language')}
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{language === 'en' ? 'EN' : 'JP'}</span>
              </button>
              <div className="text-right">
                <p className="text-xs text-gray-500 dark:text-gray-400">{t(language, 'lastUpdate')}</p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{lastUpdate}</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdBanner lang={language} slot="top" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow cursor-pointer hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t(language, 'totalDemand')}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {(stats.totalDemand / 1000).toFixed(0)}K
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-500 opacity-50" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow cursor-pointer hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t(language, 'totalSupply')}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {(stats.totalSupply / 1000).toFixed(0)}K
                </p>
              </div>
              <Package className="w-8 h-8 text-blue-500 opacity-50" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t(language, 'avgRatio')}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {stats.avgRatio.toFixed(1)}x
                </p>
              </div>
              <Activity className="w-8 h-8 text-green-500 opacity-50" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow cursor-pointer hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t(language, 'avgLeadTime')}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {language === 'ja' ? '6-8ヶ月' : '6-8 months'}
                </p>
              </div>
              <Clock className="w-8 h-8 text-purple-500 opacity-50" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              filter === 'all' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {t(language, 'all')}
          </button>
          <button
            onClick={() => setFilter('shortage')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              filter === 'shortage' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {t(language, 'supplyShortage')}
          </button>
          <button
            onClick={() => setFilter('balanced')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              filter === 'balanced' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {t(language, 'balanced')}
          </button>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBoards.slice(0, 3).map((board, index) => (
            <GPUBoardComponent 
              key={board.product.id} 
              board={board} 
              onClick={() => handleBoardClick(board)}
              onBuyerClick={handleBuyerClick}
              index={index}
              lang={language}
            />
          ))}
        </div>
        
        {filteredBoards.length > 3 && (
          <>
            <div className="mt-6">
              <AdBanner lang={language} slot="middle" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filteredBoards.slice(3).map((board, index) => (
                <GPUBoardComponent 
                  key={board.product.id} 
                  board={board} 
                  onClick={() => handleBoardClick(board)}
                  onBuyerClick={handleBuyerClick}
                  index={index + 3}
                  lang={language}
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      <GPUDetailModal 
        board={selectedBoard} 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        lang={language}
      />
      
      <StockModal
        company={selectedCompany || ''}
        stock={selectedCompany ? stockData[selectedCompany] : null}
        isOpen={stockModalOpen}
        onClose={() => setStockModalOpen(false)}
        lang={language}
      />
      
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2024 GPU Market Board - Open Source Project
            </p>
            <a
              href="https://github.com/daiokawa/gpu-market-board"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:underline"
            >
              {t(language, 'viewOnGitHub')}
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
