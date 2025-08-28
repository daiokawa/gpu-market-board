'use client'

import { Megaphone } from 'lucide-react'
import { Language, t } from '@/lib/translations'

interface AdBannerProps {
  lang: Language
  slot: 'top' | 'middle'
}

export default function AdBanner({ lang, slot }: AdBannerProps) {
  const isJapanese = lang === 'ja'
  
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 
                    border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-xl p-6 
                    hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 group">
      <div className="absolute top-2 right-2 text-xs text-gray-400 dark:text-gray-600 font-mono">
        AD SPACE {slot === 'top' ? '#1' : '#2'}
      </div>
      
      <div className="flex items-center justify-center gap-4">
        <Megaphone className="w-8 h-8 text-blue-400 dark:text-blue-600 animate-pulse" />
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
            {isJapanese ? '広告枠募集中！' : 'Your Ad Here!'}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {isJapanese 
              ? 'GPU関連サービス・製品の広告を掲載しませんか？' 
              : 'Advertise your GPU-related services or products'}
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 
                           rounded-full text-xs font-semibold">
              {isJapanese ? '月間10万PV' : '100K+ Monthly Views'}
            </span>
            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 
                           rounded-full text-xs font-semibold">
              {isJapanese ? 'ターゲット層: AI/ML開発者' : 'Target: AI/ML Developers'}
            </span>
          </div>
          <a 
            href="mailto:ads@gpu-market-board.com?subject=GPU%20Market%20Board%20Ad%20Inquiry"
            className="inline-block mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg 
                     font-medium text-sm transition-colors group-hover:scale-105 transform duration-200"
          >
            {isJapanese ? 'お問い合わせ →' : 'Contact for Pricing →'}
          </a>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                    -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    </div>
  )
}