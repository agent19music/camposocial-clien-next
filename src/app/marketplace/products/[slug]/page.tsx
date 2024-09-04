"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Paintbrush, Cookie, Book, Shirt, Monitor, Search } from "lucide-react";
import Header from "@/components/header"
import SideNav from "@/components/sidenav"
import { useContext } from "react"
import { MarketplaceContext } from "@/context/marketplacecontext"

// Mock data


const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${
            star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  )
}

export default function SingleProductPage() {
  const {selectedProduct} = useContext(MarketplaceContext);
  const {navigateToSingleSellerView} = useContext(MarketplaceContext)
  const [selectedImage, setSelectedImage] = useState(selectedProduct.images[0])
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")

  const averageRating = selectedProduct.reviews.length > 0
    ? selectedProduct.reviews.reduce((acc, review) => acc + review.rating, 0) / selectedProduct.reviews.length
    : 5

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
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square">
            <Image
              src={selectedImage}
              alt={selectedProduct.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {selectedProduct.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className="relative w-20 h-20 flex-shrink-0"
              >
                <Image
                  src={image}
                  alt={`${selectedProduct.name} thumbnail ${index + 1}`}
                  fill
                  className={`object-cover rounded-md ${
                    selectedImage === image ? "ring-2 ring-primary" : ""
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* selectedProduct Information */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{selectedProduct.name}</h1>
          <div className="flex items-center space-x-2">
            <StarRating rating={Math.round(averageRating)} />
            <span className="text-sm text-gray-500">
              ({selectedProduct.reviews.length} reviews)
            </span>
          </div>
          <p className="text-xl font-semibold">${selectedProduct.price.toFixed(2)}</p>
          <p className="text-gray-600">{selectedProduct.description}</p>

          {/* Seller Information */}
          <div className="flex items-center space-x-4 hover:cursor-pointer "
          onClick={()=> navigateToSingleSellerView(selectedProduct.seller)}
          >
            <div className="relative w-12 h-12">
              <Image
                src={selectedProduct.seller.avatar}
                alt={selectedProduct.seller.name}
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div>
              <p className="font-semibold">{selectedProduct.seller.name}</p>
              <p className="text-sm text-gray-500">Verified Seller</p>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button className="w-full">
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <div className="space-y-4">
          {selectedProduct.reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{review.user}</p>
                  <StarRating rating={review.rating} />
                </div>
                <p className="mt-2 text-gray-600">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Review System */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
          <div className="flex items-center space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                <Star className="w-8 h-8 fill-current" />
              </button>
            ))}
          </div>
          <Textarea
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="mb-4"
          />
          <Button>Submit Review</Button>
        </CardContent>
      </Card>
    </div>
    </div>
    </div>
  )
}