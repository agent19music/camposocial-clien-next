import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface NavLink {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  badgeCount?: number;
}

interface SideNavProps {
  links: NavLink[];
}

export default function SideNav({ links }: SideNavProps) {
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {links.map((link, index) => (
        <Button
          key={index}
          variant="ghost"
          className="justify-start px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          onClick={link.onClick}
        >
          {link.icon}
          <span className="ml-3">{link.label}</span>
          {link.badgeCount && (
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              {link.badgeCount}
            </Badge>
          )}
        </Button>
      ))}
    </nav>
  )
}

