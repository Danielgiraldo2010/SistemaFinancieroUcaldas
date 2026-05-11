import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bell,
  BadgeCheck,
  BookOpen,
  BookUser,
  Briefcase,
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  CalendarDays,
  CalendarRange,
  Calculator,
  ChartColumn,
  ClipboardList,
  FileBarChart,
  FilePenLine,
  FileSearch,
  FileSignature,
  FileText,
  Folder,
  FolderTree,
  GraduationCap,
  HandCoins,
  House,
  KeyRound,
  Landmark,
  Layers,
  LockKeyhole,
  MapPin,
  ReceiptText,
  Settings,
  ShieldCheck,
  UserCog,
  Wallet,
  WalletCards,
  UserCheck,
  UserCircle,
  UsersRound,
  Users,
  Network,
  PieChart,
} from "lucide-react";

export const moduleIcons = {
  default: Folder,
  home: House,
  inicio: House,
  administracion: ShieldCheck,
  usuarios: UsersRound,
  roles: ShieldCheck,
  permisos: KeyRound,
  auditoria: ClipboardList,
  presupuesto: BarChart3,
  cdp: ReceiptText,
  ejecucionPresupuestal: ChartColumn,
  ejecucion: ChartColumn,
  modificaciones: FilePenLine,
  avancesLegalizaciones: HandCoins,
  avances: HandCoins,
  estructurasFinancieras: FolderTree,
  cierreVigencia: LockKeyhole,
  nomina: Users,
  empleados: Users,
  liquidacion: Calculator,
  pagos: WalletCards,
  academico: GraduationCap,
  estudiantes: GraduationCap,
  materias: BookOpen,
  horarios: CalendarDays,
  programas: BookUser,
  becas: BadgeCheck,
  apoyos: HandCoins,
  matriculas: Wallet,
  wallet: Wallet,
  descuentos: BadgeCheck,
  financiacion: WalletCards,
  proyectos: FolderTree,
  tiposProyecto: Layers,
  carteraFacturas: ReceiptText,
  contratos: FileSignature,
  proveedores: BriefcaseBusiness,
  agenda: CalendarDays,
  eventos: CalendarCheck,
  asignaciones: UserCheck,
  seguimiento: ClipboardList,
  configuracion: Settings,
  unidades: Building2,
  fuentes: Landmark,
  rubros: FileText,
  municipio: MapPin,
  reportes: FileBarChart,
  estadisticas: ChartColumn,
  estadistica: PieChart,
  report: FileBarChart,
  archivo: FileText,
  permisosUsuarios: UserCog,
  usuariosRoles: BadgeCheck,
  busqueda: FileSearch,
  bell: Bell,
  lockKeyhole: LockKeyhole,
  calendarDays: CalendarDays,
  calendarRange: CalendarRange,
  badgeCheck: BadgeCheck,
  userCog: UserCog,
} as const satisfies Record<string, LucideIcon>;

export type MenuIconName = keyof typeof moduleIcons;

export const DEFAULT_MENU_ICON: MenuIconName = "default";

const ICON_LOOKUP: Record<string, MenuIconName> = {
  dashboard: "home",
  inicio: "home",
  administracion: "administracion",
  usuario: "usuarios",
  usuarios: "usuarios",
  roles: "roles",
  permiso: "permisos",
  auditoria: "auditoria",
  presupuesto: "presupuesto",
  cdp: "cdp",
  alerta: "bell",
  alertas: "bell",
  ejecucion: "ejecucionPresupuestal",
  ejecucionmensual: "ejecucionPresupuestal",
  modificacion: "modificaciones",
  avance: "avancesLegalizaciones",
  legaliz: "avancesLegalizaciones",
  estructura: "estructurasFinancieras",
  cierre: "cierreVigencia",
  nomina: "nomina",
  empleado: "empleados",
  liquidacion: "liquidacion",
  pago: "pagos",
  academico: "academico",
  estudiante: "estudiantes",
  materia: "materias",
  horario: "horarios",
  programa: "programas",
  beca: "becas",
  apoyo: "apoyos",
  matricula: "matriculas",
  descuento: "descuentos",
  financiacion: "financiacion",
  proyectada: "calendarRange",
  proyecto: "proyectos",
  tipo: "tiposProyecto",
  cartera: "carteraFacturas",
  factura: "carteraFacturas",
  contrato: "contratos",
  proveedor: "proveedores",
  agenda: "agenda",
  evento: "eventos",
  asignacion: "asignaciones",
  seguimiento: "seguimiento",
  configuracion: "configuracion",
  unidad: "unidades",
  fuente: "fuentes",
  rubro: "rubros",
  municipio: "municipio",
  reporte: "reportes",
  estadistica: "estadisticas",
  estadisticas: "estadisticas",
};

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function inferIconNameFromText(value?: string): MenuIconName | undefined {
  if (!value) return undefined;

  const normalized = normalizeText(value);
  if (!normalized) return undefined;

  for (const [needle, iconName] of Object.entries(ICON_LOOKUP)) {
    if (normalized.includes(needle)) {
      return iconName;
    }
  }

  return undefined;
}

export function resolveMenuIconName(value?: string, fallback: MenuIconName = DEFAULT_MENU_ICON): MenuIconName {
  return inferIconNameFromText(value) ?? fallback;
}

export function getMenuIconComponent(iconName?: string, fallback: MenuIconName = DEFAULT_MENU_ICON): LucideIcon {
  const resolvedIconName = resolveMenuIconName(iconName, fallback);
  return moduleIcons[resolvedIconName] ?? moduleIcons[fallback];
}
