"use client";

import React from "react";
import { type BaseKey, useCloneButton } from "@refinedev/core";
import { Copy } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CloneButtonProps = {
  /**
   * Resource name for API data interactions. `identifier` of the resource can be used instead of the `name` of the resource.
   * @default Inferred resource name from the route
   */
  resource?: string;
  /**
   * Data item identifier for the actions with the API
   * @default Reads `:id` from the URL
   */
  recordItemId?: BaseKey;
  /**
   * Access Control configuration for the button
   * @default `{ enabled: true, hideIfUnauthorized: false }`
   */
  accessControl?: {
    enabled?: boolean;
    hideIfUnauthorized?: boolean;
  };
  /**
   * `meta` property is used when creating the URL for the related action and path.
   */
  meta?: Record<string, unknown>;
} & React.ComponentProps<typeof Button>;

export const CloneButton = ({
  resource,
  recordItemId,
  accessControl,
  meta,
  children,
  onClick,
  ...rest
}: CloneButtonProps) => {
  const { hidden, disabled, LinkComponent, to, label } = useCloneButton({
    accessControl,
    resource,
    id: recordItemId,
    meta,
  });

  const isDisabled = disabled || rest.disabled;
  const isHidden = hidden || rest.hidden;

  if (isHidden) return null;

  const className = cn(
    buttonVariants({ variant: rest.variant, size: rest.size }),
    "h-9 rounded-md px-4 shadow-sm transition-all hover:shadow-md focus-visible:ring-[#d5bb87]/60",
    rest.className,
    isDisabled && "pointer-events-none opacity-50",
  );

  return (
    <LinkComponent to={to} replace={false} className={className} onClick={onClick} aria-disabled={isDisabled}>
      {children ?? (
        <div className="flex items-center gap-2 font-semibold">
          <Copy className="h-4 w-4" />
          <span>{label}</span>
        </div>
      )}
    </LinkComponent>
  );
};

CloneButton.displayName = "CloneButton";
