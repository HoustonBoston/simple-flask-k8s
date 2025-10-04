import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('http://localhost:8080/**'), 
      new URL('http://100.113.83.9:8080/**'), 
      new URL('https://roshan-dell.taile3e522.ts.net:8443/**')],
  }

};

export default nextConfig;
