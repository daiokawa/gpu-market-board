'use client'

import { Megaphone } from 'lucide-react'
import { Language } from '@/lib/translations'

interface AdBannerProps {
  lang: Language
  slot: 'top' | 'middle'
}

export default function AdBanner({ lang, slot }: AdBannerProps) {
  const isJapanese = lang === 'ja'
  
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/30 dark:to-gray-700/30 
                    border border-gray-200 dark:border-gray-600 rounded-lg p-3 
                    hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-300 group">
      <div className="absolute top-1 right-2 text-xs text-gray-400 dark:text-gray-600 font-mono opacity-50">
        AD {slot === 'top' ? '#1' : '#2'}
      </div>
      
      <div className="flex items-center justify-center gap-3">
        <Megaphone className="w-5 h-5 text-gray-400 dark:text-gray-500" />
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
            {isJapanese ? '広告枠' : 'Your Ad Here'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            {isJapanese ? 'AI/ML開発者向け' : 'Target: AI/ML Developers'}
          </p>
          <a 
            href="mailto:ads@gpu-market-board.com?subject=GPU%20Market%20Board%20Ad%20Inquiry"
            className="inline-block mt-1 px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 
                     text-gray-700 dark:text-gray-300 rounded text-xs transition-colors"
          >
            {isJapanese ? '詳細 →' : 'Contact →'}
          </a>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                    -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    </div>
  )
}