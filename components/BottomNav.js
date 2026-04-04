import Link from 'next/link'
import { useRouter } from 'next/router'

const NAV = [
  {
    href: '/',
    label: 'Главная',
    icon: (a) => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill={a ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={a ? 0 : 1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: '/catalog',
    label: 'Каталог',
    icon: (a) => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill={a ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={a ? 0 : 1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    href: 'https://kaspi.kz/shop/search/?q=умные+гаджеты+дом+авто&c=750000000',
    label: 'Kaspi',
    external: true,
    icon: () => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
]

export default function BottomNav() {
  const router = useRouter()

  const isActive = (href) => {
    if (href.startsWith('http')) return false
    return href === '/' ? router.pathname === '/' : router.pathname.startsWith(href)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/90 backdrop-blur-apple border-t border-border bottom-nav-safe">
      <div className="flex items-center justify-around h-16">
        {NAV.map((item) => {
          const active = isActive(item.href)
          const cls = `flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors ${
            active ? 'text-brand' : item.external ? 'text-kaspi' : 'text-secondary'
          }`
          const content = (
            <>
              {item.icon(active)}
              <span className="text-[10px] font-medium">{item.label}</span>
            </>
          )

          return item.external ? (
            <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>
              {content}
            </a>
          ) : (
            <Link key={item.href} href={item.href} className={cls}>
              {content}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
