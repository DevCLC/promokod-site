import Link from 'next/link'
import Image from 'next/image'

export default function ProductCard({ product }) {
  return (
    <article className="p-card bg-surface rounded-apple overflow-hidden shadow-card group flex flex-col h-full">
      {/* Image */}
      <Link href={`/product/${product.id}`} className="block relative overflow-hidden bg-bg aspect-square">
        {product.badge && (
          <span className={`absolute top-3 left-3 z-10 text-[11px] font-semibold px-2.5 py-1 rounded-full tracking-wide ${
            product.badge === 'Хит'
              ? 'bg-brand text-white'
              : 'bg-accent text-brand'
          }`}>
            {product.badge}
          </span>
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          unoptimized
          className="p-card-img object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </Link>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/product/${product.id}`} className="block mb-auto">
          <p className="text-[11px] font-medium uppercase tracking-widest text-secondary mb-1">
            {product.category === 'home' ? 'Умный дом' : 'Авто'}
          </p>
          <h3 className="text-sm font-semibold text-apple-black leading-snug line-clamp-2 group-hover:text-brand transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="mt-4 flex items-end justify-between gap-2">
          <p className="font-serif text-lg font-bold text-apple-black leading-none">
            {product.price.toLocaleString('ru-RU')}<span className="text-sm ml-0.5">₸</span>
          </p>
          <a
            href={product.kaspiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-kaspi text-[12px] px-3 py-2 flex-shrink-0"
            aria-label={`Купить ${product.name} на Kaspi.kz`}
          >
            Kaspi →
          </a>
        </div>
      </div>
    </article>
  )
}
