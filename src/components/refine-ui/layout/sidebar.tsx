"use client";

import React from "react";
import {
  useMenu,
  useLink,
  useRefineOptions,
  type TreeMenuItem,
} from "@refinedev/core";
import {
  SidebarRail as ShadcnSidebarRail,
  Sidebar as ShadcnSidebar,
  SidebarContent as ShadcnSidebarContent,
  SidebarHeader as ShadcnSidebarHeader,
  useSidebar as useShadcnSidebar,
  SidebarTrigger as ShadcnSidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, ListIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const { open } = useShadcnSidebar();
  const { menuItems, selectedKey } = useMenu();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [isMenuScrolled, setIsMenuScrolled] = React.useState(false);
  const [canMenuScroll, setCanMenuScroll] = React.useState(false);

  React.useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const updateMenuScrollState = () => {
      setIsMenuScrolled(content.scrollTop > 10);
      setCanMenuScroll(content.scrollHeight > content.clientHeight + 10);
    };

    updateMenuScrollState();

    content.addEventListener("scroll", updateMenuScrollState, {
      passive: true,
    });
    window.addEventListener("resize", updateMenuScrollState);

    return () => {
      content.removeEventListener("scroll", updateMenuScrollState);
      window.removeEventListener("resize", updateMenuScrollState);
    };
  }, [menuItems, open]);

  const handleMenuScrollToggle = () => {
    const content = contentRef.current;
    if (!content) return;

    content.scrollTo({
      top: isMenuScrolled ? 0 : content.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <ShadcnSidebar collapsible="icon" className={cn("border-none")}>
      <ShadcnSidebarRail />
      <SidebarHeader />
      <ShadcnSidebarContent
        ref={contentRef}
        className={cn(
          "relative",
          "transition-discrete",
          "duration-200",
          "flex",
          "flex-col",
          "gap-1",
          "pt-2",
          "pb-2",
          "border-r",
          "border-[#efd9af]/20",
          "bg-[#003e70]",
          "scroll-smooth",
          "[scrollbar-width:none]",
          "[&::-webkit-scrollbar]:hidden",
          {
            "px-3 pb-16": open,
            "px-1": !open,
          },
        )}
      >
        {menuItems.map((item: TreeMenuItem) => (
          <SidebarItem
            key={item.key || item.name}
            item={item}
            selectedKey={selectedKey}
          />
        ))}
      </ShadcnSidebarContent>
      {open && canMenuScroll && (
        <Button
          type="button"
          size="icon"
          aria-label={isMenuScrolled ? "Subir en el menú" : "Bajar en el menú"}
          onClick={handleMenuScrollToggle}
          className={cn(
            "absolute bottom-3 left-1/2 z-30 h-9 w-9 -translate-x-1/2",
            "rounded-full border border-[#d5bb87]/35 bg-[#00284d] text-white",
            "shadow-[0_8px_18px_rgba(0,40,77,0.28)]",
            "transition-all duration-300 ease-out",
            "hover:-translate-y-0.5 hover:bg-[#045389] hover:text-white",
            "focus-visible:ring-[#d5bb87]/70",
          )}
        >
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-300 ease-out",
              isMenuScrolled && "rotate-180",
            )}
          />
        </Button>
      )}
    </ShadcnSidebar>
  );
}

type MenuItemProps = {
  item: TreeMenuItem;
  selectedKey?: string;
};

function SidebarItem({ item, selectedKey }: MenuItemProps) {
  const { open } = useShadcnSidebar();

  if (item.meta?.group) {
    return <SidebarItemGroup item={item} selectedKey={selectedKey} />;
  }

  if (item.children && item.children.length > 0) {
    if (open) {
      return <SidebarItemCollapsible item={item} selectedKey={selectedKey} />;
    }
    return <SidebarItemDropdown item={item} selectedKey={selectedKey} />;
  }

  return <SidebarItemLink item={item} selectedKey={selectedKey} />;
}

