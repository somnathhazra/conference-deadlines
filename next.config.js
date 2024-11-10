/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/conference-deadlines',
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
