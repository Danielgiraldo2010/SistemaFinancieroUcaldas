"use client";

import type { PropsWithChildren } from "react";
import { useLocation } from "react-router";
import { Sidebar } from "@/components/refine-ui/layout/sidebar";
import { Header } from "@/components/refine-ui/layout/header";
import { ThemeProvider } from "@/components/refine-ui/theme/theme-provider";
import { LayoutProvider, useLayout } from "@/lib/layout-context";
import { cn } from "@/lib/utils";

function LayoutContent({ children }: PropsWithChildren) {
  const { pathname } = useLocation();
  const { sidebarExpanded, submenuOpen } = useLayout();
  
  // Calcular offsets dinámicos basados en estado real
  const sidebarWidth = sidebarExpanded ? 288 : 64; // w-72: 18rem=288px, w-16: 64px
  const submenuWidth = submenuOpen ? 284 : 0; // submenu visible solo si está abierto
  const totalLeftOffset = sidebarWidth + submenuWidth;

  return (
    <div
      className="min-h-svh bg-background"
      style={{
        "--sidebar-width": `${sidebarWidth}px`,
        "--submenu-width": `${submenuWidth}px`,
        "--total-left-offset": `${totalLeftOffset}px`,
      } as React.CSSProperties}
    >
      <Sidebar />
      <Header />
      
      <main
        className={cn(
          "@container/main",
          "relative",
          "min-h-[calc(100vh-4rem)]",
          "transition-all duration-300 ease-out",
          "px-4 py-4 md:px-6 md:py-6 lg:px-8",
        )}
        style={{
          marginLeft: `var(--total-left-offset)`,
        }}
      >
        <div className="mx-auto w-full max-w-[1600px] flex-col">
          {children}
        </div>
      </main>
    </div>
  );
}

export function Layout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <LayoutProvider>
        <LayoutContent>{children}</LayoutContent>
      </LayoutProvider>
    </ThemeProvider>
  );
}

Layout.displayName = "Layout";
