"use client";

import { ReactNode } from "react";
import { ListButton } from "@/components/refine-ui/buttons/list";
import { cn } from "@/lib/utils";

interface Props { children?: ReactNode; className?: string }
interface HeaderProps { title: string; children?: ReactNode }

export function EditView({ children, className }: Props) {
  return <div className={cn("flex flex-col flex-1 gap-4", className)}>{children}</div>;
}

export function EditViewHeader({ title, children }: HeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex items-center gap-2">
        {children}
        <ListButton />
      </div>
    </div>
  );
}
