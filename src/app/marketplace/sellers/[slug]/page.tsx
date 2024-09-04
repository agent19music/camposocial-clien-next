'use client'
import { useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { MapPin, Star, Package, MessageCircle, CheckCircle2, ShoppingCart } from 'lucide-react'
import Header from '@/components/header'
import SideNav from '@/components/sidenav'
import { Paintbrush, Cookie, Book, Shirt, Monitor, Search } from "lucide-react";
import { useContext } from 'react'
import { MarketplaceContext } from '@/context/marketplacecontext'

// Mock data for the seller

export default function SellerProfile() {
  const [activeTab, setActiveTab] = useState("products")

  const {selectedSeller} = useContext(MarketplaceContext)
  const sellerData = selectedSeller

  const marketplaceLinks = [
    { href: "/art", label: "Art ", icon: <Paintbrush className="h-4 w-4" /> },
    { href: "/food", label: "Food ", icon: <Cookie className="h-4 w-4" /> },
    { href: "/books", label: "Books", icon: <Book className="h-4 w-4" /> },
    { href: "/clothing", label: "Clothing", icon: <Shirt className="h-4 w-4" /> },
    { href: "/tech", label: "Tech", icon: <Monitor className="h-4 w-4" /> },
  ];

  return (
    <div className="w-screen h-screen lg:container mx-auto p-4">
    <Header />
    <div className="flex flex-col md:flex-row">
      {/* Left SideNav */}
      <SideNav links={marketplaceLinks} />
      <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
      <Card className="mb-8 overflow-hidden">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-6">
          <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
            <AvatarImage src={sellerData.avatar} alt={sellerData.name} />
            <AvatarFallback>{sellerData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-2 mb-2">
              <CardTitle className="text-2xl sm:text-3xl">{sellerData.name}</CardTitle>
              {sellerData.isVerified && (
                <Badge variant="secondary" className="ml-0 sm:ml-2 text-green-400
                ">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            <CardDescription className="text-lg">{sellerData.username}</CardDescription>
            <div className="flex items-center justify-center sm:justify-start text-muted-foreground text-sm mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {sellerData.location}
            </div>
          </div>
          <Button className="mt-4 sm:mt-0">
            <MessageCircle className="h-4 w-4 mr-2" />
            Contact
          </Button>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-wrap justify-between gap-2 mb-6">
            <div className="flex-1 flex flex-col items-center p-2 sm:p-4 bg-muted rounded-lg min-w-[100px]">
              <ShoppingCart className="h-6 w-6 sm:h-10 sm:w-10 mb-1 sm:mb-2 text-primary" />
              <span className="text-lg sm:text-3xl font-bold">{sellerData.totalSales}</span>
              <span className="text-xs sm:text-sm text-muted-foreground">Total Sales</span>
            </div>
            <div className="flex-1 flex flex-col items-center p-2 sm:p-4 bg-muted rounded-lg min-w-[100px]">
              <Star className="h-6 w-6 sm:h-10 sm:w-10 mb-1 sm:mb-2 text-primary" />
              <span className="text-lg sm:text-3xl font-bold">{sellerData.rating}</span>
              <span className="text-xs sm:text-sm text-muted-foreground">Rating</span>
            </div>
            <div className="flex-1 flex flex-col items-center p-2 sm:p-4 bg-muted rounded-lg min-w-[100px]">
              <Package className="h-6 w-6 sm:h-10 sm:w-10 mb-1 sm:mb-2 text-primary" />
              <span className="text-lg sm:text-3xl font-bold">{sellerData.products.length}</span>
              <span className="text-xs sm:text-sm text-muted-foreground">Products</span>
            </div>
          </div>
          <Progress value={sellerData.rating * 20} className="h-2 mb-2" />
          <div className="text-sm text-center text-muted-foreground">{sellerData.joinedDate}</div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About {sellerData.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base sm:text-lg leading-relaxed">{sellerData.about}</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="products">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {sellerData.products.map((product) => (
              <Card key={product.id} className="flex flex-col">
                <CardHeader className="p-0">
                  <img src={product.image} alt={product.name} className="w-full h-48 sm:h-64 object-cover rounded-t-lg" />
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <h3 className="font-semibold text-base sm:text-lg mb-2">{product.name}</h3>
                  <p className="text-lg sm:text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {sellerData.reviews.map((review, index) => (
                <div key={review.id}>
                  {index > 0 && <Separator className="my-4" />}
                  <div className="flex items-center mb-2">
                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10 mr-3">
                      <AvatarFallback>{review.user[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="font-semibold text-base sm:text-lg">{review.user}</span>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-3 w-3 sm:h-4 sm:w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground mt-2">{review.comment}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </div>
    </div>
  )
}