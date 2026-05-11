# Display Names - Quick Reference Guide

## 🚀 Cheat Sheet para Desarrolladores

### Imports Más Comunes
```typescript
// Para componentes de navegación
import { getItemLabel, getDomainLabel } from "@/lib/navigation";

// Para cualquier componente genérico
import { getDisplayName } from "@/lib/modules-display";

// Para validación (desarrollo)
import { validateDisplayText, isTechnicalIdentifier } from "@/lib/modules-display";

// Para búsqueda
import { searchModules } from "@/lib/modules-display";
```

---

## 📌 Casos de Uso Comunes

### ✅ Sidebar / Menú de Navegación
```typescript
{/* Para items del menú */}
<span>{getItemLabel(navItem)}</span>

{/* Para dominios principales */}
<h2>{getDomainLabel(domain)}</h2>
```

### ✅ Breadcrumbs
```typescript
{/* Ya automático - no necesita cambios */}
<Breadcrumb />
{/* Usa resolveBreadcrumb() internamente */}
```

### ✅ Headers / Títulos
```typescript
<h1>{getDisplayName(moduleKey)}</h1>
// Ejemplo: getDisplayName("presupuesto-cdp") → "CDP"
```

### ✅ Búsqueda / Filtro
```typescript
const results = searchModules(userQuery);
// Retorna: [["presupuesto-cdp", "CDP"], ...]
```

### ✅ Validación en Desarrollo
```typescript
// Auto-aviso si es un identificador técnico
validateDisplayText(userText);

// Verificar manualmente
if (isTechnicalIdentifier(text)) {
  console.warn("⚠️ Technical identifier found!");
}
```

---

## 🎯 Display Names Rápidos

### Presupuesto
| Key | Display |
|-----|---------|
| presupuesto-cdp | CDP |
| presupuesto-alertas | Alertas Presupuestales |
| presupuesto-avances | Avances y Legalizaciones |
| presupuesto-cierre | Cierre de Vigencia |
| presupuesto-ejecucion | Ejecución Presupuestal |
| presupuesto-modificaciones | Modificaciones Presupuestales |
| presupuesto-fechas-limite | Fechas Límite Presupuestales |
| presupuesto-estructuras | Estructuras Financieras |

### Nómina
| Key | Display |
|-----|---------|
| nomina-empleados | Empleados |
| nomina-conceptos | Conceptos de Nómina |
| nomina-eventos | Eventos de Nómina |

### Académico
| Key | Display |
|-----|---------|
| academico-programas | Programas Académicos |
| academico-estudiantes | Estudiantes |
| academico-becas | Becas Posgrado |
| academico-apoyos | Tipos de Apoyo |
| academico-periodos | Períodos Académicos |

### Matrículas
| Key | Display |
|-----|---------|
| matricula-apoyos | Apoyos Matrícula |
| matricula-descuentos | Descuentos |
| matricula-descuento-especial | Descuento Matrícula |
| matricula-financiacion | Financiación Matrícula |
| matricula-asignaciones | Asignación de Apoyos |
| matricula-proyectadas | Matrículas Proyectadas |

### Proyectos
| Key | Display |
|-----|---------|
| proyecto-tipos | Tipos de Proyecto |
| proyecto-especiales | Proyectos Especiales |
| cartera-facturas | Cartera de Facturas |

### Contratación
| Key | Display |
|-----|---------|
| contratacion-contratos | Contratos |
| contratacion-pagos | Pagos de Contratos |

### Agenda
| Key | Display |
|-----|---------|
| agenda-eventos | Eventos |
| agenda-asignaciones | Asignaciones |
| agenda-seguimiento | Eventos de Seguimiento |

### Configuración
| Key | Display |
|-----|---------|
| configuracion-unidades | Unidades Ejecutoras |
| configuracion-fuentes | Fuentes de Recursos |
| configuracion-rubros-gasto | Rubros de Gasto |
| configuracion-rubros-ingreso | Rubros de Ingreso |
| configuracion-municipios | Municipios |

---

## ❌ NUNCA HAGAS ESTO

```typescript
// ❌ No mostrar keys directamente
<span>{item.key}</span>                    // MAL
<span>{item.route}</span>                  // MAL
<span>{module.name}</span>                 // MAL
<span>{navItem}</span>                     // MAL (será el key)

// ❌ No usar slugs directamente  
<h1>{resource.route}</h1>                  // MAL
<h1>/presupuesto/cdp</h1>                  // MAL

// ❌ No duplicar lógica de resolución
const name = item.label || formatKey(item.key); // MAL
```

