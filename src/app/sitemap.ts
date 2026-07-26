import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rahullo.online";

  // Static routes
  const staticRoutes = ["", "/resume", "/blog", "/admin/resume"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Mock list of blog slugs for mapping in sitemap
  const blogSlugs = [
    "scaling-nlp-pipelines",
    "secure-auth-django-pbkdf2",
    "federated-learning-healthcare-privacy",
    "microservices-design-patterns",
    "why-we-shifted-to-nextjs",
  ];

  const blogRoutes = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
