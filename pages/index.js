import { useEffect, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BottomNav from '../components/BottomNav'
import ProductCard from '../components/ProductCard'
import products from '../data/products'
import reviews from '../data/reviews'

const WA = '77001234567'

const categories = [
  { id: 'home', label: 'Умный дом', emoji: '🏠', desc: 'Лампы, замки, датчики' },
  { id: 'auto', label: 'Авто', emoji: '🚗', desc: 'Держатели, зеркала, очистители' },
]

const benefits = [
  {
    icon: '⚡',
    title: 'Быстрая доставка',
    desc: 'По всему Казахстану за 1–3 дня',
  },
  {
    icon: '✓',
    title: 'Проверенные товары',
    desc: 'Каждый товар проходит контроль качества',
  },
  {
    icon: '↩',
    title: 'Возврат 14 дней',
    desc: 'Не подошло — вернём деньги',
  },
]

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

function RevealSection({ children, className = '', delay = '' }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`reveal ${delay} ${className}`}>
      {children}
    </div>
  )
}

export default function Home() {
  const productsRef = useRef(null)

  // Reveal all .reveal elements on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const featured = products.filter((p) => p.badge === 'Хит').slice(0, 4)
  const allProducts = products.slice(0, 8)

  return (
    <>
      <Head>
        <title>Sento — Умные товары для дома и авто</title>
        <meta name="description" content="Sento — премиальный магазин умных товаров для дома и авто в Казахстане. Быстрая доставка, гарантия качества, возврат 14 дней." />
        <meta property="og:title" content="Sento — Умные товары для дома и авто" />
        <meta property="og:description" content="Умные товары для дома и авто с доставкой по Казахстану" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col justify-center bg-primary overflow-hidden pt-16">
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] bg-primary-light/30 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/80 text-xs font-medium px-4 py-1.5 rounded-full mb-8">
              <span className="w-1.5 h-1.5 bg-accent rounded-full" />
              Доставка по всему Казахстану
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] mb-6">
              Умные товары<br />
              <em className="not-italic text-accent">для дома</em><br />
              и авто
            </h1>

            <p className="text-white/65 text-lg sm:text-xl leading-relaxed mb-10 max-w-md">
              Упростите свою жизнь уже сегодня — технологии, которые работают на вас.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => productsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-accent text-base px-8 py-4"
              >
                Смотреть товары
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <Link href="/catalog" className="btn-primary bg-white/10 border border-white/20 hover:bg-white/20 text-white text-base px-8 py-4">
                Все товары
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-16 md:py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} flex items-start gap-4 bg-card p-6 rounded-2xl shadow-card`}>
                <span className="text-2xl leading-none mt-0.5">{b.icon}</span>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <RevealSection className="mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Категории</h2>
          </RevealSection>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {categories.map((cat, i) => (
              <div key={cat.id} className={`reveal reveal-delay-${i + 1}`}>
                <Link
                  href={`/catalog?category=${cat.id}`}
                  className="group block bg-card rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="text-3xl md:text-4xl">{cat.emoji}</span>
                  <h3 className="font-serif text-lg md:text-xl font-semibold text-foreground mt-3 mb-1 group-hover:text-primary transition-colors">
                    {cat.label}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{cat.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Смотреть
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Products ── */}
      <section id="products" ref={productsRef} className="py-16 md:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <RevealSection className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Популярное</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Хиты продаж</h2>
            </div>
            <Link href="/catalog" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
              Все товары
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </RevealSection>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {allProducts.map((p, i) => (
              <div key={p.id} className={`reveal reveal-delay-${Math.min(i % 4 + 1, 5)}`}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>

          <div className="mt-10 text-center reveal">
            <Link href="/catalog" className="btn-primary inline-flex text-sm px-8 py-3.5">
              Смотреть все товары
            </Link>
          </div>
        </div>
      </section>

      {/* ── Video Demo ── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <RevealSection className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Демо</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">В действии</h2>
            <p className="text-muted-foreground max-w-md mx-auto">Посмотрите, как работают наши товары</p>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            {products.slice(0, 3).map((p, i) => (
              <div key={p.id} className={`reveal reveal-delay-${i + 1} group`}>
                <Link href={`/product/${p.id}`} className="block rounded-2xl overflow-hidden bg-muted relative">
                  <div className="aspect-video bg-primary/10">
                    <video
                      src={p.video}
                      autoPlay loop muted playsInline
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/0 group-hover:bg-white/90 rounded-full flex items-center justify-center transition-all scale-75 group-hover:scale-100">
                      <svg className="w-5 h-5 text-primary ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-medium text-sm text-foreground line-clamp-1">{p.name}</p>
                    <p className="font-serif font-semibold text-primary mt-1">{p.price.toLocaleString('ru-RU')} ₸</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <RevealSection className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Отзывы</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">Что говорят покупатели</h2>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {reviews.map((r, i) => (
              <div key={r.id} className={`reveal reveal-delay-${i + 1} bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors`}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-5">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent/20 text-accent rounded-full flex items-center justify-center text-sm font-semibold">
                    {r.avatar}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{r.name}</p>
                    <p className="text-white/40 text-xs">{r.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <RevealSection>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Есть вопросы?
            </h2>
            <p className="text-muted-foreground mb-8">
              Наши менеджеры помогут подобрать товар и ответят на любые вопросы
            </p>
            <a
              href={`https://wa.me/${WA}?text=${encodeURIComponent('Здравствуйте! Хочу узнать подробнее о товарах Sento.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex text-base px-8 py-4"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Написать в WhatsApp
            </a>
          </RevealSection>
        </div>
      </section>

      <Footer />
      <BottomNav />
    </>
  )
}
