/**
 * Display names configuration for modules and submodules
 * Centralizes and separates internal identifiers from user-facing labels
 * 
 * This is the single source of truth for all module display text across the system.
 * Maps internal keys (database names, slugs, IDs) to professional display names.
 */

export type ModuleKey =
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

/**
 * Maps internal module/submenu keys to their professional display names
 * Used across sidebar, breadcrumbs, headers, and all UI components
 */
const MODULE_DISPLAY_NAMES: Record<string, string> = {
  // Dashboard
  "dashboard": "Inicio",

  // Administración
  "administracion": "Administración",
  "identity-users": "Usuarios",
  "identity-roles": "Roles",

  // Presupuesto
  "presupuesto": "Presupuesto",
  "presupuesto-cdp": "CDP",
  "presupuesto-alertas": "Alertas Presupuestales",
  "presupuesto-avances": "Avances y Legalizaciones",
  "presupuesto-cierre": "Cierre de Vigencia",
  "presupuesto-ejecucion": "Ejecución Presupuestal",
  "presupuesto-modificaciones": "Modificaciones Presupuestales",
  "presupuesto-fechas-limite": "Fechas Límite Presupuestales",
  "presupuesto-estructuras": "Estructuras Financieras",

  // Nómina
  "nomina": "Nómina",
  "nomina-empleados": "Empleados",
  "nomina-conceptos": "Conceptos de Nómina",
  "nomina-eventos": "Eventos de Nómina",

  // Académico
  "academico": "Académico",
  "academico-programas": "Programas Académicos",
  "academico-estudiantes": "Estudiantes",
  "academico-becas": "Becas Posgrado",
  "academico-apoyos": "Tipos de Apoyo",
  "academico-periodos": "Períodos Académicos",

  // Matrículas
  "matriculas": "Matrículas",
  "matricula-apoyos": "Apoyos Matrícula",
  "matricula-descuentos": "Descuentos",
  "matricula-descuento-especial": "Descuento Matrícula",
  "matricula-financiacion": "Financiación Matrícula",
  "matricula-asignaciones": "Asignación de Apoyos",
  "matricula-proyectadas": "Matrículas Proyectadas",

  // Proyectos
  "proyectos": "Proyectos",
  "proyecto-tipos": "Tipos de Proyecto",
  "proyecto-especiales": "Proyectos Especiales",
  "cartera-facturas": "Cartera de Facturas",

  // Contratación
  "contratacion": "Contratación",
  "contratacion-contratos": "Contratos",
  "contratacion-pagos": "Pagos de Contratos",

  // Agenda
  "agenda": "Agenda",
  "agenda-eventos": "Eventos",
  "agenda-asignaciones": "Asignaciones",
  "agenda-seguimiento": "Eventos de Seguimiento",

  // Configuración
  "configuracion": "Configuración",
  "configuracion-unidades": "Unidades Ejecutoras",
  "configuracion-fuentes": "Fuentes de Recursos",
  "configuracion-rubros-gasto": "Rubros de Gasto",
  "configuracion-rubros-ingreso": "Rubros de Ingreso",
  "configuracion-municipios": "Municipios",

  // Reportes
  "reportes": "Reportes",
};

/**
 * Get the professional display name for any internal module/submenu key
 * 
 * @param key - Internal identifier (can be database name, slug, or resource name)
 * @param fallback - Optional fallback text if key not found. Defaults to key itself with formatting.
 * @returns Professional display name suitable for UI
 * 
 * @example
 * getDisplayName("dbo-cdp") // "CDP"
 * getDisplayName("nomina-empleados") // "Empleados"
 * getDisplayName("presupuesto-alertas") // "Alertas Presupuestales"
 */
export function getDisplayName(key: string | undefined, fallback?: string): string {
  if (!key) return fallback || "Sin nombre";
  
  const displayName = MODULE_DISPLAY_NAMES[key];
  
  if (displayName) {
    return displayName;
  }

  // Fallback: format the key if not found in config
  if (fallback) return fallback;
  
  // Format: convert kebab-case to Title Case
  return key
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Resolve the display label for a navigation item
 * Prioritizes explicit label property, falls back to display name lookup
 * 
 * @param item - Navigation item with optional label or key
 * @returns Professional display name
 */
export function resolveMenuLabel(item: { label?: string; key?: string; name?: string }): string {
  // Priority 1: explicit label
  if (item.label) return item.label;
  
  // Priority 2: lookup by key
  if (item.key) return getDisplayName(item.key);
  
  // Priority 3: lookup by name (for Refine resources)
  if (item.name) return getDisplayName(item.name);
  
  // Fallback
  return "Sin nombre";
}

/**
 * Check if a string is a technical identifier (not a display name)
 * Useful for validation and debugging
 * 
 * @param text - Text to check
 * @returns true if text appears to be technical (contains dbo-, has hyphens, etc.)
 */
export function isTechnicalIdentifier(text: string | undefined): boolean {
  if (!text) return false;
  return (
    text.startsWith("dbo-") ||
    text.startsWith("admin-") ||
    /^[a-z]+-[a-z]+/.test(text) || // kebab-case pattern
    /^_/.test(text) // underscore prefix
  );
}

/**
 * Validate that a display text is not a technical identifier
 * Useful in development for catching bugs where internal names leak to UI
 * 
 * @param displayText - Text that should be displayed to users
 * @throws Error if text appears to be technical identifier
 */
export function validateDisplayText(displayText: string | undefined): void {
  // Skip validation in production (check via import.meta.env which is Vite's way)
  if (import.meta.env.MODE !== "development") return;
  if (!displayText) return;
  
  if (isTechnicalIdentifier(displayText)) {
    console.warn(
      `⚠️  Potential display text bug: Technical identifier found in UI: "${displayText}". ` +
      `Use getDisplayName() or resolveMenuLabel() to convert internal IDs to display names.`
    );
  }
}

/**
 * Get all available module keys (for validation, testing, etc.)
 */
export function getAllModuleKeys(): string[] {
  return Object.keys(MODULE_DISPLAY_NAMES);
}

/**
 * Search for modules by display name (for search/filter functionality)
 * 
 * @param query - Search query
 * @returns Array of matching [key, displayName] pairs
 */
export function searchModules(query: string): Array<[string, string]> {
  const lowerQuery = query.toLowerCase();
  return Object.entries(MODULE_DISPLAY_NAMES)
    .filter(([, displayName]) => displayName.toLowerCase().includes(lowerQuery))
    .sort((a, b) => a[1].localeCompare(b[1]));
}
