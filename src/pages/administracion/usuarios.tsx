"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type HttpError, useList, useResourceParams } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useTable } from "@refinedev/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Trash2 } from "lucide-react";
import { z } from "zod";

import { kyInstance } from "@/providers/data";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { DataTableSorter } from "@/components/refine-ui/data-table/data-table-sorter";
import { ListView, ListViewHeader } from "@/components/refine-ui/views/list-view";
import { CreateView, CreateViewHeader } from "@/components/refine-ui/views/create-view";
import { EditView, EditViewHeader } from "@/components/refine-ui/views/edit-view";
import { ShowView, ShowViewHeader } from "@/components/refine-ui/views/show-view";
import { LoadingOverlay } from "@/components/refine-ui/layout/loading-overlay";
import { DeleteButton } from "@/components/refine-ui/buttons/delete";
import { EditButton } from "@/components/refine-ui/buttons/edit";
import { ShowButton } from "@/components/refine-ui/buttons/show";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type IdentityUser = {
  id: string;
  email?: string;
  fullName?: string;
  roles?: Array<string | { name?: string; roleName?: string }>;
  roleNames?: string[];
  assignedRoles?: string[];
};

const userSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
  fullName: z.string().min(1, "El nombre completo es requerido"),
});

type UserFormValues = z.infer<typeof userSchema>;

function getRoleLabel(role: string | { name?: string; roleName?: string } | undefined) {
  if (!role) return "";
  if (typeof role === "string") return role;
  return role.name ?? role.roleName ?? "";
}

function getUserRoles(user: IdentityUser) {
  return user.roles?.map(getRoleLabel).filter(Boolean) ?? user.roleNames ?? user.assignedRoles ?? [];
}

function getUserDisplayName(user: IdentityUser) {
  return user.fullName || user.email || user.id;
}

export function AdminUsersList() {
  const columns = useMemo<ColumnDef<IdentityUser>[]>(
    () => [
      {
        id: "fullName",
        accessorFn: (row: IdentityUser) => getUserDisplayName(row),
        header: ({ column }: any) => <DataTableSorter column={column} title="Nombre" />,
        cell: ({ getValue }: any) => <span>{String(getValue())}</span>,
      },
      {
        id: "email",
        accessorKey: "email",
        header: ({ column }: any) => <DataTableSorter column={column} title="Correo" />,
      },
      {
        id: "roles",
        accessorFn: (row: IdentityUser) => getUserRoles(row).join(", "),
        header: "Roles",
        cell: ({ row }: any) => {
          const roles = getUserRoles(row.original);
          if (!roles.length) return <span className="text-muted-foreground">—</span>;
          return (
            <div className="flex flex-wrap gap-1">
              {roles.map((role) => (
                <Badge key={role} variant="secondary">
                  {role}
                </Badge>
              ))}
            </div>
          );
        },
      },
      {
        id: "actions",
        header: "Acciones",
        size: 340,
        cell: ({ row }: any) => (
          <div className="grid grid-cols-3 gap-2">
            <ShowButton resource="identity-users" recordItemId={row.original.id} size="sm" variant="outline">
              <Eye className="mr-1 h-4 w-4" />
              Ver
            </ShowButton>
            <EditButton resource="identity-users" recordItemId={row.original.id} size="sm" variant="secondary">
              <Edit className="mr-1 h-4 w-4" />
              Editar
            </EditButton>
            <DeleteButton resource="identity-users" recordItemId={row.original.id} size="sm" variant="destructive">
              <Trash2 className="mr-1 h-4 w-4" />
              Eliminar
            </DeleteButton>
          </div>
        ),
      },
    ],
    [],
  );

  const table = useTable<IdentityUser>({
    columns,
    refineCoreProps: {
      resource: "identity-users",
      pagination: { pageSize: 20 },
    },
  });

  return (
    <ListView>
      <ListViewHeader title="Usuarios" />
      <DataTable table={table} />
    </ListView>
  );
}

export function AdminUsersCreate() {
  const {
    refineCore: { onFinish },
    ...form
  } = useForm<UserFormValues, HttpError, UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
    refineCoreProps: {
      resource: "identity-users",
      action: "create",
    },
  });

  return (
    <CreateView>
      <CreateViewHeader title="Crear Usuario" />
      <Form {...form}>
        <form
          className="flex max-w-2xl flex-col gap-6"
          onSubmit={form.handleSubmit((values) =>
            onFinish({
              email: values.email,
              password: values.password,
              fullName: values.fullName,
            }),
          )}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Nombre completo *</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre completo del usuario" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="usuario@dominio.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña *</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Contraseña inicial" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Guardar</Button>
        </form>
      </Form>
    </CreateView>
  );
}

