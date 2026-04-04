import { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BottomNav from '../components/BottomNav'
import ProductCard from '../components/ProductCard'
import products from '../data/products'

const SITE_URL = 'https://devclc.github.io/promokod-site'
const WA = '77001234567'

const FEATURES = [
  { icon: '⚡', title: 'Быстрая доставка', desc: 'По всему Казахстану от 1 дня' },
  { icon: '🔒', title: 'Гарантия качества', desc: 'Каждый товар проверен и сертифицирован' },
  { icon: '↩', title: 'Возврат 14 дней', desc: 'Без вопросов вернём деньги' },
  { icon: '💳', title: 'Kaspi RED', desc: 'Рассрочка 0-0-12 на Kaspi.kz' },
]

const CATEGORIES = [
  { id: 'home', label: 'Умный дом', desc: 'Лампы, замки, датчики, пылесосы', count: products.filter(p => p.category === 'home').length },
  { id: 'auto', label: 'Авто', desc: 'Держатели, регистраторы, очистители', count: products.filter(p => p.category === 'auto').length },
]

const SCHEMA_ORG = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sento',
  url: SITE_URL,
  description: 'Магазин умных товаров для дома и авто в Казахстане',
  address: { '@type': 'PostalAddress', addressCountry: 'KZ' },
  sameAs: [`https://wa.me/${WA}`],
}

