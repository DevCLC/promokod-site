import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import BottomNav from '../../components/BottomNav'
import ProductCard from '../../components/ProductCard'
import products from '../../data/products'

const SITE_URL = 'https://devclc.github.io/promokod-site'
const WA = '77001234567'

export async function getStaticPaths() {
  return {
    paths: products.map((p) => ({ params: { id: String(p.id) } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const product = products.find((p) => p.id === Number(params.id))
  if (!product) return { notFound: true }
  return { props: { product } }
}

export default function ProductPage({ product }) {
  const [copied, setCopied] = useState(false)

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(products.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, 4)

  const canonicalUrl = `${SITE_URL}/product/${product.id}`

  // JSON-LD Product schema — key for SEO
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: { '@type': 'Brand', name: 'Sento' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'KZT',
      price: product.price,
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'Sento' },
      url: product.kaspiUrl,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '24',
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Каталог', item: `${SITE_URL}/catalog` },
      { '@type': 'ListItem', position: 3, name: product.name, item: canonicalUrl },
    ],
  }

  return (
    <>
      <Head>
        <title>{product.metaTitle || `${product.name} — купить в Казахстане | Sento`}</title>
        <meta name="description" content={product.metaDesc || product.description.slice(0, 160)} />
        <meta name="keywords" content={`${product.name}, купить ${product.shortName}, ${product.category === 'home' ? 'умный дом Казахстан' : 'авто гаджеты Казахстан'}, kaspi`} />
        <link rel="canonical" href={canonicalUrl} />
        {/* OG */}
        <meta property="og:type" content="product" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={product.metaTitle || product.name} />
        <meta property="og:description" content={product.metaDesc || product.description.slice(0, 160)} />
        <meta property="og:image" content={product.image} />
        <meta property="product:price:amount" content={String(product.price)} />
        <meta property="product:price:currency" content="KZT" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.name} />
        <meta name="twitter:description" content={product.metaDesc || product.description.slice(0, 160)} />
        <meta name="twitter:image" content={product.image} />
        {/* Schemas */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      <Header />

      <main className="min-h-screen bg-bg pt-14 pb-24 md:pb-0">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 md:py-12">
          {/* Breadcrumb */}
          <nav aria-label="Навигация по сайту" className="flex items-center gap-2 text-xs text-secondary mb-8">
            <Link href="/" className="hover:text-brand transition-colors">Главная</Link>
            <span>/</span>
            <Link href="/catalog" className="hover:text-brand transition-colors">Каталог</Link>
            <span>/</span>
            <span className="text-apple-black line-clamp-1">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-24">
            {/* Media */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-apple overflow-hidden bg-surface shadow-card">
                {product.badge && (
                  <span className={`absolute top-4 left-4 z-10 text-[11px] font-semibold px-3 py-1.5 rounded-full ${
                    product.badge === 'Хит' ? 'bg-brand text-white' : 'bg-accent text-brand'
                  }`}>
                    {product.badge}
                  </span>
                )}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  unoptimized
                  className="object-cover"
                  priority
                />
              </div>
              <div className="rounded-apple overflow-hidden bg-surface shadow-card aspect-video">
                <video
                  src={product.video}
                  autoPlay loop muted playsInline
                  className="w-full h-full object-cover"
                  aria-label={`Видео товара: ${product.name}`}
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-secondary mb-3">
                {product.category === 'home' ? 'Умный дом' : 'Авто'}
              </p>

              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-apple-black leading-tight mb-2">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <svg key={s} className={`w-4 h-4 ${s <= 5 ? 'text-yellow-400' : 'text-border'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-secondary">4.8 · 24 отзыва</span>
              </div>

              <p className="font-serif text-4xl md:text-5xl font-bold text-apple-black mb-6">
                {product.price.toLocaleString('ru-RU')} <span className="text-2xl font-normal">₸</span>
              </p>

              <p className="text-secondary leading-relaxed text-sm md:text-base mb-6">
                {product.description}
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-2.5 mb-8">
                {product.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 bg-bg rounded-apple-sm px-3 py-2.5">
                    <svg className="w-4 h-4 text-brand flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs font-medium text-apple-black">{f}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <a
                  href={product.kaspiUrl}
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn-kaspi flex-1 text-base py-4"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Купить на Kaspi.kz
                </a>
                <a
                  href={`https://wa.me/${WA}?text=${encodeURIComponent(`Хочу узнать подробнее о товаре: ${product.name}`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn-wa flex-1 text-base py-4"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Спросить в WhatsApp
                </a>
              </div>

              <p className="text-xs text-secondary mt-4 text-center">
                Покупка и доставка через Kaspi.kz — безопасно и удобно
              </p>
            </div>
          </div>

          {/* Related */}
          <section aria-label="Похожие товары">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-apple-black mb-8">Похожие товары</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </>
  )
}
