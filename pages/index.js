// Landing pattern: Bento Grid Showcase #28 + Hero+Features+CTA #1
// Skill: hover card scale 1.02, 16px gap, rounded 24px, #F5F5F7 bg
import { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BottomNav from '../components/BottomNav'
import ProductCard from '../components/ProductCard'
import products from '../data/products'

const SITE = 'https://devclc.github.io/promokod-site'
const WA = '77001234567'

const BENEFITS = [
  { icon: '⚡', title: 'Быстрая доставка', desc: 'По всему Казахстану от 1 дня' },
  { icon: '✓',  title: 'Проверенные товары', desc: 'Каждый товар протестирован и сертифицирован' },
  { icon: '↩', title: 'Возврат 14 дней', desc: 'Не подошло — вернём деньги без вопросов' },
  { icon: '💳', title: 'Kaspi RED 0-0-12', desc: 'Рассрочка без процентов через Kaspi.kz' },
]

const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sento Life',
  url: SITE,
  description: 'Умные гаджеты для дома и авто в Казахстане. Купить на Kaspi.kz.',
  address: { '@type': 'PostalAddress', addressCountry: 'KZ' },
}
const WEB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Sento — Умные устройства Казахстан',
  url: SITE,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE}/catalog?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) } }),
      { threshold: 0.07 }
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function Home() {
  useReveal()

  const hits    = products.filter((p) => p.badge === 'Хит')
  const newest  = products.filter((p) => p.badge === 'Новинка')
  const homeP   = products.filter((p) => p.category === 'home').slice(0, 4)
  const autoP   = products.filter((p) => p.category === 'auto').slice(0, 4)
  const spotlight = products.find((p) => p.id === 4) // Робот-пылесос

  return (
    <>
      <Head>
        <title>Sento — Умные устройства для дома и авто | Казахстан</title>
        <meta name="description" content="Sento Life — интернет-магазин умных гаджетов для дома и автомобиля в Казахстане. Wi-Fi лампы, роботы-пылесосы, видеодомофоны, автодержатели. Купить на Kaspi.kz с доставкой." />
        <meta name="keywords" content="умные устройства Казахстан, гаджеты для дома, умные гаджеты для авто, smart devices Kazakhstan, купить умные устройства, электроника для дома, kaspi умный дом" />
        <link rel="canonical" href={SITE} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE} />
        <meta property="og:title" content="Sento — Умные устройства для дома и авто | Казахстан" />
        <meta property="og:description" content="Умные гаджеты для дома и авто с доставкой по Казахстану. Купить на Kaspi.kz." />
        <meta property="og:locale" content="ru_KZ" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEB_SCHEMA) }} />
      </Head>

      <Header />

      {/* ── HERO — dark, full-screen ─────────────────── */}
      <section className="relative min-h-screen flex items-center bg-text overflow-hidden" aria-label="Hero">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[55vw] h-[55vw] bg-primary/35 rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[35vw] h-[35vw] bg-accent/12 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 pt-20 pb-28 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/8 border border-white/12 rounded-full px-4 py-1.5 mb-8 font-ui text-xs font-medium text-white/65 tracking-wide">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              Доступно на Kaspi.kz · Казахстан
            </div>

            {/* TZ: H1 — один на страницу */}
            <h1 className="font-serif text-display text-white mb-6 [text-wrap:balance]">
              Умный дом.<br />
              <em className="not-italic text-accent">Умное авто.</em>
            </h1>

            <p className="font-sans text-white/60 text-lg sm:text-xl leading-relaxed mb-10 max-w-lg">
              Технологии, которые упрощают жизнь каждый день. Умные гаджеты для дома и автомобиля с доставкой по всему Казахстану.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/catalog" className="btn btn-kaspi text-base px-8 py-4">
                Смотреть каталог
              </Link>
              <Link href="/category/home" className="btn btn-ghost text-base px-8 py-4">
                Умный дом
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-25 animate-bounce">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── BENEFITS STRIP ───────────────────────────── */}
      <section className="bg-surface border-y border-border py-10" aria-label="Преимущества Sento">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
            {BENEFITS.map((b, i) => (
              <div key={i} className={`reveal reveal-d${i + 1} flex flex-col items-center text-center gap-2`}>
                <span className="text-xl">{b.icon}</span>
                <p className="font-ui text-[13px] font-semibold text-text">{b.title}</p>
                <p className="font-sans text-xs text-text-2 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENTO GRID — HITS ─────────────────────────── */}
      {/* Skill #39: varied sizes, 4-col desktop, 16px gap, 24px radius */}
      <section className="py-section bg-bg" id="products" aria-labelledby="hits-title">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="reveal mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="font-ui text-[10px] font-semibold uppercase tracking-widest text-text-2 mb-2">Популярное</p>
              <h2 id="hits-title" className="font-serif text-display-sm text-text">Хиты продаж</h2>
            </div>
            <Link href="/catalog" className="hidden sm:flex font-ui text-sm font-medium text-primary hover:underline items-center gap-1 flex-shrink-0">
              Все товары <span>→</span>
            </Link>
          </div>

          {/* Bento asymmetric grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[220px]">
            {hits.map((p, i) => (
              <div
                key={p.id}
                className={`reveal reveal-d${(i % 4) + 1} ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <ProductCard product={p} size={i === 0 ? 'tall' : 'normal'} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ────────────────────────────────── */}
      <section className="py-section bg-surface" aria-labelledby="cat-title">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="reveal mb-10 text-center">
            <p className="font-ui text-[10px] font-semibold uppercase tracking-widest text-text-2 mb-2">Ассортимент</p>
            <h2 id="cat-title" className="font-serif text-display-sm text-text">Категории</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                id: 'home',
                title: 'Умный дом',
                desc: 'Wi-Fi лампы, замки, видеодомофоны, роботы-пылесосы, датчики',
                count: products.filter((p) => p.category === 'home').length,
                bg: 'bg-primary',
              },
              {
                id: 'auto',
                title: 'Авто',
                desc: 'Беспроводные держатели, регистраторы, очистители воздуха',
                count: products.filter((p) => p.category === 'auto').length,
                bg: 'bg-text',
              },
            ].map((cat, i) => (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                className={`reveal reveal-d${i + 1} group block ${cat.bg} rounded-bento p-8 md:p-12 overflow-hidden relative hover:-translate-y-1 transition-transform duration-300`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="font-ui text-white/40 text-sm mb-2">{cat.count} товаров</p>
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">{cat.title}</h3>
                <p className="font-sans text-white/55 text-sm mb-6 max-w-xs">{cat.desc}</p>
                <span className="font-ui text-sm font-semibold text-accent inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Смотреть <span>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPOTLIGHT — один товар крупно ─────────────── */}
      {spotlight && (
        <section className="py-section bg-primary overflow-hidden" aria-label="Товар недели">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
              <div>
                <p className="font-ui text-[10px] font-semibold uppercase tracking-widest text-accent/60 mb-4">Выбор редакции</p>
                <h2 className="font-serif text-display-sm text-white mb-4 [text-wrap:balance]">{spotlight.name}</h2>
                <p className="font-sans text-white/60 leading-relaxed mb-6 max-w-sm">{spotlight.description}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {spotlight.features.map((f) => (
                    <span key={f} className="font-ui bg-white/10 text-white/75 text-xs font-medium px-3 py-1.5 rounded-full">{f}</span>
                  ))}
                </div>
                <p className="font-serif text-4xl font-bold text-white mb-8">
                  {spotlight.price.toLocaleString('ru-RU')} <span className="text-2xl font-normal">₸</span>
                </p>
                <a href={spotlight.kaspiUrl} target="_blank" rel="noopener noreferrer" className="btn btn-kaspi text-base px-8 py-4">
                  Купить на Kaspi.kz
                </a>
              </div>
              <div className="relative aspect-square rounded-bento overflow-hidden">
                <Image src={spotlight.image} alt={spotlight.name} fill unoptimized className="object-cover" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── НОВИНКИ ───────────────────────────────────── */}
      <section className="py-section bg-bg" aria-labelledby="new-title">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="reveal mb-10">
            <p className="font-ui text-[10px] font-semibold uppercase tracking-widest text-text-2 mb-2">Только появились</p>
            <h2 id="new-title" className="font-serif text-display-sm text-text">Новинки</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[240px]">
            {newest.map((p, i) => (
              <div key={p.id} className={`reveal reveal-d${(i % 3) + 1}`}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEO DEMOS ──────────────────────────────── */}
      <section className="py-section bg-surface" aria-labelledby="video-title">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="reveal mb-10 text-center">
            <p className="font-ui text-[10px] font-semibold uppercase tracking-widest text-text-2 mb-2">Демо</p>
            <h2 id="video-title" className="font-serif text-display-sm text-text mb-3">В действии</h2>
            <p className="font-sans text-text-2 max-w-md mx-auto">Посмотрите, как работают умные устройства</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {products.slice(0, 3).map((p, i) => (
              <div key={p.id} className={`reveal reveal-d${i + 1} group`}>
                <Link href={`/product/${p.slug || p.id}`} className="block bento-card shadow-bento overflow-hidden">
                  <div className="aspect-video bg-surface-2 relative overflow-hidden">
                    <video src={p.video} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80" aria-label={`Видео: ${p.name}`} />
                    <div className="absolute inset-0 flex items-center justify-center bg-text/0 group-hover:bg-text/20 transition-colors">
                      <div className="w-11 h-11 bg-white/0 group-hover:bg-white/90 rounded-full flex items-center justify-center transition-all scale-75 group-hover:scale-100">
                        <svg className="w-5 h-5 text-primary ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-sans font-medium text-sm text-text line-clamp-1">{p.name}</p>
                    <p className="font-serif font-bold text-primary mt-0.5">{p.price.toLocaleString('ru-RU')} ₸</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO TEXT BLOCK (TZ requirement) ──────────── */}
      <section className="py-12 bg-bg border-t border-border" aria-label="О бренде Sento">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="reveal">
            <h2 className="font-serif text-xl font-bold text-text mb-4">Умные устройства для дома и авто в Казахстане</h2>
            <p className="font-sans text-sm text-text-2 leading-relaxed mb-3">
              <strong>Sento Life</strong> — магазин умных гаджетов и устройств для дома и автомобиля с доставкой по всему Казахстану. Мы предлагаем тщательно отобранные <strong>умные устройства</strong>: Wi-Fi лампы с голосовым управлением, видеодомофоны, роботы-пылесосы с LiDAR-навигацией, умные замки, автодержатели с беспроводной зарядкой и другие гаджеты для современного образа жизни.
            </p>
            <p className="font-sans text-sm text-text-2 leading-relaxed">
              Все товары представлены на <strong>Kaspi.kz</strong> — покупка безопасна, удобна и доступна в рассрочку 0-0-12 по программе Kaspi RED. Доставка в Алматы, Астане, Шымкенте и других городах Казахстана.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA WhatsApp ─────────────────────────────── */}
      <section className="py-14 bg-surface border-t border-border" aria-label="Консультация">
        <div className="max-w-2xl mx-auto px-5 text-center reveal">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-text mb-4">Не можете выбрать?</h2>
          <p className="font-sans text-text-2 mb-8">Напишите нам — поможем подобрать идеальный гаджет</p>
          <a
            href={`https://wa.me/${WA}?text=${encodeURIComponent('Здравствуйте! Хочу подобрать умный гаджет.')}`}
            target="_blank" rel="noopener noreferrer"
            className="btn btn-wa inline-flex text-base px-8 py-4"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Написать в WhatsApp
          </a>
        </div>
      </section>

      <Footer />
      <BottomNav />
    </>
  )
}
