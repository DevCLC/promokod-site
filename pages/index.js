import { useEffect, useRef } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import products from '../data/products'

const WHATSAPP_NUMBER = '77001234567'

function useFadeIn() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const el = ref.current
    if (el) {
      const sections = el.querySelectorAll('.fade-in-section')
      sections.forEach((s) => observer.observe(s))
    }

    return () => observer.disconnect()
  }, [])

  return ref
}

const benefits = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Быстрая доставка по Казахстану',
    description: 'Отправляем заказы в течение 24 часов. Доставка по Алматы — 1 день, по всему Казахстану — 2-5 дней.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Проверенные товары',
    description: 'Все товары проходят проверку качества перед отправкой. Работаем только с надёжными поставщиками.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: 'Возврат 14 дней',
    description: 'Если товар не подошёл — вернём деньги в течение 14 дней без лишних вопросов.',
  },
]

export default function Home() {
  const pageRef = useFadeIn()

  const scrollToProducts = () => {
    const el = document.getElementById('products')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <Head>
        <title>Sento — Умные товары для дома и авто</title>
        <meta
          name="description"
          content="Sento — магазин умных товаров для дома и автомобиля. Широкий выбор гаджетов с доставкой по всему Казахстану. Умные лампы, замки, роботы-пылесосы, автомобильные аксессуары."
        />
        <meta property="og:title" content="Sento — Умные товары для дома и авто" />
        <meta property="og:description" content="Широкий выбор умных гаджетов с доставкой по Казахстану." />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main ref={pageRef}>
        {/* Hero Section */}
        <section className="hero-overlay min-h-screen flex items-center justify-center relative overflow-hidden">
          {/* Background decorative circles */}
          <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-sm px-4 py-2 rounded-full mb-8 backdrop-blur-sm border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Доставка по всему Казахстану
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Умные товары
              <br />
              <span className="text-accent">для дома и авто</span>
            </h1>

            <p className="text-xl sm:text-2xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Упростите свою жизнь уже сегодня
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToProducts}
                className="btn-accent text-base px-8 py-4 text-lg"
              >
                Смотреть товары
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Здравствуйте! Хочу узнать подробнее о ваших товарах.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-base px-8 py-4 text-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Написать нам
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-16 pt-16 border-t border-white/20">
              {[
                { value: '500+', label: 'Довольных клиентов' },
                { value: '10+', label: 'Умных товаров' },
                { value: '1-5 дней', label: 'Доставка' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-white/60 text-xs sm:text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-16 sm:py-20 lg:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="fade-in-section text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Наши товары
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Выбирайте из нашего ассортимента умных устройств для вашего дома и автомобиля
              </p>
            </div>

            {/* Category tabs */}
            <div className="fade-in-section flex flex-wrap gap-3 justify-center mb-10">
              {['Все', 'Для дома', 'Для авто'].map((cat) => (
                <span
                  key={cat}
                  className="px-5 py-2 rounded-full text-sm font-medium bg-white text-foreground border border-gray-200 cursor-default"
                >
                  {cat}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className={`fade-in-section fade-in-delay-${Math.min((index % 4) + 1, 4)}`}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="fade-in-section text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Почему выбирают Sento
              </h2>
              <p className="text-gray-500 text-lg">
                Мы делаем покупку умных товаров простой и приятной
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className={`fade-in-section fade-in-delay-${index + 1} flex flex-col items-center text-center p-8 rounded-2xl bg-background hover:shadow-md transition-shadow duration-300`}
                >
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-5">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{benefit.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="fade-in-section text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Посмотрите товары в действии
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Видеообзоры наших товаров помогут вам сделать правильный выбор
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.slice(0, 6).map((product, index) => (
                <div
                  key={product.id}
                  className={`fade-in-section fade-in-delay-${Math.min((index % 3) + 1, 4)} bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300`}
                >
                  <div className="video-container bg-primary/10">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                      poster={product.image}
                    >
                      <source src={product.video} type="video/mp4" />
                    </video>
                    {/* Overlay for when video doesn't load */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/80 to-primary/60">
                      <div className="text-center text-white p-4">
                        <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                          <svg className="w-7 h-7" fill="white" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        <p className="text-sm font-medium opacity-90">{product.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground text-sm line-clamp-1 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-primary font-bold">
                      {product.price.toLocaleString('ru-RU')} ₸
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="fade-in-section">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Готовы сделать заказ?
              </h2>
              <p className="text-white/70 text-lg mb-8">
                Свяжитесь с нами в WhatsApp и мы поможем выбрать подходящий товар
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Здравствуйте! Хочу сделать заказ.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Написать в WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
