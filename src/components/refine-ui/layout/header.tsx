import {
  useRefineOptions,
  useActiveAuthProvider,
  useLogout,
  useGetIdentity,
} from "@refinedev/core"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/refine-ui/theme/theme-toggle"
import { UserAvatar } from "@/components/refine-ui/layout/user-avatar"
import { useSidebar, SidebarTrigger } from "@/components/ui/sidebar"
import { ChevronDownIcon, LogOutIcon } from "lucide-react"
import type { GetIdentityResponse } from "@/types"
import { cn } from "@/lib/utils"

export const Header = () => {
  const { isMobile } = useSidebar()

  return <>{isMobile ? <MobileHeader /> : <DesktopHeader />}</>
}

function DesktopHeader() {
  return (
    <header
      className={cn(
        "sticky",
        "top-0",
        "flex",
        "h-16",
        "shrink-0",
        "items-center",
        "gap-4",
        "border-b",
        "border-border",
        "bg-sidebar",
        "pr-3",
        "justify-end",
        "z-40",
      )}
    >
      <ThemeToggle />
      <UserDropdown />
    </header>
  )
}

function MobileHeader() {
  const { open, isMobile } = useSidebar()

  const { title } = useRefineOptions()

  return (
    <header
      className={cn(
        "sticky",
        "top-0",
        "flex",
        "h-12",
        "shrink-0",
        "items-center",
        "gap-2",
        "border-b",
        "border-border",
        "bg-sidebar",
        "pr-3",
        "justify-between",
        "z-40",
      )}
    >
      <SidebarTrigger
        className={cn("text-muted-foreground", "rotate-180", "ml-1", {
          "opacity-0": open,
          "opacity-100": !open || isMobile,
          "pointer-events-auto": !open || isMobile,
          "pointer-events-none": open && !isMobile,
        })}
      />

      <div
        className={cn(
          "whitespace-nowrap",
          "flex",
          "flex-row",
          "h-full",
          "items-center",
          "justify-start",
          "gap-2",
          "transition-discrete",
          "duration-200",
          {
            "pl-3": !open,
            "pl-5": open,
          },
        )}
      >
        <div>{title.icon}</div>
        <h2
          className={cn(
            "text-sm",
            "font-bold",
            "transition-opacity",
            "duration-200",
            {
              "opacity-0": !open,
              "opacity-100": open,
            },
          )}
        >
          {title.text}
        </h2>
      </div>

      <div className={cn("flex", "items-center", "gap-2")}>
        <ThemeToggle className={cn("h-8", "w-8")} />
        <UserDropdown compact />
      </div>
    </header>
  )
}

type UserDropdownProps = {
  compact?: boolean
}

const UserDropdown = ({ compact = false }: UserDropdownProps) => {
  const { mutate: logout, isPending: isLoggingOut } = useLogout()

  const authProvider = useActiveAuthProvider()
  const { data: user, isLoading } = useGetIdentity<GetIdentityResponse>()

  if (!authProvider?.getIdentity) {
    return null
  }

  const displayName = getDisplayName(user)
  const email = user?.email ?? ""

  // Estado de carga
  const loadingContent = (
    <Button
      variant="ghost"
      className={cn(
        "h-auto",
        "px-2",
        "py-1.5",
        "gap-2",
        "justify-start",
        "text-left",
        "hover:bg-accent",
        "rounded-full",
      )}
    >
      <UserAvatar />
      <div className={cn("flex", "min-w-0", "flex-col", "items-start")}>
        <span className={cn("h-4", "w-24", "rounded", "bg-muted")} />
      </div>
    </Button>
  )

  if (isLoading) {
    return loadingContent
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "h-auto",
            "px-2",
            "py-1.5",
            "gap-2",
            "justify-start",
            "text-left",
            "hover:bg-accent",
            "rounded-full",
          )}
        >
          <UserAvatar />
          <div className={cn("flex", "min-w-0", "flex-col", "items-start")}>
            <span
              className={cn(
                "max-w-[10rem]",
                "truncate",
                "text-sm",
                "font-medium",
              )}
            >
              {displayName}
            </span>
            {!compact && (
              <span
                className={cn(
                  "max-w-[10rem]",
                  "truncate",
                  "text-xs",
                  "text-muted-foreground",
                )}
              >
                {email}
              </span>
            )}
          </div>
          <ChevronDownIcon className={cn("size-4", "text-muted-foreground")} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={cn("min-w-56")}>
        <DropdownMenuLabel className={cn("p-3")}>
          <div className={cn("flex", "items-center", "gap-3")}>
            <UserAvatar />
            <div className={cn("flex", "min-w-0", "flex-col")}>
              <span className={cn("truncate", "text-sm", "font-medium")}>
                {displayName}
              </span>
              <span className={cn("truncate", "text-xs", "text-muted-foreground")}>
                {email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onSelect={() => {
            logout()
          }}
        >
          <LogOutIcon className={cn("size-4")} />
          <span>{isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const getDisplayName = (user?: GetIdentityResponse | null) => {
  if (!user) return "Usuario"
  if (user.fullName) return user.fullName
  const parts = [user.firstName, user.lastName].filter(Boolean)
  if (parts.length > 0) return parts.join(" ")
  if (user.email) return user.email
  return "Usuario"
}

Header.displayName = "Header"
MobileHeader.displayName = "MobileHeader"
DesktopHeader.displayName = "DesktopHeader"
