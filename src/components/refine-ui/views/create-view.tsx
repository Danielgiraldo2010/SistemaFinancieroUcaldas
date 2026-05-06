"use client";

import { ReactNode } from "react";
import { ListButton } from "@/components/refine-ui/buttons/list";
import { cn } from "@/lib/utils";

interface Props { children?: ReactNode; className?: string }
interface HeaderProps { title: string; children?: ReactNode }

export function CreateView({ children, className }: Props) {
  return <div className={cn("flex min-w-0 flex-col flex-1 gap-5", className)}>{children}</div>;
}

export function CreateViewHeader({ title, children }: HeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <h1 className="text-[24px] font-bold leading-tight tracking-tight text-[#00284d] dark:text-white sm:text-[28px]">
        {title}
      </h1>
      <div className="flex w-full items-center gap-2 sm:w-auto">
        {children}
        <ListButton className="h-10 w-full rounded-md px-5 shadow-sm transition-all hover:shadow-md focus-visible:ring-[#d5bb87]/60 sm:h-9 sm:w-auto" />
      </div>
    </div>
  );
}
