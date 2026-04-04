import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useCart from '../hooks/useCart'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { itemCount, mounted } = useCart()
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Главная' },
    { href: '/catalog', label: 'Каталог' },
  ]

  const isActive = (href) => {
    if (href === '/') return router.pathname === '/'
    return router.pathname.startsWith(href)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
              <span className="font-serif text-accent font-bold text-base leading-none">S</span>
            </div>
            <span className="font-serif text-xl font-bold text-primary tracking-tight group-hover:opacity-70 transition-opacity">
              Sento
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 relative pb-0.5
                  after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-primary after:transition-all after:duration-300
                  ${isActive(link.href)
                    ? 'text-primary after:w-full'
                    : 'text-muted-foreground hover:text-primary after:w-0 hover:after:w-full'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart — desktop */}
          <Link href="/cart" className="hidden md:flex items-center gap-2 group" aria-label="Корзина">
            <div className="relative">
              <svg className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {mounted && itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </div>
            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
              Корзина
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}
