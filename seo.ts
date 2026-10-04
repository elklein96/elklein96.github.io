// Build-time SEO: JSON-LD structured data and sitemap.xml, generated from src/data/content.ts
// so they never drift from what the page shows.
import type { Plugin } from 'vite'
import { profile, projects, sideProjects, site, speaking, type Mention } from './src/data/content.ts'

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
  if (m.kind === 'talk') {
    return { '@type': 'Event', name: m.title, description: m.detail, startDate: m.date, performer: { '@id': personId } }
  }
  return { '@type': 'NewsArticle', headline: m.title, url: m.href, datePublished: m.date }
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
    // Profiles that belong to this person. Press coverage goes in subjectOf, not here.
    sameAs: [profile.linkedin, profile.github],
    subjectOf: speaking.map(mention),
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

  const repos = sideProjects.map((s) =>
    s.href
      ? {
          '@type': 'SoftwareSourceCode',
          name: s.name,
          description: s.blurb,
          codeRepository: s.href,
          author: { '@id': personId },
        }
      : { '@type': 'CreativeWork', name: s.name, description: s.blurb, author: { '@id': personId } },
  )

  const page = {
    '@type': 'ProfilePage',
    '@id': site,
    url: site,
    name: `${profile.name} – ${profile.title}`,
    mainEntity: { '@id': personId },
  }

  return { '@context': 'https://schema.org', '@graph': [page, person, ...attractions, ...repos] }
}

export function seo(): Plugin {
  return {
    name: 'site-seo',
    transformIndexHtml() {
      return [
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: JSON.stringify(structuredData()),
          injectTo: 'head',
        },
      ]
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
