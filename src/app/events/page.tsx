"use client"
import Link from "next/link"
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import EventCard from '@/components/event';
import { MouseEvent } from "react";
import SideNav from "@/components/sidenav"
import Header from "@/components/header"
import { Calendar, PartyPopper } from "lucide-react";

export default function Dashboard() {
  const eventLinks = [
    { href: "/comingsoon", label: "Coming Soon", icon: <Home className="h-4 w-4" /> },
    { href: "/social-events", label: "Social Events", icon: <Calendar className="h-4 w-4" /> },
    { href: "/fun-events", label: "Fun Events", icon: <PartyPopper className="h-4 w-4" /> },
  ];

    const comments = [
        {
          image: null,
          username: "HappyCoder",
          text: "I love this feature! 😍🔥",
          dateCreated: "2024-08-20T10:30:00Z",
        },
        {
          image :"/yoruichipfp.jpg",
          username: "DevGuru",
          text: "Well done! Keep up the great work! 💪💻",
          dateCreated: "2024-08-21T15:45:00Z",
        },
        {
          image: null,
          username: "BugHunter",
          text: "I found a small issue, but it’s nothing major 🐞🚀",
          dateCreated: "2024-08-22T09:15:00Z",
        },
        {
          image: null,
          username: "UIWizard",
          text: "The new design looks amazing! ✨🎨",
          dateCreated: "2024-08-23T13:50:00Z",
        },
        {
          image: null,
          username: "CodeMaster",
          text: "This is super useful, thanks! 🙌📚",
          dateCreated: "2024-08-24T08:25:00Z",
        },
      ];
      const handleSubmit = (
        e: MouseEvent<HTMLButtonElement>, 
        eventId: string, 
        localCommentText: string
      ): void => {
        e.preventDefault();
      
        if (!localCommentText) {
         
          return;
        }
      
        if (localCommentText.length > 300) {
          return;
        }
      
        if (localCommentText !== '') {
          sendComment(localCommentText, eventId);  // Assuming sendComment is defined elsewhere
        }
      };
     
      const sendComment = async (commentText: string, eventId: string): Promise<void> => {
        const apiEndpoint = "YOUR_API_ENDPOINT"; // Define your API endpoint here
        const authToken = "YOUR_AUTH_TOKEN"; // Replace with your actual token retrieval logic
      
        try {
          const response = await fetch(`${apiEndpoint}/comment-event/${eventId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken ?? ''}`,  // Safe fallback if authToken is undefined
            },
            body: JSON.stringify({ text: commentText, event_id: eventId }),
          });
      
          if (response.ok) {
           console.log("yaay");
             // Assuming setOnchange is a function elsewhere
          }
        } catch (error) {
          console.error('Error submitting comment:', error);
        }
      };
  return (
   <div className="w-screen h-screen flex flex-col lg:container">
  <Header />

  {/* Main content with the two side navs and center content */}
  <div className="flex  flex-col md:flex-row">
    {/* Left SideNav */}
    <SideNav links={eventLinks} />

    {/* Center content */}
    <div className="flex-1 flex flex-col gap-4 p-4 lg:gap-6 lg:p-2 justify-center items-center ">
      <h1 className="text-lg font-semibold md:text-2xl ">Events</h1>
      
      {/* Green area with centered input */}
      <div className="w-full flex-1   flex justify-center items-center">
        <form>
          <div className="relative mx-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search events..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-full"
            />
          </div>
        </form>
      </div>
      
      <div className="flex flex-col w-full max-w-6/12 rounded-lg border border-dashed shadow-sm overflow-y-auto lg:min-h-[800px] md:max-h-[537.6px]">
        <EventCard
          comments={comments}
          poster="/eventposter.png"
          description="Like plants so much you wanna love them? Pull up!"
          date="27/03/2024"
          entry_fee={'500'}
          eventId="1"
          title="Plant your own garden"
          handleSubmit={handleSubmit}
          username="tayk47"
          userimage={null}
        />
        <EventCard
          comments={comments}
          poster="/y2kparty.png"
          description="Early 2000s themed party. Pull up!"
          date="27/03/2024"
          entry_fee={'500'}
          eventId="2"
          title="Y2K Party"
          handleSubmit={handleSubmit}
          username="oppaStompa"
          userimage="/wkndpfp.jpg"
        />
        <EventCard
          comments={comments}
          poster="/ramenposter.png"
          description="Vibe and slurp on ramen"
          date="27/03/2024"
          entry_fee={'500'}
          eventId="3"
          title="Ramen"
          handleSubmit={handleSubmit}
          username="tayk47"
          userimage="/yoruichipfp.jpg"
        />
      </div>
    </div>

    {/* Right SideNav */}

  </div>
</div>

  )
}
