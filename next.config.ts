// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;




import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,

  // Disable source maps
  webpack(config) {
    config.devtool = false;
    return config;
  },

  // Add empty turbopack config to silence the error
  turbopack: {},
};

export default nextConfig;
