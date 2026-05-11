"use client";

import { useEffect, useMemo, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type HttpError, useOne, useResourceParams } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { useForm } from "@refinedev/react-hook-form";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Trash2 } from "lucide-react";
import { z } from "zod";

import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { DataTableSorter } from "@/components/refine-ui/data-table/data-table-sorter";
import { DeleteButton } from "@/components/refine-ui/buttons/delete";
import { EditButton } from "@/components/refine-ui/buttons/edit";
import { ShowButton } from "@/components/refine-ui/buttons/show";
import { CreateView, CreateViewHeader } from "@/components/refine-ui/views/create-view";
import { EditView, EditViewHeader } from "@/components/refine-ui/views/edit-view";
import { ListView, ListViewHeader } from "@/components/refine-ui/views/list-view";
import { ShowView, ShowViewHeader } from "@/components/refine-ui/views/show-view";
import { LoadingOverlay } from "@/components/refine-ui/layout/loading-overlay";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { DynamicOptionField } from "@/components/refine-ui/form/dynamic-option-field";

export type CrudFieldType = "text" | "textarea" | "number" | "datetime" | "date" | "boolean" | "select";

export type CrudFieldOption = {
  label: string;
  value: string;
};

export type CrudField = {
  key: string;
  label: string;
  type: CrudFieldType;
  required?: boolean;
  placeholder?: string;
  list?: boolean;
  listWidth?: number;
  hideInShow?: boolean;
  options?: CrudFieldOption[];
  optionResource?: string;
  optionLabelKey?: string;
  optionValueKey?: string;
  optionSearchKey?: string;
  optionLabelResolver?: (record: Record<string, any>) => string;
  selectValueType?: "string" | "number";
  searchable?: boolean;
  display?: (value: unknown, record: Record<string, any>) => React.ReactNode;
  className?: string;
};

export type CrudResourceConfig = {
  resource: string;
  title: string;
  singularTitle: string;
  fields: CrudField[];
  formFields?: CrudField[];
  listFields?: string[];
  primaryField?: string;
  showFields?: string[];
  showTitle?: (record: Record<string, any>) => string;
  editTitle?: string;
  createTitle?: string;
  formDescription?: string;
};

function isNil(value: unknown) {
  return value === null || value === undefined || value === "";
}

function asBoolean(value: unknown) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (["true", "1", "yes", "y", "si", "sí", "activo", "active"].includes(normalized)) return true;
    if (["false", "0", "no", "n", "inactivo", "inactive"].includes(normalized)) return false;
  }
  if (typeof value === "number") return value !== 0;
  return Boolean(value);
}

function toInputDateTime(value: unknown) {
  if (!value || typeof value !== "string") return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.slice(0, 16);
  const offset = date.getTimezoneOffset() * 60000;
  const local = new Date(date.getTime() - offset);
  return local.toISOString().slice(0, 16);
}

function toInputDate(value: unknown) {
  if (!value || typeof value !== "string") return "";
  if (value.includes("T")) return toInputDateTime(value).slice(0, 10);
  return value.slice(0, 10);
}

function toApiDateTime(value: unknown) {
  if (isNil(value)) return null;
  if (typeof value !== "string") return value;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toISOString();
}

function toApiDate(value: unknown) {
  if (isNil(value)) return null;
  if (typeof value !== "string") return value;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toISOString();
}

function normalizeFormValue(field: CrudField, value: unknown) {
  if (field.type === "datetime") return toInputDateTime(value);
  if (field.type === "date") return toInputDate(value);
  if (field.type === "boolean") return asBoolean(value);
  if (field.type === "number") return isNil(value) ? "" : String(value);
  if (field.type === "select") return isNil(value) ? "" : String(value);
  return isNil(value) ? "" : String(value);
}

