/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: true,
    turbo: {
      rules: {
        '*.mdx': ['@mdx-js/loader'],
      },
    },
  },
  // Configure images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'csmuseum.b-cdn.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
