import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  experimental: {
    turbopack: {
      // Just specify the current directory
      root: "C:/Users/Mihika/OneDrive/Desktop/Internship/Dr. T R Nisar Ahamed",
    }
  }
};

export default nextConfig;
