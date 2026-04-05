import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const NAV = [
  { href: '/', label: 'Главная' },
  { href: '/catalog', label: 'Каталог' },
  { href: '/category/home', label: 'Умный дом' },
  { href: '/category/auto', label: 'Авто' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const isActive = (href) =>
    href === '/' ? router.pathname === '/' : router.pathname.startsWith(href)

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-blur shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-14 md:h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-7 h-7 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="font-serif text-accent font-bold text-sm leading-none">S</span>
          </span>
          <span className="font-serif text-lg font-bold text-text group-hover:opacity-60 transition-opacity tracking-tight">
            Sento
          </span>
        </Link>

        {/* Desktop nav — pill style (Apple) */}
        <nav className="hidden lg:flex items-center gap-1 bg-black/5 rounded-full px-2 py-1.5" aria-label="Основная навигация">
          {NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`font-ui text-[13px] font-medium px-4 py-1.5 rounded-full transition-all duration-200 ${
                isActive(l.href)
                  ? 'bg-white text-text shadow-sm'
                  : 'text-text-2 hover:text-text'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="https://kaspi.kz/shop/search/?q=умные+гаджеты+дом+авто&c=750000000"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex btn btn-kaspi font-ui text-xs px-4 py-2"
        >
          Купить на Kaspi
        </a>

        {/* Mobile */}
        <a
          href="https://kaspi.kz/shop/search/?q=умные+гаджеты&c=750000000"
          target="_blank"
          rel="noopener noreferrer"
          className="md:hidden font-ui text-xs font-semibold text-kaspi"
        >
          Kaspi →
        </a>
      </div>
    </header>
  )
}
