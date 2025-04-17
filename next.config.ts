import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // next.config.js
  webpack: (config: { module: { rules: { test: RegExp; use: { loader: string; options: { name: string; publicPath: string; outputPath: string; }; }; }[]; }; }) => {
    config.module.rules.push({
      test: /\.(mp3)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: '/_next/static/sounds/',
          outputPath: 'static/sounds/',
        },
      },
    });
    return config;
  },

};

export default nextConfig;
