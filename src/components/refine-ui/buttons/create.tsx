"use client";

import React from "react";
import { type BaseKey, useCreateButton } from "@refinedev/core";
import { useResourceParams } from "@refinedev/core";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type CreateButtonProps = {
  /**
   * Resource name for API data interactions. `identifier` of the resource can be used instead of the `name` of the resource.
   * @default Inferred resource name from the route
   */
  resource?: BaseKey;
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

const feminineNouns = new Set([
  "alerta",
  "asignacion",
  "asignaciones",
  "beca",
  "cartera",
  "factura",
  "fuente",
  "matricula",
  "nomina",
  "unidad",
]);

function stripAccents(text: string) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function singularizeLabel(label: string) {
  const cleanLabel = label.trim().replace(/^crear\s+/i, "").replace(/^create\s+/i, "");
  if (!cleanLabel) return "registro";

  return cleanLabel
    .split(" ")
    .map((word) => {
      if (word.length <= 3) return word;
      const lower = stripAccents(word.toLowerCase());
      if (lower.endsWith("iones")) return word.slice(0, -3);
      if (lower.endsWith("es")) return word.slice(0, -2);
      if (lower.endsWith("s")) return word.slice(0, -1);
      return word;
    })
    .join(" ");
}

function getCreateText(label?: string) {
  const singular = singularizeLabel(label ?? "registro");
  const firstWord = stripAccents(singular.split(" ")[0]?.toLowerCase() ?? "");
  const prefix = feminineNouns.has(firstWord) ? "Nueva" : "Nuevo";
  return `${prefix} ${singular}`;
}

export const CreateButton = React.forwardRef<
  React.ComponentRef<typeof Button>,
  CreateButtonProps
>(({ resource, accessControl, meta, children, onClick, ...rest }, ref) => {
  const { hidden, disabled, LinkComponent, to, label } = useCreateButton({
    resource,
    accessControl,
    meta,
  });
  const { resource: currentResource } = useResourceParams(resource ? { resource: String(resource) } : undefined);

  const isDisabled = disabled || rest.disabled;
  const isHidden = hidden || rest.hidden;
  const text = getCreateText(currentResource?.meta?.label?.toString() ?? label ?? String(resource ?? "registro"));

  if (isHidden) return null;

  return (
    <Button {...rest} ref={ref} disabled={isDisabled} asChild>
      <LinkComponent to={to} replace={false}>
        {children ?? (
          <div className="flex items-center gap-2 font-semibold">
            <Plus className="w-4 h-4" />
            <span>{text}</span>
          </div>
        )}
      </LinkComponent>
    </Button>
  );
});

CreateButton.displayName = "CreateButton";
