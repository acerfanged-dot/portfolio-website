import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// Everything here is meant to be found -- there is no admin surface, no
// staging route, and nothing private. So this allows all crawlers rather than
// carrying a disallow list that would only rot.
export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
