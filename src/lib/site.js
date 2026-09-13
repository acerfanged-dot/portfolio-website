// One place for the deployment URL. layout.js's metadataBase, sitemap.js and
// robots.js all read it from here, so changing domains is a single edit rather
// than three that can silently drift apart -- a wrong value here breaks social
// previews and search indexing without breaking the build.
export const SITE_URL = "https://acerfanged-portfolio.vercel.app";

// Every route on the site. Add new pages here when they're created; nothing
// discovers them automatically under static export.
export const ROUTES = [
  { path: "/", priority: 1.0 },
  { path: "/how-i-work", priority: 0.9 },
  { path: "/resume", priority: 0.9 },
  { path: "/case-studies/peppool", priority: 0.8 },
  { path: "/case-studies/yrt", priority: 0.8 },
  { path: "/case-studies/tios-bandidos", priority: 0.8 },
  { path: "/case-studies/gardening-blog", priority: 0.7 },
];
