// Build-time SEO: JSON-LD structured data and sitemap.xml, generated from src/data/content.ts
// so they never drift from what the page shows.
import type { Plugin } from 'vite'
import { profile, projects, sideProjects, site, speaking, type Mention, type SideProject } from './src/data/content.ts'

const personId = `${site}#person`

function mention(m: Mention) {
  if (m.kind === 'video') {
    return {
      '@type': 'VideoObject',
      name: m.title,
      description: m.title,
      url: m.href,
      uploadDate: m.date,
      thumbnailUrl: m.thumbnail,
      publisher: { '@type': 'Organization', name: 'Walt Disney Imagineering' },
    }
  }
  return { '@type': 'NewsArticle', headline: m.title, url: m.href, datePublished: m.date }
}

function sideProjectPress(s: SideProject) {
  return { '@type': 'NewsArticle', headline: s.press!.headline, url: s.href, datePublished: s.press!.date }
}

function structuredData() {
  const person = {
    '@type': 'Person',
    '@id': personId,
    name: profile.name,
    url: site,
    image: new URL(profile.photo, site).href,
    jobTitle: profile.title,
    worksFor: { '@type': 'Organization', name: profile.org },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Lehigh University' },
    homeLocation: { '@type': 'Place', name: profile.location },
    email: `mailto:${profile.email}`,
    sameAs: [profile.linkedin, profile.github],
    subjectOf: [
      ...speaking.filter((s) => s.kind !== 'talk').map(mention),
      ...sideProjects.filter((s) => s.press).map(sideProjectPress),
    ],
  }

  const attractions = projects.map((p) => ({
    '@type': 'CreativeWork',
    name: p.name,
    description: p.summary,
    dateCreated: p.year,
    locationCreated: { '@type': 'Place', name: p.where },
    keywords: p.tags.join(', '),
    contributor: { '@id': personId },
    ...(p.links && { url: p.links[0].href }),
  }))

  const repos = sideProjects.map((s) => {
    const base = { name: s.name, description: s.blurb, author: { '@id': personId } }
    if (s.press) return { '@type': 'CreativeWork', ...base, subjectOf: sideProjectPress(s) }
    if (s.href) return { '@type': 'SoftwareSourceCode', ...base, codeRepository: s.href }
    return { '@type': 'CreativeWork', ...base }
  })

  const page = {
    '@type': 'ProfilePage',
    '@id': site,
    url: site,
    name: `${profile.name} | ${profile.title}`,
    mainEntity: { '@id': personId },
  }

  return { '@context': 'https://schema.org', '@graph': [page, person, ...attractions, ...repos] }
}

export function seo(): Plugin {
  return {
    name: 'site-seo',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        for (const [file, chunk] of Object.entries(ctx.bundle ?? {})) {
          if (!file.endsWith('.css') || chunk.type !== 'asset') continue
          const link = new RegExp(`<link rel="stylesheet"[^>]*href="/${file}"[^>]*>`)
          if (!link.test(html)) continue
          html = html.replace(link, () => `<style>${chunk.source}</style>`)
          delete ctx.bundle![file]
        }
        const jsonLd = {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: JSON.stringify(structuredData()),
          injectTo: 'head' as const,
        }
        return { html, tags: [jsonLd] }
      },
    },
    generateBundle() {
      if (this.environment.name !== 'client') return
      const today = new Date().toISOString().slice(0, 10)
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${site}</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`,
      })
    },
  }
}
