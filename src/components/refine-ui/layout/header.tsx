import {
  useRefineOptions,
  useActiveAuthProvider,
  useLogout,
  useGetIdentity,
} from "@refinedev/core";
import { useLocation, useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/refine-ui/theme/theme-toggle";
import { UserAvatar } from "@/components/refine-ui/layout/user-avatar";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLayout } from "@/lib/layout-context";
import { ChevronDown, LogOutIcon, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export const Header = () => {
  const { sidebarExpanded, submenuOpen } = useLayout();
  const isMobile = useIsMobile();
  
  // Calcular offsets dinámicos
  const sidebarWidth = sidebarExpanded ? 288 : 64; // w-72: 18rem=288px, w-16: 64px
  const submenuWidth = submenuOpen ? 284 : 0; // submenu visible solo si está abierto
  const totalLeftOffset = isMobile ? 0 : sidebarWidth + submenuWidth;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[#efd9af]/20 bg-[#003e70] px-3 sm:px-4",
        "shadow-[0_6px_18px_rgba(0,40,77,0.14)]",
        "transition-[margin-left] duration-300 ease-out",
      )}
      style={{
        marginLeft: isMobile ? 0 : `${totalLeftOffset}px`,
      }}
    >
      <div className="min-w-0 flex-1 pr-4 hidden md:block">
        <div
          className={cn(
            "[&_ol]:gap-2",
            "[&_ol]:text-[#efd9af]/85",
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
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <ThemeToggle />
        <UserDropdown />
      </div>
    </header>
  );
};

const UserDropdown = () => {
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();
  const { data: user, isLoading } = useGetIdentity<{
    email?: string;
    fullName?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    roles?: string[];
    roleNames?: string[];
  }>();

  const authProvider = useActiveAuthProvider();

  if (!authProvider?.getIdentity) return null;

  const displayName =
    user?.fullName ||
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.email ||
    "Usuario";

  const roleLabel = user?.role || user?.roles?.[0] || user?.roleNames?.[0] || "Administrador";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex h-11 items-center gap-2 rounded-full border border-[#efd9af]/24 bg-white/10 py-1 pl-1 pr-2 sm:pr-3 text-left text-white shadow-sm backdrop-blur-sm transition-all hover:bg-white/15 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d5bb87]/70",
          )}
        >
          <UserAvatar />
          <span className={cn("hidden min-w-0 flex-col md:flex")}>
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
      <DropdownMenuContent align="end" className="w-64 border-[#d5bb87]/30 shadow-[0_16px_36px_rgba(0,40,77,0.16)]">
        <DropdownMenuLabel className="px-3 py-2">
          <div className="flex flex-col gap-1">
            <span className="truncate text-sm font-semibold text-[#00284d] dark:text-white">{displayName}</span>
            {user?.email && <span className="truncate text-xs text-muted-foreground">{user.email}</span>}
            <span className="flex items-center gap-1 text-xs font-medium text-[#00284d]/75 dark:text-[#efd9af]">
              <ShieldCheck className="h-3.5 w-3.5" />
              {roleLabel}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            logout(undefined, {
              onSuccess: () => navigate("/login"),
            });
          }}
        >
          <LogOutIcon className="mr-2 h-4 w-4" />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
