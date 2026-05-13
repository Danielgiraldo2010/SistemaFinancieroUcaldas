"use client";

import { useMemo, useState } from "react";
import { useList } from "@refinedev/core";
import {
  AlertTriangle,
  ArrowDownAZ,
  Building2,
  CalendarDays,
  Download,
  FileSpreadsheet,
  FileText,
  Filter,
  Landmark,
  Search,
  Table2,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

import { ListView, ListViewHeader } from "@/components/refine-ui/views/list-view";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type AnyRow = Record<string, any>;

type ReportConfig = {
  key: string;
  title: string;
  description: string;
  resource: string;
  badge: string;
  icon: React.ReactNode;
  filterFields: Array<{
    key: string;
    label: string;
    placeholder?: string;
    kind: "search" | "text" | "number" | "select";
    options?: Array<{ label: string; value: string }>;
  }>;
};

const REPORTS: ReportConfig[] = [
  {
    key: "presupuesto",
    title: "Presupuesto",
    description: "Ejecución detallada, agrupaciones por rubro y seguimiento de vigencias.",
    resource: "views/dbo-vw-ejecucionpresupuestalgeneral",
    badge: "Vista analítica",
    icon: <Wallet className="h-5 w-5" />,
    filterFields: [
      { key: "vigencia", label: "Vigencia", kind: "number", placeholder: "2025" },
      { key: "unidadEjecutoraId", label: "Unidad ejecutora", kind: "text", placeholder: "ID o código" },
      { key: "rubro", label: "Rubro", kind: "search", placeholder: "Buscar rubro" },
    ],
  },
  {
    key: "nomina",
    title: "Nómina",
    description: "Consulta de empleados, dependencias, conceptos y distribución operativa.",
    resource: "views/dbo-vw-nominaempleados",
    badge: "Vista analítica",
    icon: <Users className="h-5 w-5" />,
    filterFields: [
      { key: "vigencia", label: "Vigencia", kind: "number", placeholder: "2025" },
      { key: "dependencia", label: "Dependencia", kind: "search", placeholder: "Buscar dependencia" },
      { key: "estado", label: "Estado", kind: "select", options: [{ label: "Activo", value: "activo" }, { label: "Inactivo", value: "inactivo" }] },
    ],
  },
  {
    key: "agenda",
    title: "Agenda",
    description: "Eventos pendientes, alertas y trazabilidad de seguimiento institucional.",
    resource: "views/dbo-vw-eventosseguimientopendientes",
    badge: "Vista analítica",
    icon: <CalendarDays className="h-5 w-5" />,
    filterFields: [
      { key: "estado", label: "Estado", kind: "select", options: [{ label: "Pendiente", value: "pendiente" }, { label: "Vencido", value: "vencido" }, { label: "En curso", value: "en_curso" }] },
      { key: "unidadEjecutoraId", label: "Unidad ejecutora", kind: "text", placeholder: "ID o código" },
      { key: "titulo", label: "Evento", kind: "search", placeholder: "Buscar evento" },
    ],
  },
  {
    key: "academico",
    title: "Académico",
    description: "Marco analítico pendiente de integración con vistas académicas del backend.",
    resource: "views/dbo-vw-academico",
    badge: "Pendiente",
    icon: <Building2 className="h-5 w-5" />,
    filterFields: [],
  },
  {
    key: "contratacion",
    title: "Contratación",
    description: "Seguimiento de contratación, pagos y ejecución contractual.",
    resource: "views/dbo-vw-contratacion",
    badge: "Pendiente",
    icon: <Landmark className="h-5 w-5" />,
    filterFields: [],
  },
];

function formatValue(value: unknown) {
  if (value === null || value === undefined || value === "") return "Sin dato";
  if (typeof value === "number") return new Intl.NumberFormat("es-CO").format(value);
  return String(value);
}

function normalizeText(value: unknown) {
  return String(value ?? "").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

function exportCsv(rows: AnyRow[], title: string) {
  if (!rows.length) return;
  const headers = Array.from(new Set(rows.flatMap((row) => Object.keys(row))));
  const escape = (value: unknown) => `"${String(value ?? "").replace(/"/g, '""')}"`;
  const csv = [headers.join(","), ...rows.map((row) => headers.map((header) => escape(row[header])).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${title.toLowerCase().replace(/\s+/g, "-")}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function StatCard({ title, value, helper, icon }: { title: string; value: string; helper: string; icon: React.ReactNode }) {
  return (
    <Card className="min-w-0 border border-border/70 shadow-[0_10px_28px_rgba(0,40,77,0.06)]">
      <CardContent className="p-4">
        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</div>
            <div className="mt-2 truncate text-2xl font-bold tracking-tight text-[#00284d] dark:text-white">{value}</div>
            <div className="mt-1 text-xs text-muted-foreground">{helper}</div>
          </div>
          <div className="shrink-0 rounded-2xl bg-[#efd9af]/25 p-3 text-[#00284d]">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function getRowSummary(rows: AnyRow[]) {
  const total = rows.length;
  const numericFields = rows.flatMap((row) => Object.entries(row).filter(([, value]) => typeof value === "number"));
  const sum = numericFields.reduce((acc, [, value]) => acc + (value as number), 0);
  return { total, sum };
}

function AnalyticTable({ rows }: { rows: AnyRow[] }) {
  const columns = useMemo(() => Object.keys(rows[0] ?? {}).slice(0, 8), [rows]);

  if (!rows.length) {
    return <div className="flex h-64 items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">No hay registros para mostrar.</div>;
  }

  return (
    <div className="max-h-[560px] overflow-auto rounded-xl border border-border/70 bg-card">
      <Table className="w-full table-fixed">
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column} className="sticky top-0 z-10 bg-background/95 whitespace-nowrap">
                <span className="block truncate">{column}</span>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={column} className="min-w-0">
                  <div className="max-w-full truncate">{formatValue(row[column])}</div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function ReportPanel({ config }: { config: ReportConfig }) {
  const [search, setSearch] = useState("");
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const pageSize = 20;

  const filtersQuery = useMemo(() => {
    const params: Record<string, string> = {};
    if (search.trim()) params.search = search.trim();
    for (const [key, value] of Object.entries(fieldValues)) {
      if (value.trim()) params[key] = value.trim();
    }
    return params;
  }, [search, fieldValues]);

  const { result, query: tableQuery } = useList<AnyRow>({
    resource: config.resource,
    pagination: { currentPage: 1, pageSize },
    meta: { query: filtersQuery },
  });

  const filteredRows = useMemo(() => {
    const rows = result.data ?? [];
    if (!search.trim()) return rows;
    const needle = normalizeText(search);
    return rows.filter((row: AnyRow) => Object.values(row).some((value) => normalizeText(value).includes(needle)));
  }, [result.data, search]);

  const summary = getRowSummary(filteredRows);
  const sampleKeys = Object.keys(filteredRows[0] ?? {});
  const highlightedRows = filteredRows.slice(0, 5);

  return (
    <div className="space-y-5 min-w-0">
      <Card className="w-full min-w-0 border border-border/70 bg-gradient-to-br from-[#f8f4eb] to-white shadow-[0_12px_32px_rgba(0,40,77,0.06)]">
        <CardContent className="p-5 sm:p-6">
          <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] xl:items-start">
            <div className="min-w-0 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="bg-[#efd9af]/40 text-[#00284d]">{config.badge}</Badge>
                <Badge variant="outline" className="max-w-full truncate border-[#00284d]/15 text-[#00284d]">{config.resource}</Badge>
              </div>
              <div className="min-w-0 space-y-2">
                <h3 className="text-2xl font-bold tracking-tight text-[#00284d] sm:text-3xl">{config.title}</h3>
                <p className="max-w-3xl text-sm leading-6 text-muted-foreground">{config.description}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard title="Registros" value={String(summary.total)} helper="Resultado visible de la vista" icon={<Table2 className="h-5 w-5" />} />
                <StatCard title="Campos" value={String(sampleKeys.length)} helper="Columnas detectadas automáticamente" icon={<FileText className="h-5 w-5" />} />
                <StatCard title="Suma numérica" value={String(summary.sum)} helper="Agregado bruto de campos numéricos" icon={<TrendingUp className="h-5 w-5" />} />
                <StatCard title="Exportable" value="CSV" helper="Vista lista para exportación" icon={<FileSpreadsheet className="h-5 w-5" />} />
              </div>
            </div>

            <Card className="w-full min-w-0 border border-border/70 bg-white/80 shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-[#00284d]">Lectura rápida</CardTitle>
                <CardDescription>Indicadores compactos sobre el resultado filtrado.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-xl border border-dashed border-border/70 p-4">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Resultado</div>
                  <div className="mt-2 text-3xl font-bold text-[#00284d]">{summary.total}</div>
                  <div className="mt-1 text-sm text-muted-foreground">registros visibles en la consulta actual</div>
                </div>
                <div className="rounded-xl bg-[#00284d]/5 p-4">
                  <div className="text-sm font-semibold text-[#00284d]">Campos detectados</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {sampleKeys.slice(0, 8).map((key) => (
                      <Badge key={key} variant="outline" className="max-w-full truncate">{key}</Badge>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl bg-[#efd9af]/20 p-4">
                  <div className="text-sm font-semibold text-[#00284d]">Lectura ejecutiva</div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Panel compacto para revisar el estado general sin competir con la tabla principal.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full min-w-0 border border-border/70 shadow-[0_12px_32px_rgba(0,40,77,0.06)]">
        <CardHeader className="pb-4">
          <CardTitle className="text-base text-[#00284d]">Filtros avanzados</CardTitle>
          <CardDescription>Consulta por campos superiores y refina el análisis sin entrar a CRUDs.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div className="relative md:col-span-2">
              <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Búsqueda global en la vista" className="pl-9" />
            </div>
            {config.filterFields.map((field) => (
              <div key={field.key} className="min-w-0">
                {field.kind === "select" ? (
                  <Select value={fieldValues[field.key] ?? ""} onValueChange={(value) => setFieldValues((prev) => ({ ...prev, [field.key]: value }))}>
                    <SelectTrigger className="w-full min-w-0">
                      <SelectValue placeholder={field.label} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    value={fieldValues[field.key] ?? ""}
                    onChange={(e) => setFieldValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
                    placeholder={field.placeholder ?? field.label}
                    type={field.kind === "number" ? "number" : "text"}
                    className="min-w-0"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => { setSearch(""); setFieldValues({}); }}>
              <Filter className="mr-2 h-4 w-4" />
              Limpiar filtros
            </Button>
            <Button variant="outline" onClick={() => exportCsv(filteredRows, config.title)} disabled={!filteredRows.length}>
              <Download className="mr-2 h-4 w-4" />
              Exportar CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
        <Card className="min-w-0 border border-border/70 shadow-[0_12px_32px_rgba(0,40,77,0.06)]">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base text-[#00284d]">
              <ArrowDownAZ className="h-4 w-4" />
              Tabla analítica
            </CardTitle>
            <CardDescription>Vista tabular con scroll interno solamente dentro del bloque de tabla.</CardDescription>
          </CardHeader>
          <CardContent className="min-w-0">
            {tableQuery.isLoading ? (
              <div className="py-16 text-center text-sm text-muted-foreground">Cargando vista analítica...</div>
            ) : (
              <AnalyticTable rows={highlightedRows} />
            )}
          </CardContent>
        </Card>

        <Card className="w-full min-w-0 border border-border/70 shadow-[0_12px_32px_rgba(0,40,77,0.06)] xl:sticky xl:top-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-base text-[#00284d]">Lectura rápida</CardTitle>
            <CardDescription>Indicadores compactos y consistentes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl border border-dashed border-border/70 p-4">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Resultado</div>
              <div className="mt-2 text-3xl font-bold text-[#00284d]">{summary.total}</div>
              <div className="mt-1 text-sm text-muted-foreground">registros visibles en la consulta actual</div>
            </div>
            <div className="rounded-xl bg-[#00284d]/5 p-4">
              <div className="text-sm font-semibold text-[#00284d]">Campos detectados</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {sampleKeys.slice(0, 8).map((key) => (
                  <Badge key={key} variant="outline" className="max-w-full truncate">
                    {key}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-[#efd9af]/20 p-4">
              <div className="text-sm font-semibold text-[#00284d]">Siguiente capa analítica</div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Este módulo queda preparado para agregar agrupaciones, pivotes y exportaciones PDF/XLSX cuando el backend exponga esas vistas o endpoints agregados.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ReportesPage() {
  const [current, setCurrent] = useState("presupuesto");

  return (
    <ListView className="min-w-0 gap-6">
      <ListViewHeader title="Reportes" />

      <Card className="w-full min-w-0 border border-border/70 bg-[#00284d] text-white shadow-[0_18px_40px_rgba(0,40,77,0.18)]">
        <CardContent className="p-5 sm:p-6">
          <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div className="min-w-0">
              <Badge className="mb-3 bg-white/10 text-white hover:bg-white/10">Centro analítico del ERP</Badge>
              <h2 className="text-2xl font-bold tracking-tight">Consultas profundas, filtros institucionales y exportación operativa.</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-white/75">
                Este dominio está pensado para análisis histórico, tablas avanzadas y lectura de vistas del backend. No replica el dashboard de Inicio.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:justify-self-end">
              <div className="rounded-xl bg-white/10 p-4">
                <div className="text-xs uppercase tracking-wide text-white/70">Enfoque</div>
                <div className="mt-2 font-semibold">Analítica profunda</div>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <div className="text-xs uppercase tracking-wide text-white/70">Salida</div>
                <div className="mt-2 font-semibold">Tablas + exportación</div>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <div className="text-xs uppercase tracking-wide text-white/70">Fuente</div>
                <div className="mt-2 font-semibold">Views del backend</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={current} onValueChange={setCurrent} className="min-w-0 space-y-5">
        <TabsList className="flex h-auto w-full max-w-full gap-2 overflow-x-auto bg-transparent p-0">
          {REPORTS.map((report) => (
            <TabsTrigger
              key={report.key}
              value={report.key}
              className="min-w-max justify-start gap-2 border border-border/70 bg-card px-4 py-3 data-[state=active]:bg-[#00284d] data-[state=active]:text-white"
            >
              {report.icon}
              {report.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {REPORTS.map((report) => (
          <TabsContent key={report.key} value={report.key} className="mt-0">
            {report.filterFields.length > 0 ? (
              <ReportPanel config={report} />
            ) : (
              <Card className="border border-dashed border-border/70">
                <CardContent className="py-16 text-center">
                  <AlertTriangle className="mx-auto h-8 w-8 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold text-[#00284d]">{report.title} pendiente de vista backend</h3>
                  <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
                    Dejé este espacio preparado para cuando el backend publique la vista analítica correspondiente. La arquitectura ya soporta el patrón de filtros, tablas y exportación.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <Separator />
    </ListView>
  );
}