export function AdminUsersShow() {
  const { id } = useResourceParams();
  const { result, query } = useList<IdentityUser>({
    resource: "identity-users",
    pagination: { currentPage: 1, pageSize: 1000 },
  });

  const user = result.data.find((item) => item.id === id) ?? query.data?.data.find((item) => item.id === id);

  return (
    <ShowView>
      <ShowViewHeader resource="identity-users" title="Usuario" />
      <LoadingOverlay loading={query.isLoading}>
        <div className="grid gap-4 rounded-md border bg-background p-4 md:grid-cols-2">
          <div className="rounded-md border p-3">
            <div className="text-xs uppercase text-muted-foreground">ID</div>
            <div className="mt-1 text-sm break-all">{user?.id ?? "—"}</div>
          </div>
          <div className="rounded-md border p-3">
            <div className="text-xs uppercase text-muted-foreground">Nombre completo</div>
            <div className="mt-1 text-sm">{user?.fullName ?? "—"}</div>
          </div>
          <div className="rounded-md border p-3">
            <div className="text-xs uppercase text-muted-foreground">Correo electrónico</div>
            <div className="mt-1 text-sm">{user?.email ?? "—"}</div>
          </div>
          <div className="rounded-md border p-3 md:col-span-2">
            <div className="text-xs uppercase text-muted-foreground">Roles</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {getUserRoles(user ?? { id: "" }).length ? (
                getUserRoles(user ?? { id: "" }).map((role) => (
                  <Badge key={role} variant="secondary">
                    {role}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">Sin roles asignados</span>
              )}
            </div>
          </div>
        </div>
      </LoadingOverlay>
    </ShowView>
  );
}

export function AdminUsersAssignRoles() {
  const { id } = useResourceParams();
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const initialRolesRef = useRef<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { result: usersResult } = useList<IdentityUser>({
    resource: "identity-users",
    pagination: { currentPage: 1, pageSize: 1000 },
  });
  const { result: rolesResult, query: rolesQuery } = useList<any>({
    resource: "identity-roles",
    pagination: { currentPage: 1, pageSize: 1000 },
  });

  const user = usersResult.data.find((item) => item.id === id);
  const roles = rolesResult.data
    .map((role) => getRoleLabel(role) || role?.name || role?.roleName || String(role))
    .filter(Boolean);

  useEffect(() => {
    if (user) {
      const roles = getUserRoles(user);
      initialRolesRef.current = roles;
      setSelectedRoles(roles);
    }
  }, [user?.id]);

  async function handleSave() {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const rolesToAdd = selectedRoles.filter((roleName) => !initialRolesRef.current.includes(roleName));
      for (const roleName of rolesToAdd) {
        await kyInstance.post(`api/identity/users/${id}/roles`, { json: { roleName } });
      }
      setSuccess(rolesToAdd.length ? "Roles asignados correctamente." : "No había roles nuevos para asignar.");
    } catch (err: any) {
      setError(err?.message ?? "No fue posible asignar los roles.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <EditView>
      <EditViewHeader title={`Asignar roles a ${getUserDisplayName(user ?? { id: String(id) })}`} />
      <LoadingOverlay loading={Boolean(rolesQuery.isLoading)}>
        <div className="flex max-w-3xl flex-col gap-4 rounded-md border bg-background p-4">
          <div className="text-sm text-muted-foreground">
            Selecciona los roles que quieres asignar a este usuario. Esta pantalla agrega roles nuevos; no elimina asignaciones existentes porque el backend solo expone el endpoint de alta.
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {roles.map((role) => (
              <label key={role} className="flex items-center gap-3 rounded-md border p-3">
                <Checkbox
                  checked={selectedRoles.includes(role)}
                  onCheckedChange={(checked) => {
                    setSelectedRoles((current) =>
                      checked
                        ? [...current, role]
                        : current.filter((item) => item !== role),
                    );
                  }}
                />
                <span className="text-sm font-medium">{role}</span>
              </label>
            ))}
          </div>

          {error ? <div className="text-sm text-red-600">{error}</div> : null}
          {success ? <div className="text-sm text-emerald-600">{success}</div> : null}

          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </div>
      </LoadingOverlay>
    </EditView>
  );
}
