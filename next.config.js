/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'cdn.weatherapi.com',
        
          },
        ],
      },
};
require("dotenv").config();

module.exports = nextConfig;
