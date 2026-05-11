# Animaciones y Estilos del Dashboard/Inicio

## Ubicación
Archivos: `src/components/refine-ui/layout/sidebar.tsx`

## 1. Animación del Elemento del Dominio Activo (Dashboard/Inicio)

### Ubicación en código
Líneas ~128-138 en `sidebar.tsx` - Los dominios principales (House icon para dashboard)

### Estilos y Animación
```tsx
className={cn(
  "group relative flex h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium transition-all duration-300 ease-out",
  "text-white hover:-translate-y-0.5 hover:bg-white/10",
  isActive && "bg-[#d5bb87] text-[#00284d] shadow-[0_10px_24px_rgba(213,187,135,0.35)]",
  compact && "justify-center px-0",
)}
```

### Detalles de la Animación
- **Transición principal**: `transition-all duration-300 ease-out`
- **Estado normal**: `text-white`
- **En hover**: 
  - `hover:-translate-y-0.5` (sube 2px)
  - `hover:bg-white/10` (fondo semi-transparente)
- **Cuando está activo** (isActive):
  - Fondo dorado: `bg-[#d5bb87]`
  - Texto oscuro: `text-[#00284d]`
  - Sombra especial: `shadow-[0_10px_24px_rgba(213,187,135,0.35)]` (sombra dorada suave)
- **Escala del ícono**: El ícono tiene `group-hover:scale-105` (escala a 105%)

---

## 2. Animación de Items dentro del Dominio (Elementos del menú)

### Ubicación en código
Líneas ~184-200 en `sidebar.tsx` - Los items/elementos dentro de cada dominio

### Estilos y Animación
```tsx
className={cn(
  "group relative flex h-10 w-full items-center gap-2 rounded-lg px-3 text-left text-sm transition-all duration-300 ease-out",
  "text-white hover:-translate-y-0.5 hover:bg-white/8",
  isActive && "bg-[#d5bb87] text-[#00284d] shadow-[0_10px_20px_rgba(213,187,135,0.28)]",
)}
```

### Detalles de la Animación
- **Transición principal**: `transition-all duration-300 ease-out`
- **Estado normal**: `text-white`
- **En hover**:
  - `hover:-translate-y-0.5` (sube 2px)
  - `hover:bg-white/8` (fondo más sutil)
- **Cuando está activo** (isActive):
  - Fondo dorado: `bg-[#d5bb87]`
  - Texto oscuro: `text-[#00284d]`
  - Sombra: `shadow-[0_10px_20px_rgba(213,187,135,0.28)]` (más sutil que el dominio)
  - Indicador visual: Línea vertical izquierda (`w-1 rounded-r-full bg-[#efd9af]`)

---

## 3. Animación de Expansión/Colapso del Sidebar

### Ubicación en código
Línea ~71 en `sidebar.tsx` - El aside principal

### Estilos y Animación
```tsx
className={cn(
  "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-[#efd9af]/20 bg-[#003e70] shadow-[10px_0_40px_rgba(0,40,77,0.10)] backdrop-blur-md",
  "transition-[width] duration-300 ease-out",
  compact ? "w-16" : "w-72",
)}
```

### Detalles de la Animación
- **Transición**: `transition-[width] duration-300 ease-out`
- **Ancho compacto**: `w-16` (64px)
- **Ancho expandido**: `w-72` (288px)
- **Duración**: 300ms

---

## Componentes CSS Clave

### Colores usados
- **Fondo principal**: `#003e70` (azul oscuro)
- **Fondo secundario**: `#00284d` (azul más oscuro)
- **Color de acento**: `#d5bb87` (dorado)
- **Color de contraste**: `#efd9af` (dorado claro)

### Transiciones genéricas
- **Duración estándar**: 300ms
- **Timing function**: ease-out
- **Propiedades animadas**: all (para máxima flexibilidad)

---

## Cómo Replicar a Otros Elementos

### Opción 1: Usar la misma clase
```tsx
className={cn(
  "transition-all duration-300 ease-out",
  "hover:-translate-y-0.5 hover:bg-white/10",
  isActive && "bg-[#d5bb87] text-[#00284d] shadow-[0_10px_24px_rgba(213,187,135,0.35)]"
)}
```

### Opción 2: Usar versión simplificada
```tsx
className={cn(
  "transition-all duration-300 ease-out",
  "hover:scale-105 hover:shadow-lg",
  isActive && "bg-[#d5bb87] text-[#00284d] shadow-[0_8px_16px_rgba(213,187,135,0.3)]"
)}
```

### Elementos candidatos para replicar
1. Botones de acción
2. Tarjetas seleccionables
3. Elementos de lista interactivos
4. Tabs/Pestañas
5. Elementos de filtro

