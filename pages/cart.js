import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BottomNav from '../components/BottomNav'
import useCart from '../hooks/useCart'

const WA = '77001234567'

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, total, mounted } = useCart()

  if (!mounted) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background pt-16 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </main>
      </>
    )
  }

  const handleOrder = () => {
    if (!cartItems.length) return
    const lines = cartItems.map(
      (item) => `• ${item.name} ×${item.quantity} — ${(item.price * item.quantity).toLocaleString('ru-RU')} ₸`
    )
    const msg = `Заказ Sento:\n\n${lines.join('\n')}\n\nИтого: ${total.toLocaleString('ru-RU')} ₸`
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <Head>
        <title>Корзина — Sento</title>
        <meta name="description" content="Ваша корзина в магазине Sento" />
      </Head>

      <Header />

      <main className="min-h-screen bg-background pt-16 pb-24 md:pb-16">
        {/* Header */}
        <div className="bg-primary text-white py-10 md:py-14">
          <div className="max-w-4xl mx-auto px-5 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Покупки</p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold">Корзина</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-8 md:py-10">
          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-9 h-9 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Корзина пуста</h2>
              <p className="text-muted-foreground mb-8">Добавьте товары, чтобы оформить заказ</p>
              <Link href="/catalog" className="btn-primary inline-flex text-sm px-8 py-3.5">
                Перейти в каталог
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Items */}
              <div className="flex-1 space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-card rounded-2xl p-4 shadow-card flex gap-4 items-center">
                    <Link href={`/product/${item.id}`} className="flex-shrink-0">
                      <div className="relative w-18 h-18 w-[72px] h-[72px] rounded-xl overflow-hidden bg-muted">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${item.id}`}>
                        <p className="text-sm font-medium text-foreground hover:text-primary transition-colors line-clamp-2 leading-snug">
                          {item.name}
                        </p>
                      </Link>
                      <p className="font-serif font-semibold text-primary mt-1">
                        {item.price.toLocaleString('ru-RU')} ₸
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-3 flex-shrink-0">
                      {/* Qty */}
                      <div className="flex items-center gap-1 bg-muted rounded-full px-1 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-foreground hover:bg-card disabled:opacity-30 transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-foreground hover:bg-card transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-red-500 transition-colors"
                        aria-label="Удалить"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  onClick={clearCart}
                  className="text-xs text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-1.5 pt-1"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Очистить корзину
                </button>
              </div>

              {/* Summary */}
              <div className="lg:w-72">
                <div className="bg-card rounded-2xl p-6 shadow-card sticky top-24">
                  <h2 className="font-serif text-xl font-bold text-foreground mb-5">Итого</h2>

                  <div className="space-y-2 mb-5">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-start gap-2 text-sm">
                        <span className="text-muted-foreground line-clamp-1 flex-1">{item.name} ×{item.quantity}</span>
                        <span className="font-medium text-foreground whitespace-nowrap">
                          {(item.price * item.quantity).toLocaleString('ru-RU')} ₸
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">Итого</span>
                      <span className="font-serif font-bold text-primary text-2xl">
                        {total.toLocaleString('ru-RU')} ₸
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleOrder}
                    className="btn-whatsapp w-full text-sm py-3.5"
                  >
                    <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24" style={{width:'1.125rem',height:'1.125rem'}}>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Оформить через WhatsApp
                  </button>
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    Вы перейдёте в WhatsApp для подтверждения
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <BottomNav />
    </>
  )
}
