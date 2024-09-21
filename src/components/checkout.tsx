import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

type CurrentUser = {
  firstName: string
  lastName: string
  address: string
  phone: string
  email: string
} | null

const cartItems: CartItem[] = [
  { id: '1', name: 'Product 1', price: 19.99, quantity: 2, image: '/placeholder.svg?height=80&width=80' },
  { id: '2', name: 'Product 2', price: 29.99, quantity: 1, image: '/placeholder.svg?height=80&width=80' },
  { id: '3', name: 'Product 3', price: 39.99, quantity: 3, image: '/placeholder.svg?height=80&width=80' },
  { id: '4', name: 'Product 4', price: 49.99, quantity: 1, image: '/placeholder.svg?height=80&width=80' },
  { id: '5', name: 'Product 5', price: 59.99, quantity: 2, image: '/placeholder.svg?height=80&width=80' },
]

const currentUser: CurrentUser = {
  firstName: 'John',
  lastName: 'Doe',
  address: '123 Main St, Anytown, AN 12345',
  phone: '(555) 123-4567',
  email: 'john.doe@example.com',
}

export default function CheckoutComponent() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: '',
  })

  useEffect(() => {
    if (currentUser) {
      setFormData(currentUser)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting order with form data:', formData)
    // Here you would typically send this data to your backend
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Cart</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center mb-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md mr-4"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </ScrollArea>
            <Separator className="my-4" />
            <div className="flex justify-between items-center font-bold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" onClick={handleSubmit}>
              Place Order
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}