// scripts/generate-sitemap.js
const path = require('path')
const fs = require('fs')

const products = require('../data/products.js')
const list = Array.isArray(products) ? products : products.default

const SITE = 'https://devclc.github.io/promokod-site'
const today = new Date().toISOString().split('T')[0]

const urls = [
  { loc: SITE + '/', priority: '1.0', changefreq: 'weekly' },
  { loc: SITE + '/catalog/', priority: '0.8', changefreq: 'monthly' },
  { loc: SITE + '/category/home/', priority: '0.8', changefreq: 'monthly' },
  { loc: SITE + '/category/auto/', priority: '0.8', changefreq: 'monthly' },
  ...list.map((p) => ({
    loc: `${SITE}/product/${p.slug || p.id}/`,
    priority: '0.9',
    changefreq: 'monthly',
  })),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
  )
  .join('\n')}
</urlset>`

const out = path.join(__dirname, '../public/sitemap.xml')
fs.writeFileSync(out, xml, 'utf8')
console.log(`Sitemap generated: ${urls.length} URLs → ${out}`)
