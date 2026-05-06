"use client";

import { ReactNode } from "react";
import { CreateButton } from "@/components/refine-ui/buttons/create";
import { cn } from "@/lib/utils";

interface ListViewProps { children?: ReactNode; className?: string }
interface ListViewHeaderProps { title: string; children?: ReactNode }

export function ListView({ children, className }: ListViewProps) {
  return <div className={cn("flex min-w-0 flex-col flex-1 gap-5", className)}>{children}</div>;
}

export function ListViewHeader({ title, children }: ListViewHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <h1 className="text-[24px] font-bold leading-tight tracking-tight text-[#00284d] dark:text-white sm:text-[28px]">
        {title}
      </h1>
      <div className="flex w-full items-center gap-2 sm:w-auto">
        {children}
        <CreateButton className="h-10 w-full rounded-md px-5 shadow-sm transition-all hover:shadow-md focus-visible:ring-[#d5bb87]/60 sm:h-9 sm:w-auto" />
      </div>
    </div>
  );
}
