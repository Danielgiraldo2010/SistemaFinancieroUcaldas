"use client";

import React from "react";
import { type BaseKey, useShowButton } from "@refinedev/core";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ShowButtonProps = {
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

export const ShowButton = React.forwardRef<
  React.ComponentRef<typeof Button>,
  ShowButtonProps
>(
  (
    { resource, recordItemId, accessControl, meta, children, onClick, ...rest },
    ref,
  ) => {
    const { hidden, disabled, LinkComponent, to, label } = useShowButton({
      resource,
      id: recordItemId,
      accessControl,
      meta,
    });

    const isDisabled = disabled || rest.disabled;
    const isHidden = hidden || rest.hidden;
    const isIconSize = String(rest.size ?? "").startsWith("icon");

    if (isHidden) return null;

    return (
      <Button {...rest} ref={ref} disabled={isDisabled} asChild>
        <LinkComponent
          to={to}
          replace={false}
          className={cn(
            "flex items-center justify-center rounded-md",
            isIconSize
              ? "h-full gap-0 border border-border/80 bg-background p-0"
              : "h-full gap-2 border border-border/80 bg-background px-4 text-sm font-semibold",
            "shadow-xs transition-all hover:bg-muted/50 hover:shadow-sm",
            "focus-visible:ring-[#d5bb87]/60",
          )}
        >
          {children ?? (
            <div className="flex items-center gap-2 font-semibold">
              <Eye className="h-4 w-4" />
              <span>{label}</span>
            </div>
          )}
        </LinkComponent>
      </Button>
    );
  },
);

ShowButton.displayName = "ShowButton";
