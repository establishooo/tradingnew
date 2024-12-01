# Trading Simulator (منصة التداول التعليمية)

A comprehensive educational trading platform built with React and TypeScript, designed to provide a risk-free environment for learning stock trading.

## Features

### User Management
- Secure registration and authentication system
- User profiles with trading statistics
- Initial virtual balance of $100,000 for new users
- Role-based access control (Regular Users & Administrators)

### Trading Features
- Real-time stock quotes from Polygon.io API
- Interactive charts with technical indicators
- Multiple order types (Market, Limit, Stop Loss)
- Virtual portfolio with real-time P&L tracking
- Detailed trade history and analytics

### Admin Dashboard
- Complete user management (Add, Edit, Suspend, Delete)
- Real-time trading activity monitoring
- Virtual balance management
- Educational content management
- Detailed performance reports

## Technology Stack

### Frontend
- React 18
- TypeScript
- TailwindCSS for styling
- Jotai for state management
- React Query for data fetching
- React Router for navigation
- Lucide React for icons
- Lightweight Charts for trading charts
- React Hook Form for form handling
- Zod for validation

### APIs
- Polygon.io for real-time market data

### Security
- JWT-based authentication
- Bcrypt for password hashing
- Protected routes
- Input validation and sanitization

## Project Structure

```
src/
├── components/          # React components
│   ├── admin/          # Admin dashboard components
│   ├── auth/           # Authentication components
│   ├── dashboard/      # User dashboard components
│   ├── trading/        # Trading components
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── providers/          # Context providers
├── services/          # API and service functions
├── store/             # Jotai atoms and store
├── types/             # TypeScript types
└── utils/             # Utility functions
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/trading-simulator.git
cd trading-simulator
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your Polygon.io API key:
```
VITE_POLYGON_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

## Features in Detail

### Authentication System
- Email/password registration and login
- Password strength requirements
- JWT-based session management
- Remember me functionality
- Password reset capability

### Trading Platform
- Real-time stock quotes
- Multiple chart types (Candlestick, Line, Area)
- Order types: Market, Limit, Stop Loss
- Position tracking
- P&L calculations
- Trade history

### User Dashboard
- Account summary
- Portfolio overview
- Recent trades
- Performance metrics
- Market overview

### Admin Features
- User management
- System settings
- Activity monitoring
- Content management
- Performance reports

## Security Measures

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Input validation with Zod
- XSS protection
- CSRF protection
- Rate limiting

## Data Flow

1. **Market Data**
   - Real-time quotes from Polygon.io
   - WebSocket connections for live updates
   - Fallback to REST API
   - Local caching with React Query

2. **User Data**
   - JWT-based authentication
   - Local storage for persistence
   - Jotai atoms for state management

3. **Trading Flow**
   - Order validation
   - Virtual balance checks
   - Position updates
   - Trade history tracking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Polygon.io](https://polygon.io) for market data
- [TradingView](https://www.tradingview.com) for chart inspiration
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Lucide](https://lucide.dev) for icons