import React from 'react'
import ProductCard from '@/components/productcard'
import Header from '@/components/header'
import SideNav from '@/components/sidenav'
import { Paintbrush, Cookie, Book, Shirt, Monitor, Search } from "lucide-react";
import { Input } from '@/components/ui/input'
import { Warehouse } from 'lucide-react';

export default function Marketplace() {
  const products = [
    {
      id: 1,
      images: ['/ramenposter.png', '/y2kparty.png'],
      name: 'Ichiraku Ramen',
      brand: 'Konoha',
      price: 500,
      description: 'Ramen is a popular Japanese noodle dish.',
      rating: 4.7,
      reviewsCount: 500,
      seller:{
        name: "Jane Smith",
        username: "@janesmith",
        avatar: "/yoruichipfp.jpg",
        isVerified: true,
        location: "New York, USA",
        joinedDate: "Joined September 2021",
        totalSales: 1234,
        rating: 4.8,
        about: "Passionate artisan creating unique handmade jewelry and accessories. Each piece is crafted with love and attention to detail.",
        products: [
          { id: 1, name: "Handcrafted Necklace", price: 59.99, image: "/placeholder.svg?height=200&width=200" },
          { id: 2, name: "Beaded Bracelet", price: 29.99, image: "/placeholder.svg?height=200&width=200" },
          { id: 3, name: "Gemstone Earrings", price: 39.99, image: "/placeholder.svg?height=200&width=200" },
          { id: 4, name: "Boho Anklet", price: 19.99, image: "/placeholder.svg?height=200&width=200" },
        ],
        reviews: [
          { id: 1, user: "Alice", rating: 5, comment: "Beautiful jewelry and great customer service!" },
          { id: 2, user: "Bob", rating: 4, comment: "Lovely designs, shipping was a bit slow." },
          { id: 3, user: "Charlie", rating: 5, comment: "Absolutely love my new necklace!" },
        ]
      },
      reviews: [
        {
          user: 'King Vollkorn',
          rating: 5,
          comment: 'Best ramen ever! Highly recommend to all ninja enthusiasts.',
        },
        {
          user: 'Naruto Uzumaki',
          rating: 5,
          comment: 'I could eat this ramen every day!',
        },
        {
          user: 'Sasuke Uchiha',
          rating: 4,
          comment: 'It’s good, but not worth betraying the village for.',
        },
        {
          user: 'Sakura Haruno',
          rating: 4.5,
          comment: 'Really tasty, perfect after a long training session.',
        },
      ],
    },
    {
      id: 2,
      images: ['/katana.jpg', '/katana2.webp'],
      name: 'Shinobi Katana',
      brand: 'Leaf Village Blacksmith',
      price: 1200,
      description: 'A sleek katana crafted for the finest shinobi in the land.',
      rating: 4.9,
      reviewsCount: 300,
      seller: {
        name: 'Tenten',
        avatar: '/tentenpfp.jpg',
      },
      reviews: [
        {
          user: 'Rock Lee',
          rating: 5,
          comment: 'This katana is sharper than my focus!',
        },
        {
          user: 'Neji Hyuga',
          rating: 4.5,
          comment: 'Great quality, but I rely more on my Byakugan.',
        },
        {
          user: 'Might Guy',
          rating: 5,
          comment: 'Perfect for practicing the power of youth!',
        },
      ],
    },
    {
      id: 3,
      images: ['/kunai.jpg', '/shuriken.jpg'],
      name: 'Kunai Set',
      brand: 'Hidden Leaf Supplies',
      price: 300,
      description: 'A set of sharp kunai perfect for stealth missions.',
      rating: 4.8,
      reviewsCount: 200,
      seller: {
        name: 'Shikamaru Nara',
        avatar: '/shikamarupfp.jpg',
      },
      reviews: [
        {
          user: 'Temari',
          rating: 4,
          comment: 'A good kunai, though I prefer my fan.',
        },
        {
          user: 'Choji Akimichi',
          rating: 5,
          comment: 'Lightweight and easy to throw!',
        },
        {
          user: 'Ino Yamanaka',
          rating: 4.5,
          comment: 'Very handy during missions!',
        },
      ],
    },
  ];
  

  const marketplaceLinks = [
    { href: "/art", label: "Art ", icon: <Paintbrush className="h-4 w-4" /> },
    { href: "/food", label: "Food ", icon: <Cookie className="h-4 w-4" /> },
    { href: "/books", label: "Books", icon: <Book className="h-4 w-4" /> },
    { href: "/clothing", label: "Clothing", icon: <Shirt className="h-4 w-4" /> },
    { href: "/tech", label: "Tech", icon: <Monitor className="h-4 w-4" /> },
    { href: "/sellerdashboard/sellersignup", label: "Become a seller", icon: <Warehouse className="h-4 w-4" /> },

  ];

  // Array to simulate 21 products

  return (
    <div className="w-screen h-screen lg:container mx-auto p-4">
      <Header />
      <div className="flex flex-col md:flex-row">
        {/* Left SideNav */}
      
        <SideNav links={marketplaceLinks} />
 
        
        {/* Right Content */}
        <div className="flex-1 flex flex-col gap-4 p-4 lg:gap-6 lg:p-2">
          
          {/* Search bar */}
          <div className="w-full flex justify-center items-center">
            <form>
              <div className="relative mx-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products ..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-full"
                />
              </div>
            </form>
          </div>
          
          {/* Grid of products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center justify-center  md:grid-cols-3 gap-6 lg:h-[82vh] md:h-[82vh] lg:overflow-y-scroll ">
  {products.map((product, index) => (
    <ProductCard key={index} product={product} />
  ))}
</div>

        </div>
      </div>
    </div>
  );
}
