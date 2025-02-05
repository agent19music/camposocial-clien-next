import type React from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { format } from "date-fns"

interface SidebarProps {
  chatList: any[]
  setFriendId: (id: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ chatList, setFriendId }) => {
  return (
    <div className="hidden lg:flex flex-col w-80 border-r border-slate-200 dark:border-slate-700 bg-slate-50/90 dark:bg-slate-800/90 backdrop-blur-lg">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input placeholder="Search messages" className="pl-10 bg-slate-100 dark:bg-slate-700 border-none" />
        </div>
      </div>
      <ScrollArea className="flex-grow">
        <div className="p-2">
          {chatList.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
              onClick={() => setFriendId(user.id.toString())}
            >
              <Avatar>
                <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${user.firstName}`} />
                <AvatarFallback>{user.firstName}</AvatarFallback>
              </Avatar>
              <div className="flex-grow min-w-0">
                <h3 className="font-medium text-slate-900 dark:text-slate-100">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">Latest message preview...</p>
              </div>
              <span className="text-xs text-slate-400">{format(new Date(), "HH:mm")}</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default Sidebar

