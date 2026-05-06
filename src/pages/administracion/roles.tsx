"use client";

import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type HttpError } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useTable } from "@refinedev/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import { z } from "zod";
import { useParams } from "react-router";

import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { DataTableSorter } from "@/components/refine-ui/data-table/data-table-sorter";
import { EditButton } from "@/components/refine-ui/buttons/edit";
import { ListView, ListViewHeader } from "@/components/refine-ui/views/list-view";
import { CreateView, CreateViewHeader } from "@/components/refine-ui/views/create-view";
import { EditView, EditViewHeader } from "@/components/refine-ui/views/edit-view";
import { DeleteButton } from "@/components/refine-ui/buttons/delete";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { kyInstance } from "@/providers/data";

type IdentityRole = {
  id?: string;
  name?: string;
} | string;

const roleSchema = z.object({
  name: z.string().min(1, "El nombre del rol es requerido"),
});

type RoleFormValues = z.infer<typeof roleSchema>;

function getRoleName(role: IdentityRole) {
  if (typeof role === "string") return role;
  return role.name ?? role.id ?? "";
}

export function AdminRolesList() {
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "name",
        accessorFn: (row: IdentityRole) => getRoleName(row),
        header: ({ column }) => <DataTableSorter column={column} title="Nombre" />,
        cell: ({ getValue }: any) => <span>{String(getValue())}</span>,
      },
      {
        id: "actions",
        header: "Acciones",
        size: 260,
        cell: ({ row }: any) => (
          <div className="grid grid-cols-2 gap-2">
            <EditButton resource="identity-roles" recordItemId={getRoleName(row.original)} size="sm" variant="secondary">
              <Edit className="mr-1 h-4 w-4" />
              Editar
            </EditButton>
            <DeleteButton resource="identity-roles" recordItemId={getRoleName(row.original)} size="sm" variant="destructive">
              Eliminar
            </DeleteButton>
          </div>
        ),
      },
    ],
    [],
  );

  const table = useTable<any>({
    columns,
    refineCoreProps: {
      resource: "identity-roles",
      pagination: { pageSize: 20 },
    },
  });

  return (
    <ListView>
      <ListViewHeader title="Roles" />
      <DataTable table={table} />
    </ListView>
  );
}

export function AdminRolesEdit() {
  const { id } = useParams();
  const roleName = String(id ?? "");
  const [originalName, setOriginalName] = useState(roleName);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<RoleFormValues, HttpError, RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: { name: roleName },
  });

  useEffect(() => {
    form.reset({ name: roleName });
    setOriginalName(roleName);
  }, [roleName]);

  return (
    <EditView>
      <EditViewHeader title={`Editar Rol: ${originalName || "—"}`} />
      <Form {...form}>
        <form
          className="flex w-full max-w-xl flex-col gap-5 rounded-xl border border-border/80 bg-card p-4 shadow-[0_8px_24px_rgba(0,40,77,0.06)] md:gap-6 md:p-6"
          onSubmit={form.handleSubmit(async (values) => {
            const nextName = values.name.trim();
            if (!nextName) return;

            setSaving(true);
            setError(null);
            setSuccess(null);

            try {
              if (nextName !== originalName) {
                await kyInstance.delete(`api/identity/roles/${encodeURIComponent(originalName)}`);
                await kyInstance.post("api/identity/roles", { json: { name: nextName } });
                setOriginalName(nextName);
                form.reset({ name: nextName });
                setSuccess("Rol actualizado correctamente.");
              } else {
                setSuccess("No hubo cambios para guardar.");
              }
            } catch (err: any) {
              setError(err?.message ?? "No fue posible actualizar el rol.");
            } finally {
              setSaving(false);
            }
          })}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del rol *</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: Administrador" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error ? <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</div> : null}
          {success ? <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{success}</div> : null}

          <div className="flex justify-end border-t border-border/70 pt-5">
            <Button type="submit" disabled={saving} className="w-full min-w-[132px] sm:w-auto">
              {saving ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </Form>
    </EditView>
  );
}

export function AdminRolesCreate() {
  const {
    refineCore: { onFinish },
    ...form
  } = useForm<RoleFormValues, HttpError, RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: { name: "" },
    refineCoreProps: {
      resource: "identity-roles",
      action: "create",
    },
  });

  return (
    <CreateView>
      <CreateViewHeader title="Crear Rol" />
      <Form {...form}>
        <form
          className="flex w-full max-w-xl flex-col gap-5 rounded-xl border border-border/80 bg-card p-4 shadow-[0_8px_24px_rgba(0,40,77,0.06)] md:gap-6 md:p-6"
          onSubmit={form.handleSubmit((values) => onFinish({ name: values.name }))}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del rol *</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: Administrador" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end border-t border-border/70 pt-5">
            <Button type="submit" className="w-full min-w-[132px] sm:w-auto">Guardar</Button>
          </div>
        </form>
      </Form>
    </CreateView>
  );
}
