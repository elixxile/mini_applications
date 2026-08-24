# PLUGIFY Storefront

Production-ready ecommerce storefront foundation for PLUGIFY.

## Included

- Premium responsive yellow/black PLUGIFY design
- Home page with category discovery, hero, product features and trust sections
- Shop catalogue with search, category filters and sorting
- Product detail pages
- Persistent cart using localStorage
- Cart drawer and full cart page
- Checkout UI and order confirmation prototype
- Support, account, privacy and terms routes
- Mobile navigation and responsive layouts
- PLUGIFY brand assets
- Render static-site configuration and SPA rewrite

## Local development

```bash
npm install
npm run dev
```

## Render deployment

Create a new Render Static Site from the GitHub repository.

- Build command: `npm install && npm run build`
- Publish directory: `dist`

The included `render.yaml` and `public/_redirects` preserve client-side routes.

## Production phase 2

The current catalogue and prices are demo data. Before accepting real orders, connect:

1. Supabase/Postgres for products, variants, inventory, customers and orders
2. PLUGIFY admin portal for catalogue and order management
3. Paystack/Hubtel payment processing
4. Delivery zones/rates and order tracking
5. Product image storage and final policy/support information
