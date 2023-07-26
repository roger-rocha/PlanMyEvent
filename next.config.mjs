/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  experimental: {
    appDir: true,
    serverActions: true,
    serverComponentsExternalPackages: ["@prisma/client", "@tremor/react"],
  },
}
export default nextConfig
