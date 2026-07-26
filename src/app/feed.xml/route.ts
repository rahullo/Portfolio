import { NextResponse } from "next/server";
import { getBlogPosts } from "@/lib/blog";

export async function GET() {
  const posts = getBlogPosts();
  const baseUrl = "https://rahullo.online";

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Rahul Lohra — Blog</title>
  <link>${baseUrl}/blog</link>
  <description>Latest insights on AI Engineering, Backend systems, Python, and Machine Learning.</description>
  <language>en-us</language>
  <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
  ${posts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`
    )
    .join("")}
</channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}

function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}