## ✅ SIEMPRE HAZ ESTO

```typescript
// ✅ Usar helpers
<span>{getItemLabel(item)}</span>          // BIEN
<span>{getDomainLabel(domain)}</span>      // BIEN
<span>{getDisplayName(key)}</span>         // BIEN

// ✅ Para validación
validateDisplayText(text);                 // BIEN
if (isTechnicalIdentifier(text)) { ... }   // BIEN
```

---

## 🔧 Agregar Nuevo Módulo

### Paso 1: Agregar Mapping
```typescript
// En: src/lib/modules-display.ts

const MODULE_DISPLAY_NAMES: Record<string, string> = {
  // ... otros módulos ...
  "mi-nuevo-modulo": "Mi Nuevo Módulo",  // ← AQUÍ
};
```

### Paso 2: Usar en Componentes
```typescript
// En cualquier componente:
import { getDisplayName } from "@/lib/modules-display";

<h1>{getDisplayName("mi-nuevo-modulo")}</h1>
// Output: "Mi Nuevo Módulo" ✨
```

### Paso 3: (Opcional) Agregar a Navegación
```typescript
// En: src/lib/navigation.ts
{
  key: "mi-nuevo-modulo",
  // label es opcional - será auto-resuelto por getDisplayName()
  route: "/mi-nuevo-modulo",
  // ...
}
```

¡Listo! Ya funciona en toda la app.

---

## 🐛 Debugging en Consola

### Validar Configuración
```javascript
validateDisplayNames()
// Output: ✅ Module display names validation passed. 37 modules configured.
```

### Auditar UI
```javascript
auditUIText()
// Output: ✅ No technical identifiers found in UI text
```

### Obtener Sugerencia
```javascript
suggestFix("dbo-cdp")
// Output: 💡 Suggestion: Replace "dbo-cdp" with "CDP"
```

### Buscar Módulos
```typescript
import { searchModules } from "@/lib/modules-display";

searchModules("presupuesto")
// Output: [["presupuesto-cdp", "CDP"], ["presupuesto-alertas", "Alertas Presupuestales"], ...]
```

---

## 📍 Archivos Clave

- **Configuración**: `src/lib/modules-display.ts`
- **Helpers Navegación**: `src/lib/navigation.ts`
- **Validación**: `src/lib/modules-display-validation.ts`
- **Sidebar**: `src/components/refine-ui/layout/sidebar.tsx`
- **Guía Completa**: `src/lib/DISPLAY_NAMES_GUIDELINES.md`

---

## ⚡ Tips & Tricks

### Tip 1: Tooltips para Textos Largos
```typescript
<button title={getDisplayName(key)}>
  {shortLabel}
</button>
```

### Tip 2: Search Case-Insensitive
```typescript
const query = userInput.toLowerCase();
const results = searchModules(query);
```

### Tip 3: Fallback Personalizado
```typescript
const name = getDisplayName(key, "Nombre Por Defecto");
```

### Tip 4: Validación Automática
```typescript
// En componentes dinámicos
const label = getDisplayName(unknownKey, "Sin Nombre");
validateDisplayText(label); // Warn en dev si es técnico
```

---

## 🆘 Si Algo Sale Mal

### El nombre sigue mostrándose técnico
```
1. Verificar que el key existe en MODULE_DISPLAY_NAMES
2. Ejecutar: suggestFix("el-nombre")
3. Revisar: src/lib/modules-display.ts
4. Agregar mapping si no existe
```

### Error al importar getDisplayName
```
1. Verificar: import { getDisplayName } from "@/lib/modules-display"
2. Comprobar ruta correcta
3. Recargar IDE
```

### ¿No encuentras qué hacer?
```
1. Lee: src/lib/DISPLAY_NAMES_GUIDELINES.md
2. Consulta: DISPLAY_NAMES_SOLUTION.md  
3. Ejecuta en consola: suggestFix("tu-key")
4. Usa: getDisplayName() en lugar de mostrar key directamente
```

---

## 📋 Checklist para Code Review

- [ ] ¿Se está usando `getDisplayName()` en lugar de mostrar keys?
- [ ] ¿Se está usando `getItemLabel()` para items de navegación?
- [ ] ¿Se está usando `getDomainLabel()` para dominios?
- [ ] ¿No hay nombres técnicos hardcodeados?
- [ ] ¿Se validó con `validateDisplayText()` en desarrollo?
- [ ] ¿El nombre aparece en `MODULE_DISPLAY_NAMES`?

---

**Last Updated**: 11 de mayo de 2026  
**Version**: 1.0  
**Status**: ✅ Production Ready
