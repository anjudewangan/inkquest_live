/** @type {import('next').NextConfig} */
const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.wsupercars.com",
      },
      {
        protocol: "https",
        hostname: "assets.bwbx.io",
      },
      {
        protocol: "https",
        hostname: "www.hindustantimes.com",
      },
      {
        protocol: "https",
        hostname: "static.toiimage.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "admin.inkquest.in",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1:9000",
      },
    ],
    minimumCacheTTL: 315360000,
  },
  headers: () => [
    {
      source: "/feed",
      headers: [
        {
          key: "Cache-Control",
          value: "no-store",
        },
      ],
    },
    {
      source: "/_next/image",
      headers: [
        {
          key: "Cache-Control",
          value: "immutable",
        },
      ],
    },
  ],
};

module.exports = nextConfig;
