export interface StockData {
  symbol: string
  price: number
  change: number
  changePercent: number
  marketCap: string
  volume: string
  dayHigh: number
  dayLow: number
}

export const stockData: Record<string, StockData> = {
  'Google': {
    symbol: 'GOOGL',
    price: 178.43,
    change: 2.31,
    changePercent: 1.31,
    marketCap: '2.24T',
    volume: '28.3M',
    dayHigh: 179.85,
    dayLow: 176.92
  },
  'Microsoft': {
    symbol: 'MSFT',
    price: 452.68,
    change: -1.24,
    changePercent: -0.27,
    marketCap: '3.36T',
    volume: '18.9M',
    dayHigh: 455.12,
    dayLow: 451.33
  },
  'Meta': {
    symbol: 'META',
    price: 542.81,
    change: 8.42,
    changePercent: 1.58,
    marketCap: '1.38T',
    volume: '14.2M',
    dayHigh: 545.20,
    dayLow: 538.15
  },
  'OpenAI': {
    symbol: 'Private',
    price: 157000000000, // $157B valuation
    change: 0,
    changePercent: 0,
    marketCap: '157B',
    volume: 'N/A',
    dayHigh: 0,
    dayLow: 0
  },
  'Amazon': {
    symbol: 'AMZN',
    price: 189.34,
    change: 3.67,
    changePercent: 1.98,
    marketCap: '1.97T',
    volume: '42.1M',
    dayHigh: 190.45,
    dayLow: 186.23
  },
  'AWS': {
    symbol: 'AMZN',
    price: 189.34,
    change: 3.67,
    changePercent: 1.98,
    marketCap: '1.97T',
    volume: '42.1M',
    dayHigh: 190.45,
    dayLow: 186.23
  },
  'Oracle': {
    symbol: 'ORCL',
    price: 142.56,
    change: -0.89,
    changePercent: -0.62,
    marketCap: '393B',
    volume: '9.8M',
    dayHigh: 144.12,
    dayLow: 141.98
  },
  'Alibaba Cloud': {
    symbol: 'BABA',
    price: 85.42,
    change: 1.23,
    changePercent: 1.46,
    marketCap: '212B',
    volume: '15.3M',
    dayHigh: 86.15,
    dayLow: 84.30
  },
  'Baidu': {
    symbol: 'BIDU',
    price: 92.18,
    change: 0.56,
    changePercent: 0.61,
    marketCap: '32.4B',
    volume: '3.2M',
    dayHigh: 93.45,
    dayLow: 91.82
  },
  'CoreWeave': {
    symbol: 'Private',
    price: 19000000000, // $19B valuation
    change: 0,
    changePercent: 0,
    marketCap: '19B',
    volume: 'N/A',
    dayHigh: 0,
    dayLow: 0
  },
  'Lambda Labs': {
    symbol: 'Private',
    price: 1500000000, // $1.5B valuation
    change: 0,
    changePercent: 0,
    marketCap: '1.5B',
    volume: 'N/A',
    dayHigh: 0,
    dayLow: 0
  },
  'Individual Developers': {
    symbol: 'N/A',
    price: 0,
    change: 0,
    changePercent: 0,
    marketCap: 'N/A',
    volume: 'N/A',
    dayHigh: 0,
    dayLow: 0
  },
  'Small AI Startups': {
    symbol: 'N/A',
    price: 0,
    change: 0,
    changePercent: 0,
    marketCap: 'N/A',
    volume: 'N/A',
    dayHigh: 0,
    dayLow: 0
  }
}