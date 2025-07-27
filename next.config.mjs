"use client";

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'freshcartdev.s3.eu-north-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
