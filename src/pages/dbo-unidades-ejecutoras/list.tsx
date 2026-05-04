import { useMemo, useState, useEffect } from "react";
import { useTable } from "@refinedev/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { useMany } from "@refinedev/core";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { DataTableSorter } from "@/components/refine-ui/data-table/data-table-sorter";
import { ListView, ListViewHeader } from "@/components/refine-ui/views/list-view";
import { EditButton } from "@/components/refine-ui/buttons/edit";
import { DeleteButton } from "@/components/refine-ui/buttons/delete";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";

interface UnidadEjecutora {
  id: number;
  codigo: string;
  nombre: string;
  nivel: number;
  padreId?: number;
  estado?: string;
}

const nivelLabels: Record<number, string> = {
  1: "Nacional",
  2: "Departamental",
  3: "Municipal",
  4: "Institucional",
};

export default function UnidadesEjectorasList() {
  const [padresMap, setPadresMap] = useState<Record<number, string>>({});

  const columns = useMemo<ColumnDef<UnidadEjecutora>[]>(
    () => [
      {
        id: "codigo",
        accessorKey: "codigo",
        header: ({ column }) => <DataTableSorter column={column} title="Código" />,
        size: 120,
      },
      {
        id: "nombre",
        accessorKey: "nombre",
        header: ({ column }) => <DataTableSorter column={column} title="Nombre" />,
      },
      {
        id: "nivel",
        accessorKey: "nivel",
        header: ({ column }) => <DataTableSorter column={column} title="Nivel" />,
        size: 160,
        cell: ({ getValue }) => {
          const nivel = getValue<number>();
          return <span className="text-sm">{nivelLabels[nivel] ?? nivel}</span>;
        },
      },
      {
        id: "padre",
        accessorKey: "padreId",
        header: "Unidad Padre",
        size: 200,
        cell: ({ getValue }) => {
          const padreId = getValue<number | undefined>();
          if (!padreId) return <span className="text-muted-foreground text-sm">—</span>;
          const nombre = padresMap[padreId];
          return <span className="text-sm">{nombre ?? `ID: ${padreId}`}</span>;
        },
      },
      {
        id: "estado",
        accessorKey: "estado",
        header: "Estado",
        size: 110,
        cell: ({ getValue }) => {
          const estado = getValue<string | undefined>();
          if (!estado) return null;
          const isActive = estado.toLowerCase() === "active" || estado.toLowerCase() === "activo";
          return (
            <Badge
              variant={isActive ? "default" : "secondary"}
              className={
                isActive
                  ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-100 border-gray-200"
              }>
              {isActive ? "Activo" : "Inactivo"}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        header: "Acciones",
        size: 100,
        cell: ({ row }) => {
          const recordItemId = row.original.id;
          return (
            <div className="flex gap-1">
              <EditButton recordItemId={recordItemId} size="icon-sm" variant="secondary">
                <Edit className="h-4 w-4" />
              </EditButton>
              <DeleteButton recordItemId={recordItemId} size="icon-sm" variant="destructive">
                <Trash2 className="h-4 w-4" />
              </DeleteButton>
            </div>
          );
        },
      },
    ],
    [padresMap],
  );

  const table = useTable<UnidadEjecutora>({
    columns,
    refineCoreProps: {
      resource: "dbo-unidades-ejecutoras",
      pagination: { pageSize: 20 },
    },
  });

  const rows = table.reactTable.getRowModel().rows;

  const padreIds = Array.from(
    new Set(rows.map((r) => r.original.padreId).filter((id): id is number => id !== undefined && id !== null)),
  );

  const { query: padresQuery } = useMany<UnidadEjecutora>({
    resource: "dbo-unidades-ejecutoras",
    ids: padreIds,
    queryOptions: {
      enabled: padreIds.length > 0,
    },
  });

  useEffect(() => {
    if (padresQuery?.data?.data) {
      const map: Record<number, string> = {};
      padresQuery.data.data.forEach((u: UnidadEjecutora) => {
        map[u.id] = u.nombre;
      });
      setPadresMap(map);
    }
  }, [padresQuery?.data]);

  return (
    <ListView>
      <ListViewHeader title="Unidades Ejecutoras" />
      <DataTable table={table} />
    </ListView>
  );
}
