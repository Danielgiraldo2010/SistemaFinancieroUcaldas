import { getDisplayName } from "./modules-display";
import { resolveMenuIconName, type MenuIconName } from "./navigation-icons";

export type NavDomainKey =
  | "dashboard"
  | "administracion"
  | "presupuesto"
  | "nomina"
  | "academico"
  | "matriculas"
  | "proyectos"
  | "contratacion"
  | "agenda"
  | "configuracion"
  | "reportes";

export type NavItem = {
  key: string;
  id?: string;
  label?: string; // optional: will use getDisplayName() as fallback
  route?: string;
  iconName?: MenuIconName;
  children?: NavItem[];
};

export type NavDomain = {
  key: NavDomainKey;
  label?: string; // optional: will use getDisplayName() as fallback
  iconName: MenuIconName;
  homeRoute: string;
  items: NavItem[];
};

export const NAV_DOMAINS: NavDomain[] = [
  { key: "dashboard", label: "Inicio", iconName: "home", homeRoute: "/dashboard", items: [] },
  {
    key: "administracion",
    label: "Administración",
    iconName: "administracion",
    homeRoute: "/administracion/usuarios",
    items: [
      { key: "identity-users", label: "Usuarios", route: "/administracion/usuarios", iconName: "usuarios" },
      { key: "identity-roles", label: "Roles", route: "/administracion/roles", iconName: "roles" },
    ],
  },
  {
    key: "presupuesto",
    label: "Presupuesto",
    iconName: "presupuesto",
    homeRoute: "/dbo-cdp",
    items: [
      { key: "dbo-cdp", label: "CDP", route: "/dbo-cdp", iconName: "cdp" },
      { key: "dbo-alertas-presupuestales", label: "Alertas Presupuestales", route: "/dbo-alertas-presupuestales", iconName: "bell" },
      { key: "dbo-avances-legalizaciones", label: "Avances y Legalizaciones", route: "/dbo-avances-legalizaciones", iconName: "avancesLegalizaciones" },
      { key: "dbo-cierre-vigencia", label: "Cierre de Vigencia", route: "/dbo-cierre-vigencia", iconName: "cierreVigencia" },
      { key: "dbo-ejecucion-mensual", label: "Ejecución Presupuestal", route: "/presupuesto/ejecucion-mensual", iconName: "ejecucionPresupuestal" },
      { key: "dbo-modificaciones-detalle", label: "Modificaciones Presupuestales", route: "/presupuesto/modificaciones-detalle", iconName: "modificaciones" },
      { key: "dbo-fechas-limite-presupuestales", label: "Fechas Límite Presupuestales", route: "/presupuesto/fechas-limite-presupuestales", iconName: "calendarDays" },
      { key: "dbo-estructuras-financieras", label: "Estructuras Financieras", route: "/presupuesto/estructuras-financieras", iconName: "estructurasFinancieras" },
    ],
  },
  {
    key: "nomina",
    label: "Nómina",
    iconName: "nomina",
    homeRoute: "/dbo-empleados",
    items: [
      { key: "dbo-empleados", label: "Empleados", route: "/dbo-empleados", iconName: "empleados" },
      { key: "dbo-conceptos-nomina", label: "Conceptos de Nómina", route: "/dbo-conceptos-nomina", iconName: "liquidacion" },
      { key: "dbo-eventos-nomina", label: "Eventos de Nómina", route: "/dbo-eventos-nomina", iconName: "eventos" },
    ],
  },
  {
    key: "academico",
    label: "Académico",
    iconName: "academico",
    homeRoute: "/dbo-programas-academicos",
    items: [
      { key: "dbo-programas-academicos", label: "Programas Académicos", route: "/dbo-programas-academicos", iconName: "programas" },
      { key: "dbo-estudiante", label: "Estudiantes", route: "/dbo-estudiante", iconName: "estudiantes" },
      { key: "dbo-becas-posgrado", label: "Becas Posgrado", route: "/dbo-becas-posgrado", iconName: "becas" },
      { key: "dbo-apoyos-matricula", label: "Tipos de Apoyo", route: "/dbo-apoyos-matricula", iconName: "apoyos" },
    ],
  },
  {
    key: "matriculas",
    label: "Matrículas",
    iconName: "matriculas",
    homeRoute: "/matriculas/apoyos-matricula",
    items: [
      { key: "dbo-apoyos-matricula", label: "Apoyos Matrícula", route: "/matriculas/apoyos-matricula", iconName: "apoyos" },
      { key: "dbo-descuento", label: "Descuentos", route: "/matriculas/descuentos", iconName: "descuentos" },
      { key: "dbo-descuento-matricula", label: "Descuento Matrícula", route: "/matriculas/descuento-matricula", iconName: "descuentos" },
      { key: "dbo-financiacionmatricula", label: "Financiación Matrícula", route: "/matriculas/financiacion-matricula", iconName: "financiacion" },
      { key: "dbo-matriculas-apoyos", label: "Matrículas Apoyos", route: "/matriculas/apoyos", iconName: "apoyos" },
      { key: "dbo-matriculas-proyectadas", label: "Matrículas Proyectadas", route: "/matriculas/proyectadas", iconName: "calendarRange" },
    ],
  },
  {
    key: "proyectos",
    label: "Proyectos",
    iconName: "proyectos",
    homeRoute: "/dbo-tipos-proyecto",
    items: [
      { key: "dbo-tipos-proyecto", label: "Tipos de Proyecto", route: "/dbo-tipos-proyecto", iconName: "tiposProyecto" },
      { key: "dbo-proyectos-especiales", label: "Proyectos Especiales", route: "/dbo-proyectos-especiales", iconName: "proyectos" },
      { key: "dbo-cartera-facturas", label: "Cartera de Facturas", route: "/dbo-cartera-facturas", iconName: "carteraFacturas" },
    ],
  },
  {
    key: "contratacion",
    label: "Contratación",
    iconName: "contratos",
    homeRoute: "/dbo-contratos",
    items: [
      { key: "dbo-contratos", label: "Contratos", route: "/dbo-contratos", iconName: "contratos" },
      { key: "dbo-pagos-contratos", label: "Pagos de Contratos", route: "/dbo-pagos-contratos", iconName: "pagos" },
    ],
  },
  {
    key: "agenda",
    label: "Agenda",
    iconName: "agenda",
    homeRoute: "/dbo-agenda-eventos",
    items: [
      { key: "dbo-agenda-eventos", label: "Eventos", route: "/dbo-agenda-eventos", iconName: "eventos" },
      { key: "dbo-agenda-asignaciones", label: "Asignaciones", route: "/dbo-agenda-asignaciones", iconName: "asignaciones" },
      { key: "dbo-eventos-seguimiento", label: "Eventos de Seguimiento", route: "/dbo-eventos-seguimiento", iconName: "seguimiento" },
    ],
  },
  {
    key: "configuracion",
    label: "Configuración",
    iconName: "configuracion",
    homeRoute: "/dbo-unidades-ejecutoras",
    items: [
      { key: "dbo-unidades-ejecutoras", label: "Unidades Ejecutoras", route: "/dbo-unidades-ejecutoras", iconName: "unidades" },
      { key: "dbo-fuentes-recursos", label: "Fuentes de Recursos", route: "/dbo-fuentes-recursos", iconName: "fuentes" },
      { key: "dbo-rubros-gasto", label: "Rubros de Gasto", route: "/dbo-rubros-gasto", iconName: "rubros" },
      { key: "dbo-rubros-ingreso", label: "Rubros de Ingreso", route: "/dbo-rubros-ingreso", iconName: "rubros" },
      { key: "dbo-municipio", label: "Municipios", route: "/dbo-municipio", iconName: "municipio" },
    ],
  },
  { key: "reportes", label: "Reportes", iconName: "reportes", homeRoute: "/reportes", items: [] },
];