const SCHEMA_WEB = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Sento — Умные товары для дома и авто',
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/catalog?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) } }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function Home() {
  useReveal()

  const hits = products.filter((p) => p.badge === 'Хит')
  const newest = products.filter((p) => p.badge === 'Новинка')

  return (
    <>
      <Head>
        <title>Sento — Умные товары для дома и авто | Казахстан</title>
        <meta name="description" content="Sento — умные гаджеты для дома и авто в Казахстане. Wi-Fi лампы, видеодомофоны, роботы-пылесосы, автодержатели. Доставка по всему Казахстану, купить на Kaspi.kz." />
        <meta name="keywords" content="умный дом Казахстан, умные гаджеты купить, wifi лампа, робот пылесос, видеодомофон, автодержатель зарядка, kaspi умный дом" />
        <link rel="canonical" href={SITE_URL} />
        {/* OG */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content="Sento — Умные товары для дома и авто | Казахстан" />
        <meta property="og:description" content="Умные гаджеты для дома и авто с доставкой по Казахстану. Купить на Kaspi.kz." />
        <meta property="og:locale" content="ru_KZ" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sento — Умные товары для дома и авто" />
        <meta name="twitter:description" content="Умные гаджеты для дома и авто с доставкой по Казахстану." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ORG) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_WEB) }} />
      </Head>

      <Header />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center bg-apple-black overflow-hidden"
        aria-label="Главный баннер"
      >
        {/* Ambient gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-brand/30 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-accent/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 pt-20 pb-24 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/8 border border-white/12 rounded-full px-4 py-1.5 mb-8 text-xs font-medium text-white/70 tracking-wide">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              Доступно на Kaspi.kz
            </div>

            <h1 className="font-serif text-hero text-white mb-6 [text-wrap:balance]">
              Умный дом.<br />
              <span className="text-accent">Умное авто.</span>
            </h1>

            <p className="text-tagline text-white/60 mb-10 max-w-xl [text-wrap:balance]">
              Технологии, которые упрощают жизнь. Доставка по всему Казахстану.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/catalog" className="btn btn-kaspi text-base px-7 py-3.5">
                Смотреть товары
              </Link>
              <Link href="/catalog" className="btn btn-ghost text-base px-7 py-3.5">
                Умный дом
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-30 animate-bounce">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── FEATURES STRIP ───────────────────────────────── */}
      <section className="bg-surface border-y border-border py-10" aria-label="Преимущества">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {FEATURES.map((f, i) => (
              <div key={i} className={`reveal reveal-d${i + 1} flex flex-col items-center text-center gap-2`}>
                <span className="text-2xl">{f.icon}</span>
                <p className="text-sm font-semibold text-apple-black">{f.title}</p>
                <p className="text-xs text-secondary leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HITS ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-bg" id="products" aria-label="Хиты продаж">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="reveal mb-12 flex items-end justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-secondary mb-2">Популярное</p>
              <h2 className="font-serif text-hero-sm text-apple-black">Хиты продаж</h2>
            </div>
            <Link href="/catalog" className="hidden sm:flex text-sm font-medium text-brand hover:underline items-center gap-1">
              Все товары <span>→</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {hits.map((p, i) => (
              <div key={p.id} className={`reveal reveal-d${(i % 4) + 1}`}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-surface" aria-label="Категории товаров">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="reveal mb-12 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-secondary mb-2">Ассортимент</p>
            <h2 className="font-serif text-hero-sm text-apple-black">Категории</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CATEGORIES.map((cat, i) => (
              <Link
                key={cat.id}
                href={`/catalog?category=${cat.id}`}
                className={`reveal reveal-d${i + 1} group block bg-apple-black rounded-apple p-8 md:p-12 hover:bg-brand transition-colors duration-300 relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <p className="text-white/40 text-sm font-medium mb-2">{cat.count} товаров</p>
                  <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">{cat.label}</h3>
                  <p className="text-white/50 text-sm mb-6">{cat.desc}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent group-hover:gap-2 transition-all">
                    Смотреть <span>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── НОВИНКИ ──────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-bg" aria-label="Новинки">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="reveal mb-12 flex items-end justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-secondary mb-2">Только появились</p>
              <h2 className="font-serif text-hero-sm text-apple-black">Новинки</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {newest.map((p, i) => (
              <div key={p.id} className={`reveal reveal-d${(i % 3) + 1}`}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPOTLIGHT — один большой продукт ─────────────── */}
      {(() => {
        const spotlight = products.find((p) => p.id === 4)
        if (!spotlight) return null
        return (
          <section className="py-20 md:py-28 bg-brand overflow-hidden" aria-label="Товар дня">
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
              <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-accent/70 mb-4">Выбор редакции</p>
                  <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4 [text-wrap:balance]">
                    {spotlight.name}
                  </h2>
                  <p className="text-white/60 leading-relaxed mb-6 max-w-sm">{spotlight.description}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {spotlight.features.map((f) => (
                      <span key={f} className="bg-white/10 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full">
                        {f}
                      </span>
                    ))}
                  </div>
                  <p className="font-serif text-4xl font-bold text-white mb-8">
                    {spotlight.price.toLocaleString('ru-RU')} <span className="text-2xl">₸</span>
                  </p>
                  <a
                    href={spotlight.kaspiUrl}
                    target="_blank" rel="noopener noreferrer"
                    className="btn btn-kaspi text-base px-8 py-4"
                  >
                    Купить на Kaspi.kz
                  </a>
                </div>
                <div className="relative aspect-square rounded-apple overflow-hidden">
                  <Image
                    src={spotlight.image}
                    alt={spotlight.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        )
      })()}

      {/* ── ALL PRODUCTS ─────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-surface" aria-label="Все товары">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="reveal mb-12 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-secondary mb-2">Полный каталог</p>
            <h2 className="font-serif text-hero-sm text-apple-black mb-4">Все товары</h2>
            <p className="text-secondary max-w-lg mx-auto">Умные устройства, которые работают на вас каждый день</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {products.map((p, i) => (
              <div key={p.id} className={`reveal reveal-d${(i % 4) + 1}`}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
          <div className="reveal mt-12 text-center">
            <Link href="/catalog" className="btn btn-brand inline-flex text-sm px-8 py-3.5">
              Каталог с фильтрами →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA WhatsApp ─────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-bg border-y border-border" aria-label="Связаться с нами">
        <div className="max-w-2xl mx-auto px-5 text-center reveal">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-secondary mb-3">Помощь</p>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-apple-black mb-4">
            Не можете выбрать?
          </h2>
          <p className="text-secondary mb-8">
            Напишите нам — поможем подобрать идеальный гаджет под ваши задачи
          </p>
          <a
            href={`https://wa.me/${WA}?text=${encodeURIComponent('Здравствуйте! Хочу подобрать умный гаджет.')}`}
            target="_blank" rel="noopener noreferrer"
            className="btn btn-wa inline-flex text-base px-8 py-4"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Написать в WhatsApp
          </a>
        </div>
      </section>

      <Footer />
      <BottomNav />
    </>
  )
}
