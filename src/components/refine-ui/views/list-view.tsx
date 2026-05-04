"use client";

import { ReactNode } from "react";
import { CreateButton } from "@/components/refine-ui/buttons/create";
import { cn } from "@/lib/utils";

interface ListViewProps { children?: ReactNode; className?: string }
interface ListViewHeaderProps { title: string; children?: ReactNode }

export function ListView({ children, className }: ListViewProps) {
  return <div className={cn("flex flex-col flex-1 gap-4", className)}>{children}</div>;
}

export function ListViewHeader({ title, children }: ListViewHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex items-center gap-2">
        {children}
        <CreateButton />
      </div>
    </div>
  );
}
