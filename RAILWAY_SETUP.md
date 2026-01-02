# 🚀 Railway Environment Setup Instructions

## 🔑 Required Environment Variables

Add these to your Railway project settings:

### Shopify Configuration
```
SHOPIFY_API_KEY=your_api_key_here
SHOPIFY_API_SECRET=your_api_secret_here
SHOPIFY_SCOPES=read_products,write_products,read_orders,write_discounts,read_inventory
SHOPIFY_WEBHOOK_URL=https://zenith-bundle-builder.up.railway.app/webhooks
```

### Application Configuration
```
NODE_ENV=production
SESSION_SECRET=your_session_secret_here
JWT_SECRET=your_jwt_secret_here
PORT=3000
```

### Branding
```
AGENCY_NAME=Zenith Weave
AUTHOR_NAME=Mostafa Magdy
CONTACT_EMAIL=hi@zenithweave.com
CONTACT_PHONE=+201011400020
WEBSITE_URL=zenithweave.com
```

### Database
- Railway will automatically provide `DATABASE_URL` when you add PostgreSQL service

## 📋 Setup Steps

1. **Go to Railway.app** → Your Project → Settings
2. **Add Environment Variables** from list above
3. **Add PostgreSQL Service** → Railway auto-configures `DATABASE_URL`
4. **Deploy** → GitHub Actions will handle deployment

## 🌐 Shopify App URL Configuration

In Shopify Partners Dashboard:
- **App URL**: `https://zenith-bundle-builder.up.railway.app`
- **Redirection URL**: `https://zenith-bundle-builder.up.railway.app/api/auth/callback`
- **Webhook URL**: `https://zenith-bundle-builder.up.railway.app/api/webhooks`

## ✅ Health Check
After deployment: `https://zenith-bundle-builder.up.railway.app/health`

## 📞 Support
- **Email**: hi@zenithweave.com
- **Phone**: +201011400020
- **Website**: zenithweave.com