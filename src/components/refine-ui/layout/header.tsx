import {
  useRefineOptions,
  useActiveAuthProvider,
  useLogout,
  useGetIdentity,
} from "@refinedev/core"
import { useNavigate } from "react-router"
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
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb"
import { useSidebar, SidebarTrigger } from "@/components/ui/sidebar"
import { ChevronDown, LogOutIcon, ShieldCheck } from "lucide-react"
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
        "border-[#efd9af]/20",
        "bg-sidebar",
        "px-4",
        "justify-between",
        "z-40",
        "shadow-[0_6px_18px_rgba(0,40,77,0.14)]",
      )}
    >
      <HeaderBreadcrumb />
      <div className={cn("flex", "items-center", "gap-3")}>
        <ThemeToggle />
        <UserDropdown />
      </div>
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
        "h-14",
        "shrink-0",
        "items-center",
        "gap-2",
        "border-b",
        "border-[#efd9af]/20",
        "bg-sidebar",
        "px-3",
        "justify-between",
        "z-40",
        "shadow-[0_6px_18px_rgba(0,40,77,0.14)]",
      )}
    >
      <SidebarTrigger
        className={cn("h-9 w-9 text-[#efd9af] hover:bg-[#045389] hover:text-white", "rotate-180", {
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
          "min-w-0",
          "flex-1",
          "h-full",
          "items-center",
          "justify-start",
          "gap-2",
          "transition-discrete",
          "duration-200",
          {
            "pl-1": !open,
            "pl-2": open,
          },
        )}
      >
        <div className="shrink-0 [&_img]:brightness-0 [&_img]:invert">{title.icon}</div>
        <h2
          className={cn(
            "text-sm",
            "font-bold",
            "text-white",
            "truncate",
            "transition-opacity",
            "duration-200",
            "opacity-100",
          )}
        >
          {title.text}
        </h2>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <ThemeToggle className={cn("h-8", "w-8")} />
        <UserDropdown />
      </div>
    </header>
  )
}

function HeaderBreadcrumb() {
  return (
    <div
      className={cn(
        "min-w-0 flex-1",
        "[&_ol]:text-[#efd9af]/85",
        "[&_ol]:gap-2",
        "[&_a]:inline-flex [&_a]:items-center",
        "[&_a]:font-medium [&_a]:text-[#efd9af]/90",
        "[&_a]:transition-colors [&_a]:hover:text-white",
        "[_[data-slot=breadcrumb-page]]:font-semibold",
        "[_[data-slot=breadcrumb-page]]:text-white",
        "[_[data-slot=breadcrumb-separator]]:text-[#d5bb87]/80",
      )}
    >
      <Breadcrumb />
    </div>
  )
}

const UserDropdown = () => {
  const { mutate: logout, isPending: isLoggingOut } = useLogout()
  const navigate = useNavigate()
  const { data: user, isLoading } = useGetIdentity<{
    email?: string
    fullName?: string
    firstName?: string
    lastName?: string
    role?: string
    roles?: string[]
    roleNames?: string[]
  }>()

  const authProvider = useActiveAuthProvider()

  if (!authProvider?.getIdentity) {
    return null
  }

  const displayName =
    user?.fullName ||
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.email ||
    "Usuario"

  const roleLabel =
    user?.role || user?.roles?.[0] || user?.roleNames?.[0] || "Administrador"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex h-11 items-center gap-3 rounded-full",
            "border border-[#efd9af]/24 bg-white/10 py-1 pl-1 pr-3",
            "max-w-[52vw] md:max-w-none",
            "text-left text-white shadow-sm backdrop-blur-sm",
            "transition-all hover:bg-white/15 hover:shadow-md",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d5bb87]/70",
          )}
        >
          <UserAvatar />
          <span className={cn("hidden", "min-w-0", "flex-col", "md:flex")}>
            <span className="max-w-[180px] truncate text-sm font-semibold leading-4">
              {isLoading ? "Cargando..." : displayName}
            </span>
            <span className="flex items-center gap-1 text-xs font-medium leading-4 text-[#efd9af]">
              <ShieldCheck className="h-3.5 w-3.5" />
              {roleLabel}
            </span>
          </span>
          <ChevronDown className="h-4 w-4 text-[#efd9af]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 border-[#d5bb87]/30 shadow-[0_16px_36px_rgba(0,40,77,0.16)]"
      >
        <DropdownMenuLabel className="px-3 py-2">
          <div className="flex flex-col gap-1">
            <span className="truncate text-sm font-semibold text-[#00284d] dark:text-white">
              {displayName}
            </span>
            {user?.email && (
              <span className="truncate text-xs text-muted-foreground">
                {user.email}
              </span>
            )}
            <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-[#d5bb87]/25 px-2 py-0.5 text-xs font-semibold text-[#00284d] dark:text-[#efd9af]">
              <ShieldCheck className="h-3 w-3" />
              {roleLabel}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer rounded-md px-3 py-2"
          onSelect={() => {
            logout(
              { redirectPath: false },
              {
                onSuccess: () => {
                  navigate("/login", { replace: true })
                },
              },
            )
          }}
        >
          <LogOutIcon className={cn("size-4")} />
          <span>{isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

Header.displayName = "Header"
MobileHeader.displayName = "MobileHeader"
DesktopHeader.displayName = "DesktopHeader"
