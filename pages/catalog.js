import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BottomNav from '../components/BottomNav'
import ProductCard from '../components/ProductCard'
import products from '../data/products'

const SORT_OPTIONS = [
  { value: 'default', label: 'По умолчанию' },
  { value: 'price-asc', label: 'Сначала дешевле' },
  { value: 'price-desc', label: 'Сначала дороже' },
]

export default function Catalog() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState('all')
  const [sort, setSort] = useState('default')
  const [maxPrice, setMaxPrice] = useState(50000)
  const [search, setSearch] = useState('')
  const gridRef = useRef(null)

  useEffect(() => {
    if (router.query.category) {
      setActiveCategory(router.query.category)
    }
  }, [router.query.category])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } })
      },
      { threshold: 0.08 }
    )
    gridRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [activeCategory, sort, maxPrice, search])

  const prices = products.map((p) => p.price)
  const globalMax = Math.max(...prices)

  let filtered = products.filter((p) => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory
    const matchPrice = p.price <= maxPrice
    const matchSearch = search === '' || p.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchPrice && matchSearch
  })

  if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price)

  const categories = [
    { id: 'all', label: 'Все товары' },
    { id: 'home', label: 'Умный дом' },
    { id: 'auto', label: 'Авто' },
  ]

  return (
    <>
      <Head>
        <title>Каталог товаров — Sento</title>
        <meta name="description" content="Полный каталог умных товаров для дома и авто в магазине Sento. Фильтры по категориям и цене." />
      </Head>

      <Header />

      <main className="min-h-screen bg-background pt-16 pb-24 md:pb-16">
        {/* Page title */}
        <div className="bg-primary text-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Магазин</p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold">Все товары</h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 md:py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar filters */}
            <aside className="lg:w-56 flex-shrink-0 space-y-6">
              {/* Search */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Поиск</label>
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Название товара..."
                    className="w-full bg-card border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors pr-9"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Категория</label>
                <div className="space-y-1">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setActiveCategory(c.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                        activeCategory === c.id
                          ? 'bg-primary text-white'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  Цена до <span className="text-primary normal-case font-bold">{maxPrice.toLocaleString('ru-RU')} ₸</span>
                </label>
                <input
                  type="range"
                  min={1000}
                  max={globalMax}
                  step={500}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1 000 ₸</span>
                  <span>{globalMax.toLocaleString('ru-RU')} ₸</span>
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Сортировка</label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full bg-card border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary cursor-pointer"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </aside>

            {/* Products grid */}
            <div className="flex-1" ref={gridRef}>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  Найдено: <span className="font-semibold text-foreground">{filtered.length}</span> товаров
                </p>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-4xl mb-4">🔍</p>
                  <p className="font-semibold text-foreground mb-2">Ничего не найдено</p>
                  <p className="text-sm text-muted-foreground">Попробуйте изменить фильтры</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-5">
                  {filtered.map((p, i) => (
                    <div key={p.id} className={`reveal reveal-delay-${Math.min(i % 3 + 1, 5)}`}>
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
