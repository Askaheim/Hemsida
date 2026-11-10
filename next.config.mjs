/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['lucide-react'],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        pathname: '/**',
      },
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig