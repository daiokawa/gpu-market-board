export interface GPUProduct {
  id: string
  manufacturer: string
  model: string
  memory: string
  memoryType: string
  price: number
  priceChange: number
  priceChangePercent: number
  leadTime: string
  priceHistory: Array<{
    date: Date
    price: number
  }>
}

export interface Supplier {
  id: string
  name: string
  monthlyCapacity: number
  yieldRate: number
  estimatedStock: number
}

export interface Buyer {
  id: string
  name: string
  quantity: number
  newsSource: string
  newsDate: string
  verified: boolean
}

export interface GPUBoard {
  product: GPUProduct
  suppliers: Supplier[]
  buyers: Buyer[]
  demandSupplyRatio: number
  lastUpdate: Date
}