function normalizeDisplayValue(field: CrudField, value: unknown, record: Record<string, any>) {
  if (field.display) return field.display(value, record);
  if (field.type === "boolean") {
    const checked = asBoolean(value);
    return (
      <Badge
        variant={checked ? "default" : "secondary"}
        className={cn(checked ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600")}
      >
        {checked ? "Sí" : "No"}
      </Badge>
    );
  }
  if (field.type === "datetime" || field.type === "date") {
    if (!value) return <span className="text-muted-foreground">—</span>;
    const text = typeof value === "string" ? new Date(value).toLocaleString("es-CO") : String(value);
    return <span>{text}</span>;
  }
  if (field.type === "select") {
    // If the API returned the related object (e.g. unidadEjecutora: { nombre }), prefer showing its label
    const baseKey = field.key.replace(/Id$/i, "");
    const resourceKey = field.optionResource ? field.optionResource.replace(/[^a-z0-9]/gi, "") : undefined;
    const related = record[baseKey] ?? record[baseKey + "s"] ?? (resourceKey ? record[resourceKey] : undefined);
    const labelKey = field.optionLabelKey ?? "nombre";
    if (related && typeof related === "object") {
      const candidate = related[labelKey] ?? related.fullName ?? related.titulo ?? related.codigo ?? related.numero;
      if (candidate) return <span>{String(candidate)}</span>;
    }

    // If we only have the id (value), try to fetch the related record to show its label
    if (!related && !isNil(value) && field.optionResource) {
      return <RelatedLabel resource={field.optionResource} id={value} labelKey={labelKey} fallback={String(value)} />;
    }
  }
  if (isNil(value) || value === "") return <span className="text-muted-foreground">—</span>;
  return <span>{String(value)}</span>;
}

function buildSchema(fields: CrudField[]) {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const field of fields) {
    switch (field.type) {
      case "boolean":
        shape[field.key] = z.boolean().optional().default(false);
        break;
      case "number":
        shape[field.key] = field.required
          ? z.preprocess((value) => (isNil(value) ? undefined : Number(value)), z.number({ invalid_type_error: `${field.label} debe ser un número` }))
          : z.preprocess((value) => (isNil(value) ? undefined : Number(value)), z.number().optional().nullable());
        break;
      case "datetime":
      case "date":
      case "select":
      case "text":
      case "textarea":
      default:
        shape[field.key] = field.required
          ? z.string().min(1, `${field.label} es requerido`)
          : z.string().optional().nullable();
        break;
    }
  }

  return z.object(shape);
}

function buildDefaultValues(fields: CrudField[]) {
  return fields.reduce<Record<string, any>>((acc, field) => {
    if (field.type === "boolean") {
      acc[field.key] = false;
    } else {
      acc[field.key] = "";
    }
    return acc;
  }, {});
}

function buildPayload(fields: CrudField[], values: Record<string, any>) {
  const payload: Record<string, any> = {};

  for (const field of fields) {
    const value = values[field.key];

    if (field.type === "boolean") {
      payload[field.key] = Boolean(value);
      continue;
    }

    if (field.type === "number") {
      if (isNil(value)) {
        if (field.required) payload[field.key] = null;
        continue;
      }
      payload[field.key] = Number(value);
      continue;
    }

    if (field.type === "select") {
      if (isNil(value)) {
        if (field.required) payload[field.key] = null;
        continue;
      }
      payload[field.key] = field.selectValueType === "number" ? Number(value) : value;
      continue;
    }

    if (field.type === "datetime") {
      const serialized = toApiDateTime(value);
      if (serialized === null && !field.required) continue;
      payload[field.key] = serialized;
      continue;
    }

    if (field.type === "date") {
      const serialized = toApiDate(value);
      if (serialized === null && !field.required) continue;
      payload[field.key] = serialized;
      continue;
    }

    if (isNil(value)) {
      if (field.required) payload[field.key] = null;
      continue;
    }

    payload[field.key] = value;
  }

  return payload;
}

function getDefaultColumnWidth(field: CrudField): number {
  if (field.type === "boolean") return 100;
  if (field.type === "datetime" || field.type === "date") return 160;
  if (field.type === "number") return 120;
  if (field.type === "textarea") return 220;
  // text fields: longer labels get more space
  const labelLen = field.label.length;
  if (labelLen > 20) return 260;
  if (labelLen > 12) return 200;
  return 150;
}

export function createCrudPages(config: CrudResourceConfig) {
  const formFields = config.formFields ?? config.fields;
  const schema = buildSchema(formFields);
  type FormValues = z.infer<typeof schema>;

  function CrudListPage() {
    const listFields = config.listFields ?? config.fields.filter((field) => field.list !== false).map((field) => field.key);

    const columns = useMemo<ColumnDef<Record<string, any>>[]>(
      () =>
        [
          ...listFields
            .map((key) => config.fields.find((field) => field.key === key))
            .filter((field): field is CrudField => Boolean(field))
            .map((field) => ({
            id: field.key,
            accessorKey: field.key,
            header: ({ column }: any) => <DataTableSorter column={column} title={field.label} />,
            size: field.listWidth ?? getDefaultColumnWidth(field),
            cell: ({ getValue, row }: any) => normalizeDisplayValue(field, getValue(), row.original),
          })),
          {
            id: "actions",
            header: "Acciones",
            size: 160,
            cell: ({ row }: any) => {
              const recordItemId = row.original.id;
              return (
                <div className="flex items-center justify-center gap-1">
                  <ShowButton resource={config.resource} recordItemId={recordItemId} size="icon-sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </ShowButton>
                  <EditButton resource={config.resource} recordItemId={recordItemId} size="icon-sm" variant="secondary">
                    <Edit className="h-4 w-4" />
                  </EditButton>
                  <DeleteButton resource={config.resource} recordItemId={recordItemId} size="icon-sm" variant="destructive">
                    <Trash2 className="h-4 w-4" />
                  </DeleteButton>
                </div>
              );
            },
          },
        ] as ColumnDef<Record<string, any>>[],
      [listFields],
    );

    const table = useTable<Record<string, any>>({
      columns,
      refineCoreProps: {
        resource: config.resource,
        pagination: { pageSize: 20 },
      },
    });

    return (
      <ListView>
        <ListViewHeader title={config.title} />
        <DataTable table={table} />
      </ListView>
    );
  }

  function CrudFormPage({ isEdit = false }: { isEdit?: boolean }) {
    const { id } = useResourceParams();
    const hydratedRecordId = useRef<string | number | null>(null);
    const {
      refineCore: { onFinish, query },
      ...form
    } = useForm<Record<string, any>, HttpError, FormValues>({
      resolver: zodResolver(schema),
      defaultValues: buildDefaultValues(formFields) as any,
      refineCoreProps: {
        resource: config.resource,
        action: isEdit ? "edit" : "create",
        meta: isEdit ? { method: "put" } : undefined,
        ...(isEdit && id ? { id } : {}),
      },
    });

    useEffect(() => {
      const record = query?.data?.data;
      if (!isEdit || !record) return;

      const recordId = record.id ?? id ?? null;
      if (hydratedRecordId.current === recordId) return;

      const normalized = formFields.reduce<Record<string, any>>((acc, field) => {
        acc[field.key] = normalizeFormValue(field, record[field.key]);
        return acc;
      }, {});

      form.reset(normalized as any);
      hydratedRecordId.current = recordId;
    }, [form, formFields, id, isEdit, query?.data?.data]);

    const isLoading = Boolean(isEdit && query?.isLoading);

    function onSubmit(values: FormValues) {
      return onFinish(buildPayload(formFields, values as Record<string, any>)).catch(() => undefined);
    }

    const title = isEdit ? config.editTitle ?? `Editar ${config.singularTitle}` : config.createTitle ?? `Crear ${config.singularTitle}`;

    const formContent = (
      <LoadingOverlay loading={isLoading}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn(
              "flex w-full max-w-4xl flex-col gap-5 rounded-xl border border-border/80",
              "bg-card p-4 shadow-[0_8px_24px_rgba(0,40,77,0.06)] md:gap-6 md:p-6",
            )}
          >
            {config.formDescription ? (
              <p className="rounded-md border border-[#d5bb87]/30 bg-[#efd9af]/18 px-4 py-3 text-sm text-muted-foreground">
                {config.formDescription}
              </p>
            ) : null}
            <div className="grid gap-4 md:grid-cols-2">
          {formFields.map((field) => {
                if (field.type === "textarea") {
                  return (
                    <FormField
                      key={field.key}
                      control={form.control}
                      name={field.key as any}
                      render={({ field: formField }) => (
                        <FormItem className={cn("md:col-span-2", field.className)}>
                          <FormLabel>{field.label}{field.required ? " *" : ""}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={field.placeholder}
                              rows={4}
                              {...formField}
                              value={formField.value ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );
                }

                if (field.type === "boolean") {
                  return (
                    <FormField
                      key={field.key}
                      control={form.control}
                      name={field.key as any}
                      render={({ field: formField }) => (
                        <FormItem className={cn("flex items-center gap-3", field.className)}>
                          <FormLabel className="mt-0">{field.label}</FormLabel>
                          <FormControl>
                            <Switch checked={Boolean(formField.value)} onCheckedChange={formField.onChange} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );
                }

                if (field.type === "select") {
                  return (
                    <DynamicOptionField
                      key={field.key}
                      control={form.control}
                      name={field.key}
                      label={field.label}
                      required={field.required}
                      placeholder={field.placeholder}
                      options={field.options}
                      optionResource={field.optionResource}
                      optionLabelKey={field.optionLabelKey}
                      optionValueKey={field.optionValueKey}
                      optionSearchKey={field.optionSearchKey}
                      optionLabelResolver={field.optionLabelResolver}
                      searchable={field.searchable}
                      className={field.className}
                    />
                  );
                }

                const inputType = field.type === "number" ? "number" : field.type === "datetime" ? "datetime-local" : field.type === "date" ? "date" : "text";
                const wrapperClassName = field.type === "number" ? "" : field.className;

                return (
                  <FormField
                    key={field.key}
                    control={form.control}
                    name={field.key as any}
                    render={({ field: formField }) => (
                      <FormItem className={wrapperClassName}>
                        <FormLabel>{field.label}{field.required ? " *" : ""}</FormLabel>
                        <FormControl>
                          <Input
                            type={inputType}
                            placeholder={field.placeholder}
                            step={field.type === "number" ? "any" : undefined}
                            {...formField}
                            value={formField.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              })}
            </div>

            <div className="flex justify-end gap-2 border-t border-border/70 pt-5">
              <Button type="submit" className="w-full min-w-[132px] sm:w-auto">
                Guardar
              </Button>
            </div>
          </form>
        </Form>
      </LoadingOverlay>
    );

    if (isEdit) {
      return (
        <EditView>
          <EditViewHeader title={title} />
          {formContent}
        </EditView>
      );
    }

    return (
      <CreateView>
        <CreateViewHeader title={title} />
        {formContent}
      </CreateView>
    );
  }

  function CrudShowPage() {
    const { id } = useResourceParams();
    const { query, result } = useOne<Record<string, any>>({
      resource: config.resource,
      id,
    });
    const record = result ?? query.data?.data ?? {};
    const showFields = (config.showFields?.length ? config.showFields : config.fields.map((field) => field.key)).filter(
      (key) => config.fields.some((field) => field.key === key),
    );
    const recordTitle = query.isLoading
      ? config.title
      : config.showTitle?.(record) ?? `${config.singularTitle} ${record?.id ?? id ?? ""}`.trim();

    return (
      <ShowView>
        <ShowViewHeader resource={config.resource} title={recordTitle || config.title} />
        <div className="grid gap-4 rounded-xl border border-border/80 bg-card p-4 shadow-[0_8px_24px_rgba(0,40,77,0.06)] md:grid-cols-2 md:p-6">
          {showFields
            .map((key) => config.fields.find((field) => field.key === key))
            .filter((field): field is CrudField => Boolean(field))
            .filter((field) => field.hideInShow !== true)
            .map((field) => {
              const value = record[field.key];
              return (
                <div
                  key={field.key}
                  className="rounded-lg border border-border/75 bg-background/70 p-4 shadow-xs transition-colors hover:border-[#d5bb87]/50"
                >
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {field.label}
                  </div>
                  <div className="mt-2 text-sm font-medium">
                    {normalizeDisplayValue(field, value, record)}
                  </div>
                </div>
              );
            })}
        </div>
      </ShowView>
    );
  }

  return {
    ListPage: CrudListPage,
    CreatePage: () => <CrudFormPage isEdit={false} />,
    EditPage: () => <CrudFormPage isEdit={true} />,
    ShowPage: CrudShowPage,
  };
}

function RelatedLabel({
  resource,
  id,
  labelKey = "nombre",
  fallback,
}: {
  resource?: string;
  id: unknown;
  labelKey?: string;
  fallback?: string;
}) {
  if (!resource || isNil(id) || String(id) === "") return <span className="text-muted-foreground">—</span>;

  const { query, result } = useOne<Record<string, any>>({
    resource,
    id: String(id),
    queryOptions: { enabled: true },
  });

  const record = result ?? query.data?.data ?? null;
  const candidate = record ? record[labelKey] ?? record.fullName ?? record.titulo ?? record.codigo ?? record.numero : null;

  if (candidate) return <span>{String(candidate)}</span>;
  if (query.isLoading) return <span className="text-muted-foreground">Cargando…</span>;
  return <span>{fallback ?? String(id)}</span>;
}
