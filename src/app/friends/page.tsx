"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { MoreHorizontal, MessageCircle, UserPlus, Search } from "lucide-react"
import {  Home, Calendar, PartyPopper } from 'lucide-react'
import Header from '@/components/header'
import SideNav from '@/components/sidenav'


interface Friend {
  id: number
  username: string
  photoUrl: string
  course: string
}

interface Suggestion {
  id: number
  username: string
  photoUrl: string
  mutualFriends: number
}

interface User {
  id: number
  username: string
  photoUrl: string
}

const FriendCard = ({ friend }: { friend: Friend }) => {
  const [showAlert, setShowAlert] = useState<"unfriend" | "block" | null>(null)
 


  return (
    
    <Card className="mb-4">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={friend.photoUrl} alt={friend.username} />
            <AvatarFallback>{friend.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{friend.username}</h3>
            <p className="text-sm text-gray-500">{friend.course}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <MessageCircle className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setShowAlert("unfriend")}>Unfriend</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setShowAlert("block")}>Block</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
      <AlertDialog open={showAlert !== null} onOpenChange={() => setShowAlert(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {showAlert === "unfriend" ? "Unfriend" : "Block"} {friend.username}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {showAlert === "unfriend" ? "unfriend" : "block"} {friend.username}?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              // Handle unfriend or block action here
              console.log(`${showAlert === "unfriend" ? "Unfriended" : "Blocked"} ${friend.username}`)
              setShowAlert(null)
            }}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}

const SuggestionCard = ({ suggestion }: { suggestion: Suggestion }) => {
  return (
    <Card className="mb-4">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={suggestion.photoUrl} alt={suggestion.username} />
            <AvatarFallback>{suggestion.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{suggestion.username}</h3>
            <p className="text-sm text-gray-500">{suggestion.mutualFriends} mutual friends</p>
          </div>
        </div>
        <Button variant="secondary" size="sm">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Friend
        </Button>
      </CardContent>
    </Card>
  )
}

const SearchResultCard = ({ user, onAddFriend }: { user: User; onAddFriend: () => void }) => {
  return (
    <div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
      <div className="flex items-center space-x-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.photoUrl} alt={user.username} />
          <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="font-medium">{user.username}</span>
      </div>
      <Button variant="ghost" size="sm" onClick={onAddFriend}>
        <UserPlus className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default function Component() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<User[]>([])

  const friends: Friend[] = [
    { id: 1, username: "Alice", photoUrl: "/placeholder.svg?height=40&width=40", course: "Computer Science" },
    { id: 2, username: "Bob", photoUrl: "/placeholder.svg?height=40&width=40", course: "Engineering" },
    { id: 3, username: "Charlie", photoUrl: "/placeholder.svg?height=40&width=40", course: "Mathematics" },
  ]

  const suggestions: Suggestion[] = [
    { id: 1, username: "David", photoUrl: "/placeholder.svg?height=40&width=40", mutualFriends: 5 },
    { id: 2, username: "Eve", photoUrl: "/placeholder.svg?height=40&width=40", mutualFriends: 3 },
    { id: 3, username: "Frank", photoUrl: "/placeholder.svg?height=40&width=40", mutualFriends: 2 },
  ]

  const allUsers: User[] = [
    ...friends.map(f => ({ id: f.id, username: f.username, photoUrl: f.photoUrl })),
    ...suggestions.map(s => ({ id: s.id, username: s.username, photoUrl: s.photoUrl })),
    { id: 4, username: "Grace", photoUrl: "/placeholder.svg?height=40&width=40" },
    { id: 5, username: "Henry", photoUrl: "/placeholder.svg?height=40&width=40" },
    { id: 6, username: "Ivy", photoUrl: "/placeholder.svg?height=40&width=40" },
  ]

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setSearchResults([])
    } else {
      const results = allUsers.filter(user =>
        user.username.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(results)
    }
  }

  const handleAddFriend = (user: User) => {
    console.log(`Added ${user.username} as a friend`)
    // Here you would typically update the friends list and remove from suggestions
  }
  const eventLinks = [
    { href: "/comingsoon", label: "Coming Soon", icon: <Home className="h-4 w-4" /> },
    { href: "/social-events", label: "Social Events", icon: <Calendar className="h-4 w-4" /> },
    { href: "/fun-events", label: "Fun Events", icon: <PartyPopper className="h-4 w-4" /> },
  ];

  return (
    <div className="w-screen h-screen lg:container mx-auto p-4">
    <Header />
    <div className="flex flex-col md:flex-row">
      {/* Left SideNav */}
      <SideNav links={eventLinks} />
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search users"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-8"
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            {searchResults.length > 0 ? (
              <div className="max-h-[300px] overflow-auto">
                {searchResults.map((user) => (
                  <SearchResultCard
                    key={user.id}
                    user={user}
                    onAddFriend={() => handleAddFriend(user)}
                  />
                ))}
              </div>
            ) : (
              <p className="p-2 text-sm text-gray-500">No users found</p>
            )}
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Friends</CardTitle>
            </CardHeader>
            <CardContent>
              {friends.map((friend) => (
                <FriendCard key={friend.id} friend={friend} />
              ))}
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>People You May Know</CardTitle>
            </CardHeader>
            <CardContent>
              {suggestions.map((suggestion) => (
                <SuggestionCard key={suggestion.id} suggestion={suggestion} />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}