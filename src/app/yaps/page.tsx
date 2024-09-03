"use client"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Heart, MessageCircle, MoreHorizontal, Repeat, Share2 } from "lucide-react"
import { Home,Calendar, PartyPopper } from "lucide-react";
import Header from '@/components/header'
import SideNav from '@/components/sidenav'
import { Input } from '@/components/ui/input'
import { Search, Repeat2 } from 'lucide-react'
import Image from 'next/image';
import YapCard from '@/components/yapcard'
import { useContext } from 'react'
import { YapContext } from '@/context/yapcontext'
import YapCardSkeleton from '@/components/yapskeleton'





export default function Component() {
  
  const {yaps} = useContext(YapContext)

  const eventLinks = [
    { href: "/comingsoon", label: "Coming Soon", icon: <Home className="h-4 w-4" /> },
    { href: "/social-events", label: "Social Events", icon: <Calendar className="h-4 w-4" /> },
    { href: "/fun-events", label: "Fun Events", icon: <PartyPopper className="h-4 w-4" /> },
  ];


  return (
    <div className="container mx-auto p-4">
            <Header/>
            <div className="flex  flex-col md:flex-row">
    {/* Left SideNav */}
    <SideNav links={eventLinks} />
    <div className='flex-1 flex flex-col gap-4 p-4 lg:gap-6 lg:p-2 justify-center items-center'>
      <div className="w-full flex-1   flex justify-center items-center">
        <form>
          <div className="relative mx-auto">  

            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search yaps ..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-full"
            />
          </div>
        </form>
      </div>
      <Tabs defaultValue="for-you" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="for-you">For You</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>
        <TabsContent value="for-you">
  {yaps.length < 1 ? (
    // Display Skeletons while loading
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <YapCardSkeleton key={index} />
      ))}
    </>
  ) : (
    // Display YapCards when data is loaded
    yaps.length > 0 &&
    yaps.map((yap, index) => (
      <YapCard key={index} {...yap} yap={yap} />
    ))
  )}
</TabsContent>

        <TabsContent value="following">
          <p className="text-center text-muted-foreground mt-4">
            Yaps from accounts you follow will appear here.
          </p>
        </TabsContent>
      </Tabs>
      </div>

      </div>
    </div>
  )
}