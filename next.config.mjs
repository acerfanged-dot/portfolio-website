/** @type {import('next').NextConfig} */
const nextConfig = {
  // Shape A per the blueprint's own stack decision -- fully static, no
  // server. `output: "export"` produces plain HTML/CSS/JS files; that mode
  // can't run Next's server-side image optimizer, so images are served
  // as-is instead (they're already reasonably sized screenshots).
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
