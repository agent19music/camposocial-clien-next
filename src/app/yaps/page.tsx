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

const YapCard = ({ username, handle, content, avatar }) => {
  const [isLiked, setIsLiked] = React.useState(false)

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex space-x-2">
          <Avatar className="w-10 h-10">
            <AvatarImage src={avatar} alt={username} />
            <AvatarFallback>{username[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-bold">{username}</h3>
            <p className="text-sm text-muted-foreground">@{handle}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Mute this account
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will mute all yaps from this account. You can unmute them later.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Mute</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Block this account
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will block the account. You won't see their yaps and they can't interact with you.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Block</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Report yap
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Report this yap?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will send a report to our moderation team for review.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Report</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm">
          <MessageCircle className="mr-2 h-4 w-4" />
          Reply
        </Button>
        <Button variant="ghost" size="sm">
          <Repeat className="mr-2 h-4 w-4" />
          Reyap
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsLiked(!isLiked)}
          className={isLiked ? "text-red-500" : ""}
        >
          <Heart className="mr-2 h-4 w-4" fill={isLiked ? "currentColor" : "none"} />
          Like
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function Component() {
  const yaps = [
    {
      username: "Alice Johnson",
      handle: "alice_j",
      content: "Just launched my new project! Check it out at yaps.com/myproject 🚀",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      username: "Bob Smith",
      handle: "bobsmith42",
      content: "Had an amazing time at the tech conference today. So many great ideas! #TechConf2023",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      username: "Carol White",
      handle: "carol_codes",
      content: "Does anyone have experience with GraphQL? Looking for some tips to optimize my queries.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">YAPS</h1>
      <Tabs defaultValue="for-you" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="for-you">For You</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>
        <TabsContent value="for-you">
          {yaps.map((yap, index) => (
            <YapCard key={index} {...yap} />
          ))}
        </TabsContent>
        <TabsContent value="following">
          <p className="text-center text-muted-foreground mt-4">
            Yaps from accounts you follow will appear here.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  )
}