import { SITE_URL, ROUTES } from "@/lib/site";

export const dynamic = "force-static";

// No lastModified. On a CI build every file is freshly checked out, so a
// filesystem timestamp would report "changed today" for every page on every
// deploy -- a value that is wrong more often than it is right. Omitting it is
// permitted by the sitemap spec and honest; search engines discount timestamps
// they can tell are generated anyway.
export default function sitemap() {
  return ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
