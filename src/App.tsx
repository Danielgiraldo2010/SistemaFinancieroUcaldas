import { Refine, Authenticated } from "@refinedev/core";

import routerProvider, { NavigateToResource, UnsavedChangesNotifier } from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { RefineAiErrorComponent } from "@/components/catch-all";

import { useNotificationProvider } from "@/components/refine-ui/notification/use-notification-provider";

import { Toaster } from "@/components/refine-ui/notification/toaster";

import { Layout } from "@/components/refine-ui/layout/layout";

import { SignInForm } from "@/components/refine-ui/form/sign-in-from";
import { SignUpForm } from "@/components/refine-ui/form/sign-up-from";

import { dataProvider } from "@/providers/data";
import { authProvider } from "@/providers/auth";
import { APP_NAME } from "@/providers/constants";

import PlaceholderPage from "@/pages/placeholder";
import UnidadesEjectorasList from "@/pages/dbo-unidades-ejecutoras/list";
import { UnidadesEjectorasCreate, UnidadesEjectorasEdit } from "@/pages/dbo-unidades-ejecutoras/form";
import { CdpList, CdpCreate, CdpEdit, CdpShow } from "@/pages/dbo-cdp";
import { AlertasPresupuestalesList, AlertasPresupuestalesCreate, AlertasPresupuestalesEdit, AlertasPresupuestalesShow } from "@/pages/dbo-alertas-presupuestales";
import { AvancesLegalizacionesList, AvancesLegalizacionesCreate, AvancesLegalizacionesEdit, AvancesLegalizacionesShow } from "@/pages/dbo-avances-legalizaciones";
import { CierreVigenciaList, CierreVigenciaCreate, CierreVigenciaEdit, CierreVigenciaShow } from "@/pages/dbo-cierre-vigencia";
import { EmpleadosList, EmpleadosCreate, EmpleadosEdit, EmpleadosShow } from "@/pages/dbo-empleados";
import { ConceptosNominaList, ConceptosNominaCreate, ConceptosNominaEdit, ConceptosNominaShow } from "@/pages/dbo-conceptos-nomina";
import { ProgramasAcademicosList, ProgramasAcademicosCreate, ProgramasAcademicosEdit, ProgramasAcademicosShow } from "@/pages/dbo-programas-academicos";
import { EstudiantesList, EstudiantesCreate, EstudiantesEdit, EstudiantesShow } from "@/pages/dbo-estudiante";
import { BecasPosgradoList, BecasPosgradoCreate, BecasPosgradoEdit, BecasPosgradoShow } from "@/pages/dbo-becas-posgrado";
import { ApoyosMatriculaList, ApoyosMatriculaCreate, ApoyosMatriculaEdit, ApoyosMatriculaShow } from "@/pages/dbo-apoyos-matricula";
import { ApoyoMatriculaList, ApoyoMatriculaCreate, ApoyoMatriculaEdit, ApoyoMatriculaShow } from "@/pages/dbo-apoyomatricula";
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
  BarChart2,
  Users,
  GraduationCap,
  FolderOpen,
  CalendarDays,
  Settings2,
  Shield,
  FileText,
  Bell,
  TrendingUp,
  LockKeyhole,
  UserCircle,
  BookOpen,
  BookUser,
  Award,
  HandCoins,
  Layers,
  Briefcase,
  Receipt,
  CalendarCheck,
  UserCheck,
  Building2,
  Landmark,
  TrendingDown,
  ArrowUpCircle,
  MapPin,
  CalendarRange,
} from "lucide-react";

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
          },
        }}
        resources={[
          // ── ADMINISTRACIÓN GROUP ───────────────────────────
          {
            name: "group-administracion",
            meta: {
              label: "Administración",
              icon: <Shield className="h-4 w-4" />,
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
              icon: <Users className="h-4 w-4" />,
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
              icon: <UserCheck className="h-4 w-4" />,
            },
          },

          // ── PRESUPUESTO GROUP ──────────────────────────────
          {
            name: "group-presupuesto",
            meta: {
              label: "Presupuesto",
              icon: <BarChart2 className="h-4 w-4" />,
              group: true,
            },
          },
          {
            name: "dbo-cdp",
            list: "/dbo-cdp",
            create: "/dbo-cdp/create",
            edit: "/dbo-cdp/:id/edit",
            show: "/dbo-cdp/:id",
            meta: {
              label: "CDP",
              parent: "group-presupuesto",
              icon: <FileText className="h-4 w-4" />,
            },
          },
          {
            name: "dbo-alertas-presupuestales",
            list: "/dbo-alertas-presupuestales",
            create: "/dbo-alertas-presupuestales/create",
            edit: "/dbo-alertas-presupuestales/:id/edit",
            show: "/dbo-alertas-presupuestales/:id",
            meta: {
              label: "Alertas Presupuestales",
              parent: "group-presupuesto",
              icon: <Bell className="h-4 w-4" />,
            },
          },
          {
            name: "dbo-avances-legalizaciones",
            list: "/dbo-avances-legalizaciones",
            create: "/dbo-avances-legalizaciones/create",
            edit: "/dbo-avances-legalizaciones/:id/edit",
            show: "/dbo-avances-legalizaciones/:id",
            meta: {
              label: "Avances y Legalizaciones",
              parent: "group-presupuesto",
              icon: <TrendingUp className="h-4 w-4" />,
            },
          },
          {
            name: "dbo-cierre-vigencia",
            list: "/dbo-cierre-vigencia",
            create: "/dbo-cierre-vigencia/create",
            edit: "/dbo-cierre-vigencia/:id/edit",
            show: "/dbo-cierre-vigencia/:id",
            meta: {
              label: "Cierre de Vigencia",
              parent: "group-presupuesto",
              icon: <LockKeyhole className="h-4 w-4" />,
            },
          },

          // ── NÓMINA GROUP ───────────────────────────────────
          {
            name: "group-nomina",
            meta: {
              label: "Nómina",
              icon: <Users className="h-4 w-4" />,
              group: true,
            },
          },
          {
            name: "dbo-empleados",
            list: "/dbo-empleados",
            create: "/dbo-empleados/create",
            edit: "/dbo-empleados/:id/edit",
            show: "/dbo-empleados/:id",
            meta: {
              label: "Empleados",
              parent: "group-nomina",
              icon: <UserCircle className="h-4 w-4" />,
            },
          },
          {
            name: "dbo-conceptos-nomina",
            list: "/dbo-conceptos-nomina",
            create: "/dbo-conceptos-nomina/create",
            edit: "/dbo-conceptos-nomina/:id/edit",
            show: "/dbo-conceptos-nomina/:id",
            meta: {
              label: "Conceptos de Nómina",
              parent: "group-nomina",
              icon: <BookOpen className="h-4 w-4" />,
            },
          },
          {
            name: "dbo-eventos-nomina",
            list: "/dbo-eventos-nomina",
            create: "/dbo-eventos-nomina/create",
            edit: "/dbo-eventos-nomina/:id/edit",
            show: "/dbo-eventos-nomina/:id",
            meta: {
              label: "Eventos de Nómina",
              parent: "group-nomina",
              icon: <CalendarCheck className="h-4 w-4" />,
            },
          },

          // ── ACADÉMICO GROUP ────────────────────────────────
          {
            name: "group-academico",
            meta: {
              label: "Académico",
              icon: <GraduationCap className="h-4 w-4" />,
              group: true,
            },
          },
          {
            name: "dbo-programas-academicos",
            list: "/dbo-programas-academicos",
            create: "/dbo-programas-academicos/create",
            edit: "/dbo-programas-academicos/:id/edit",
            show: "/dbo-programas-academicos/:id",
            meta: {
              label: "Programas Académicos",
              parent: "group-academico",
              icon: <BookUser className="h-4 w-4" />,
            },
          },
          {
            name: "dbo-estudiante",
            list: "/dbo-estudiante",
            create: "/dbo-estudiante/create",
            edit: "/dbo-estudiante/:id/edit",
            show: "/dbo-estudiante/:id",
            meta: {
              label: "Estudiantes",
              parent: "group-academico",
              icon: <GraduationCap className="h-4 w-4" />,
            },
          },
          {
            name: "dbo-becas-posgrado",
            list: "/dbo-becas-posgrado",
            create: "/dbo-becas-posgrado/create",
            edit: "/dbo-becas-posgrado/:id/edit",
            show: "/dbo-becas-posgrado/:id",
            meta: {
              label: "Becas Posgrado",
              parent: "group-academico",
              icon: <Award className="h-4 w-4" />,
            },
          },
          {
            name: "dbo-apoyos-matricula",
            list: "/dbo-apoyos-matricula",
            create: "/dbo-apoyos-matricula/create",
            edit: "/dbo-apoyos-matricula/:id/edit",
            show: "/dbo-apoyos-matricula/:id",
            meta: {
              label: "Tipos de Apoyo",
              parent: "group-academico",
              icon: <HandCoins className="h-4 w-4" />,
            },
          },
          {
            name: "dbo-apoyomatricula",
            list: "/dbo-apoyomatricula",
            create: "/dbo-apoyomatricula/create",
            edit: "/dbo-apoyomatricula/:id/edit",
            show: "/dbo-apoyomatricula/:id",
            meta: {
              label: "Apoyos de Matrícula",
              parent: "group-academico",
              icon: <HandCoins className="h-4 w-4" />,
            },
          },

          // ── PROYECTOS GROUP ────────────────────────────────
          {
            name: "group-proyectos",
            meta: {
              label: "Proyectos",
              icon: <FolderOpen className="h-4 w-4" />,
              group: true,
            },
          },
          {
            name: "dbo-tipos-proyecto",
            list: "/dbo-tipos-proyecto",
            create: "/dbo-tipos-proyecto/create",
            edit: "/dbo-tipos-proyecto/:id/edit",
            show: "/dbo-tipos-proyecto/:id",
            meta: {
              label: "Tipos de Proyecto",
              parent: "group-proyectos",
              icon: <Layers className="h-4 w-4" />,
            },
          },
          {
            name: "dbo-proyectos-especiales",
            list: "/dbo-proyectos-especiales",
            create: "/dbo-proyectos-especiales/create",
            edit: "/dbo-proyectos-especiales/:id/edit",
            show: "/dbo-proyectos-especiales/:id",
            meta: {
              label: "Proyectos Especiales",
              parent: "group-proyectos",
              icon: <Briefcase className="h-4 w-4" />,
            },
          },
          {
            name: "dbo-cartera-facturas",
            list: "/dbo-cartera-facturas",
            create: "/dbo-cartera-facturas/create",
            edit: "/dbo-cartera-facturas/:id/edit",
            show: "/dbo-cartera-facturas/:id",
            meta: {
              label: "Cartera de Facturas",
              parent: "group-proyectos",
              icon: <Receipt className="h-4 w-4" />,
            },
          },
          {
            name: "group-contratacion",
            meta: {
              label: "Contratación",
              icon: <Briefcase className="h-4 w-4" />,
              group: true,
            },
          },
          {
            name: "dbo-contratos",
            list: "/dbo-contratos",
            create: "/dbo-contratos/create",
            edit: "/dbo-contratos/:id/edit",
            show: "/dbo-contratos/:id",
            meta: {
              label: "Contratos",
              parent: "group-contratacion",
              icon: <Briefcase className="h-4 w-4" />,
            },
          },
          {
            name: "dbo-pagos-contratos",
            list: "/dbo-pagos-contratos",
            create: "/dbo-pagos-contratos/create",
            edit: "/dbo-pagos-contratos/:id/edit",
            show: "/dbo-pagos-contratos/:id",
            meta: {
              label: "Pagos de Contratos",
              parent: "group-contratacion",
              icon: <Receipt className="h-4 w-4" />,
            },
          },

          // ── AGENDA GROUP ───────────────────────────────────
          {
            name: "group-agenda",
            meta: {
              label: "Agenda",
              icon: <CalendarDays className="h-4 w-4" />,
              group: true,
            },
          },
          {
            name: "dbo-agenda-eventos",
            list: "/dbo-agenda-eventos",
            create: "/dbo-agenda-eventos/create",
            edit: "/dbo-agenda-eventos/:id/edit",
            show: "/dbo-agenda-eventos/:id",
            meta: {
              label: "Eventos",
              parent: "group-agenda",
              icon: <CalendarCheck className="h-4 w-4" />,
            },
          },
          {
            name: "dbo-agenda-asignaciones",
            list: "/dbo-agenda-asignaciones",
            create: "/dbo-agenda-asignaciones/create",
            edit: "/dbo-agenda-asignaciones/:id/edit",
            show: "/dbo-agenda-asignaciones/:id",
            meta: {
              label: "Asignaciones",
              parent: "group-agenda",
              icon: <UserCheck className="h-4 w-4" />,
            },
          },
          {
            name: "dbo-eventos-seguimiento",
            list: "/dbo-eventos-seguimiento",
            create: "/dbo-eventos-seguimiento/create",
            edit: "/dbo-eventos-seguimiento/:id/edit",
            show: "/dbo-eventos-seguimiento/:id",
            meta: {
              label: "Eventos de Seguimiento",
              parent: "group-agenda",
              icon: <CalendarRange className="h-4 w-4" />,
            },
          },

          // ── CONFIGURACIÓN GROUP ────────────────────────────
          {
            name: "group-configuracion",
            meta: {
              label: "Configuración",
              icon: <Settings2 className="h-4 w-4" />,
              group: true,
            },
          },
          {
            name: "dbo-unidades-ejecutoras",
            list: "/dbo-unidades-ejecutoras",
            create: "/dbo-unidades-ejecutoras/create",
            edit: "/dbo-unidades-ejecutoras/:id/edit",
            show: "/dbo-unidades-ejecutoras/:id",
            meta: {
              label: "Unidades Ejecutoras",
              parent: "group-configuracion",
              icon: <Building2 className="h-4 w-4" />,
            },
          },
          {
            name: "dbo-fuentes-recursos",
            list: "/dbo-fuentes-recursos",
            create: "/dbo-fuentes-recursos/create",
            edit: "/dbo-fuentes-recursos/:id/edit",
            show: "/dbo-fuentes-recursos/:id",
            meta: {
              label: "Fuentes de Recursos",
              parent: "group-configuracion",
              icon: <Landmark className="h-4 w-4" />,
            },
          },
          {
            name: "dbo-rubros-gasto",
            list: "/dbo-rubros-gasto",
            create: "/dbo-rubros-gasto/create",
            edit: "/dbo-rubros-gasto/:id/edit",
            show: "/dbo-rubros-gasto/:id",
            meta: {
              label: "Rubros de Gasto",
              parent: "group-configuracion",
              icon: <TrendingDown className="h-4 w-4" />,
            },
          },
          {
            name: "dbo-rubros-ingreso",
            list: "/dbo-rubros-ingreso",
            create: "/dbo-rubros-ingreso/create",
            edit: "/dbo-rubros-ingreso/:id/edit",
            show: "/dbo-rubros-ingreso/:id",
            meta: {
              label: "Rubros de Ingreso",
              parent: "group-configuracion",
              icon: <ArrowUpCircle className="h-4 w-4" />,
            },
          },
          {
            name: "dbo-municipio",
            list: "/dbo-municipio",
            create: "/dbo-municipio/create",
            edit: "/dbo-municipio/:id/edit",
            show: "/dbo-municipio/:id",
            meta: {
              label: "Municipios",
              parent: "group-configuracion",
              icon: <MapPin className="h-4 w-4" />,
            },
          },
          {
            name: "dbo-periodos-academicos",
            list: "/dbo-periodos-academicos",
            create: "/dbo-periodos-academicos/create",
            edit: "/dbo-periodos-academicos/:id/edit",
            show: "/dbo-periodos-academicos/:id",
            meta: {
              label: "Períodos Académicos",
              parent: "group-academico",
              icon: <CalendarRange className="h-4 w-4" />,
            },
          },
        ]}>
        <Routes>
          {/* Auth routes - redirect to resources if already authenticated */}
          <Route
            element={
              <Authenticated key="auth-pages" fallback={<Outlet />}>
                <NavigateToResource fallbackTo="/" />
              </Authenticated>
            }>
            <Route path="/login" element={<SignInForm />} />
            <Route path="/register" element={<SignUpForm />} />
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
            <Route index element={<NavigateToResource resource="dbo-cdp" fallbackTo="/login" />} />

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

            <Route path="/dbo-apoyos-matricula" element={<ApoyosMatriculaList />} />
            <Route path="/dbo-apoyos-matricula/create" element={<ApoyosMatriculaCreate />} />
            <Route path="/dbo-apoyos-matricula/:id/edit" element={<ApoyosMatriculaEdit />} />
            <Route path="/dbo-apoyos-matricula/:id" element={<ApoyosMatriculaShow />} />

            <Route path="/dbo-apoyomatricula" element={<ApoyoMatriculaList />} />
            <Route path="/dbo-apoyomatricula/create" element={<ApoyoMatriculaCreate />} />
            <Route path="/dbo-apoyomatricula/:id/edit" element={<ApoyoMatriculaEdit />} />
            <Route path="/dbo-apoyomatricula/:id" element={<ApoyoMatriculaShow />} />

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