export function resolveDomainFromPathname(pathname: string): NavDomainKey {
  if (pathname === "/" || pathname === "/dashboard") return "dashboard";
  const domain = NAV_DOMAINS.find((candidate) =>
    candidate.items.some((item) => item.route && (pathname === item.route || pathname.startsWith(`${item.route}/`))) ||
    (candidate.homeRoute !== "/dashboard" && (pathname === candidate.homeRoute || pathname.startsWith(`${candidate.homeRoute}/`))),
  );
  return domain?.key ?? "dashboard";
}

export function resolveActiveItemFromPathname(pathname: string): NavItem | undefined {
  for (const domain of NAV_DOMAINS) {
    const match = domain.items.find((item) => item.route && (pathname === item.route || pathname.startsWith(`${item.route}/`)));
    if (match) return match;
  }
  return undefined;
}

export function resolveBreadcrumb(pathname: string) {
  const domain = NAV_DOMAINS.find((candidate) => {
    if (candidate.key === "dashboard") return pathname === "/" || pathname === "/dashboard";
    return candidate.items.some((item) => item.route && (pathname === item.route || pathname.startsWith(`${item.route}/`))) || pathname === candidate.homeRoute;
  });
  const item = resolveActiveItemFromPathname(pathname);
  if (!domain) return [{ label: "Inicio", href: "/dashboard", iconName: "home" as MenuIconName }];
  if (domain.key === "dashboard") return [{ label: "Inicio", href: "/dashboard", iconName: "home" as MenuIconName }];
  return [
    { label: "Inicio", href: "/dashboard", iconName: "home" as MenuIconName },
    { label: getDomainLabel(domain), href: domain.homeRoute, iconName: domain.iconName },
    ...(item ? [{ label: getItemLabel(item), href: item.route ?? undefined, iconName: getItemIconName(item) }] : []),
  ];
}

/**
 * Get the display label for a navigation domain
 * Prioritizes explicit label, falls back to getDisplayName() lookup
 */
export function getDomainLabel(domain: NavDomain): string {
  if (domain.label) return domain.label;
  return getDisplayName(domain.key, domain.key);
}

/**
 * Get the display label for a navigation item
 * Prioritizes explicit label, falls back to getDisplayName() lookup
 */
export function getItemLabel(item: NavItem): string {
  if (item.label) return item.label;
  return getDisplayName(item.key, item.key);
}

export function getItemIconName(item: NavItem): MenuIconName {
  return item.iconName ?? resolveMenuIconName(item.key ?? item.label);
}
