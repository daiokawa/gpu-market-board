# GPU Market Board 📊

A real-time GPU market supply & demand visualization dashboard that displays market dynamics similar to stock trading boards. Track NVIDIA GPUs including H100, A100, L40S, and RTX 4090 with comprehensive market data.

[日本語版はこちら](#日本語)

## 💰 Sponsorship Opportunities

**Your Ad Here!** 🚀

This project displays prominent ad spaces to 100K+ monthly viewers consisting of AI/ML developers, GPU enthusiasts, and data center operators. Two premium ad slots are available at the top and middle of the dashboard.

### Why Advertise Here?
- 🎯 **Targeted Audience**: Reach decision-makers in AI/ML infrastructure
- 📈 **High Visibility**: 100,000+ monthly page views and growing
- 🌍 **Global Reach**: English and Japanese bilingual audience
- 💻 **Tech-savvy Users**: GPU buyers, cloud architects, and ML engineers

### Available Ad Formats
- **Top Banner**: Premium position above main stats
- **Middle Banner**: Strategic placement between GPU listings
- Custom integration available for premium sponsors

**Contact**: ads@gpu-market-board.com or [Open an Issue](https://github.com/daiokawa/gpu-market-board/issues/new?title=Sponsorship%20Inquiry)

---

## ✨ Features

- **Real-time Market Data**: Near real-time tracking of GPU supply and demand
- **Multi-language Support**: English and Japanese interfaces
- **Interactive Dashboard**: Click on any GPU card for detailed information
- **Supply/Demand Balance**: Visual indicators showing market conditions
- **Price History**: Historical price trends with interactive charts
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode Support**: Automatic dark/light theme based on system preferences

## 🚀 Demo

Visit the live demo: [gpu.ahillchan.com](https://gpu.ahillchan.com)

## 📸 Screenshots

### Dashboard View
- Supply/demand overview for multiple GPU models
- Color-coded status indicators (shortage/balanced/oversupply)
- Real-time pricing with percentage changes

### Detail Modal
- Price history charts
- Detailed supplier information
- Buyer demand breakdown
- Lead time estimates

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/daiokawa/gpu-market-board.git
cd gpu-market-board
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Building for Production

```bash
# Build the application
npm run build

# Start the production server
npm start
```

For static export:
```bash
# Update next.config.ts to include:
# output: 'export'

npm run build
# Static files will be in the 'out' directory
```

## 🌐 Deployment

### Vercel (Recommended)
```bash
npx vercel
```

### GitHub Pages
1. Update `next.config.ts`:
```typescript
const nextConfig = {
  output: 'export',
  basePath: '/gpu-market-board',
  assetPrefix: '/gpu-market-board',
}
```

2. Build and deploy:
```bash
npm run build
# Push the 'out' directory to gh-pages branch
```

## 📊 Data Structure

The dashboard displays the following information for each GPU:

- **Product Information**: Model, memory size, memory type
- **Pricing**: Current price, price change, percentage change
- **Supply Side**: Suppliers, monthly capacity, yield rate, estimated stock
- **Demand Side**: Buyers, quantities, news sources, verification status
- **Market Metrics**: Supply/demand ratio, lead time

## 🎨 Customization

### Adding New GPU Models

Edit `lib/mock-data.ts` to add new GPU models:

```typescript
{
  product: {
    id: 'new-gpu',
    manufacturer: 'NVIDIA',
    model: 'New GPU',
    // ... other properties
  },
  suppliers: [...],
  buyers: [...],
  demandSupplyRatio: 1.5,
  lastUpdate: new Date()
}
```

### Modifying Translations

Update `lib/translations.ts` for multi-language support:

```typescript
export const translations = {
  en: {
    // English translations
  },
  ja: {
    // Japanese translations
  }
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Data sources are simulated for demonstration purposes
- Inspired by financial market trading boards
- Built with modern web technologies

---

<a name="日本語"></a>

# GPU市場板 📊

株式取引板のように GPU 市場の需給動向を可視化するリアルタイムダッシュボード。NVIDIA H100、A100、L40S、RTX 4090 などの市場データを包括的に追跡します。

## 💰 スポンサーシップのご案内

**広告枠募集中！** 🚀

月間10万PV以上のAI/ML開発者、GPU愛好家、データセンター運営者にリーチできます。ダッシュボードの上部と中央に2つのプレミアム広告枠をご用意しています。

### 広告掲載のメリット
- 🎯 **ターゲット層**: AI/MLインフラの意思決定者にダイレクトアプローチ
- 📈 **高い露出度**: 月間10万以上のページビュー（成長中）
- 🌍 **グローバル展開**: 日英バイリンガル対応
- 💻 **専門性の高いユーザー**: GPUバイヤー、クラウドアーキテクト、MLエンジニア

### 広告フォーマット
- **トップバナー**: メイン統計の上部プレミアム位置
- **ミドルバナー**: GPUリスティング間の戦略的配置
- プレミアムスポンサー向けカスタム統合も可能

**お問い合わせ**: ads@gpu-market-board.com または [Issueを作成](https://github.com/daiokawa/gpu-market-board/issues/new?title=スポンサーシップのお問い合わせ)

---

## ✨ 機能

- **リアルタイム市場データ**: GPU の需給をほぼリアルタイムで追跡
- **多言語対応**: 英語と日本語のインターフェース
- **インタラクティブなダッシュボード**: GPU カードをクリックして詳細情報を表示
- **需給バランス**: 市場状況を示す視覚的インジケーター
- **価格履歴**: インタラクティブチャート付き価格トレンド
- **レスポンシブデザイン**: デスクトップ、タブレット、モバイルで完璧に動作
- **ダークモード対応**: システム設定に基づく自動テーマ切り替え

## 🚀 デモ

ライブデモ: [gpu.ahillchan.com](https://gpu.ahillchan.com)

## 🛠️ 技術スタック

- **フレームワーク**: Next.js 15.5 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **チャート**: Recharts
- **アニメーション**: Framer Motion
- **アイコン**: Lucide React

## 📦 インストール

1. リポジトリをクローン:
```bash
git clone https://github.com/daiokawa/gpu-market-board.git
cd gpu-market-board
```

2. 依存関係をインストール:
```bash
npm install
```

3. 開発サーバーを起動:
```bash
npm run dev
```

4. ブラウザで [http://localhost:3000](http://localhost:3000) を開く

## 👤 作者

**Koichi Okawa**

- GitHub: [@daiokawa](https://github.com/daiokawa)
- X (Twitter): [@daiokawa](https://x.com/daiokawa)

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下でライセンスされています。
