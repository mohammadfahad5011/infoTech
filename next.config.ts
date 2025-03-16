const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://info-tech-rho.vercel.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;
