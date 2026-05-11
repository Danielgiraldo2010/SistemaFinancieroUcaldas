import { Refine, Authenticated } from "@refinedev/core";

import routerProvider, { NavigateToResource, UnsavedChangesNotifier } from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { RefineAiErrorComponent } from "@/components/catch-all";

import { useNotificationProvider } from "@/components/refine-ui/notification/use-notification-provider";

import { Toaster } from "@/components/refine-ui/notification/toaster";

import { Layout } from "@/components/refine-ui/layout/layout";

import { SignInForm } from "@/components/refine-ui/form/sign-in-from";
import { SignUpForm } from "@/components/refine-ui/form/sign-up-from";
import { ForgotPasswordForm } from "@/components/refine-ui/form/forgot-password-from";

import { dataProvider } from "@/providers/data";
import { authProvider } from "@/providers/auth";
import { APP_NAME } from "@/providers/constants";
import { getMenuIconComponent, type MenuIconName } from "@/lib/navigation-icons";

import PlaceholderPage from "@/pages/placeholder";
import { DashboardPage } from "@/pages/dashboard";
import UnidadesEjectorasList from "@/pages/dbo-unidades-ejecutoras/list";
import { UnidadesEjectorasCreate, UnidadesEjectorasEdit } from "@/pages/dbo-unidades-ejecutoras/form";
import { CdpList, CdpCreate, CdpEdit, CdpShow } from "@/pages/dbo-cdp";
import { AlertasPresupuestalesList, AlertasPresupuestalesCreate, AlertasPresupuestalesEdit, AlertasPresupuestalesShow } from "@/pages/dbo-alertas-presupuestales";
import { AvancesLegalizacionesList, AvancesLegalizacionesCreate, AvancesLegalizacionesEdit, AvancesLegalizacionesShow } from "@/pages/dbo-avances-legalizaciones";
import { CierreVigenciaList, CierreVigenciaCreate, CierreVigenciaEdit, CierreVigenciaShow } from "@/pages/dbo-cierre-vigencia";
import { EjecucionMensualList, EjecucionMensualCreate, EjecucionMensualEdit, EjecucionMensualShow } from "@/pages/dbo-ejecucion-mensual";
import { ModificacionesDetalleList, ModificacionesDetalleCreate, ModificacionesDetalleEdit, ModificacionesDetalleShow } from "@/pages/dbo-modificaciones-detalle";
import { FechasLimitePresupuestalesList, FechasLimitePresupuestalesCreate, FechasLimitePresupuestalesEdit, FechasLimitePresupuestalesShow } from "@/pages/dbo-fechas-limite-presupuestales";
import { EstructurasFinancierasList, EstructurasFinancierasCreate, EstructurasFinancierasEdit, EstructurasFinancierasShow } from "@/pages/dbo-estructuras-financieras";
import { EmpleadosList, EmpleadosCreate, EmpleadosEdit, EmpleadosShow } from "@/pages/dbo-empleados";
import { ConceptosNominaList, ConceptosNominaCreate, ConceptosNominaEdit, ConceptosNominaShow } from "@/pages/dbo-conceptos-nomina";
import { ProgramasAcademicosList, ProgramasAcademicosCreate, ProgramasAcademicosEdit, ProgramasAcademicosShow } from "@/pages/dbo-programas-academicos";
import { EstudiantesList, EstudiantesCreate, EstudiantesEdit, EstudiantesShow } from "@/pages/dbo-estudiante";
import { BecasPosgradoList, BecasPosgradoCreate, BecasPosgradoEdit, BecasPosgradoShow } from "@/pages/dbo-becas-posgrado";
import { ApoyosMatriculaList, ApoyosMatriculaCreate, ApoyosMatriculaEdit, ApoyosMatriculaShow } from "@/pages/dbo-apoyos-matricula";
import { ApoyoMatriculaList, ApoyoMatriculaCreate, ApoyoMatriculaEdit, ApoyoMatriculaShow } from "@/pages/dbo-apoyomatricula";
import { DescuentosList, DescuentosCreate, DescuentosEdit, DescuentosShow } from "@/pages/dbo-descuento";
import { DescuentoMatriculaList, DescuentoMatriculaCreate, DescuentoMatriculaEdit, DescuentoMatriculaShow } from "@/pages/dbo-descuento-matricula";
import { FinanciacionMatriculaList, FinanciacionMatriculaCreate, FinanciacionMatriculaEdit, FinanciacionMatriculaShow } from "@/pages/dbo-financiacionmatricula";
import { MatriculasApoyosList, MatriculasApoyosCreate, MatriculasApoyosEdit, MatriculasApoyosShow } from "@/pages/dbo-matriculas-apoyos";
import { MatriculasProyectadasList, MatriculasProyectadasCreate, MatriculasProyectadasEdit, MatriculasProyectadasShow } from "@/pages/dbo-matriculas-proyectadas";
import { PeriodosAcademicosList, PeriodosAcademicosCreate, PeriodosAcademicosEdit, PeriodosAcademicosShow } from "@/pages/dbo-periodos-academicos";
import { TiposProyectoList, TiposProyectoCreate, TiposProyectoEdit, TiposProyectoShow } from "@/pages/dbo-tipos-proyecto";
import { ProyectosEspecialesList, ProyectosEspecialesCreate, ProyectosEspecialesEdit, ProyectosEspecialesShow } from "@/pages/dbo-proyectos-especiales";
import { CarteraFacturasList, CarteraFacturasCreate, CarteraFacturasEdit, CarteraFacturasShow } from "@/pages/dbo-cartera-facturas";
import { AgendaEventosList, AgendaEventosCreate, AgendaEventosEdit, AgendaEventosShow } from "@/pages/dbo-agenda-eventos";
import { AgendaAsignacionesList, AgendaAsignacionesCreate, AgendaAsignacionesEdit, AgendaAsignacionesShow } from "@/pages/dbo-agenda-asignaciones";
import { FuentesRecursosList, FuentesRecursosCreate, FuentesRecursosEdit, FuentesRecursosShow } from "@/pages/dbo-fuentes-recursos";
import { RubrosGastoList, RubrosGastoCreate, RubrosGastoEdit, RubrosGastoShow } from "@/pages/dbo-rubros-gasto";
import { RubrosIngresoList, RubrosIngresoCreate, RubrosIngresoEdit, RubrosIngresoShow } from "@/pages/dbo-rubros-ingreso";
import { MunicipiosList, MunicipiosCreate, MunicipiosEdit, MunicipiosShow } from "@/pages/dbo-municipio";
import { ContratosList, ContratosCreate, ContratosEdit, ContratosShow } from "@/pages/dbo-contratos";
import { EventosNominaList, EventosNominaCreate, EventosNominaEdit, EventosNominaShow } from "@/pages/dbo-eventos-nomina";
import { EventosSeguimientoList, EventosSeguimientoCreate, EventosSeguimientoEdit, EventosSeguimientoShow } from "@/pages/dbo-eventos-seguimiento";
import { PagosContratosList, PagosContratosCreate, PagosContratosEdit, PagosContratosShow } from "@/pages/dbo-pagos-contratos";
import { AdminUsersList, AdminUsersCreate, AdminUsersShow, AdminUsersAssignRoles } from "@/pages/administracion/usuarios";
import { AdminRolesList, AdminRolesCreate, AdminRolesEdit } from "@/pages/administracion/roles";

