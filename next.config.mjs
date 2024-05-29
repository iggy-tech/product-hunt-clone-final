/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "lh3.googleusercontent.com",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "avatars.githubusercontent.com",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "utfs.io",
          port: "",
          pathname: "/**",
        },
      ],
    },
  };
  
  export default nextConfig;