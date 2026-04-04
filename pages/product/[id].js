import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ProductCard from '../../components/ProductCard'
import products from '../../data/products'
import useCart from '../../hooks/useCart'

const WHATSAPP_NUMBER = '77001234567'

export async function getStaticPaths() {
  const paths = products.map((p) => ({
    params: { id: String(p.id) },
  }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const product = products.find((p) => p.id === Number(params.id))
  if (!product) {
    return { notFound: true }
  }
  return { props: { product } }
}

export default function ProductPage({ product }) {
  const router = useRouter()
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4)

  const otherProducts = products
    .filter((p) => p.id !== product.id && p.category !== product.category)
    .slice(0, 4 - relatedProducts.length)

  const displayRelated = [...relatedProducts, ...otherProducts].slice(0, 4)

  const handleBuy = () => {
    const message = `Хочу купить ${product.name} за ${product.price.toLocaleString('ru-RU')} ₸`
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleAddToCart = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary text-xl">Загрузка...</div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{product.name} — Sento</title>
        <meta name="description" content={product.description.slice(0, 160)} />
        <meta property="og:title" content={`${product.name} — Sento`} />
        <meta property="og:description" content={product.description.slice(0, 160)} />
        <meta property="og:image" content={product.image} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className="pt-16 min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/#products" className="hover:text-primary transition-colors">Каталог</Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
          </nav>
        </div>

        {/* Product Detail */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Media Column */}
              <div className="relative">
                {/* Product Image */}
                <div className="relative aspect-square bg-background">
                  {product.badge && (
                    <span
                      className={`absolute top-4 left-4 z-10 text-white text-sm font-bold px-3 py-1.5 rounded-full ${
                        product.badge === 'Хит' ? 'bg-accent' : 'bg-primary'
                      }`}
                    >
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

                {/* Video */}
                <div className="video-container bg-primary/5">
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
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/70 to-primary/50">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                        <svg className="w-8 h-8" fill="white" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium">Видео-обзор</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Column */}
              <div className="p-8 lg:p-10 flex flex-col">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      product.category === 'home'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-accent/10 text-accent'
                    }`}>
                      {product.category === 'home' ? 'Для дома' : 'Для авто'}
                    </span>
                    {product.badge && (
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full text-white ${
                        product.badge === 'Хит' ? 'bg-accent' : 'bg-primary'
                      }`}>
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 leading-snug">
                    {product.name}
                  </h1>

                  <div className="text-4xl font-bold text-primary mb-6">
                    {product.price.toLocaleString('ru-RU')} <span className="text-2xl">₸</span>
                  </div>

                  <div className="prose prose-sm text-gray-600 leading-relaxed mb-8">
                    <p>{product.description}</p>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {[
                      { icon: '🚚', text: 'Доставка 1-5 дней' },
                      { icon: '✅', text: 'Гарантия качества' },
                      { icon: '🔄', text: 'Возврат 14 дней' },
                      { icon: '💬', text: 'Поддержка в WhatsApp' },
                    ].map((feature) => (
                      <div
                        key={feature.text}
                        className="flex items-center gap-2 text-sm text-gray-600 bg-background rounded-lg p-3"
                      >
                        <span>{feature.icon}</span>
                        <span>{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 mt-auto">
                  <button
                    onClick={handleBuy}
                    className="btn-whatsapp w-full py-4 text-base"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Купить через WhatsApp
                  </button>

                  <button
                    onClick={handleAddToCart}
                    className={`w-full py-4 text-base rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                      added
                        ? 'bg-green-500 text-white'
                        : 'btn-primary'
                    }`}
                  >
                    {added ? (
                      <>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Добавлено в корзину
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Добавить в корзину
                      </>
                    )}
                  </button>

                  <Link
                    href="/#products"
                    className="text-center text-sm text-gray-500 hover:text-primary transition-colors py-2"
                  >
                    ← Вернуться в каталог
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {displayRelated.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">
              Похожие товары
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {displayRelated.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  )
}
