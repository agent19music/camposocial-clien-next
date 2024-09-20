'use client'

import { useState, useEffect, useRef } from 'react'
import { ShoppingCart, X, Plus, Minus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from "next/image"

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export default function CartComponent() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "Product 1", price: 19.99, quantity: 2, image: "/placeholder.svg?height=80&width=80" },
    { id: 2, name: "Product 2", price: 29.99, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
  ])
  const cartRef = useRef<HTMLDivElement>(null)

  const toggleCart = () => setIsCartOpen(!isCartOpen)

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
      ).filter(item => item.quantity > 0)
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false)
      }
    }

    if (isCartOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isCartOpen])

  return (
    <div className="relative">
      <Button
        onClick={toggleCart}
        className="fixed top-4 right-4 z-50"
        aria-label="Toggle cart"
      >
        <ShoppingCart className="h-6 w-6" />
      </Button>

      <div 
        ref={cartRef}
        className={`
          fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-background shadow-lg transform transition-transform duration-300 ease-in-out
          ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <Button variant="ghost" onClick={toggleCart} aria-label="Close cart">
              <X className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex-grow overflow-y-auto p-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between mb-4 pb-4 border-b">
                <div className="flex items-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md mr-4"
                  />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    className="ml-2"
                    aria-label="Remove item"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <Button className="w-full" onClick={() => alert('Proceeding to checkout')}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}