"use client";

import React from "react";
import { useLocation, useNavigate } from "react-router";
import { ChevronRight, Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useLayout } from "@/lib/layout-context";
import { NAV_DOMAINS, resolveActiveItemFromPathname, resolveDomainFromPathname, getDomainLabel, getItemLabel, getItemIconName, type NavDomainKey, type NavItem } from "@/lib/navigation";
import { getMenuIconComponent } from "@/lib/navigation-icons";
import { cn } from "@/lib/utils";

function MenuIcon({ iconName, className }: { iconName?: string; className?: string }) {
  const IconComponent = getMenuIconComponent(iconName);
  return <IconComponent className={className ?? "h-4 w-4"} />;
}

function SidebarSubmenuItem({ item, pathname, navigate, level = 0 }: { item: NavItem; pathname: string; navigate: ReturnType<typeof useNavigate>; level?: number }) {
  const isActive = item.route ? pathname === item.route || pathname.startsWith(`${item.route}/`) : false;
  const displayLabel = getItemLabel(item);
  const hasChildren = !!item.children?.length;

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => item.route && navigate(item.route)}
        className={cn(
          "group relative flex h-10 w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium nav-item-hover",
          "text-white hover:bg-white/8 transition-colors",
          "overflow-hidden",
          level > 0 && "pl-6",
          isActive && "bg-[#d5bb87] text-[#00284d] shadow-[0_10px_20px_rgba(213,187,135,0.28)] nav-domain-active",
        )}
      >
        <span className={cn("flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-white/5 transition-all duration-300", isActive && "bg-white/20")}>
          <MenuIcon iconName={getItemIconName(item)} className="h-4 w-4" />
        </span>
        <span className="flex-1 min-w-0 truncate">{displayLabel}</span>
        {hasChildren && <ChevronRight className="h-4 w-4 flex-shrink-0 opacity-70" />}
        {isActive && <span className="absolute left-0 top-2 h-6 w-1 rounded-r-full bg-[#efd9af] animate-pulse" />}
      </button>
      {hasChildren && (
        <div className="mt-1 flex flex-col gap-1 pl-2">
          {item.children?.map((child) => (
            <SidebarSubmenuItem key={child.id ?? child.key} item={child} pathname={pathname} navigate={navigate} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { sidebarExpanded, setSidebarExpanded, toggleSidebar, collapseSidebar, openSubmenu, closeSubmenu, submenuOpen } = useLayout();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  // Cerrar el menú móvil cuando cambia la ruta
  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const activeDomainKey = resolveDomainFromPathname(pathname);
  const activeItem = resolveActiveItemFromPathname(pathname);
  const activeDomain = NAV_DOMAINS.find((domain) => domain.key === activeDomainKey) ?? NAV_DOMAINS[0];
  const isDashboard = activeDomainKey === "dashboard";

  const visibleItems = React.useMemo(() => {
    if (!search.trim()) return activeDomain.items;
    const q = search.toLowerCase();
    return activeDomain.items.filter((item) => getItemLabel(item).toLowerCase().includes(q));
  }, [activeDomain.items, search]);

  const goHome = () => navigate("/dashboard");
  
  /**
   * goDomain - Navega a un dominio
   * - Si es el mismo dominio: toggle expandir/contraer sidebar
   * - Si es diferente dominio: navega, expande sidebar, abre submenu
   */
  const goDomain = (domainKey: NavDomainKey) => {
    const domain = NAV_DOMAINS.find((item) => item.key === domainKey);
    if (!domain) return;

    if (domainKey === activeDomainKey) {
      // Mismo dominio: toggle del sidebar (expande/contrae)
      toggleSidebar();
      return;
    }

    // Si vamos a Inicio (dashboard) queremos cerrar el submenu y compactar para dar más espacio
    const isDashboard = domain.homeRoute === "/dashboard" || domain.key === "dashboard";
    navigate(domain.homeRoute);
    collapseSidebar();
    if (isDashboard) {
      closeSubmenu();
    } else {
      openSubmenu();
    }
  };

  return (
    <div>
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        {/* Sidebar Principal */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex flex-col bg-[#003e70] shadow-[10px_0_40px_rgba(0,40,77,0.10)] backdrop-blur-md",
            "transition-[width] duration-300 ease-out",
            sidebarExpanded ? "w-72" : "w-16",
          )}
        >
          <div className="flex h-16 items-center justify-between px-3">
            <button
              type="button"
              className="flex items-center gap-3 rounded-xl px-2 py-1 text-left text-white transition-colors hover:bg-white/10"
              onClick={goHome}
              title="Ir al inicio"
            >
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 shadow-inner">
                <img src="/logoUC.png" alt="Logo UC" className="h-7 w-7 object-contain" />
              </span>
              {sidebarExpanded && (
                <span className="flex min-w-0 items-center">
                  <span className="text-sm font-semibold">Sistema Financiero</span>
                </span>
              )}
            </button>
            <div className="h-9 w-9 flex-shrink-0" />
          </div>

          <ScrollArea className="flex-1 px-2 py-3">
            <nav className="flex flex-col gap-1.5">
              {NAV_DOMAINS.map((domain) => {
                const isActive = domain.key === activeDomainKey;
                return (
                  <button
                    key={domain.key}
                    type="button"
                    onClick={() => goDomain(domain.key)}
                    className={cn(
                      "group relative flex h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium nav-item-hover",
                      "text-white hover:bg-white/10",
                      isActive && "bg-[#d5bb87] text-[#00284d] shadow-[0_10px_24px_rgba(213,187,135,0.35)] nav-domain-active",
                      !sidebarExpanded && "justify-center px-0",
                    )}
                  >
                    <span className={cn("flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-105", isActive && "bg-white/20")}>
                      <MenuIcon iconName={domain.iconName} className="h-5 w-5" />
                    </span>
                    {sidebarExpanded && (
                      <>
                        <span className="flex-1 truncate text-left">{getDomainLabel(domain)}</span>
                        {isActive && <span className="h-2 w-2 flex-shrink-0 rounded-full bg-current opacity-70 nav-pulse" />}
                      </>
                    )}
                  </button>
                );
              })}
            </nav>
          </ScrollArea>
        </aside>

        {/* Submenu Lateral */}
        <aside
          className={cn(
            "fixed inset-y-0 z-40 w-[284px] bg-[#00284d] shadow-[8px_0_28px_rgba(0,40,77,0.12)]",
            "transition-all duration-300 ease-out",
            sidebarExpanded ? "left-72" : "left-16",
            submenuOpen ? "translate-x-0 opacity-100" : "-translate-x-6 pointer-events-none opacity-0",
          )}
        >
          <div className="flex h-16 items-center justify-between px-4">
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#efd9af]/80">Dominio</p>
              <h2 className="truncate text-sm font-semibold text-white">{getDomainLabel(activeDomain)}</h2>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => closeSubmenu()}
              className="h-9 w-9 flex-shrink-0 rounded-full text-[#efd9af] hover:bg-white/10 hover:text-white"
              aria-label="Ocultar panel contextual"
              title="Ocultar submenu"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {/* Buscador de módulos removido por petición */}
          <ScrollArea className="flex-1 p-3">
            <nav className="flex flex-col gap-1.5">
              {visibleItems.map((item) => (
                <SidebarSubmenuItem key={item.id ?? item.key} item={item} pathname={pathname} navigate={navigate} />
              ))}
            </nav>
          </ScrollArea>
        </aside>
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="fixed left-3 top-3 z-50 rounded-full bg-[#003e70] text-white shadow-lg"
              title="Abrir menú"
            >
              <Search className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[320px] border-[#efd9af]/20 bg-[#00284d] p-0 text-white">
            <SheetHeader className="border-b border-[#efd9af]/20 px-4 py-4">
              <SheetTitle className="text-left text-white">Navegación</SheetTitle>
            </SheetHeader>
            <div className="flex h-full flex-col">
              <div className="border-b border-[#efd9af]/10 px-4 py-4">
                <div className="grid grid-cols-4 gap-2">
                  {NAV_DOMAINS.map((domain) => (
                    <button
                      key={domain.key}
                      type="button"
                      className={cn("flex h-10 w-10 items-center justify-center rounded-xl text-white transition-all duration-300 hover:bg-white/10", domain.key === activeDomainKey && "bg-[#d5bb87] text-[#00284d]")}
                      onClick={() => {
                        goDomain(domain.key);
                        setMobileOpen(false);
                      }}
                    >
                      <MenuIcon iconName={domain.iconName} className="h-5 w-5" />
                    </button>
                  ))}
                </div>
              </div>
              <ScrollArea className="flex-1 px-4 py-3">
                <div className="mb-3 text-xs uppercase tracking-[0.2em] text-[#efd9af]/80">{getDomainLabel(activeDomain)}</div>
                <div className="flex flex-col gap-2">
                  {visibleItems.map((item) => (
                    <SidebarSubmenuItem 
                      key={item.id ?? item.key} 
                      item={item} 
                      pathname={pathname} 
                      navigate={navigate} 
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
