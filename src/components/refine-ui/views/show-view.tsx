"use client";

import type { PropsWithChildren } from "react";

import { ArrowLeftIcon } from "lucide-react";
import {
  useBack,
  useResourceParams,
  useUserFriendlyName,
} from "@refinedev/core";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RefreshButton } from "@/components/refine-ui/buttons/refresh";
import { cn } from "@/lib/utils";
import { EditButton } from "../buttons/edit";

type ShowViewProps = PropsWithChildren<{
  className?: string;
}>;

export function ShowView({ children, className }: ShowViewProps) {
  return (
    <div className={cn("flex min-w-0 flex-col", "gap-5", className)}>{children}</div>
  );
}

type ShowViewHeaderProps = PropsWithChildren<{
  resource?: string;
  title?: string;
  wrapperClassName?: string;
  headerClassName?: string;
}>;

export const ShowViewHeader = ({
  resource: resourceFromProps,
  title: titleFromProps,
  wrapperClassName,
  headerClassName,
}: ShowViewHeaderProps) => {
  const back = useBack();

  const getUserFriendlyName = useUserFriendlyName();

  const { resource, identifier } = useResourceParams({
    resource: resourceFromProps,
  });
  const { id: recordItemId } = useResourceParams();

  const resourceName = resource?.name ?? identifier;

  const title =
    titleFromProps ??
    getUserFriendlyName(
      resource?.meta?.label ?? identifier ?? resource?.name,
      "singular",
    );

  return (
    <div className={cn("flex flex-col", "gap-4", wrapperClassName)}>
      <div className="flex items-center relative gap-2">
        <div className="bg-background z-[2] pr-4 text-sm">
          <Breadcrumb />
        </div>
        <Separator className={cn("absolute", "left-0", "right-0", "z-[1]")} />
      </div>
      <div
        className={cn(
          "flex",
          "gap-2",
          "flex-col",
          "items-start",
          "justify-between",
          "sm:flex-row",
          "sm:items-center",
          headerClassName,
        )}
      >
        <div className="flex min-w-0 items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={back}
            className="rounded-full text-[#003e70] hover:bg-[#efd9af]/25"
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
          <h2 className="min-w-0 text-[24px] font-bold leading-tight tracking-tight text-[#00284d] dark:text-white sm:text-[28px]">
            {title}
          </h2>
        </div>

        <div className="flex w-full items-center gap-2 sm:w-auto">
          <RefreshButton
            variant="outline"
            recordItemId={recordItemId}
            resource={resourceName}
          />
          <EditButton
            variant="outline"
            recordItemId={recordItemId}
            resource={resourceName}
          />
        </div>
      </div>
    </div>
  );
};

ShowView.displayName = "ShowView";
