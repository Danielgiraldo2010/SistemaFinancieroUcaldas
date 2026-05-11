"use client";

import { useMemo } from "react";
import { useGetIdentity, useList } from "@refinedev/core";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  ComposedChart,
  Pie,
  PieChart,
  // ResponsiveContainer removed from here; using SafeResponsiveContainer below
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import SafeResponsiveContainer from "@/components/ui/SafeResponsiveContainer";
import {
  BadgeDollarSign,
  CalendarDays,
  CircleDollarSign,
  FileText,
  Users,
  BriefcaseBusiness,
  Activity,
} from "lucide-react";

import { ListView } from "@/components/refine-ui/views/list-view";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Row = Record<string, any>;

function asNumber(value: unknown) {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value) || 0;
  return 0;
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(value);
}

function formatDateLabel(value?: string) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("es-CO", { month: "short", day: "numeric" });
}

function getName(user: any) {
  return user?.fullName || [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.email || "Usuario";
}

function StatCard({
  title,
  value,
  icon,
  helper,
  accent = "from-[#00284d] to-[#045389]",
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  helper?: string;
  accent?: string;
}) {
  return (
    <Card className={cn("overflow-hidden border border-border/70 shadow-[0_10px_30px_rgba(0,40,77,0.06)]")}>
      <div className={cn("h-1.5 bg-gradient-to-r", accent)} />
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</div>
            <div className="mt-2 text-2xl font-bold tracking-tight text-[#00284d] dark:text-white">{value}</div>
            {helper ? <div className="mt-1 text-xs text-muted-foreground">{helper}</div> : null}
          </div>
          <div className="rounded-2xl bg-[#efd9af]/25 p-3 text-[#00284d]">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="border border-border/70 shadow-[0_12px_34px_rgba(0,40,77,0.06)]">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold tracking-tight text-[#00284d] dark:text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function EmptyState({ text }: { text: string }) {
  return <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-border/70 text-sm text-muted-foreground">{text}</div>;
}

function normalizeKey(value: unknown) {
  return String(value ?? "Sin dato");
}

function cleanLabel(value: unknown) {
  const text = String(value ?? "").trim();
  if (!text) return "Sin dato";

  return text
    .replace(/B\?SICO/gi, "BÁSICO")
    .replace(/CATEDR\?TICOS/gi, "CATEDRÁTICOS")
    .replace(/EDUCACI\?N/gi, "EDUCACIÓN")
    .replace(/CIENT\?FICOS/gi, "CIENTÍFICOS")
    .replace(/T\?CNICOS/gi, "TÉCNICOS")
    .replace(/VI\?TICOS/gi, "VIÁTICOS")
    .replace(/INFORM\?TICA/gi, "INFORMÁTICA")
    .replace(/COMISI\?N/gi, "COMISIÓN")
    .replace(/DEOFICINA/gi, "DE OFICINA")
    .replace(/DEEDUCACI/gi, "DE EDUCACI")
    .replace(/DELOS/gi, "DE LOS")
    .replace(/PROFESIONALES,CIENTÍFICOS YTÉCNICOS/gi, "PROFESIONALES, CIENTÍFICOS Y TÉCNICOS")
    .replace(/PROFESIONALES,CIENT?FICOS YT?CNICOS/gi, "PROFESIONALES, CIENTÍFICOS Y TÉCNICOS")
    .replace(/MAQUINARIA DEOFICINA,CONTABILIDADE INFORMÁTICA/gi, "MAQUINARIA DE OFICINA, CONTABILIDAD E INFORMÁTICA")
    .replace(/MAQUINARIA DE OFICINA,CONTABILIDADE INFORM\?TICA/gi, "MAQUINARIA DE OFICINA, CONTABILIDAD E INFORMÁTICA")
    .replace(/SUELDO BÁSICO- PLANTATEMPORAL/gi, "SUELDO BÁSICO - PLANTA TEMPORAL")
    .replace(/SUELDO B\?SICO- PLANTATEMPORAL/gi, "SUELDO BÁSICO - PLANTA TEMPORAL")
    .replace(/SERVICIOSPROFESIONALES,CIENTÍFICOS YTÉCNICOS/gi, "SERVICIOS PROFESIONALES, CIENTÍFICOS Y TÉCNICOS")
    .replace(/SERVICIOSPROFESIONALES,CIENT\?FICOS YT\?CNICOS/gi, "SERVICIOS PROFESIONALES, CIENTÍFICOS Y TÉCNICOS")
    .replace(/SERVICIOS DEEDUCACIÓN/gi, "SERVICIOS DE EDUCACIÓN")
    .replace(/SERVICIOSDEEDUCACI\?N/gi, "SERVICIOS DE EDUCACIÓN")
    .replace(/\s{2,}/g, " ")
    .replace(/,\s*/g, ", ")
    .replace(/\s*-\s*/g, " - ");
}

function wrapWords(text: string, maxWordsPerLine = 2) {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length <= maxWordsPerLine) return words;
  const lines: string[] = [];
  for (let index = 0; index < words.length; index += maxWordsPerLine) {
    lines.push(words.slice(index, index + maxWordsPerLine).join(" "));
  }
  return lines;
}

function RubroTick({ x, y, payload }: any) {
  const label = cleanLabel(payload.value);
  const lines = wrapWords(label, 2);

  return (
    <g transform={`translate(${x},${y})`}>
      <title>{label}</title>
      <text x={0} y={0} dy={4} textAnchor="end" fill="currentColor" fontSize={11}>
        {lines.map((line: string, index: number) => (
          <tspan key={`${line}-${index}`} x={0} dy={index === 0 ? 0 : 13}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

export function DashboardPage() {
  const { data: user } = useGetIdentity<any>();

  const cdp = useList<Row>({ resource: "dbo-cdp", pagination: { currentPage: 1, pageSize: 200 } });
  const contratos = useList<Row>({ resource: "dbo-contratos", pagination: { currentPage: 1, pageSize: 200 } });
  const empleados = useList<Row>({ resource: "dbo-empleados", pagination: { currentPage: 1, pageSize: 200 } });
  const proyectos = useList<Row>({ resource: "dbo-proyectos-especiales", pagination: { currentPage: 1, pageSize: 200 } });
  const eventos = useList<Row>({
    resource: "dbo-agenda-eventos",
    pagination: { currentPage: 1, pageSize: 200 },
    sorters: [{ field: "fechaInicio", order: "desc" }],
  });
  const seguimiento = useList<Row>({
    resource: "dbo-eventos-seguimiento",
    pagination: { currentPage: 1, pageSize: 200 },
    sorters: [{ field: "fechaEvento", order: "desc" }],
  });
  const legalizaciones = useList<Row>({
    resource: "dbo-avances-legalizaciones",
    pagination: { currentPage: 1, pageSize: 100 },
    sorters: [{ field: "fechaLegalizacion", order: "desc" }],
  });
  const rubros = useList<Row>({ resource: "dbo-rubros-gasto", pagination: { currentPage: 1, pageSize: 200 } });
  const cierres = useList<Row>({ resource: "dbo-cierre-vigencia", pagination: { currentPage: 1, pageSize: 50 } });
  const asignaciones = useList<Row>({
    resource: "dbo-agenda-asignaciones",
    pagination: { currentPage: 1, pageSize: 100 },
  });

  const now = useMemo(() => new Date(), []);
  const displayName = getName(user);
  const roleLabel = user?.role || user?.roles?.[0] || user?.roleNames?.[0] || "Administrador";

  const presupuestoEjecutado = cdp.result.data.reduce((sum, row) => sum + asNumber(row.valorAprobado), 0);
  const presupuestoDisponible = Math.max(
    presupuestoEjecutado - cdp.result.data.reduce((sum, row) => sum + asNumber(row.valorComprometidoRp), 0),
    0,
  );

  const totalContratos = contratos.result.total ?? contratos.result.data.length;
  const totalEmpleados = empleados.result.total ?? empleados.result.data.length;
  const totalProyectos = proyectos.result.total ?? proyectos.result.data.length;
  const eventosActivos = eventos.result.data.filter((row) => {
    const estado = String(row.estado ?? "").toLowerCase();
    return !estado || !["cerrado", "finalizado", "inactivo", "cancelado"].includes(estado);
  }).length;

  const pieData = [
    { name: "Ejecutado", value: presupuestoEjecutado },
    { name: "Disponible", value: presupuestoDisponible },
  ];

  const cdpByRubros = useMemo(() => {
    const grouped = new Map<string, number>();
    for (const row of cdp.result.data) {
      const rubro = normalizeKey(row.rubroGastoId ?? row.rubroGasto ?? row.rubro ?? "Sin rubro");
      grouped.set(rubro, (grouped.get(rubro) ?? 0) + asNumber(row.valorAprobado ?? row.valorSolicitado ?? 0));
    }

    return Array.from(grouped.entries())
      .map(([rubroId, value]) => {
        const matched = rubros.result.data.find((item) => String(item.id) === rubroId || String(item.codigoCcp) === rubroId);
        return {
          name: cleanLabel(matched?.nombre ?? matched?.codigoCcp ?? `Rubro ${rubroId}`),
          value,
        };
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [cdp.result.data, rubros.result.data]);

  const monthlyData = useMemo(() => {
    const source = [...cdp.result.data].slice(0, 12);
    return source.map((row, index) => ({
      month: formatDateLabel(row.fechaExpedicion) || `M${index + 1}`,
      ejecutado: asNumber(row.valorAprobado),
      disponible: Math.max(asNumber(row.valorSolicitado) - asNumber(row.valorAprobado), 0),
    }));
  }, [cdp.result.data]);

  const gastosPorUnidad = useMemo(() => {
    const units = new Map<string, number>();
    for (const row of [...cdp.result.data, ...contratos.result.data]) {
      const unit = String(row.unidadEjecutoraId ?? "Sin unidad");
      units.set(unit, (units.get(unit) ?? 0) + asNumber(row.valorAprobado ?? row.valorTotal ?? row.valor ?? 0));
    }
    return Array.from(units.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 3);
  }, [cdp.result.data, contratos.result.data]);

  const vigenciasData = useMemo(() => {
    const current = cierres.result.data[0];
    const previous = cierres.result.data[1];
    return [
      { vigencia: String(current?.vigencia ?? now.getFullYear()), comprometido: asNumber(current?.totalGastosComprometidos), pagado: asNumber(current?.totalGastosPagados) },
      { vigencia: String(previous?.vigencia ?? now.getFullYear() - 1), comprometido: asNumber(previous?.totalGastosComprometidos), pagado: asNumber(previous?.totalGastosPagados) },
    ];
  }, [cierres.result.data, now]);

  const upcomingEvents = eventos.result.data.slice(0, 5);
  const recentActivity = useMemo(() => {
    const items = [
      ...legalizaciones.result.data.slice(0, 3).map((row) => ({
        title: `Legalización ${row.numero ?? row.id ?? ""}`,
        description: row.beneficiario || row.concepto || "Movimiento reciente",
        date: row.fechaLegalizacion || row.fechaAvance,
      })),
      ...seguimiento.result.data.slice(0, 3).map((row) => ({
        title: row.titulo || row.eventoTipo || "Evento de seguimiento",
        description: row.descripcion || row.usuario || "Cambio reciente",
        date: row.fechaEvento,
      })),
    ];
    return items.slice(0, 6);
  }, [legalizaciones.result.data, seguimiento.result.data]);

  return (
    <ListView className="gap-6">
      <section className="grid gap-4 rounded-3xl border border-[#d5bb87]/25 bg-[linear-gradient(135deg,rgba(0,40,77,0.98),rgba(4,83,137,0.92))] p-6 text-white shadow-[0_18px_46px_rgba(0,40,77,0.18)] md:p-8">
        <div className="flex flex-col gap-3">
          <div className="text-sm font-medium text-[#efd9af]">Hola, {displayName} 👋</div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Panel ejecutivo del sistema</h1>
          <p className="max-w-3xl text-sm leading-6 text-white/78">
            {roleLabel} · {now.toLocaleDateString("es-CO", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            · Resumen operativo, presupuestal y de agenda en una sola vista.
          </p>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Presupuesto ejecutado" value={formatMoney(presupuestoEjecutado)} icon={<CircleDollarSign className="h-5 w-5" />} helper="Base CDP y contratos" />
        <StatCard title="Presupuesto disponible" value={formatMoney(presupuestoDisponible)} icon={<BadgeDollarSign className="h-5 w-5" />} helper="Saldo estimado actual" accent="from-[#d5bb87] to-[#efd9af]" />
        <StatCard title="Total empleados" value={String(totalEmpleados)} icon={<Users className="h-5 w-5" />} />
        <StatCard title="Eventos activos" value={String(eventosActivos)} icon={<CalendarDays className="h-5 w-5" />} />
      </section>

      <section className="grid gap-5">
        <SectionCard title="Ejecución presupuestal mensual">
          <div className="h-[320px]">
            <SafeResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="ejecutadoFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00284d" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#00284d" stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickFormatter={(v) => `${Math.round(Number(v) / 1000000)}M`} />
                <Tooltip formatter={(value: any) => formatMoney(Number(value))} />
                <Legend />
                <Area type="monotone" dataKey="ejecutado" stroke="#00284d" fill="url(#ejecutadoFill)" strokeWidth={2} />
                <Area type="monotone" dataKey="disponible" stroke="#d5bb87" fill="rgba(213,187,135,0.2)" strokeWidth={2} />
              </AreaChart>
            </SafeResponsiveContainer>
          </div>
        </SectionCard>

        <div className="grid gap-5 xl:grid-cols-2">
          <SectionCard title="Presupuesto ejecutado vs disponible">
            {pieData.some((item) => item.value > 0) ? (
              <div className="h-[320px]">
                <SafeResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} innerRadius={82} outerRadius={120} paddingAngle={5} dataKey="value" nameKey="name">
                      {pieData.map((entry, index) => (
                        <Cell key={entry.name} fill={index === 0 ? "#00284d" : "#d5bb87"} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => formatMoney(Number(value))} />
                    <Legend />
                  </PieChart>
                </SafeResponsiveContainer>
              </div>
            ) : (
              <EmptyState text="Sin datos suficientes para el gráfico." />
            )}
          </SectionCard>

          <SectionCard title="Distribución por rubros">
            <div className="h-[320px]">
              {cdpByRubros.length ? (
                <SafeResponsiveContainer width="100%" height="100%">
                  <BarChart data={cdpByRubros} layout="vertical" margin={{ top: 8, right: 24, left: 16, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={180} tickLine={false} axisLine={false} tick={<RubroTick />} interval={0} />
                    <Tooltip
                      formatter={(value: any) => formatMoney(Number(value))}
                      labelFormatter={(label) => cleanLabel(label)}
                    />
                    <Bar dataKey="value" radius={[0, 12, 12, 0]}>
                      {cdpByRubros.map((entry, index) => (
                        <Cell key={entry.name} fill={["#00284d", "#045389", "#5c7994", "#d5bb87", "#efd9af", "#7f9db1"][index % 6]} />
                      ))}
                    </Bar>
                  </BarChart>
                </SafeResponsiveContainer>
              ) : (
                <EmptyState text="Sin rubros suficientes para mostrar la distribución." />
              )}
            </div>
          </SectionCard>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <SectionCard title="Actividad reciente">
            <div className="space-y-3">
              {recentActivity.length ? recentActivity.map((item, index) => (
                <div key={`${item.title}-${index}`} className="flex gap-3 rounded-2xl border border-border/70 bg-background/80 p-4">
                  <div className="mt-0.5 rounded-full bg-[#efd9af]/25 p-2 text-[#00284d]">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-semibold text-[#00284d] dark:text-white">{item.title}</div>
                      <span className="text-xs text-muted-foreground">{formatDateLabel(item.date)}</span>
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">{item.description}</div>
                  </div>
                </div>
              )) : <EmptyState text="Sin actividad reciente para mostrar." />}
            </div>
          </SectionCard>

          <SectionCard title="Comparación entre vigencias">
            <div className="h-[320px]">
              <SafeResponsiveContainer width="100%" height="100%">
                <ComposedChart data={vigenciasData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="vigencia" tickLine={false} axisLine={false} />
                  <YAxis />
                  <Tooltip formatter={(value: any) => formatMoney(Number(value))} />
                  <Legend />
                  <Bar dataKey="comprometido" fill="#00284d" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="pagado" fill="#d5bb87" radius={[8, 8, 0, 0]} />
                </ComposedChart>
              </SafeResponsiveContainer>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {gastosPorUnidad.map((unit, index) => (
                <div key={unit.name} className="rounded-xl border border-border/70 bg-background/70 p-3">
                  <div className="text-[11px] uppercase text-muted-foreground">Unidad {index + 1}</div>
                  <div className="mt-1 truncate text-sm font-semibold text-[#00284d] dark:text-white">{unit.name}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{formatMoney(unit.value)}</div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

      </section>
    </ListView>
  );
}
