import { GPUBoard } from './types'

export const mockGPUBoards: GPUBoard[] = [
  {
    product: {
      id: 'h100-80gb',
      manufacturer: 'NVIDIA',
      model: 'H100 80GB',
      memory: '80GB',
      memoryType: 'HBM3',
      price: 32000,
      priceChange: 1500,
      priceChangePercent: 4.9,
      leadTime: '6-8',
      priceHistory: [
        { date: new Date('2024-11-01'), price: 28000 },
        { date: new Date('2024-11-08'), price: 29000 },
        { date: new Date('2024-11-15'), price: 30500 },
        { date: new Date('2024-11-22'), price: 32000 },
      ]
    },
    suppliers: [
      { id: 's1', name: 'TSMC', monthlyCapacity: 30000, yieldRate: 70, estimatedStock: 500 }
    ],
    buyers: [
      { id: 'b1', name: 'Google', quantity: 100000, newsSource: 'Reuters', newsDate: '2024/01/15', verified: true },
      { id: 'b2', name: 'Microsoft', quantity: 80000, newsSource: 'Bloomberg', newsDate: '2024/01/10', verified: true },
      { id: 'b3', name: 'Meta', quantity: 50000, newsSource: 'TechCrunch', newsDate: '2024/01/08', verified: true },
      { id: 'b4', name: 'OpenAI', quantity: 500000, newsSource: 'The Information', newsDate: '2024/01/20', verified: false },
      { id: 'b5', name: 'Amazon', quantity: 100000, newsSource: 'WSJ', newsDate: '2024/01/18', verified: true },
    ],
    demandSupplyRatio: 2.8,
    lastUpdate: new Date()
  },
  {
    product: {
      id: 'h100-40gb',
      manufacturer: 'NVIDIA',
      model: 'H100 40GB',
      memory: '40GB',
      memoryType: 'HBM3',
      price: 25000,
      priceChange: 800,
      priceChangePercent: 3.3,
      leadTime: '5-7',
      priceHistory: [
        { date: new Date('2024-11-01'), price: 22000 },
        { date: new Date('2024-11-08'), price: 23000 },
        { date: new Date('2024-11-15'), price: 24200 },
        { date: new Date('2024-11-22'), price: 25000 },
      ]
    },
    suppliers: [
      { id: 's1', name: 'TSMC', monthlyCapacity: 15000, yieldRate: 75, estimatedStock: 300 }
    ],
    buyers: [
      { id: 'b1', name: 'AWS', quantity: 60000, newsSource: 'SemiAnalysis', newsDate: '2024/01/12', verified: true },
      { id: 'b2', name: 'Oracle', quantity: 30000, newsSource: 'Bloomberg', newsDate: '2024/01/09', verified: true },
    ],
    demandSupplyRatio: 2.0,
    lastUpdate: new Date()
  },
  {
    product: {
      id: 'a100-80gb',
      manufacturer: 'NVIDIA',
      model: 'A100 80GB',
      memory: '80GB',
      memoryType: 'HBM2e',
      price: 15000,
      priceChange: -500,
      priceChangePercent: -3.2,
      leadTime: '2-3',
      priceHistory: [
        { date: new Date('2024-11-01'), price: 16000 },
        { date: new Date('2024-11-08'), price: 15800 },
        { date: new Date('2024-11-15'), price: 15500 },
        { date: new Date('2024-11-22'), price: 15000 },
      ]
    },
    suppliers: [
      { id: 's1', name: 'TSMC', monthlyCapacity: 35000, yieldRate: 85, estimatedStock: 2000 },
      { id: 's2', name: 'Samsung', monthlyCapacity: 15000, yieldRate: 80, estimatedStock: 0 }
    ],
    buyers: [
      { id: 'b1', name: 'Alibaba Cloud', quantity: 40000, newsSource: 'Reuters', newsDate: '2024/01/05', verified: true },
      { id: 'b2', name: 'Baidu', quantity: 25000, newsSource: 'Bloomberg', newsDate: '2024/01/07', verified: true },
    ],
    demandSupplyRatio: 1.3,
    lastUpdate: new Date()
  },
  {
    product: {
      id: 'l40s',
      manufacturer: 'NVIDIA',
      model: 'L40S',
      memory: '48GB',
      memoryType: 'GDDR6',
      price: 8500,
      priceChange: 200,
      priceChangePercent: 2.4,
      leadTime: '1-2',
      priceHistory: [
        { date: new Date('2024-11-01'), price: 8000 },
        { date: new Date('2024-11-08'), price: 8200 },
        { date: new Date('2024-11-15'), price: 8300 },
        { date: new Date('2024-11-22'), price: 8500 },
      ]
    },
    suppliers: [
      { id: 's1', name: 'TSMC', monthlyCapacity: 70000, yieldRate: 90, estimatedStock: 5000 },
      { id: 's2', name: 'Samsung', monthlyCapacity: 30000, yieldRate: 88, estimatedStock: 0 }
    ],
    buyers: [
      { id: 'b1', name: 'CoreWeave', quantity: 50000, newsSource: 'TechCrunch', newsDate: '2024/01/11', verified: true },
      { id: 'b2', name: 'Lambda Labs', quantity: 20000, newsSource: 'The Information', newsDate: '2024/01/13', verified: true },
    ],
    demandSupplyRatio: 0.7,
    lastUpdate: new Date()
  },
  {
    product: {
      id: 'rtx-4090',
      manufacturer: 'NVIDIA',
      model: 'RTX 4090',
      memory: '24GB',
      memoryType: 'GDDR6X',
      price: 1800,
      priceChange: -100,
      priceChangePercent: -5.3,
      leadTime: '0',
      priceHistory: [
        { date: new Date('2024-11-01'), price: 2000 },
        { date: new Date('2024-11-08'), price: 1950 },
        { date: new Date('2024-11-15'), price: 1900 },
        { date: new Date('2024-11-22'), price: 1800 },
      ]
    },
    suppliers: [
      { id: 's1', name: 'TSMC', monthlyCapacity: 500000, yieldRate: 95, estimatedStock: 50000 }
    ],
    buyers: [
      { id: 'b1', name: 'Individual Developers', quantity: 200000, newsSource: 'Market Estimate', newsDate: '2024/01/01', verified: true },
      { id: 'b2', name: 'Small AI Startups', quantity: 100000, newsSource: 'Industry Report', newsDate: '2024/01/01', verified: true },
    ],
    demandSupplyRatio: 0.6,
    lastUpdate: new Date()
  }
]