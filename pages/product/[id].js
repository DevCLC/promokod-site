import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import BottomNav from '../../components/BottomNav'
import ProductCard from '../../components/ProductCard'
import products from '../../data/products'
import useCart from '../../hooks/useCart'

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
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(products.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, 4)

  const handleBuy = () => {
    const msg = `Хочу купить ${product.name} за ${product.price.toLocaleString('ru-RU')} ₸`
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer')
  }

  const handleAdd = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <>
      <Head>
        <title>{product.name} — Sento</title>
        <meta name="description" content={product.description.slice(0, 155)} />
      </Head>

      <Header />

      <main className="min-h-screen bg-background pt-16 pb-24 md:pb-0">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 md:py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <span>/</span>
            <Link href="/catalog" className="hover:text-primary transition-colors">Каталог</Link>
            <span>/</span>
            <span className="text-foreground line-clamp-1">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-20">
            {/* Media */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl md:rounded-3xl overflow-hidden bg-muted">
                {product.badge && (
                  <span className={`absolute top-4 left-4 z-10 text-xs font-semibold px-3 py-1.5 rounded-full ${
                    product.badge === 'Хит' ? 'bg-primary text-white' : 'bg-accent text-primary'
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
              {/* Video */}
              <div className="rounded-2xl overflow-hidden bg-muted aspect-video">
                <video
                  src={product.video}
                  autoPlay loop muted playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
                {product.category === 'home' ? 'Умный дом' : 'Авто'}
              </p>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
                {product.name}
              </h1>
              <p className="font-serif text-3xl md:text-4xl font-bold text-primary mb-6">
                {product.price.toLocaleString('ru-RU')} <span className="text-2xl">₸</span>
              </p>

              <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-8">
                {product.description}
              </p>

              {/* Features */}
              <div className="flex flex-col gap-2.5 mb-8">
                {['Быстрая доставка по Казахстану', 'Гарантия качества', 'Возврат 14 дней'].map((f) => (
                  <div key={f} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-muted-foreground">{f}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <button
                  onClick={handleBuy}
                  className="btn-whatsapp flex-1 text-base py-4"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Купить через WhatsApp
                </button>
                <button
                  onClick={handleAdd}
                  className={`flex-1 text-base py-4 rounded-full font-semibold border-2 transition-all duration-300 flex items-center justify-center gap-2 ${
                    added
                      ? 'bg-primary border-primary text-white'
                      : 'bg-transparent border-border text-foreground hover:border-primary hover:text-primary'
                  }`}
                >
                  {added ? (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Добавлено!
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      В корзину
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Related */}
          <section>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">Похожие товары</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </>
  )
}
