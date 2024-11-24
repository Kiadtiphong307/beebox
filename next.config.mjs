/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'tailwindui.com',
          pathname: '/plus/img/**',
        },
      ],
      // Make sure there's no 'domains' property here
    },
  };
export default nextConfig;
