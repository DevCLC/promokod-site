// Category page: /category/home and /category/auto
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import BottomNav from '../../components/BottomNav'
import ProductCard from '../../components/ProductCard'
import products from '../../data/products'

const BASE = 'https://devclc.github.io/promokod-site'

const CATEGORY_META = {
  home: {
    title: 'Умный дом — гаджеты для умного дома в Казахстане | Sento Life',
    description: 'Лучшие устройства для умного дома: лампы, розетки, замки, датчики, роботы-пылесосы. Купить в Казахстане с доставкой на Kaspi.kz. Умный дом под ключ.',
    h1: 'Умный дом — гаджеты для умного дома',
    name: 'Умный дом',
    slug: 'home',
    seoText: `Создайте умный дом с Sento Life — широкий выбор устройств для автоматизации вашего жилья в Казахстане. Умные лампы с голосовым управлением, Wi-Fi розетки с таймером и счётчиком энергии, видеодомофоны, умные замки с отпечатком пальца и роботы-пылесосы с навигацией LiDAR.\n\nВсе устройства умного дома Sento совместимы с Google Home, Amazon Alexa и Apple HomeKit — управляйте домом голосом или со смартфона. Настройте сценарии автоматизации: свет включается при входе, замок открывается по отпечатку пальца, пылесос убирает по расписанию.\n\nПокупайте умные устройства для дома в Казахстане с удобной доставкой через Kaspi.kz. Широкий ассортимент, гарантия, быстрая доставка по Алматы, Астане и всему Казахстану.`,
    kaspiSearch: 'https://kaspi.kz/shop/search/?q=умный+дом+гаджеты&c=750000000',
  },
  auto: {
    title: 'Умные гаджеты для авто в Казахстане — купить на Kaspi | Sento Life',
    description: 'Лучшие автогаджеты: держатели с зарядкой 15W, зеркала-регистраторы с GPS, очистители воздуха HEPA. Купить в Казахстане на Kaspi.kz. Доставка по всему Казахстану.',
    h1: 'Гаджеты для авто — умные устройства',
    name: 'Авто',
    slug: 'auto',
    seoText: `Оснастите автомобиль умными гаджетами от Sento Life. Автодержатели с беспроводной зарядкой 15W Qi, зеркала-регистраторы 1080p с камерой заднего вида и GPS-трекингом, автомобильные очистители воздуха с HEPA-фильтром и ионизатором.\n\nАвтогаджеты Sento делают езду комфортнее и безопаснее: быстрая зарядка телефона без проводов, запись дороги в высоком качестве, чистый воздух в салоне с индикатором AQI. Современный дизайн, простая установка и высокое качество сборки.\n\nПокупайте умные автогаджеты в Казахстане с доставкой через Kaspi.kz. Доступно в Алматы, Астане, Шымкенте и по всему Казахстану. Гарантия качества от Sento Life.`,
    kaspiSearch: 'https://kaspi.kz/shop/search/?q=умные+гаджеты+авто&c=750000000',
  },
}

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('revealed'); obs.disconnect() } },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function RevealSection({ children, className = '' }) {
  const ref = useReveal()
  return <div ref={ref} className={`reveal-on-scroll ${className}`}>{children}</div>
}

export default function CategoryPage({ category, categoryProducts }) {
  const meta = CATEGORY_META[category.slug]
  const canonical = `${BASE}/category/${category.slug}/`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: meta.h1,
    description: meta.description,
    url: canonical,
    publisher: {
      '@type': 'Organization',
      name: 'Sento Life',
      url: BASE,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Главная', item: BASE + '/' },
        { '@type': 'ListItem', position: 2, name: 'Каталог', item: BASE + '/catalog/' },
        { '@type': 'ListItem', position: 3, name: category.name, item: canonical },
      ],
    },
  }

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <Header />

      <main className="min-h-screen bg-bg pt-14 md:pt-16">
        {/* Hero */}
        <section className="bg-primary py-14 md:py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 font-ui text-xs text-white/40">
                <li><Link href="/" className="hover:text-white/70 transition-colors">Главная</Link></li>
                <li className="text-white/20">/</li>
                <li><Link href="/catalog" className="hover:text-white/70 transition-colors">Каталог</Link></li>
                <li className="text-white/20">/</li>
                <li className="text-white/60">{category.name}</li>
              </ol>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="font-ui text-[11px] font-semibold uppercase tracking-widest text-accent/70 mb-3">
                  Категория
                </p>
                <h1 className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight">
                  {meta.h1}
                </h1>
                <p className="font-ui text-sm text-white/55 mt-3 max-w-lg">
                  {categoryProducts.length} товаров · Казахстан · Быстрая доставка Kaspi.kz
                </p>
              </div>
              <a
                href={meta.kaspiSearch}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-kaspi font-ui text-sm px-6 py-3 self-start md:self-auto flex-shrink-0"
              >
                Все на Kaspi.kz →
              </a>
            </div>
          </div>
        </section>

        {/* Products grid */}
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <RevealSection>
              {categoryProducts.length > 0 ? (
                <div className="bento-grid">
                  {categoryProducts.map((product, i) => (
                    <ProductCard key={product.id} product={product} size={i === 0 ? 'tall' : 'normal'} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="font-ui text-text-2 text-sm">Товары скоро появятся</p>
                </div>
              )}
            </RevealSection>
          </div>
        </section>

        {/* Other category CTA */}
        {category.slug === 'home' ? (
          <RevealSection>
            <section className="py-10 md:py-12 border-t border-border">
              <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="font-ui text-[11px] font-semibold uppercase tracking-widest text-text-2 mb-1">Также смотрите</p>
                  <p className="font-sans text-base font-semibold text-text">Умные гаджеты для авто</p>
                </div>
                <Link
                  href="/category/auto"
                  className="btn btn-outline font-ui text-sm px-5 py-2.5 flex-shrink-0"
                >
                  Перейти в категорию →
                </Link>
              </div>
            </section>
          </RevealSection>
        ) : (
          <RevealSection>
            <section className="py-10 md:py-12 border-t border-border">
              <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="font-ui text-[11px] font-semibold uppercase tracking-widest text-text-2 mb-1">Также смотрите</p>
                  <p className="font-sans text-base font-semibold text-text">Гаджеты для умного дома</p>
                </div>
                <Link
                  href="/category/home"
                  className="btn btn-outline font-ui text-sm px-5 py-2.5 flex-shrink-0"
                >
                  Перейти в категорию →
                </Link>
              </div>
            </section>
          </RevealSection>
        )}

        {/* SEO text block */}
        <RevealSection>
          <section
            aria-label={`О категории ${category.name}`}
            className="py-12 md:py-16 bg-surface-2 border-t border-border"
          >
            <div className="max-w-3xl mx-auto px-5 sm:px-8">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-text mb-6">
                {category.slug === 'home'
                  ? 'Умный дом в Казахстане — купить устройства автоматизации'
                  : 'Автогаджеты в Казахстане — умные устройства для автомобиля'}
              </h2>
              {meta.seoText.split('\n\n').map((para, i) => (
                <p key={i} className="font-ui text-sm text-text-2 leading-relaxed mb-4 last:mb-0">
                  {para}
                </p>
              ))}
            </div>
          </section>
        </RevealSection>
      </main>

      <Footer />
      <BottomNav />
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: 'home' } },
      { params: { slug: 'auto' } },
    ],
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params
  if (!CATEGORY_META[slug]) return { notFound: true }

  const categoryProducts = products.filter((p) => p.category === slug)

  return {
    props: {
      category: { slug, name: CATEGORY_META[slug].name },
      categoryProducts,
    },
  }
}
