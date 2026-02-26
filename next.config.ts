import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    output: 'export',      // 关键：导出为静态资源
    images: {
        unoptimized: true,   // 静态导出必须禁用 Next.js 的图片优化功能
    },
};

export default nextConfig;
