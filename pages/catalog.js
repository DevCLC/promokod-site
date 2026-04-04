import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BottomNav from '../components/BottomNav'
import ProductCard from '../components/ProductCard'
import products from '../data/products'

const SITE_URL = 'https://devclc.github.io/promokod-site'

const CATS = [
  { id: 'all', label: 'Все' },
  { id: 'home', label: 'Умный дом' },
  { id: 'auto', label: 'Авто' },
]
const SORTS = [
  { value: 'default', label: 'По умолчанию' },
  { value: 'asc', label: 'Дешевле' },
  { value: 'desc', label: 'Дороже' },
]

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

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) } }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [cat, sort, maxPrice, search])

  const maxP = Math.max(...products.map((p) => p.price))

  let list = products.filter((p) => {
    const mc = cat === 'all' || p.category === cat
    const mp = p.price <= maxPrice
    const ms = !search || p.name.toLowerCase().includes(search.toLowerCase())
    return mc && mp && ms
  })
  if (sort === 'asc') list = [...list].sort((a, b) => a.price - b.price)
  if (sort === 'desc') list = [...list].sort((a, b) => b.price - a.price)

  const canonicalUrl = `${SITE_URL}/catalog`

  return (
    <>
      <Head>
        <title>Каталог умных товаров — Sento | Казахстан</title>
        <meta name="description" content="Каталог умных гаджетов для дома и авто. Wi-Fi лампы, роботы-пылесосы, видеодомофоны, автодержатели. Фильтры по категории и цене. Kaspi.kz." />
        <meta name="keywords" content="каталог умных товаров Казахстан, умный дом купить, гаджеты авто, kaspi умный дом, wifi устройства" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Каталог умных товаров — Sento" />
        <meta property="og:description" content="Умные гаджеты для дома и авто. Купить на Kaspi.kz с доставкой по Казахстану." />
        <meta property="og:url" content={canonicalUrl} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Каталог умных товаров Sento',
          url: canonicalUrl,
          description: 'Умные гаджеты для дома и авто в Казахстане',
        }) }} />
      </Head>

      <Header />

      <main className="min-h-screen bg-bg pt-14 pb-24 md:pb-0">
        {/* Hero */}
        <div className="bg-apple-black text-white py-14 md:py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-accent/70 mb-3">Sento</p>
            <h1 className="font-serif text-hero-sm text-white mb-4">Каталог товаров</h1>
            <p className="text-white/50 max-w-md">
              {products.length} товаров — умные решения для дома и автомобиля
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 md:py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters sidebar */}
            <aside className="lg:w-52 flex-shrink-0 space-y-7" aria-label="Фильтры">
              {/* Search */}
              <div>
                <label htmlFor="search" className="block text-[11px] font-semibold uppercase tracking-widest text-secondary mb-3">
                  Поиск
                </label>
                <div className="relative">
                  <input
                    id="search"
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Название…"
                    className="w-full bg-surface border border-border rounded-apple-sm px-4 py-2.5 text-sm text-apple-black placeholder-secondary focus:outline-none focus:border-brand transition-colors"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-secondary mb-3">Категория</p>
                <div className="flex flex-col gap-1">
                  {CATS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setCat(c.id)}
                      className={`text-left text-sm px-3 py-2 rounded-apple-sm font-medium transition-all ${
                        cat === c.id
                          ? 'bg-apple-black text-white'
                          : 'text-secondary hover:text-apple-black hover:bg-surface'
                      }`}
                    >
                      {c.label}
                      <span className="ml-2 text-xs opacity-50">
                        {c.id === 'all' ? products.length : products.filter((p) => p.category === c.id).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-secondary mb-3">
                  Цена до
                </p>
                <p className="font-serif font-bold text-apple-black text-lg mb-3">
                  {maxPrice.toLocaleString('ru-RU')} ₸
                </p>
                <input
                  type="range"
                  min={1000}
                  max={maxP}
                  step={500}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  aria-label="Максимальная цена"
                />
                <div className="flex justify-between text-xs text-secondary mt-1.5">
                  <span>1 000 ₸</span>
                  <span>{maxP.toLocaleString('ru-RU')} ₸</span>
                </div>
              </div>

              {/* Sort */}
              <div>
                <label htmlFor="sort" className="block text-[11px] font-semibold uppercase tracking-widest text-secondary mb-3">
                  Сортировка
                </label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full bg-surface border border-border rounded-apple-sm px-3 py-2.5 text-sm text-apple-black focus:outline-none focus:border-brand cursor-pointer"
                >
                  {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
            </aside>

            {/* Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-secondary">
                  Найдено: <span className="font-semibold text-apple-black">{list.length}</span>
                </p>
              </div>

              {list.length === 0 ? (
                <div className="text-center py-24">
                  <p className="text-4xl mb-4">🔍</p>
                  <p className="font-semibold text-apple-black mb-2">Ничего не найдено</p>
                  <p className="text-sm text-secondary">Попробуйте изменить фильтры</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                  {list.map((p, i) => (
                    <div key={p.id} className={`reveal reveal-d${(i % 3) + 1}`}>
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
