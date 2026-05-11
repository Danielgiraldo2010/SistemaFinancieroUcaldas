/**
 * Display Names Best Practices & Guidelines
 * 
 * This document outlines best practices for handling display names vs technical identifiers
 * throughout the Sistema Financiero Frontend application.
 * 
 * ---
 * 
 * PRINCIPLE: Complete Separation of Internal IDs from User-Facing Text
 * 
 * ❌ WRONG - Do not show technical identifiers to users:
 * - "dbo-cdp"
 * - "presupuesto-alertas" 
 * - "matricula-descuentos"
 * - "admin-users"
 * - resource.name directly
 * - module.key directly
 * 
 * ✅ RIGHT - Always use display names:
 * - "CDP"
 * - "Alertas Presupuestales"
 * - "Descuentos"
 * - "Usuarios"
 * - getDisplayName(resource.name)
 * - getItemLabel(item)
 * 
 * ---
 * 
 * HOW TO USE DISPLAY NAMES IN YOUR CODE:
 * 
 * 1. In Navigation/Sidebar Components:
 * 
 *    import { getItemLabel, getDomainLabel } from "@/lib/navigation";
 *    
 *    // For menu items
 *    const label = getItemLabel(navItem); // Returns "CDP", not "presupuesto-cdp"
 *    
 *    // For domains
 *    const label = getDomainLabel(domain); // Returns "Presupuesto", not "presupuesto"
 * 
 * 
 * 2. In Generic Components (headers, cards, lists):
 * 
 *    import { getDisplayName } from "@/lib/modules-display";
 *    
 *    const displayText = getDisplayName("dbo-cdp"); // "CDP"
 *    const displayText = getDisplayName("matricula-descuentos"); // "Descuentos"
 * 
 * 
 * 3. In Breadcrumbs:
 * 
 *    ✅ ALREADY HANDLED - resolveBreadcrumb() uses getItemLabel() internally
 *    No changes needed - breadcrumbs are automatically using correct labels.
 * 
 * 
 * 4. In Tables/Lists:
 * 
 *    import { getDisplayName } from "@/lib/modules-display";
 *    
 *    {items.map(item => (
 *      <div key={item.id}>
 *        {getDisplayName(item.module_key)} {/* Good */}
 *        {/* NOT: {item.module_key} - Bad! */}
 *      </div>
 *    ))}
 * 
 * 
 * 5. In Search/Filter Components:
 * 
 *    import { searchModules } from "@/lib/modules-display";
 *    
 *    // Returns array of [key, displayName] pairs
 *    const results = searchModules(userQuery);
 * 
 * ---
 * 
 * DEBUGGING & VALIDATION:
 * 
 * To check if technical identifier has leaked to UI:
 * 
 *    import { isTechnicalIdentifier, validateDisplayText } from "@/lib/modules-display";
 *    
 *    if (isTechnicalIdentifier(userFacingText)) {
 *      console.warn("Technical identifier found in UI:", userFacingText);
 *    }
 *    
 *    // In development mode, this will warn automatically:
 *    validateDisplayText(text);
 * 
 * ---
 * 
 * ADDING NEW MODULES:
 * 
 * 1. First, add to MODULE_DISPLAY_NAMES in src/lib/modules-display.ts:
 * 
 *    "nueva-modulo-key": "Nuevo Módulo Nombre Profesional"
 * 
 * 
 * 2. Add to navigation.ts NAV_DOMAINS:
 * 
 *    {
 *      key: "nueva-modulo-key",
 *      label: "Nuevo Módulo Nombre Profesional", // Will use getDisplayName() as fallback
 *      iconName: "icon-name",
 *      homeRoute: "/nueva-modulo",
 *      items: [...]
 *    }
 * 
 * 
 * 3. Use in your components:
 * 
 *    const label = getItemLabel(item); // Automatically resolves to "Nuevo Módulo Nombre Profesional"
 * 
 * ---
 * 
 * COMMON PATTERNS:
 * 
 * Pattern 1: Display Module Name
 *    const name = getDisplayName(module.key);
 *    <h1>{name}</h1>
 * 
 * Pattern 2: Build Dynamic Breadcrumb
 *    const label = getItemLabel(navItem);
 *    <BreadcrumbItem>{label}</BreadcrumbItem>
 * 
 * Pattern 3: Search with Display Names
 *    const filtered = items.filter(item => 
 *      getDisplayName(item.key).toLowerCase().includes(query.toLowerCase())
 *    );
 * 
 * Pattern 4: Tooltip with Professional Text
 *    <Tooltip>
 *      <TooltipTrigger>{shortLabel}</TooltipTrigger>
 *      <TooltipContent>{getDisplayName(item.key)}</TooltipContent>
 *    </Tooltip>
 * 
 * ---
 * 
 * VISUAL PROBLEMS FIXED:
 * 
 * ✅ Text Truncation: Now using truncate + title attribute + tooltips
 * ✅ Text Overlap: Fixed with proper flex layout and min-w-0
 * ✅ Text Misalignment: Corrected padding and alignment classes
 * ✅ Overflow: Using overflow-hidden and truncate classes properly
 * ✅ Word-break Issues: Removed inappropriate word-break settings
 * ✅ Long Labels: Now using ellipsis (...) with tooltips for full text
 * 
 * ---
 * 
 * FILES THAT USE DISPLAY NAMES:
 * 
 * ✅ src/lib/modules-display.ts - Central configuration
 * ✅ src/lib/navigation.ts - Navigation helpers with display name functions
 * ✅ src/components/refine-ui/layout/sidebar.tsx - Uses getItemLabel, getDomainLabel
 * ✅ src/components/refine-ui/layout/breadcrumb.tsx - Uses resolveBreadcrumb (automatic)
 * ✅ src/App.tsx - Refine resources meta.label (should be added if not present)
 * 
 * ---
 */

export const DISPLAY_NAMES_GUIDELINES = {
  description: "Best practices for handling display names vs technical identifiers",
};
