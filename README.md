# 🎯 Zenith Bundle Builder

A premium Shopify app for creating discounted product bundles with intuitive customer selection and merchant management.

## 🏢 About
**Agency**: Zenith Weave  
**Author**: Mostafa Magdy  
**Contact**: hi@zenithweave.com  
**Phone**: +201011400020  
**Website**: zenithweave.com

## 🚀 Features
- 📦 Create flexible product bundles
- 💰 Dynamic discount calculations
- 📊 Real-time analytics dashboard
- 🎨 Beautiful customer interface
- 📱 Mobile-responsive design
- ⚡ Lightning-fast performance

## 🛠 Tech Stack
- **Backend**: Remix, Node.js, Shopify Admin API
- **Frontend**: React, Shopify Polaris, Tailwind CSS
- **Database**: PostgreSQL (Railway)
- **Deployment**: Railway, GitHub Actions
- **Authentication**: Shopify OAuth

## 📋 Prerequisites
- Node.js 18+
- Shopify Partner account
- Railway account
- GitHub account

## 🚀 Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/zenith-bundle-builder.git
cd zenith-bundle-builder
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your API keys
```

4. **Run database migrations**
```bash
npx prisma migrate dev
```

5. **Start development server**
```bash
npm run dev
```

## 🔧 Configuration

### Shopify App Setup
1. Go to [Shopify Partners](https://partners.shopify.com/)
2. Create new app → Custom app
3. Configure API credentials
4. Set webhook URLs

### Railway Deployment
1. Connect GitHub repository
2. Add PostgreSQL database
3. Configure environment variables
4. Deploy automatically

## 📊 Database Schema

```sql
-- Core bundles table
CREATE TABLE bundles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  discount_type VARCHAR(50) CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value DECIMAL(10,2) NOT NULL,
  min_products INTEGER NOT NULL DEFAULT 1,
  max_products INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🎨 UI Components

### Merchant Dashboard
- Bundle creation wizard
- Product selection interface
- Analytics dashboard
- Settings management

### Customer Interface
- Bundle selection page
- Real-time discount preview
- Mobile-optimized design
- Smooth animations

## 📈 Analytics Features
- Sales performance tracking
- Popular bundle insights
- Revenue impact analysis
- Customer behavior metrics

## 🔒 Security
- Shopify OAuth authentication
- Encrypted API communications
- Secure session management
- GDPR compliant

## 📝 License
MIT License - see LICENSE file for details

## 🤝 Support
For support and inquiries:
- Email: hi@zenithweave.com
- Phone: +201011400020
- Website: zenithweave.com

---
*Crafted with ❤️ by Zenith Weave* ❤️ 
