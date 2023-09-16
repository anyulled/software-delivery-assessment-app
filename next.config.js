/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'avatar.vercel.sh',
      'www.devbcn.com'
    ]
  },
  experimental: {
    serverComponentsExternalPackages: ['@tremor/react'],
    serverActions: true
  }
};

module.exports = nextConfig;
