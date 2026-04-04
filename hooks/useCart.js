import { useState, useEffect, useCallback } from 'react'

const CART_KEY = 'sento_cart'

function getCartFromStorage() {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(CART_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveCartToStorage(cart) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  } catch {
    // ignore storage errors
  }
}

export default function useCart() {
  const [cartItems, setCartItems] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setCartItems(getCartFromStorage())
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      saveCartToStorage(cartItems)
    }
  }, [cartItems, mounted])

  const addToCart = useCallback((product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const updateQuantity = useCallback((id, quantity) => {
    if (quantity < 1) return
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    itemCount,
    mounted,
  }
}
