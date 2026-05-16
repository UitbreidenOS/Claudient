import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),  // Pin to web/ — prevents scanning the entire repo
  },
};

export default nextConfig;
