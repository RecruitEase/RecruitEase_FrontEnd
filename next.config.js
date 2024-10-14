/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.alias.canvas = false;

        return config;
    },
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};


module.exports = nextConfig;
  