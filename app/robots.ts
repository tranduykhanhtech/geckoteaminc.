import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gecko.io.vn';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/quan-tri-gecko-leads/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
