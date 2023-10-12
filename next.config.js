/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { serverActions: true },
  async headers() {
    return [
      {
        source: "/(.*)", // Apply these headers to all routes
        headers: [
          /* {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self'; style-src 'self'",
          }, */
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Referrer-Policy",
            value: "no-referrer",
          },
          {
            key: "Feature-Policy",
            value: "geolocation 'none'; camera 'none'; microphone 'none'",
          },
          /* {
            key: "Access-Control-Allow-Origin",
            value: "https://trusted-domain.com",
          }, */
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          /* {
            key: "Expect-CT",
            value: 'max-age=0, report-uri="https://example.com/report"',
          }, */
        ],
      },
    ];
  },
};

module.exports = nextConfig;
