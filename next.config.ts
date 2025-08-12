// next.config.ts
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  basePath: isProd ? "/hieroglyphics-converter" : undefined,
  assetPrefix: isProd ? "/hieroglyphics-converter/" : undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true }
};

export default nextConfig;

// const nextConfig = {
//   output: 'export',
//   trailingSlash: true,
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     unoptimized: true
//   }
// }

// export default nextConfig

