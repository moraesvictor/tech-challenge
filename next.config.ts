import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  ...(process.env.VERCEL ? {} : { output: "standalone" }),
  
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      { protocol: "https", hostname: "cdn.fakercloud.com" },
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
  
  compress: true,
  poweredByHeader: false,
  
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      try {
        const { ModuleFederationPlugin } = require('@module-federation/enhanced');
        
        config.plugins.push(
          new ModuleFederationPlugin({
            name: 'shell',
            filename: 'static/chunks/remoteEntry.js',
            remotes: {
              dashboard: process.env.NEXT_PUBLIC_DASHBOARD_REMOTE || 'dashboard@http://localhost:3001/_next/static/chunks/remoteEntry.js',
              transactions: process.env.NEXT_PUBLIC_TRANSACTIONS_REMOTE || 'transactions@http://localhost:3002/_next/static/chunks/remoteEntry.js',
              transfers: process.env.NEXT_PUBLIC_TRANSFERS_REMOTE || 'transfers@http://localhost:3003/_next/static/chunks/remoteEntry.js',
              investments: process.env.NEXT_PUBLIC_INVESTMENTS_REMOTE || 'investments@http://localhost:3004/_next/static/chunks/remoteEntry.js',
            },
            exposes: {
              './DashboardContainer': './src/modules/dashboard/dashboard-container',
              './TransactionsContainer': './src/modules/transactions/transactions-container',
              './TransfersContainer': './src/modules/transfers/transfers-container',
              './InvestmentsContainer': './src/modules/investments/investmets-container',
            },
            shared: {
              react: {
                singleton: true,
                requiredVersion: '^19.1.0',
                eager: false,
              },
              'react-dom': {
                singleton: true,
                requiredVersion: '^19.1.0',
                eager: false,
              },
              'next': {
                singleton: true,
                eager: false,
              },
              'recoil': {
                singleton: true,
                eager: false,
              },
            },
          })
        );
      } catch (error) {
        console.warn('Module Federation plugin not available, using fallback:', error);
      }
    }
    
    return config;
  },
  
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
