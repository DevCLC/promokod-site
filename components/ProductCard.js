// ProductCard — Bento Box style (skill #39: rounded-bento, shadow-bento, hover scale 1.02)
import Link from 'next/link'
import Image from 'next/image'

export default function ProductCard({ product, size = 'normal' }) {
  const isTall = size === 'tall'

  return (
    <article className={`bento-card shadow-bento flex flex-col h-full group ${isTall ? 'bento-tall' : ''}`}>
      {/* Image — skill: fill container, object-cover */}
      <Link
        href={`/product/${product.slug || product.id}`}
        className="block relative overflow-hidden bg-surface-2 flex-shrink-0"
        style={{ height: isTall ? '65%' : '58%' }}
        aria-label={`Перейти к товару: ${product.name}`}
      >
        {product.badge && (
          <span
            className={`absolute top-3 left-3 z-10 font-ui text-[11px] font-semibold px-2.5 py-1 rounded-full tracking-wide ${
              product.badge === 'Хит' ? 'bg-primary text-white' : 'bg-accent text-primary'
            }`}
          >
            {product.badge}
          </span>
        )}
        <Image
          src={product.image}
          alt={`${product.name} — купить в Казахстане на Kaspi`}
          fill
          unoptimized
          className="bento-img object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </Link>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <p className="font-ui text-[10px] font-semibold uppercase tracking-widest text-text-2">
          {product.category === 'home' ? 'Умный дом' : 'Авто'}
        </p>

        <Link href={`/product/${product.slug || product.id}`} className="block flex-1">
          <h3 className="font-sans text-[13px] font-semibold text-text leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between gap-2 mt-auto pt-1">
          <p className="font-serif font-bold text-text text-base leading-none">
            {product.price.toLocaleString('ru-RU')}<span className="text-xs ml-0.5 font-sans font-medium">₸</span>
          </p>
          <a
            href={product.kaspiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-kaspi font-ui text-[11px] px-3 py-1.5 flex-shrink-0"
            aria-label={`Купить ${product.name} на Kaspi.kz`}
            onClick={(e) => e.stopPropagation()}
          >
            Kaspi →
          </a>
        </div>
      </div>
    </article>
  )
}