function SidebarItemGroup({ item, selectedKey }: MenuItemProps) {
  const { children } = item;
  const { open } = useShadcnSidebar();

  return (
    <div className={cn("border-t", "border-[#efd9af]/18", "pt-3")}>
      <span
        className={cn(
          "ml-3",
          "block",
          "text-xs",
          "font-semibold",
          "uppercase",
          "text-[#efd9af]",
          "tracking-wide",
          "transition-all",
          "duration-200",
          {
            "h-7": open,
            "h-0": !open,
            "opacity-0": !open,
            "opacity-100": open,
            "pointer-events-none": !open,
            "pointer-events-auto": open,
          },
        )}
      >
        {getDisplayName(item)}
      </span>
      {children && children.length > 0 && (
        <div className={cn("flex", "flex-col")}>
          {children.map((child: TreeMenuItem) => (
            <SidebarItem
              key={child.key || child.name}
              item={child}
              selectedKey={selectedKey}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SidebarItemCollapsible({ item, selectedKey }: MenuItemProps) {
  const { name, children } = item;

  const chevronIcon = (
    <ChevronRight
      className={cn(
        "h-4",
        "w-4",
        "shrink-0",
        "text-[#efd9af]/85",
        "transition-transform",
        "duration-200",
        "group-data-[state=open]:rotate-90",
      )}
    />
  );

  return (
    <Collapsible key={`collapsible-${name}`} className={cn("w-full", "group")}>
      <CollapsibleTrigger asChild>
        <SidebarButton item={item} rightIcon={chevronIcon} />
      </CollapsibleTrigger>
      <CollapsibleContent className={cn("ml-6", "flex", "flex-col", "gap-2")}>
        {children?.map((child: TreeMenuItem) => (
          <SidebarItem
            key={child.key || child.name}
            item={child}
            selectedKey={selectedKey}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

function SidebarItemDropdown({ item, selectedKey }: MenuItemProps) {
  const { children } = item;
  const Link = useLink();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarButton item={item} />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start" className="border-[#d5bb87]/30">
        {children?.map((child: TreeMenuItem) => {
          const { key: childKey } = child;
          const isSelected = childKey === selectedKey;

          return (
            <DropdownMenuItem key={childKey || child.name} asChild>
              <Link
                to={child.route || ""}
                className={cn("flex w-full items-center gap-2", {
                  "bg-[#d5bb87] text-[#00284d]": isSelected,
                })}
              >
                <ItemIcon
                  icon={child.meta?.icon ?? child.icon}
                  isSelected={isSelected}
                />
                <span>{getDisplayName(child)}</span>
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SidebarItemLink({ item, selectedKey }: MenuItemProps) {
  const isSelected = item.key === selectedKey;

  return <SidebarButton item={item} isSelected={isSelected} asLink={true} />;
}

function SidebarHeader() {
  const { title } = useRefineOptions();
  const { open, isMobile } = useShadcnSidebar();
  const Link = useLink();

  return (
    <ShadcnSidebarHeader
      className={cn(
        "p-0",
        "h-16",
        "border-b",
        "border-[#efd9af]/20",
        "bg-[#003e70]",
        "flex-row",
        "items-center",
        "justify-between",
        "overflow-hidden",
      )}
    >
      <Link
        to="/"
        className={cn(
          "appearance-none",
          "no-underline",
          "whitespace-nowrap",
          "flex",
          "flex-row",
          "h-full",
          "items-center",
          "justify-start",
          "gap-2",
          "transition-discrete",
          "duration-200",
          "cursor-pointer",
          {
            "pl-3": !open,
            "pl-5": open,
          },
        )}
      >
        <div className="[&_img]:brightness-0 [&_img]:invert">{title.icon}</div>
        <h2
          className={cn(
            "text-sm",
            "font-bold",
            "text-white",
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
      </Link>

      <ShadcnSidebarTrigger
        className={cn("text-[#efd9af] hover:bg-[#045389] hover:text-white", "mr-1.5", {
          "opacity-0": !open,
          "opacity-100": open || isMobile,
          "pointer-events-auto": open || isMobile,
          "pointer-events-none": !open && !isMobile,
        })}
      />
    </ShadcnSidebarHeader>
  );
}

function getDisplayName(item: TreeMenuItem) {
  return item.meta?.label ?? item.label ?? item.name;
}

type IconProps = {
  icon: React.ReactNode;
  isSelected?: boolean;
};

function ItemIcon({ icon, isSelected }: IconProps) {
  return (
    <div
      className={cn("w-4", {
        "text-[#efd9af]": !isSelected,
        "text-[#00284d]": isSelected,
      })}
    >
      {icon ?? <ListIcon />}
    </div>
  );
}

type SidebarButtonProps = React.ComponentProps<typeof Button> & {
  item: TreeMenuItem;
  isSelected?: boolean;
  rightIcon?: React.ReactNode;
  asLink?: boolean;
  onClick?: () => void;
};

function SidebarButton({
  item,
  isSelected = false,
  rightIcon,
  asLink = false,
  className,
  onClick,
  ...props
}: SidebarButtonProps) {
  const Link = useLink();

  const buttonContent = (
    <>
      <ItemIcon icon={item.meta?.icon ?? item.icon} isSelected={isSelected} />
      <span
        className={cn("tracking-[-0.00875rem]", {
          "flex-1": rightIcon,
          "text-left": rightIcon,
          "line-clamp-1": !rightIcon,
          truncate: !rightIcon,
          "font-normal": !isSelected,
          "font-semibold": isSelected,
          "text-[#00284d]": isSelected,
          "text-white": !isSelected,
        })}
      >
        {getDisplayName(item)}
      </span>
      {rightIcon}
    </>
  );

  return (
    <Button
      asChild={!!(asLink && item.route)}
      variant="ghost"
      size="lg"
      className={cn(
        "flex h-9 w-full items-center justify-start gap-2 rounded-md py-2 !px-3 text-sm",
        "text-white hover:!bg-[#045389] hover:text-white",
        "focus-visible:ring-[#d5bb87]/60",
        {
          "bg-sidebar-primary": isSelected,
          "hover:!bg-[#d5bb87]": isSelected,
          "text-sidebar-primary-foreground": isSelected,
          "hover:text-sidebar-primary-foreground": isSelected,
        },
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {asLink && item.route ? (
        <Link to={item.route} className={cn("flex w-full items-center gap-2")}>
          {buttonContent}
        </Link>
      ) : (
        buttonContent
      )}
    </Button>
  );
}

Sidebar.displayName = "Sidebar";
