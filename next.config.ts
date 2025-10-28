import type {NextConfig} from "next";

const nextConfig: NextConfig = {

    cacheComponents: true,
    cacheMaxMemorySize: 0, // disable default in-memory caching

    cacheHandlers: {
        default: require.resolve('./src/cache-handlers/default.js'),
    },

    generateBuildId: () => {
        return process.env.GIT_HASH ?? 'no-commit-hash-found'
    },

};

export default nextConfig;
