# 🚀 Zenith Bundle Builder - Setup Guide

## 📋 Prerequisites

Before you begin, make sure you have the following:

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **GitHub Account** - [Create here](https://github.com)
- **Railway Account** - [Create here](https://railway.app)
- **Shopify Partner Account** - [Create here](https://partners.shopify.com)

## 🛠 Step 1: Local Development Setup

### 1.1 Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/zenith-bundle-builder.git
cd zenith-bundle-builder
```

### 1.2 Install Dependencies
```bash
npm install
```

### 1.3 Environment Configuration
```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:
```bash
# Shopify App Configuration
SHOPIFY_API_KEY=your_api_key_here
SHOPIFY_API_SECRET=your_api_secret_here
SHOPIFY_SCOPES=read_products,write_products,read_orders,write_discounts
SHOPIFY_WEBHOOK_URL=https://your-app.railway.app/webhooks

# Database (will be provided by Railway)
DATABASE_URL=postgresql://user:password@host:port/database

# App Configuration
NODE_ENV=development
SESSION_SECRET=your_session_secret_here
JWT_SECRET=your_jwt_secret_here
```

### 1.4 Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) View database in Prisma Studio
npx prisma studio
```

### 1.5 Start Development Server
```bash
npm run dev
```

Your app will be available at `http://localhost:3000`

## 🔧 Step 2: Shopify App Setup

### 2.1 Create Shopify App
1. Go to [Shopify Partners Dashboard](https://partners.shopify.com/)
2. Click "Apps" → "Create app"
3. Choose "Custom app"
4. Fill in app details:
   - **App name**: Zenith Bundle Builder
   - **App URL**: `https://your-app.railway.app`
   - **Allowed redirection URL(s)**: `https://your-app.railway.app/api/auth/callback`

### 2.2 Configure API Access
1. Go to "Configuration" → "API access"
2. Enable Admin API integration
3. Set these API scopes:
   - `read_products`
   - `write_products`
   - `read_orders`
   - `write_discounts`
   - `read_inventory`

### 2.3 Get API Credentials
1. Go to "Configuration" → "API credentials"
2. Copy the **API key** and **API secret key**
3. Add these to your `.env` file

### 2.4 Configure Webhooks
1. Go to "Configuration" → "Webhooks"
2. Add these webhook endpoints:
   - **Order creation**: `https://your-app.railway.app/api/webhooks/order-created`
   - **Product update**: `https://your-app.railway.app/api/webhooks/product-updated`

## 🚀 Step 3: Railway Deployment

### 3.1 Create Railway Project
1. Go to [Railway Dashboard](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Connect your GitHub account
4. Select the `zenith-bundle-builder` repository

### 3.2 Configure Database
1. Click "New Service" → "Add PostgreSQL"
2. Railway will automatically provision a database
3. Copy the `DATABASE_URL` from Railway environment variables
4. Add it to your Railway environment variables

### 3.3 Set Environment Variables
In your Railway project settings, add these environment variables:
```bash
SHOPIFY_API_KEY=your_api_key
SHOPIFY_API_SECRET=your_api_secret
SHOPIFY_SCOPES=read_products,write_products,read_orders,write_discounts
DATABASE_URL=postgresql://user:password@host:port/database
NODE_ENV=production
SESSION_SECRET=your_session_secret
JWT_SECRET=your_jwt_secret
```

### 3.4 Configure Deployment
1. Go to "Settings" → "Deploy"
2. Enable "Automatic deployments"
3. Select the `main` branch
4. Your app will automatically deploy when you push to GitHub

## 🔗 Step 4: GitHub Integration

### 4.1 GitHub Repository Setup
1. Create a new repository on GitHub
2. Push your code:
```bash
git add .
git commit -m "Initial commit: Zenith Bundle Builder"
git push origin main
```

### 4.2 GitHub Actions Setup
The `.github/workflows/deploy.yml` file will automatically:
- Run tests and linting
- Build the application
- Deploy to Railway on successful tests

### 4.3 Configure GitHub Secrets
In your GitHub repository settings, add these secrets:
- `RAILWAY_TOKEN`: Get from Railway account settings
- `SHOPIFY_API_KEY`: Your Shopify API key
- `SHOPIFY_API_SECRET`: Your Shopify API secret

## 🧪 Step 5: Testing

### 5.1 Local Testing
```bash
# Run linting
npm run lint

# Run type checking
npm run typecheck

# Run tests
npm run test
```

### 5.2 Shopify App Testing
1. Install your app on a development store
2. Test bundle creation
3. Test discount application
4. Test customer interface

### 5.3 Production Testing
1. Deploy to Railway
2. Test the live app
3. Verify all functionality works
4. Test webhook endpoints

## 📊 Step 6: Database Management

### 6.1 View Database
```bash
npx prisma studio
```

### 6.2 Reset Database (if needed)
```bash
npx prisma migrate reset
```

### 6.3 Add New Fields
```bash
# Modify prisma/schema.prisma
npx prisma migrate dev --name add_new_field
```

## 🎯 Step 7: App Store Submission

### 7.1 Prepare App Listing
1. Create compelling app description
2. Design app screenshots
3. Create app icon
4. Write privacy policy

### 7.2 Submit for Review
1. Go to Shopify Partners Dashboard
2. Select your app
3. Click "Submit for review"
4. Wait for Shopify approval

## 🔧 Troubleshooting

### Common Issues

**Database Connection Error**
- Check `DATABASE_URL` in environment variables
- Ensure Railway database is running

**Shopify API Error**
- Verify API credentials
- Check API scopes are correct
- Ensure webhook URLs are accessible

**Build Failure**
- Check for syntax errors
- Verify all dependencies are installed
- Check GitHub Actions logs

**Deployment Issues**
- Check Railway logs
- Verify environment variables
- Ensure build process completes

### Getting Help

For support:
- **Email**: hi@zenithweave.com
- **Phone**: +201011400020
- **Website**: zenithweave.com

## 🎉 You're Ready!

Your Zenith Bundle Builder app is now set up and ready to use! 

**Next Steps:**
1. Create your first bundle
2. Test the customer interface
3. Monitor analytics
4. Scale your business

---

*Built with ❤️ by Zenith Weave*