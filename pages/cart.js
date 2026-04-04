import { useEffect } from 'react'
import { useRouter } from 'next/router'

// Cart removed — we sell via Kaspi.kz
export default function CartRedirect() {
  const router = useRouter()
  useEffect(() => { router.replace('/catalog') }, [router])
  return null
}
