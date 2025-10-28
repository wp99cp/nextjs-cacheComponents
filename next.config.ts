import type {NextConfig} from "next";

const nextConfig: NextConfig = {

    cacheComponents: true,
    cacheMaxMemorySize: 0, // disable default in-memory caching

    cacheHandlers: {
        default: require.resolve('./src/cache-handlers/default.js'),
    }

};

export default nextConfig;