import {
  CalendarDays,
  CalendarRange,
} from "lucide-react";

const resourceIcon = (name: MenuIconName) => {
  const Icon = getMenuIconComponent(name);
  return <Icon className="h-4 w-4" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider}
        authProvider={authProvider}
        notificationProvider={useNotificationProvider}
        options={{
          title: {
            text: APP_NAME,
            icon: <img src="/logoUC.png" alt="Logo UC" className="h-8 w-auto" />,
          },
        }}
        resources={[
          {
            name: "dashboard",
            list: "/dashboard",
            meta: {
              label: "Inicio",
              icon: resourceIcon("home"),
            },
          },

          // ── ADMINISTRACIÓN GROUP ───────────────────────────
          {
            name: "group-administracion",
            meta: {
              label: "Administración",
              icon: resourceIcon("administracion"),
              group: true,
            },
          },
          {
            name: "identity-users",
            list: "/administracion/usuarios",
            create: "/administracion/usuarios/create",
            edit: "/administracion/usuarios/:id/roles",
            show: "/administracion/usuarios/:id",
            meta: {
              label: "Usuarios",
              parent: "group-administracion",
              icon: resourceIcon("usuarios"),
            },
          },
          {
            name: "identity-roles",
            list: "/administracion/roles",
            create: "/administracion/roles/create",
            edit: "/administracion/roles/:id/edit",
            meta: {
              label: "Roles",
              parent: "group-administracion",
              icon: resourceIcon("roles"),
            },
          },

          // ── PRESUPUESTO GROUP ──────────────────────────────
          {
            name: "group-presupuesto",
            meta: {
              label: "Presupuesto",
              icon: resourceIcon("presupuesto"),
              group: true,
            },
          },
          {
            name: "presupuesto-cdp",
            list: "/dbo-cdp",
            create: "/dbo-cdp/create",
            edit: "/dbo-cdp/:id/edit",
            show: "/dbo-cdp/:id",
            meta: {
              label: "CDP",
              parent: "group-presupuesto",
              icon: resourceIcon("cdp"),
            },
          },
          {
            name: "presupuesto-alertas",
            list: "/dbo-alertas-presupuestales",
            create: "/dbo-alertas-presupuestales/create",
            edit: "/dbo-alertas-presupuestales/:id/edit",
            show: "/dbo-alertas-presupuestales/:id",
            meta: {
              label: "Alertas Presupuestales",
              parent: "group-presupuesto",
              icon: resourceIcon("bell"),
            },
          },
          {
            name: "presupuesto-avances",
            list: "/dbo-avances-legalizaciones",
            create: "/dbo-avances-legalizaciones/create",
            edit: "/dbo-avances-legalizaciones/:id/edit",
            show: "/dbo-avances-legalizaciones/:id",
            meta: {
              label: "Avances y Legalizaciones",
              parent: "group-presupuesto",
              icon: resourceIcon("avancesLegalizaciones"),
            },
          },
          {
            name: "presupuesto-cierre",
            list: "/dbo-cierre-vigencia",
            create: "/dbo-cierre-vigencia/create",
            edit: "/dbo-cierre-vigencia/:id/edit",
            show: "/dbo-cierre-vigencia/:id",
            meta: {
              label: "Cierre de Vigencia",
              parent: "group-presupuesto",
              icon: resourceIcon("cierreVigencia"),
            },
          },
          {
            name: "presupuesto-ejecucion",
            list: "/presupuesto/ejecucion-mensual",
            create: "/presupuesto/ejecucion-mensual/create",
            edit: "/presupuesto/ejecucion-mensual/:id/edit",
            show: "/presupuesto/ejecucion-mensual/:id",
            meta: {
              label: "Ejecución Presupuestal",
              parent: "group-presupuesto",
              icon: resourceIcon("ejecucionPresupuestal"),
            },
          },
          {
            name: "presupuesto-modificaciones",
            list: "/presupuesto/modificaciones-detalle",
            create: "/presupuesto/modificaciones-detalle/create",
            edit: "/presupuesto/modificaciones-detalle/:id/edit",
            show: "/presupuesto/modificaciones-detalle/:id",
            meta: {
              label: "Modificaciones Presupuestales",
              parent: "group-presupuesto",
              icon: resourceIcon("modificaciones"),
            },
          },
          {
            name: "presupuesto-fechas-limite",
            list: "/presupuesto/fechas-limite-presupuestales",
            create: "/presupuesto/fechas-limite-presupuestales/create",
            edit: "/presupuesto/fechas-limite-presupuestales/:id/edit",
            show: "/presupuesto/fechas-limite-presupuestales/:id",
            meta: {
              label: "Fechas Límite Presupuestales",
              parent: "group-presupuesto",
              icon: resourceIcon("calendarDays"),
            },
          },
          {
            name: "presupuesto-estructuras",
            list: "/presupuesto/estructuras-financieras",
            create: "/presupuesto/estructuras-financieras/create",
            edit: "/presupuesto/estructuras-financieras/:id/edit",
            show: "/presupuesto/estructuras-financieras/:id",
            meta: {
              label: "Estructuras Financieras",
              parent: "group-presupuesto",
              icon: resourceIcon("estructurasFinancieras"),
            },
          },

          // ── NÓMINA GROUP ───────────────────────────────────
          {
            name: "group-nomina",
            meta: {
              label: "Nómina",
              icon: resourceIcon("nomina"),
              group: true,
            },
          },
          {
            name: "nomina-empleados",
            list: "/dbo-empleados",
            create: "/dbo-empleados/create",
            edit: "/dbo-empleados/:id/edit",
            show: "/dbo-empleados/:id",
            meta: {
              label: "Empleados",
              parent: "group-nomina",
              icon: resourceIcon("empleados"),
            },
          },
          {
            name: "nomina-conceptos",
            list: "/dbo-conceptos-nomina",
            create: "/dbo-conceptos-nomina/create",
            edit: "/dbo-conceptos-nomina/:id/edit",
            show: "/dbo-conceptos-nomina/:id",
            meta: {
              label: "Conceptos de Nómina",
              parent: "group-nomina",
              icon: resourceIcon("liquidacion"),
            },
          },
          {
            name: "nomina-eventos",
            list: "/dbo-eventos-nomina",
            create: "/dbo-eventos-nomina/create",
            edit: "/dbo-eventos-nomina/:id/edit",
            show: "/dbo-eventos-nomina/:id",
            meta: {
              label: "Eventos de Nómina",
              parent: "group-nomina",
              icon: resourceIcon("eventos"),
            },
          },

          // ── ACADÉMICO GROUP ────────────────────────────────
          {
            name: "group-academico",
            meta: {
              label: "Académico",
              icon: resourceIcon("academico"),
              group: true,
            },
          },
          {
            name: "academico-programas",
            list: "/dbo-programas-academicos",
            create: "/dbo-programas-academicos/create",
            edit: "/dbo-programas-academicos/:id/edit",
            show: "/dbo-programas-academicos/:id",
            meta: {
              label: "Programas Académicos",
              parent: "group-academico",
              icon: resourceIcon("programas"),
            },
          },
          {
            name: "academico-estudiantes",
            list: "/dbo-estudiante",
            create: "/dbo-estudiante/create",
            edit: "/dbo-estudiante/:id/edit",
            show: "/dbo-estudiante/:id",
            meta: {
              label: "Estudiantes",
              parent: "group-academico",
              icon: resourceIcon("estudiantes"),
            },
          },
          {
            name: "academico-becas",
            list: "/dbo-becas-posgrado",
            create: "/dbo-becas-posgrado/create",
            edit: "/dbo-becas-posgrado/:id/edit",
            show: "/dbo-becas-posgrado/:id",
            meta: {
              label: "Becas Posgrado",
              parent: "group-academico",
              icon: resourceIcon("becas"),
            },
          },
          {
            name: "academico-apoyos",
            list: "/dbo-apoyos-matricula",
            create: "/dbo-apoyos-matricula/create",
            edit: "/dbo-apoyos-matricula/:id/edit",
            show: "/dbo-apoyos-matricula/:id",
            meta: {
              label: "Tipos de Apoyo",
              parent: "group-academico",
              icon: resourceIcon("apoyos"),
            },
          },
          {
            name: "group-matriculas",
            meta: {
              label: "Matrículas",
              icon: resourceIcon("matriculas"),
              group: true,
            },
          },
          {
            name: "matricula-apoyos",
            list: "/matriculas/apoyos-matricula",
            create: "/matriculas/apoyos-matricula/create",
            edit: "/matriculas/apoyos-matricula/:id/edit",
            show: "/matriculas/apoyos-matricula/:id",
            meta: {
              label: "Apoyos Matrícula",
              parent: "group-matriculas",
              icon: resourceIcon("apoyos"),
            },
          },
          {
            name: "matricula-descuentos",
            list: "/matriculas/descuentos",
            create: "/matriculas/descuentos/create",
            edit: "/matriculas/descuentos/:id/edit",
            show: "/matriculas/descuentos/:id",
            meta: {
              label: "Descuentos",
              parent: "group-matriculas",
              icon: resourceIcon("descuentos"),
            },
          },
          {
            name: "matricula-descuento-especial",
            list: "/matriculas/descuento-matricula",
            create: "/matriculas/descuento-matricula/create",
            edit: "/matriculas/descuento-matricula/:id/edit",
            show: "/matriculas/descuento-matricula/:id",
            meta: {
              label: "Descuento Matrícula",
              parent: "group-matriculas",
              icon: resourceIcon("descuentos"),
            },
          },
          {
            name: "matricula-financiacion",
            list: "/matriculas/financiacion-matricula",
            create: "/matriculas/financiacion-matricula/create",
            edit: "/matriculas/financiacion-matricula/:id/edit",
            show: "/matriculas/financiacion-matricula/:id",
            meta: {
              label: "Financiación Matrícula",
              parent: "group-matriculas",
              icon: resourceIcon("financiacion"),
            },
          },
          {
            name: "matricula-asignaciones",
            list: "/matriculas/apoyos",
            create: "/matriculas/apoyos/create",
            edit: "/matriculas/apoyos/:id/edit",
            show: "/matriculas/apoyos/:id",
            meta: {
              label: "Asignación de Apoyos",
              parent: "group-matriculas",
              icon: resourceIcon("apoyos"),
            },
          },
          {
            name: "matricula-proyectadas",
            list: "/matriculas/proyectadas",
            create: "/matriculas/proyectadas/create",
            edit: "/matriculas/proyectadas/:id/edit",
            show: "/matriculas/proyectadas/:id",
            meta: {
              label: "Matrículas Proyectadas",
              parent: "group-matriculas",
              icon: resourceIcon("calendarRange"),
            },
          },

          // ── PROYECTOS GROUP ────────────────────────────────
          {
            name: "group-proyectos",
            meta: {
              label: "Proyectos",
              icon: resourceIcon("proyectos"),
              group: true,
            },
          },
          {
            name: "proyecto-tipos",
            list: "/dbo-tipos-proyecto",
            create: "/dbo-tipos-proyecto/create",
            edit: "/dbo-tipos-proyecto/:id/edit",
            show: "/dbo-tipos-proyecto/:id",
            meta: {
              label: "Tipos de Proyecto",
              parent: "group-proyectos",
              icon: resourceIcon("tiposProyecto"),
            },
          },
          {
            name: "proyecto-especiales",
            list: "/dbo-proyectos-especiales",
            create: "/dbo-proyectos-especiales/create",
            edit: "/dbo-proyectos-especiales/:id/edit",
            show: "/dbo-proyectos-especiales/:id",
            meta: {
              label: "Proyectos Especiales",
              parent: "group-proyectos",
              icon: resourceIcon("proyectos"),
            },
          },
          {
            name: "cartera-facturas",
            list: "/dbo-cartera-facturas",
            create: "/dbo-cartera-facturas/create",
            edit: "/dbo-cartera-facturas/:id/edit",
            show: "/dbo-cartera-facturas/:id",
            meta: {
              label: "Cartera de Facturas",
              parent: "group-proyectos",
              icon: resourceIcon("carteraFacturas"),
            },
          },
          {
            name: "group-contratacion",
            meta: {
              label: "Contratación",
              icon: resourceIcon("contratos"),
              group: true,
            },
          },
          {
            name: "contratacion-contratos",
            list: "/dbo-contratos",
            create: "/dbo-contratos/create",
            edit: "/dbo-contratos/:id/edit",
            show: "/dbo-contratos/:id",
            meta: {
              label: "Contratos",
              parent: "group-contratacion",
              icon: resourceIcon("contratos"),
            },
          },
          {
            name: "contratacion-pagos",
            list: "/dbo-pagos-contratos",
            create: "/dbo-pagos-contratos/create",
            edit: "/dbo-pagos-contratos/:id/edit",
            show: "/dbo-pagos-contratos/:id",
            meta: {
              label: "Pagos de Contratos",
              parent: "group-contratacion",
              icon: resourceIcon("pagos"),
            },
          },

          // ── AGENDA GROUP ───────────────────────────────────
          {
            name: "group-agenda",
            meta: {
              label: "Agenda",
              icon: resourceIcon("agenda"),
              group: true,
            },
          },
          {
            name: "agenda-eventos",
            list: "/dbo-agenda-eventos",
            create: "/dbo-agenda-eventos/create",
            edit: "/dbo-agenda-eventos/:id/edit",
            show: "/dbo-agenda-eventos/:id",
            meta: {
              label: "Eventos",
              parent: "group-agenda",
              icon: resourceIcon("eventos"),
            },
          },
          {
            name: "agenda-asignaciones",
            list: "/dbo-agenda-asignaciones",
            create: "/dbo-agenda-asignaciones/create",
            edit: "/dbo-agenda-asignaciones/:id/edit",
            show: "/dbo-agenda-asignaciones/:id",
            meta: {
              label: "Asignaciones",
              parent: "group-agenda",
              icon: resourceIcon("asignaciones"),
            },
          },
          {
            name: "agenda-seguimiento",
            list: "/dbo-eventos-seguimiento",
            create: "/dbo-eventos-seguimiento/create",
            edit: "/dbo-eventos-seguimiento/:id/edit",
            show: "/dbo-eventos-seguimiento/:id",
            meta: {
              label: "Eventos de Seguimiento",
              parent: "group-agenda",
              icon: resourceIcon("seguimiento"),
            },
          },

          // ── CONFIGURACIÓN GROUP ────────────────────────────
          {
            name: "group-configuracion",
            meta: {
              label: "Configuración",
              icon: resourceIcon("configuracion"),
              group: true,
            },
          },
          {
            name: "configuracion-unidades",
            list: "/dbo-unidades-ejecutoras",
            create: "/dbo-unidades-ejecutoras/create",
            edit: "/dbo-unidades-ejecutoras/:id/edit",
            show: "/dbo-unidades-ejecutoras/:id",
            meta: {
              label: "Unidades Ejecutoras",
              parent: "group-configuracion",
              icon: resourceIcon("unidades"),
            },
          },
          {
            name: "configuracion-fuentes",
            list: "/dbo-fuentes-recursos",
            create: "/dbo-fuentes-recursos/create",
            edit: "/dbo-fuentes-recursos/:id/edit",
            show: "/dbo-fuentes-recursos/:id",
            meta: {
              label: "Fuentes de Recursos",
              parent: "group-configuracion",
              icon: resourceIcon("fuentes"),
            },
          },
          {
            name: "configuracion-rubros-gasto",
            list: "/dbo-rubros-gasto",
            create: "/dbo-rubros-gasto/create",
            edit: "/dbo-rubros-gasto/:id/edit",
            show: "/dbo-rubros-gasto/:id",
            meta: {
              label: "Rubros de Gasto",
              parent: "group-configuracion",
              icon: resourceIcon("rubros"),
            },
          },
          {
            name: "configuracion-rubros-ingreso",
            list: "/dbo-rubros-ingreso",
            create: "/dbo-rubros-ingreso/create",
            edit: "/dbo-rubros-ingreso/:id/edit",
            show: "/dbo-rubros-ingreso/:id",
            meta: {
              label: "Rubros de Ingreso",
              parent: "group-configuracion",
              icon: resourceIcon("rubros"),
            },
          },
          {
            name: "configuracion-municipios",
            list: "/dbo-municipio",
            create: "/dbo-municipio/create",
            edit: "/dbo-municipio/:id/edit",
            show: "/dbo-municipio/:id",
            meta: {
              label: "Municipios",
              parent: "group-configuracion",
              icon: resourceIcon("municipio"),
            },
          },
          {
            name: "academico-periodos",
            list: "/dbo-periodos-academicos",
            create: "/dbo-periodos-academicos/create",
            edit: "/dbo-periodos-academicos/:id/edit",
            show: "/dbo-periodos-academicos/:id",
            meta: {
              label: "Períodos Académicos",
              parent: "group-academico",
              icon: resourceIcon("calendarRange"),
            },
          },
          {
            name: "group-reportes",
            meta: {
              label: "Reportes",
              icon: resourceIcon("reportes"),
              group: true,
            },
          },
          {
            name: "reportes",
            list: "/reportes",
            create: "/reportes",
            edit: "/reportes",
            show: "/reportes",
            meta: {
              label: "Reportes",
              parent: "group-reportes",
              icon: resourceIcon("reportes"),
            },
          },
        ]}>
        <Routes>
          {/* Auth routes - redirect to resources if already authenticated */}
          <Route
            element={
              <Authenticated key="auth-pages" fallback={<Outlet />}>
                <NavigateToResource fallbackTo="/dashboard" />
              </Authenticated>
            }>
            <Route path="/login" element={<SignInForm />} />
            <Route path="/register" element={<SignUpForm />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          </Route>

          {/* Protected routes - require authentication */}
          <Route
            element={
              <Authenticated key="protected-routes">
                <Layout>
                  <Outlet />
                </Layout>
              </Authenticated>
            }>
            <Route index element={<NavigateToResource resource="dashboard" fallbackTo="/dashboard" />} />
            <Route path="/dashboard" element={<DashboardPage />} />

            {/* Administración */}
            <Route path="/administracion/usuarios" element={<AdminUsersList />} />
            <Route path="/administracion/usuarios/create" element={<AdminUsersCreate />} />
            <Route path="/administracion/usuarios/:id/roles" element={<AdminUsersAssignRoles />} />
            <Route path="/administracion/usuarios/:id" element={<AdminUsersShow />} />

            <Route path="/administracion/roles" element={<AdminRolesList />} />
            <Route path="/administracion/roles/create" element={<AdminRolesCreate />} />
            <Route path="/administracion/roles/:id/edit" element={<AdminRolesEdit />} />

            {/* Presupuesto */}
            <Route path="/dbo-cdp" element={<CdpList />} />
            <Route path="/dbo-cdp/create" element={<CdpCreate />} />
            <Route path="/dbo-cdp/:id/edit" element={<CdpEdit />} />
            <Route path="/dbo-cdp/:id" element={<CdpShow />} />

            <Route path="/dbo-alertas-presupuestales" element={<AlertasPresupuestalesList />} />
            <Route path="/dbo-alertas-presupuestales/create" element={<AlertasPresupuestalesCreate />} />
            <Route path="/dbo-alertas-presupuestales/:id/edit" element={<AlertasPresupuestalesEdit />} />
            <Route path="/dbo-alertas-presupuestales/:id" element={<AlertasPresupuestalesShow />} />

            <Route path="/dbo-avances-legalizaciones" element={<AvancesLegalizacionesList />} />
            <Route path="/dbo-avances-legalizaciones/create" element={<AvancesLegalizacionesCreate />} />
            <Route path="/dbo-avances-legalizaciones/:id/edit" element={<AvancesLegalizacionesEdit />} />
            <Route path="/dbo-avances-legalizaciones/:id" element={<AvancesLegalizacionesShow />} />

            <Route path="/dbo-cierre-vigencia" element={<CierreVigenciaList />} />
            <Route path="/dbo-cierre-vigencia/create" element={<CierreVigenciaCreate />} />
            <Route path="/dbo-cierre-vigencia/:id/edit" element={<CierreVigenciaEdit />} />
            <Route path="/dbo-cierre-vigencia/:id" element={<CierreVigenciaShow />} />
            <Route path="/presupuesto/ejecucion-mensual" element={<EjecucionMensualList />} />
            <Route path="/presupuesto/ejecucion-mensual/create" element={<EjecucionMensualCreate />} />
            <Route path="/presupuesto/ejecucion-mensual/:id/edit" element={<EjecucionMensualEdit />} />
            <Route path="/presupuesto/ejecucion-mensual/:id" element={<EjecucionMensualShow />} />
            <Route path="/presupuesto/modificaciones-detalle" element={<ModificacionesDetalleList />} />
            <Route path="/presupuesto/modificaciones-detalle/create" element={<ModificacionesDetalleCreate />} />
            <Route path="/presupuesto/modificaciones-detalle/:id/edit" element={<ModificacionesDetalleEdit />} />
            <Route path="/presupuesto/modificaciones-detalle/:id" element={<ModificacionesDetalleShow />} />
            <Route path="/presupuesto/fechas-limite-presupuestales" element={<FechasLimitePresupuestalesList />} />
            <Route path="/presupuesto/fechas-limite-presupuestales/create" element={<FechasLimitePresupuestalesCreate />} />
            <Route path="/presupuesto/fechas-limite-presupuestales/:id/edit" element={<FechasLimitePresupuestalesEdit />} />
            <Route path="/presupuesto/fechas-limite-presupuestales/:id" element={<FechasLimitePresupuestalesShow />} />
            <Route path="/presupuesto/estructuras-financieras" element={<EstructurasFinancierasList />} />
            <Route path="/presupuesto/estructuras-financieras/create" element={<EstructurasFinancierasCreate />} />
            <Route path="/presupuesto/estructuras-financieras/:id/edit" element={<EstructurasFinancierasEdit />} />
            <Route path="/presupuesto/estructuras-financieras/:id" element={<EstructurasFinancierasShow />} />

            {/* Nómina */}
            <Route path="/dbo-empleados" element={<EmpleadosList />} />
            <Route path="/dbo-empleados/create" element={<EmpleadosCreate />} />
            <Route path="/dbo-empleados/:id/edit" element={<EmpleadosEdit />} />
            <Route path="/dbo-empleados/:id" element={<EmpleadosShow />} />

            <Route path="/dbo-conceptos-nomina" element={<ConceptosNominaList />} />
            <Route path="/dbo-conceptos-nomina/create" element={<ConceptosNominaCreate />} />
            <Route path="/dbo-conceptos-nomina/:id/edit" element={<ConceptosNominaEdit />} />
            <Route path="/dbo-conceptos-nomina/:id" element={<ConceptosNominaShow />} />

            {/* Académico */}
            <Route path="/dbo-programas-academicos" element={<ProgramasAcademicosList />} />
            <Route path="/dbo-programas-academicos/create" element={<ProgramasAcademicosCreate />} />
            <Route path="/dbo-programas-academicos/:id/edit" element={<ProgramasAcademicosEdit />} />
            <Route path="/dbo-programas-academicos/:id" element={<ProgramasAcademicosShow />} />

            <Route path="/dbo-estudiante" element={<EstudiantesList />} />
            <Route path="/dbo-estudiante/create" element={<EstudiantesCreate />} />
            <Route path="/dbo-estudiante/:id/edit" element={<EstudiantesEdit />} />
            <Route path="/dbo-estudiante/:id" element={<EstudiantesShow />} />

            <Route path="/dbo-becas-posgrado" element={<BecasPosgradoList />} />
            <Route path="/dbo-becas-posgrado/create" element={<BecasPosgradoCreate />} />
            <Route path="/dbo-becas-posgrado/:id/edit" element={<BecasPosgradoEdit />} />
            <Route path="/dbo-becas-posgrado/:id" element={<BecasPosgradoShow />} />

            <Route path="/matriculas/apoyos-matricula" element={<ApoyosMatriculaList />} />
            <Route path="/matriculas/apoyos-matricula/create" element={<ApoyosMatriculaCreate />} />
            <Route path="/matriculas/apoyos-matricula/:id/edit" element={<ApoyosMatriculaEdit />} />
            <Route path="/matriculas/apoyos-matricula/:id" element={<ApoyosMatriculaShow />} />
            <Route path="/matriculas/descuentos" element={<DescuentosList />} />
            <Route path="/matriculas/descuentos/create" element={<DescuentosCreate />} />
            <Route path="/matriculas/descuentos/:id/edit" element={<DescuentosEdit />} />
            <Route path="/matriculas/descuentos/:id" element={<DescuentosShow />} />
            <Route path="/matriculas/descuento-matricula" element={<DescuentoMatriculaList />} />
            <Route path="/matriculas/descuento-matricula/create" element={<DescuentoMatriculaCreate />} />
            <Route path="/matriculas/descuento-matricula/:id/edit" element={<DescuentoMatriculaEdit />} />
            <Route path="/matriculas/descuento-matricula/:id" element={<DescuentoMatriculaShow />} />
            <Route path="/matriculas/financiacion-matricula" element={<FinanciacionMatriculaList />} />
            <Route path="/matriculas/financiacion-matricula/create" element={<FinanciacionMatriculaCreate />} />
            <Route path="/matriculas/financiacion-matricula/:id/edit" element={<FinanciacionMatriculaEdit />} />
            <Route path="/matriculas/financiacion-matricula/:id" element={<FinanciacionMatriculaShow />} />
            <Route path="/matriculas/apoyos" element={<MatriculasApoyosList />} />
            <Route path="/matriculas/apoyos/create" element={<MatriculasApoyosCreate />} />
            <Route path="/matriculas/apoyos/:id/edit" element={<MatriculasApoyosEdit />} />
            <Route path="/matriculas/apoyos/:id" element={<MatriculasApoyosShow />} />
            <Route path="/matriculas/proyectadas" element={<MatriculasProyectadasList />} />
            <Route path="/matriculas/proyectadas/create" element={<MatriculasProyectadasCreate />} />
            <Route path="/matriculas/proyectadas/:id/edit" element={<MatriculasProyectadasEdit />} />
            <Route path="/matriculas/proyectadas/:id" element={<MatriculasProyectadasShow />} />

            {/* Proyectos */}
            <Route path="/dbo-tipos-proyecto" element={<TiposProyectoList />} />
            <Route path="/dbo-tipos-proyecto/create" element={<TiposProyectoCreate />} />
            <Route path="/dbo-tipos-proyecto/:id/edit" element={<TiposProyectoEdit />} />
            <Route path="/dbo-tipos-proyecto/:id" element={<TiposProyectoShow />} />

            <Route path="/dbo-proyectos-especiales" element={<ProyectosEspecialesList />} />
            <Route path="/dbo-proyectos-especiales/create" element={<ProyectosEspecialesCreate />} />
            <Route path="/dbo-proyectos-especiales/:id/edit" element={<ProyectosEspecialesEdit />} />
            <Route path="/dbo-proyectos-especiales/:id" element={<ProyectosEspecialesShow />} />

            <Route path="/dbo-cartera-facturas" element={<CarteraFacturasList />} />
            <Route path="/dbo-cartera-facturas/create" element={<CarteraFacturasCreate />} />
            <Route path="/dbo-cartera-facturas/:id/edit" element={<CarteraFacturasEdit />} />
            <Route path="/dbo-cartera-facturas/:id" element={<CarteraFacturasShow />} />

            {/* Agenda */}
            <Route path="/dbo-agenda-eventos" element={<AgendaEventosList />} />
            <Route path="/dbo-agenda-eventos/create" element={<AgendaEventosCreate />} />
            <Route path="/dbo-agenda-eventos/:id/edit" element={<AgendaEventosEdit />} />
            <Route path="/dbo-agenda-eventos/:id" element={<AgendaEventosShow />} />

            <Route path="/dbo-agenda-asignaciones" element={<AgendaAsignacionesList />} />
            <Route path="/dbo-agenda-asignaciones/create" element={<AgendaAsignacionesCreate />} />
            <Route path="/dbo-agenda-asignaciones/:id/edit" element={<AgendaAsignacionesEdit />} />
            <Route path="/dbo-agenda-asignaciones/:id" element={<AgendaAsignacionesShow />} />
            <Route path="/dbo-eventos-seguimiento" element={<EventosSeguimientoList />} />
            <Route path="/dbo-eventos-seguimiento/create" element={<EventosSeguimientoCreate />} />
            <Route path="/dbo-eventos-seguimiento/:id/edit" element={<EventosSeguimientoEdit />} />
            <Route path="/dbo-eventos-seguimiento/:id" element={<EventosSeguimientoShow />} />

            {/* Configuración */}
            <Route path="/dbo-unidades-ejecutoras" element={<UnidadesEjectorasList />} />
            <Route path="/dbo-unidades-ejecutoras/create" element={<UnidadesEjectorasCreate />} />
            <Route path="/dbo-unidades-ejecutoras/:id/edit" element={<UnidadesEjectorasEdit />} />
            <Route path="/dbo-unidades-ejecutoras/:id" element={<PlaceholderPage />} />

            <Route path="/dbo-fuentes-recursos" element={<FuentesRecursosList />} />
            <Route path="/dbo-fuentes-recursos/create" element={<FuentesRecursosCreate />} />
            <Route path="/dbo-fuentes-recursos/:id/edit" element={<FuentesRecursosEdit />} />
            <Route path="/dbo-fuentes-recursos/:id" element={<FuentesRecursosShow />} />

            <Route path="/dbo-rubros-gasto" element={<RubrosGastoList />} />
            <Route path="/dbo-rubros-gasto/create" element={<RubrosGastoCreate />} />
            <Route path="/dbo-rubros-gasto/:id/edit" element={<RubrosGastoEdit />} />
            <Route path="/dbo-rubros-gasto/:id" element={<RubrosGastoShow />} />

            <Route path="/dbo-rubros-ingreso" element={<RubrosIngresoList />} />
            <Route path="/dbo-rubros-ingreso/create" element={<RubrosIngresoCreate />} />
            <Route path="/dbo-rubros-ingreso/:id/edit" element={<RubrosIngresoEdit />} />
            <Route path="/dbo-rubros-ingreso/:id" element={<RubrosIngresoShow />} />

            <Route path="/dbo-municipio" element={<MunicipiosList />} />
            <Route path="/dbo-municipio/create" element={<MunicipiosCreate />} />
            <Route path="/dbo-municipio/:id/edit" element={<MunicipiosEdit />} />
            <Route path="/dbo-municipio/:id" element={<MunicipiosShow />} />

            <Route path="/dbo-periodos-academicos" element={<PeriodosAcademicosList />} />
            <Route path="/dbo-periodos-academicos/create" element={<PeriodosAcademicosCreate />} />
            <Route path="/dbo-periodos-academicos/:id/edit" element={<PeriodosAcademicosEdit />} />
            <Route path="/dbo-periodos-academicos/:id" element={<PeriodosAcademicosShow />} />

            <Route path="/reportes" element={<PlaceholderPage />} />

            <Route path="/dbo-contratos" element={<ContratosList />} />
            <Route path="/dbo-contratos/create" element={<ContratosCreate />} />
            <Route path="/dbo-contratos/:id/edit" element={<ContratosEdit />} />
            <Route path="/dbo-contratos/:id" element={<ContratosShow />} />

            <Route path="/dbo-pagos-contratos" element={<PagosContratosList />} />
            <Route path="/dbo-pagos-contratos/create" element={<PagosContratosCreate />} />
            <Route path="/dbo-pagos-contratos/:id/edit" element={<PagosContratosEdit />} />
            <Route path="/dbo-pagos-contratos/:id" element={<PagosContratosShow />} />

            <Route path="/dbo-eventos-nomina" element={<EventosNominaList />} />
            <Route path="/dbo-eventos-nomina/create" element={<EventosNominaCreate />} />
            <Route path="/dbo-eventos-nomina/:id/edit" element={<EventosNominaEdit />} />
            <Route path="/dbo-eventos-nomina/:id" element={<EventosNominaShow />} />

            <Route path="*" element={<RefineAiErrorComponent />} />
          </Route>
        </Routes>
        <Toaster />
        <UnsavedChangesNotifier />
      </Refine>
    </BrowserRouter>
  );
};

export default App;
