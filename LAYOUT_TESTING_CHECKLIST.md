# ✅ TESTING CHECKLIST - Layout Refactor

## 1. LAYOUT SINCRONIZACIÓN

### ✓ Expandido → Colapsado
- [ ] Click en chevron del sidebar
- [ ] Sidebar se contrae a 64px (solo iconos)
- [ ] Submenu permanece abierto
- [ ] Content crece para ocupar espacio
- [ ] Transición suave (debe durar ~300ms)
- [ ] Header acompaña el cambio

### ✓ Colapsado → Expandido
- [ ] Click nuevamente en chevron
- [ ] Sidebar expande a 288px
- [ ] Muestra textos nuevamente
- [ ] Content se reajusta
- [ ] Transición suave
- [ ] No hay espacios vacíos

---

## 2. NAVEGACIÓN DE DOMINIOS

### ✓ Cambiar de dominio (single-click)
- [ ] Click en "Presupuesto" (en dashboard)
- [ ] Sidebar expande (si estaba colapsado)
- [ ] Submenu se abre mostrando items de Presupuesto
- [ ] Main content se reajusta correctamente
- [ ] **NO requiere segundo click** ✓
- [ ] Navegación es suave

### ✓ Toggle dominio actual
- [ ] Ir a cualquier submenu (ej: Presupuesto)
- [ ] Click en el icono/botón de Presupuesto
- [ ] Sidebar debe colapsarse
- [ ] Submenu permanece visible
- [ ] Transición suave
- [ ] Volver a clickear expande sidebar

---

## 3. RESPONSIVE

### ✓ Desktop (md breakpoint)
- [ ] Abrir navegador a full width
- [ ] Sidebar visible
- [ ] Layout ocupa espacio correcto
- [ ] Resize window → todo se reajusta

### ✓ Tablet (768px)
- [ ] Developer tools → iPad size
- [ ] Sidebar visible pero compactado
- [ ] Content responsive

### ✓ Mobile (< 640px)
- [ ] Developer tools → iPhone size
- [ ] Hamburger menu funciona
- [ ] Sheet aparece correctamente
- [ ] Grid de dominios visible
- [ ] Click en dominio → cierra sheet + navega
- [ ] Submenu items clickeables

---

## 4. SUBMENU BEHAVIOR

### ✓ Submenu abre/cierra
- [ ] Expandido: submenu visible con items
- [ ] Colapsado: submenu persiste
- [ ] Items del submenu clickeables
- [ ] Búsqueda funciona (si aplica)

### ✓ Cambio de dominio (submenu)
- [ ] En Presupuesto, click en "Nómina"
- [ ] Submenu cambia de items
- [ ] Content va a Nómina/home
- [ ] Layout sincronizado

---

## 5. CONTENT AREA

### ✓ Width/Padding dinámico
- [ ] Sidebar expandido: content tiene espacio para sidebar + submenu
- [ ] Sidebar colapsado: content crece
- [ ] No hay overflow horizontal
- [ ] Contenido no pasa bajo sidebars

### ✓ Main content posicionamiento
- [ ] No está debajo de sidebar
- [ ] No está debajo de header
- [ ] Top padding correcto
- [ ] Left margin responde a cambios

---

## 6. TRANSICIONES

### ✓ Smoothness
- [ ] Todas las transiciones duran ~300ms
- [ ] No hay saltos abruptos
- [ ] Chevron rota suavemente
- [ ] Opacity cambios son graduales

### ✓ Performance
- [ ] No hay lag al cambiar estado
- [ ] Transiciones son fluidas
- [ ] No hay flickering
- [ ] GPU acelerado (check DevTools)

---

## 7. HEADER

### ✓ Header repositioning
- [ ] Header acompaña al sidebar
- [ ] Margin-left cambia dinámicamente
- [ ] Breadcrumbs alineados correctamente
- [ ] Botones accesibles

### ✓ Header content
- [ ] Logo visible (si aplica)
- [ ] Breadcrumbs visibles
- [ ] User menu visible
- [ ] Theme toggle funciona

---

## 8. ANIMATIONS

### ✓ Chevron rotation
- [ ] Chevron rota 180° al colapsar
- [ ] Rotación es suave
- [ ] Vuelve a posición original

### ✓ Submenu fade
- [ ] Submenu fade in al abrir
- [ ] Fade out al cerrar
- [ ] Pointer-events correctos (no clickeable mientras fade)

---

## 9. EDGE CASES

### ✓ Dashboard
- [ ] Submenu cerrado en dashboard
- [ ] Layout centrado correctamente
- [ ] No hay submenu items visibles

### ✓ Primera carga
- [ ] Sidebar expandido por defecto
- [ ] Submenu cerrado (no en dashboard)
- [ ] Layout correcto

### ✓ Refresh page
- [ ] Mantiene estado actual (si localStorage implementado)
- [ ] Sino: reset a estado por defecto

### ✓ Deep links
- [ ] Navegar directamente a /presupuesto/cdp
- [ ] Sidebar expande
- [ ] Submenu se abre con CDP activo
- [ ] Breadcrumbs correctos

---

## 10. BROWSER COMPATIBILITY

- [ ] Chrome/Edge (Chromium)
- [ ] Safari
- [ ] Firefox
- [ ] Mobile browsers

---

## PROBLEMAS COMUNES A VERIFICAR

### ❌ Doble-click aún necesario?
→ Revisar `goDomain()` en sidebar.tsx

### ❌ Body no se reajusta?
→ Revisar CSS variables en layout.tsx
→ Check: `margin-left` está correctamente set

### ❌ Submenu invade content?
→ Revisar z-index valores
→ Check: submenu width es 284px exacto

### ❌ Transiciones saltadas?
→ Check: transition-all duration-300 está en main
→ Verificar GPU acceleration está enabled

### ❌ Header desalineado?
→ Revisar header margin-left
→ Debe ser igual a main margin-left

### ❌ Mobile menu no cierra?
→ Revisar useEffect en sidebar.tsx
→ Setea mobileOpen = false on pathname change

---

## PERFORMANCE METRICS

Verificar en DevTools Performance tab:

```
✓ No layout thrashing
✓ Transiciones < 16ms per frame (60fps)
✓ GPU accelerated (will-change CSS)
✓ No forced reflows
```

---

## SIGN-OFF

Once all checks pass:
```
✅ Layout refactor COMPLETE
✅ Single-click working
✅ Transitions smooth
✅ Responsive working
✅ No visual bugs
✅ Performance good
```

**Status:** Ready for production
