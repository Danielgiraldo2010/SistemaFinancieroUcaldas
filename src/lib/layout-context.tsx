import React, { createContext, useContext, useState, useCallback, PropsWithChildren } from "react";

/**
 * Layout Context - Gestiona el estado sincronizado del sidebar y submenu
 * Proporciona estados claros y no ambiguos para toda la aplicación
 */

export interface LayoutContextType {
  // Estado del sidebar principal (expandido/contraído)
  sidebarExpanded: boolean;
  setSidebarExpanded: (expanded: boolean) => void;
  
  // Estado del submenu (visible/oculto)
  submenuOpen: boolean;
  setSubmenuOpen: (open: boolean) => void;
  
  // Helpers para operaciones comunes
  toggleSidebar: () => void;
  collapseSidebar: () => void;
  expandSidebar: () => void;
  closeSubmenu: () => void;
  openSubmenu: () => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: PropsWithChildren) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setSidebarExpanded((prev) => !prev);
  }, []);

  const collapseSidebar = useCallback(() => {
    setSidebarExpanded(false);
  }, []);

  const expandSidebar = useCallback(() => {
    setSidebarExpanded(true);
  }, []);

  const closeSubmenu = useCallback(() => {
    setSubmenuOpen(false);
  }, []);

  const openSubmenu = useCallback(() => {
    setSubmenuOpen(true);
  }, []);

  const value: LayoutContextType = {
    sidebarExpanded,
    setSidebarExpanded,
    submenuOpen,
    setSubmenuOpen,
    toggleSidebar,
    collapseSidebar,
    expandSidebar,
    closeSubmenu,
    openSubmenu,
  };

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
}
