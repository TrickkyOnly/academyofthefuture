const isStaticExport = process.env.STATIC_EXPORT === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isStaticExport ? 'export' : undefined,
  trailingSlash: isStaticExport,
  basePath: isStaticExport ? basePath : '',
  assetPrefix: isStaticExport && basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: isStaticExport,
    remotePatterns: [{ protocol: 'https', hostname: '**' }]
  }
};

export default nextConfig;
