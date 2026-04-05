// TZ: Mobile bottom navigation — Главная, Каталог, Категории, Контакты
import Link from 'next/link'
import { useRouter } from 'next/router'

const NAV = [
  {
    href: '/',
    label: 'Главная',
    icon: (a) => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill={a ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={a ? 0 : 1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: '/catalog',
    label: 'Каталог',
    icon: (a) => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill={a ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={a ? 0 : 1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    href: '/category/home',
    label: 'Категории',
    icon: (a) => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill={a ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={a ? 0 : 1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
  },
  {
    href: 'https://wa.me/77001234567?text=' + encodeURIComponent('Здравствуйте! Хочу узнать о товарах Sento.'),
    label: 'Контакты',
    external: true,
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
]

export default function BottomNav() {
  const router = useRouter()

  const isActive = (href) => {
    if (!href || href.startsWith('http')) return false
    return href === '/' ? router.pathname === '/' : router.pathname.startsWith(href)
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/92 backdrop-blur-sm border-t border-border bottom-nav-safe"
      aria-label="Мобильная навигация"
    >
      <div className="flex items-center justify-around h-16 px-1">
        {NAV.map((item) => {
          const active = isActive(item.href)
          const cls = `flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors duration-200 ${
            active ? 'text-primary' : 'text-text-2 hover:text-text'
          }`
          const content = (
            <>
              {item.icon(active)}
              <span className="font-ui text-[9px] font-semibold">{item.label}</span>
              {active && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />}
            </>
          )

          return item.external ? (
            <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className={cls + ' relative'}>
              {content}
            </a>
          ) : (
            <Link key={item.href} href={item.href} className={cls + ' relative'}>
              {content}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
