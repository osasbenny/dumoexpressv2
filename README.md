# DumoExpress - Fast & Reliable Courier Services in Malaysia

![DumoExpress Logo](client/public/logo.png)

A professional, responsive courier service website for DumoExpress.com, a Malaysia-based delivery company specializing in express parcel delivery and tracking.

## Features

### Core Pages
- **Homepage** - Hero section with tagline, quick tracking, and service highlights
- **About Us** - Company overview, mission, vision, and team
- **Services** - Same-Day, Next-Day, Scheduled, and Bulk Shipment options
- **Tracking** - Real-time parcel tracking with status updates
- **Pricing** - Transparent pricing tables by weight and service tier
- **Contact** - Inquiry form with company contact information
- **Booking** - Multi-step booking form for delivery requests

### Technical Features
- Mobile-first responsive design
- Malaysia-themed color palette (blue, yellow, gold)
- Real-time parcel tracking system
- tRPC API with TypeScript end-to-end type safety
- MySQL database with Drizzle ORM
- Session-based authentication
- Owner notifications for new bookings/inquiries

## Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS 4, Wouter
- **Backend:** Express 4, tRPC 11, Node.js
- **Database:** MySQL/TiDB with Drizzle ORM
- **Build:** Vite 7, ESBuild
- **UI Components:** Radix UI, Lucide Icons

## Project Structure

```
dumoexpress-website/
├── client/                 # Frontend React application
│   ├── public/            # Static assets (logo, favicon)
│   └── src/
│       ├── components/    # Reusable UI components
│       ├── pages/         # Page components
│       └── lib/           # Utilities and tRPC client
├── server/                # Backend Express/tRPC server
│   ├── routers.ts        # API route definitions
│   └── db.ts             # Database queries
├── drizzle/              # Database schema
├── dist/                 # Production build output
│   └── public/           # Static files for cPanel deployment
└── docs/                 # Documentation
    └── API_SPECIFICATION.md
```

## Deployment

### cPanel Deployment

1. Upload the contents of `dist/public/` to your cPanel public_html directory
2. The `.htaccess` file is included for SPA routing
3. Ensure mod_rewrite is enabled on your Apache server

### Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
```

## API Endpoints

### Public Endpoints
- `tracking.track` - Track parcel by tracking number
- `booking.create` - Create new delivery booking
- `booking.check` - Check booking status
- `contact.submit` - Submit contact inquiry

### Admin Endpoints (Protected)
- `tracking.list` - List all parcels
- `tracking.create` - Create new parcel
- `tracking.updateStatus` - Update parcel status
- `booking.list` - List all bookings
- `booking.updateStatus` - Update booking status
- `contact.list` - List all inquiries

See [API_SPECIFICATION.md](docs/API_SPECIFICATION.md) for detailed documentation.

## Tracking Number Format

- Format: `DE` + 10 alphanumeric characters
- Example: `DE1234567890`

## Parcel Status Flow

```
collected → in-transit → out-for-delivery → delivered
```

## License

MIT License

## Contact

- **Website:** dumoexpress.com
- **Email:** info@dumoexpress.com
- **Phone:** +60 3-1234 5678
- **Address:** Level 15, Menara KL, Jalan Sultan Ismail, 50250 Kuala Lumpur, Malaysia

---

Built with ❤️ for Malaysia
