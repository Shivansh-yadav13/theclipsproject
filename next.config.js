/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    domains: ['img.icons8.com', 'lh3.googleusercontent.com', 'api.producthunt.com']
  }
}

module.exports = nextConfig
