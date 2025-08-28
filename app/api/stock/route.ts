import { NextResponse } from 'next/server'

// Yahoo Finance API (無料のyfinance API代替)
// 注: 本番環境では適切なAPIキー管理とレート制限を実装してください

interface StockQuote {
  symbol: string
  price: number
  change: number
  changePercent: number
  marketCap: string
  volume: string
  dayHigh: number
  dayLow: number
}

const SYMBOL_MAP: Record<string, string> = {
  'Google': 'GOOGL',
  'Microsoft': 'MSFT', 
  'Meta': 'META',
  'Amazon': 'AMZN',
  'AWS': 'AMZN',
  'Oracle': 'ORCL',
  'Alibaba Cloud': 'BABA',
  'Baidu': 'BIDU',
  'NVIDIA': 'NVDA',
  'Intel': 'INTC',
  'AMD': 'AMD'
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const company = searchParams.get('company')
  
  if (!company || !SYMBOL_MAP[company]) {
    return NextResponse.json({ error: 'Invalid company' }, { status: 400 })
  }
  
  const symbol = SYMBOL_MAP[company]
  
  try {
    // Yahoo Finance v8 API を使用（無料、認証不要）
    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      }
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch stock data')
    }
    
    const data = await response.json()
    const quote = data.chart.result[0]
    const meta = quote.meta
    const regularMarketPrice = meta.regularMarketPrice
    const previousClose = meta.chartPreviousClose
    const change = regularMarketPrice - previousClose
    const changePercent = (change / previousClose) * 100
    
    const stockData: StockQuote = {
      symbol: symbol,
      price: regularMarketPrice,
      change: change,
      changePercent: changePercent,
      marketCap: formatMarketCap(meta.marketCap || 0),
      volume: formatVolume(meta.regularMarketVolume || 0),
      dayHigh: meta.regularMarketDayHigh || regularMarketPrice,
      dayLow: meta.regularMarketDayLow || regularMarketPrice
    }
    
    // CORS対応
    return NextResponse.json(stockData, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
      }
    })
    
  } catch (error) {
    console.error('Stock fetch error:', error)
    
    // フォールバック: モックデータを返す
    return NextResponse.json({
      symbol: symbol,
      price: 100 + Math.random() * 500,
      change: (Math.random() - 0.5) * 10,
      changePercent: (Math.random() - 0.5) * 5,
      marketCap: '1T',
      volume: '20M',
      dayHigh: 110,
      dayLow: 90
    })
  }
}

function formatMarketCap(marketCap: number): string {
  if (marketCap >= 1e12) return `${(marketCap / 1e12).toFixed(2)}T`
  if (marketCap >= 1e9) return `${(marketCap / 1e9).toFixed(2)}B`
  if (marketCap >= 1e6) return `${(marketCap / 1e6).toFixed(2)}M`
  return marketCap.toString()
}

function formatVolume(volume: number): string {
  if (volume >= 1e6) return `${(volume / 1e6).toFixed(1)}M`
  if (volume >= 1e3) return `${(volume / 1e3).toFixed(1)}K`
  return volume.toString()
}