# 💼 SAPFIAI — Sistema de Administración Financiera

![React](https://img.shields.io/badge/React-18.x-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC)
![Refine](https://img.shields.io/badge/Refine-5.x-FF6B6B)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

---

## 📋 Descripción

**SAPFIAI** es una plataforma web SPA desarrollada con **React + TypeScript + Vite**, orientada a la administración financiera institucional. Consume una API backend bajo arquitectura limpia (.NET) y está construida sobre el framework **Refine** para gestión de recursos CRUD.

El proyecto implementa:

- Arquitectura modular por dominio (presupuesto, nómina, académico, proyectos, contratación, agenda)
- Separación de responsabilidades (providers, pages, components)
- Tipado estricto con TypeScript
- Autenticación JWT con refresh token y timeout de sesión
- Componentes CRUD reutilizables y configurables

Actualmente está desplegado en **Vercel** para producción.

---

## ✨ Características

- 🔐 Autenticación JWT con refresh token automático y timeout de sesión (30 min)
- 📊 Gestión de presupuesto: CDP, alertas, avances, cierre de vigencia
- 👥 Módulo de nómina: empleados, conceptos, eventos de nómina
- 🎓 Módulo académico: programas, estudiantes, becas, apoyos de matrícula, períodos
- 📁 Gestión de proyectos especiales y cartera de facturas
- 📝 Contratación: contratos y pagos de contratos
- 📅 Agenda: eventos, asignaciones y seguimiento
- ⚙️ Configuración: unidades ejecutoras, fuentes de recursos, rubros de gasto/ingreso, municipios
- 🛡️ Administración de usuarios y roles (Identity)
- 🌙 Soporte para modo oscuro
- 🧩 Componentes CRUD genéricos y configurables por recurso
- 🔎 Tablas con filtros, paginación y ordenamiento
- 🚀 Build optimizado con code splitting por dominio

---

## 🛠️ Stack Tecnológico

| Tecnología            | Uso                                      |
|-----------------------|------------------------------------------|
| React 18              | Librería de UI                           |
| TypeScript 5          | Tipado estático                          |
| Vite 5                | Bundler y servidor de desarrollo         |
| TailwindCSS 4         | Estilos utilitarios                      |
| Refine 5              | Framework CRUD + auth + routing          |
| React Router 7        | Enrutamiento                             |
| shadcn/ui + Radix UI  | Componentes de interfaz                  |
| React Hook Form + Zod | Formularios y validación                 |
| TanStack Table        | Tablas avanzadas                         |
| Ky                    | Cliente HTTP con interceptores           |
| Recharts              | Gráficas                                 |
| Lucide React          | Iconografía                              |
| next-themes           | Gestión de tema claro/oscuro             |
| Sonner                | Notificaciones toast                     |
| Netlify               | Hosting y despliegue                     |

---

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── refine-ui/          # Componentes del sistema basados en Refine
│   │   ├── buttons/        # Botones CRUD (crear, editar, eliminar, etc.)
│   │   ├── crud/           # Componente genérico resource-crud
│   │   ├── data-table/     # Tabla con filtros, paginación y ordenamiento
│   │   ├── form/           # Formularios de auth (login, registro, recuperación)
│   │   ├── layout/         # Layout, sidebar, header, breadcrumb, loading
│   │   ├── notification/   # Toaster, notificaciones undoable
│   │   ├── theme/          # Proveedor y selector de tema
│   │   └── views/          # Vistas CRUD (list, create, edit, show)
│   └── ui/                 # Componentes base shadcn/ui
├── hooks/                  # Hooks personalizados
├── lib/                    # Utilidades (cn, etc.)
├── pages/
│   ├── administracion/     # Usuarios y roles
│   ├── dbo-unidades-ejecutoras/
│   ├── crud-configs.ts     # Configuraciones CRUD de todos los recursos
│   └── dbo-*.tsx           # Páginas por recurso
├── providers/
│   ├── auth.ts             # AuthProvider (login, logout, check, refresh)
│   ├── data.ts             # DataProvider con ky + interceptores JWT
│   └── constants.ts        # Endpoints, keys, timeouts
├── App.tsx                 # Entrypoint: Refine + rutas + recursos
├── App.css                 # Estilos globales + variables de tema
└── types.ts                # Tipos globales (DTOs, respuestas)
```

---

## 🔐 Autenticación

- Login con email y contraseña → JWT almacenado en `localStorage`
- Refresh token automático al recibir `401`
- Timeout de sesión por inactividad (30 minutos por defecto)
- Registro de nuevos usuarios
- Recuperación de contraseña
- Protección de rutas con `<Authenticated>` de Refine
- Redirección automática a `/login` al expirar la sesión

---

## 📦 Módulos del Sistema

### Presupuesto
- **CDP** — Certificados de Disponibilidad Presupuestal
- **Alertas Presupuestales** — Umbrales y notificaciones por rubro
- **Avances y Legalizaciones** — Seguimiento de avances de recursos
- **Cierre de Vigencia** — Consolidado de ingresos y gastos por vigencia

### Nómina
- **Empleados** — Gestión de personal con datos laborales y salariales
- **Conceptos de Nómina** — Tipos de devengados y deducciones
- **Eventos de Nómina** — Registro de novedades por empleado y período

### Académico
- **Programas Académicos** — Catálogo de programas por nivel
- **Estudiantes** — Registro con datos académicos y financieros
- **Becas Posgrado** — Convocatorias Minciencias y beneficiarios
- **Tipos de Apoyo / Apoyos de Matrícula** — Subsidios y convenios
- **Períodos Académicos** — Vigencias y semestres

### Proyectos
- **Tipos de Proyecto** — Clasificación con habilitadores (SAR, nómina, matrículas)
- **Proyectos Especiales** — Proyectos con presupuesto, estado y vigencia activa
- **Cartera de Facturas** — Facturación por proyecto y contrato

### Contratación
- **Contratos** — Gestión de contratos con contratistas
- **Pagos de Contratos** — Registro de pagos y comprobantes

### Agenda
- **Eventos** — Eventos recurrentes o únicos con prioridad
- **Asignaciones** — Asignación de eventos a usuarios o roles
- **Eventos de Seguimiento** — Trazabilidad de acciones sobre entidades

### Configuración
- **Unidades Ejecutoras** — Dependencias institucionales
- **Fuentes de Recursos** — Origen de los recursos financieros
- **Rubros de Gasto** — Clasificación CCP de egresos
- **Rubros de Ingreso** — Clasificación CICP de ingresos
- **Municipios** — Catálogo geográfico

### Administración
- **Usuarios** — Gestión de cuentas con asignación de roles
- **Roles** — Creación y edición de roles del sistema

---

## 🚀 Instalación y Ejecución Local

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/sapfiai-frontend.git
cd sapfiai-frontend
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Configurar variables de entorno

```bash
cp .env.example .env.local
```

Editar `.env.local`:

```env
VITE_BACKEND_URL=http://localhost:5001
VITE_APP_NAME=SAPFIAI
VITE_SESSION_TIMEOUT=1800000
VITE_TOKEN_REFRESH_THRESHOLD=300000
```

### 4️⃣ Ejecutar en desarrollo

```bash
npm run dev
```

Aplicación disponible en `http://localhost:5173`

> En desarrollo, Vite actúa como proxy hacia el backend para todas las rutas `/api`, `/login`, `/register`, `/refresh` y `/forgotPassword`.

---

## ⚙️ Variables de Entorno

| Variable                       | Descripción                                      | Default    |
|-------------------------------|--------------------------------------------------|------------|
| `VITE_BACKEND_URL`            | URL base del backend                             | —          |
| `VITE_APP_NAME`               | Nombre de la aplicación                          | `SAPFIAI`  |
| `VITE_SESSION_TIMEOUT`        | Timeout de sesión en ms                          | `1800000`  |
| `VITE_TOKEN_REFRESH_THRESHOLD`| Umbral para renovar token en ms                  | `300000`   |

---

## ☁️ Despliegue en Vercel

El proyecto está configurado para despliegue automático en Vercel con SPA redirect:

```json
// vercel.json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Configuración en Vercel:
- Framework: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
- Variables de entorno: las mismas del `.env.example`

Cada push a la rama `main` genera un nuevo despliegue automático.

---

## 📦 Build para Producción

```bash
npm run build
```

El build genera la carpeta `dist/` con chunks separados por dominio:

- `vendor-react` — React, React DOM, React Router
- `refine` — @refinedev/*
- `ui-radix` — Componentes Radix UI
- `forms` — React Hook Form, Zod
- `charts` — Recharts
- `table` — TanStack Table
- `ui-components` — Sonner, cmdk, Lucide, Embla
- `utils` — clsx, tailwind-merge, next-themes

Para previsualizar el build:

```bash
npm run preview
```

---

## 🔄 Integración con Backend

El frontend consume una API REST desarrollada en:

- ASP.NET Core (Clean Architecture)
- Entity Framework Core
- CQRS + MediatR
- Autenticación con JWT + Refresh Token

El `dataProvider` personalizado maneja:
- Paginación, filtros y ordenamiento vía query params
- Resolución de recursos especiales (`identity-users`, `identity-roles`)
- Refresh automático del token en respuestas `401`
- Manejo de errores estructurado

---

## 🌿 Estrategia de Ramas

- `main` → Rama estable / producción
- `feat/presupuesto` → Módulo de presupuesto
- `feat/nomina` → Módulo de nómina
- `feat/academico` → Módulo académico
- `feat/proyectos` → Proyectos y contratación
- `feat/agenda` → Módulo de agenda

---

## 📄 Licencia

Proyecto bajo licencia MIT.
