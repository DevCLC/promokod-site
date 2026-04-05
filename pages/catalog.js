// Catalog page — Bento Grid, filters, SEO
import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BottomNav from '../components/BottomNav'
import ProductCard from '../components/ProductCard'
import products from '../data/products'

const BASE = 'https://devclc.github.io/promokod-site'

const CATS = [
  { id: 'all', label: 'Все товары' },
  { id: 'home', label: 'Умный дом' },
  { id: 'auto', label: 'Авто' },
]
const SORTS = [
  { value: 'default', label: 'По умолчанию' },
  { value: 'asc', label: 'Сначала дешевле' },
  { value: 'desc', label: 'Сначала дороже' },
]

function useReveal(deps = []) {
  useEffect(() => {
    const timer = setTimeout(() => {
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target) } }),
        { threshold: 0.06 }
      )
      document.querySelectorAll('.reveal-on-scroll:not(.revealed)').forEach((el) => io.observe(el))
      return () => io.disconnect()
    }, 50)
    return () => clearTimeout(timer)
  }, deps)
}

export default function Catalog() {
  const router = useRouter()
  const [cat, setCat] = useState('all')
  const [sort, setSort] = useState('default')
  const [maxPrice, setMaxPrice] = useState(50000)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (router.query.category) setCat(router.query.category)
    if (router.query.q) setSearch(router.query.q)
  }, [router.query])

  const maxP = Math.max(...products.map((p) => p.price))

  let list = products.filter((p) => {
    const mc = cat === 'all' || p.category === cat
    const mp = p.price <= maxPrice
    const ms = !search || p.name.toLowerCase().includes(search.toLowerCase())
    return mc && mp && ms
  })
  if (sort === 'asc') list = [...list].sort((a, b) => a.price - b.price)
  if (sort === 'desc') list = [...list].sort((a, b) => b.price - a.price)

  useReveal([cat, sort, maxPrice, search])

  const canonical = `${BASE}/catalog/`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Каталог умных товаров Sento Life',
    url: canonical,
    description: 'Умные гаджеты для дома и авто в Казахстане. Купить на Kaspi.kz.',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Главная', item: BASE + '/' },
        { '@type': 'ListItem', position: 2, name: 'Каталог', item: canonical },
      ],
    },
  }

  return (
    <>
      <Head>
        <title>Каталог умных гаджетов для дома и авто в Казахстане | Sento Life</title>
        <meta name="description" content="Каталог умных гаджетов для дома и авто. LED лампы, роботы-пылесосы, видеодомофоны, автодержатели. Фильтры по категории и цене. Купить на Kaspi.kz." />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Каталог умных гаджетов — Sento Life" />
        <meta property="og:description" content="Умные гаджеты для дома и авто. Купить на Kaspi.kz с доставкой по Казахстану." />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <Header />

      <main className="min-h-screen bg-bg pt-14 md:pt-16 pb-24 md:pb-0">
        {/* Hero */}
        <section className="bg-primary py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex items-center gap-2 font-ui text-xs text-white/40">
                <li><Link href="/" className="hover:text-white/70 transition-colors">Главная</Link></li>
                <li className="text-white/20">/</li>
                <li className="text-white/60">Каталог</li>
              </ol>
            </nav>
            <p className="font-ui text-[11px] font-semibold uppercase tracking-widest text-accent/70 mb-3">Sento Life</p>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-white">Каталог товаров</h1>
            <p className="font-ui text-sm text-white/50 mt-3">
              {products.length} товаров · умные решения для дома и автомобиля
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 md:py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters sidebar */}
            <aside className="lg:w-56 flex-shrink-0 space-y-7" aria-label="Фильтры">
              {/* Search */}
              <div>
                <label htmlFor="search" className="block font-ui text-[11px] font-semibold uppercase tracking-widest text-text-2 mb-3">
                  Поиск
                </label>
                <input
                  id="search"
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Название товара…"
                  className="w-full bg-surface border border-border rounded-bento-xs px-4 py-2.5 font-ui text-sm text-text placeholder-text-2/60 focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Category */}
              <div>
                <p className="font-ui text-[11px] font-semibold uppercase tracking-widest text-text-2 mb-3">Категория</p>
                <div className="flex flex-col gap-1">
                  {CATS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setCat(c.id)}
                      className={`text-left font-ui text-sm px-3 py-2.5 rounded-bento-xs font-medium transition-all duration-200 ${
                        cat === c.id
                          ? 'bg-primary text-white'
                          : 'text-text-2 hover:text-text hover:bg-surface-2'
                      }`}
                    >
                      {c.label}
                      <span className={`ml-2 font-ui text-xs ${cat === c.id ? 'text-white/50' : 'text-text-2/50'}`}>
                        {c.id === 'all' ? products.length : products.filter((p) => p.category === c.id).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <p className="font-ui text-[11px] font-semibold uppercase tracking-widest text-text-2 mb-3">
                  Цена до
                </p>
                <p className="font-serif font-bold text-text text-xl mb-3">
                  {maxPrice.toLocaleString('ru-RU')}<span className="text-sm ml-1 font-sans font-medium">₸</span>
                </p>
                <input
                  type="range"
                  min={1000}
                  max={maxP}
                  step={500}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  aria-label="Максимальная цена"
                  className="w-full accent-primary"
                />
                <div className="flex justify-between font-ui text-xs text-text-2 mt-1.5">
                  <span>1 000 ₸</span>
                  <span>{maxP.toLocaleString('ru-RU')} ₸</span>
                </div>
              </div>

              {/* Sort */}
              <div>
                <label htmlFor="sort" className="block font-ui text-[11px] font-semibold uppercase tracking-widest text-text-2 mb-3">
                  Сортировка
                </label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full bg-surface border border-border rounded-bento-xs px-3 py-2.5 font-ui text-sm text-text focus:outline-none focus:border-primary cursor-pointer"
                >
                  {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>

              {/* Category links */}
              <div className="pt-2 border-t border-border">
                <p className="font-ui text-[11px] font-semibold uppercase tracking-widest text-text-2 mb-3">Категории</p>
                <div className="flex flex-col gap-2">
                  <Link href="/category/home" className="font-ui text-sm text-text-2 hover:text-primary transition-colors flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 flex-shrink-0" />
                    Умный дом
                  </Link>
                  <Link href="/category/auto" className="font-ui text-sm text-text-2 hover:text-primary transition-colors flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-kaspi/40 flex-shrink-0" />
                    Авто
                  </Link>
                </div>
              </div>
            </aside>

            {/* Grid */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-6">
                <p className="font-ui text-sm text-text-2">
                  Найдено: <span className="font-semibold text-text">{list.length}</span>
                </p>
                <a
                  href="https://kaspi.kz/shop/search/?q=умные+гаджеты&c=750000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-ui text-xs text-kaspi hover:text-kaspi-h transition-colors"
                >
                  Все на Kaspi →
                </a>
              </div>

              {list.length === 0 ? (
                <div className="text-center py-24 bg-surface rounded-bento border border-border">
                  <p className="font-serif text-2xl font-bold text-text mb-2">Ничего не найдено</p>
                  <p className="font-ui text-sm text-text-2">Попробуйте изменить фильтры или поисковый запрос</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                  {list.map((p, i) => (
                    <div
                      key={p.id}
                      className="reveal-on-scroll"
                      style={{ transitionDelay: `${(i % 6) * 50}ms` }}
                    >
                      <ProductCard product={p} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </>
  )
}
