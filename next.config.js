/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: async () => {
        return [
            {
                source: '/',
                destination: '/meadows',
                permanent: true,
            },
        ]
    }
}

module.exports = nextConfig
