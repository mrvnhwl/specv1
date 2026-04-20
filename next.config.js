/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.cloudflare.steamstatic.com' },
      { protocol: 'https', hostname: 'shared.akamai.steamstatic.com' },
      { protocol: 'https', hostname: 'images.igdb.com' },

      // ADD THESE (missing from your mock data)
      { protocol: 'https', hostname: 'fastcdn.hoyoverse.com' },
      { protocol: 'https', hostname: 'static0.thegamerimages.com' },
      { protocol: 'https', hostname: 'ddragon.leagueoflegends.com' },
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: 'static2.cbrimages.com' }
    ]
  }
};

module.exports = nextConfig;