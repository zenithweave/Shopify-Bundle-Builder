# 🎯 Zenith Bundle Builder - Development Commands

## 🚀 Quick Start Commands

```bash
# Install all dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## 🛠 Development Commands

```bash
# Type checking
npm run typecheck

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

## 🗄 Database Commands

```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Push database schema (for development)
npm run db:push

# Open Prisma Studio (database GUI)
npm run db:studio
```

## 🛍 Shopify Commands

```bash
# Start Shopify app in development
npm run shopify:dev

# Deploy Shopify app
npm run shopify:deploy
```

## 📊 Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
# Add your Shopify API keys
# Add Railway database URL
# Add security tokens
```

## 🔧 Common Development Tasks

### Adding New Database Fields
1. Edit `prisma/schema.prisma`
2. Run `npm run db:migrate`
3. Update TypeScript types

### Creating New API Routes
1. Add route file in `app/routes/`
2. Export loader/action functions
3. Test with `npm run dev`

### Adding New Components
1. Create component in `app/components/`
2. Export as default
3. Import in routes

### Updating Styles
1. Edit CSS in `app/styles/`
2. Or use Tailwind classes
3. Test in browser

## 🐛 Troubleshooting

### Database Issues
```bash
# Reset database
npx prisma migrate reset

# View database
npm run db:studio
```

### Build Issues
```bash
# Clear cache
rm -rf .cache node_modules/.cache

# Reinstall dependencies
npm install
```

### Shopify API Issues
```bash
# Check API credentials
# Verify scopes
# Test webhooks
```

## 📱 Testing

### Local Testing
- Visit `http://localhost:3000`
- Test bundle creation
- Verify discount calculations

### Shopify Testing
- Install app on development store
- Test in Shopify admin
- Verify customer interface

### Production Testing
- Deploy to Railway
- Test live functionality
- Monitor performance

## 🚀 Deployment

### Automatic Deployment
- Push to `main` branch
- GitHub Actions run tests
- Railway deploys automatically

### Manual Deployment
```bash
# Build project
npm run build

# Deploy to Railway
# Railway will auto-deploy from GitHub
```

## 📞 Support

For help during development:
- **Email**: hi@zenithweave.com
- **Phone**: +201011400020
- **Website**: zenithweave.com

---

*Happy coding! 🎉*