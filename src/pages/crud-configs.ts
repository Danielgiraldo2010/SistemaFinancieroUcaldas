import type { CrudResourceConfig } from "@/components/refine-ui/crud/resource-crud";

const text = (key: string, label: string, required = true, extra: Partial<CrudResourceConfig["fields"][number]> = {}) => ({
  key,
  label,
  type: "text" as const,
  required,
  ...extra,
});

const textarea = (key: string, label: string, required = true, extra: Partial<CrudResourceConfig["fields"][number]> = {}) => ({
  key,
  label,
  type: "textarea" as const,
  required,
  ...extra,
});

const number = (key: string, label: string, required = true, extra: Partial<CrudResourceConfig["fields"][number]> = {}) => ({
  key,
  label,
  type: "number" as const,
  required,
  ...extra,
});

const datetime = (key: string, label: string, required = true, extra: Partial<CrudResourceConfig["fields"][number]> = {}) => ({
  key,
  label,
  type: "datetime" as const,
  required,
  ...extra,
});

const bool = (key: string, label: string, required = false, extra: Partial<CrudResourceConfig["fields"][number]> = {}) => ({
  key,
  label,
  type: "boolean" as const,
  required,
  ...extra,
});

export const cdpConfig: CrudResourceConfig = {
  resource: "dbo-cdp",
  title: "CDP",
  singularTitle: "CDP",
  primaryField: "numero",
  fields: [
    text("numero", "Número"),
    datetime("fechaExpedicion", "Fecha de expedición"),
    {
      key: "vigencia",
      label: "Vigencia",
      type: "select",
      required: true,
      optionResource: "dbo-cierre-vigencia",
      optionLabelKey: "vigencia",
      optionValueKey: "vigencia",
      selectValueType: "number",
    },
    {
      key: "unidadEjecutoraId",
      label: "Unidad ejecutora",
      type: "select",
      required: true,
      optionResource: "dbo-unidades-ejecutoras",
      optionLabelKey: "nombre",
      optionValueKey: "id",
      selectValueType: "number",
    },
    {
      key: "rubroGastoId",
      label: "Rubro gasto",
      type: "select",
      required: true,
      optionResource: "dbo-rubros-gasto",
      optionLabelKey: "nombre",
      optionValueKey: "id",
      selectValueType: "number",
    },
    {
      key: "fuenteRecursoId",
      label: "Fuente recurso",
      type: "select",
      required: true,
      optionResource: "dbo-fuentes-recursos",
      optionLabelKey: "nombre",
      optionValueKey: "id",
      selectValueType: "number",
    },
    {
      key: "valorSolicitado",
      label: "Valor solicitado",
      type: "select",
      required: false,
      optionResource: "dbo-cdp",
      optionLabelKey: "valorSolicitado",
      optionValueKey: "valorSolicitado",
      selectValueType: "number",
    },
    {
      key: "valorAprobado",
      label: "Valor aprobado",
      type: "select",
      required: true,
      optionResource: "dbo-cdp",
      optionLabelKey: "valorAprobado",
      optionValueKey: "valorAprobado",
      selectValueType: "number",
    },
    {
      key: "valorComprometidoRp",
      label: "Valor comprometido RP",
      type: "select",
      required: false,
      optionResource: "dbo-cdp",
      optionLabelKey: "valorComprometidoRp",
      optionValueKey: "valorComprometidoRp",
      selectValueType: "number",
    },
    {
      key: "valorReintegrado",
      label: "Valor reintegrado",
      type: "select",
      required: false,
      optionResource: "dbo-cdp",
      optionLabelKey: "valorReintegrado",
      optionValueKey: "valorReintegrado",
      selectValueType: "number",
    },
    text("estado", "Estado", false),
    text("beneficiario", "Beneficiario", false),
    textarea("descripcion", "Descripción", false),
    text("urlDocumento", "URL documento", false),
    textarea("objeto", "Objeto", false),
  ],
  listFields: ["numero", "vigencia", "fechaExpedicion", "unidadEjecutoraId", "valorAprobado", "estado"],
};

export const alertasPresupuestalesConfig: CrudResourceConfig = {
  resource: "dbo-alertas-presupuestales",
  title: "Alertas Presupuestales",
  singularTitle: "Alerta Presupuestal",
  primaryField: "vigencia",
  fields: [
    number("vigencia", "Vigencia"),
    number("rubroGastoId", "Rubro gasto"),
    number("umbralAlerta", "Umbral alerta"),
    textarea("mensaje", "Mensaje"),
    datetime("fechaAlerta", "Fecha de alerta", false),
    text("estado", "Estado", false),
    text("destinatario", "Destinatario", false),
    number("unidadEjecutoraId", "Unidad ejecutora", false),
  ],
  listFields: ["vigencia", "rubroGastoId", "umbralAlerta", "estado", "unidadEjecutoraId", "fechaAlerta"],
};

export const avancesLegalizacionesConfig: CrudResourceConfig = {
  resource: "dbo-avances-legalizaciones",
  title: "Avances y Legalizaciones",
  singularTitle: "Avance y Legalización",
  primaryField: "numero",
  fields: [
    text("numero", "Número"),
    text("tipo", "Tipo"),
    number("vigencia", "Vigencia"),
    number("unidadEjecutoraId", "Unidad ejecutora"),
    text("beneficiario", "Beneficiario"),
    text("nitCedula", "NIT / Cédula", false),
    text("concepto", "Concepto"),
    number("rubroGastoId", "Rubro gasto"),
    number("fuenteRecursoId", "Fuente recurso"),
    number("cdpId", "CDP", false),
    number("valorAvance", "Valor avance"),
    number("valorLegalizado", "Valor legalizado"),
    datetime("fechaAvance", "Fecha avance", false),
    datetime("fechaLimiteLegal", "Fecha límite legal", false),
    datetime("fechaLegalizacion", "Fecha legalización", false),
    text("estado", "Estado"),
    text("urlDocumentoAvance", "URL documento avance", false),
    text("urlDocumentoLegalizacion", "URL documento legalización", false),
    textarea("observaciones", "Observaciones", false),
  ],
  listFields: ["numero", "tipo", "vigencia", "unidadEjecutoraId", "beneficiario", "valorAvance", "valorLegalizado", "estado"],
};

export const cierreVigenciaConfig: CrudResourceConfig = {
  resource: "dbo-cierre-vigencia",
  title: "Cierre de Vigencia",
  singularTitle: "Cierre de Vigencia",
  primaryField: "vigencia",
  fields: [
    number("vigencia", "Vigencia"),
    number("unidadEjecutoraId", "Unidad ejecutora"),
    datetime("fechaCierre", "Fecha cierre"),
    number("totalIngresosApropiados", "Ingresos apropiados"),
    number("totalIngresosRecaudados", "Ingresos recaudados"),
    number("totalGastosApropiados", "Gastos apropiados"),
    number("totalGastosComprometidos", "Gastos comprometidos"),
    number("totalGastosPagados", "Gastos pagados"),
    text("estado", "Estado"),
    text("usuarioCierre", "Usuario cierre", false),
    textarea("observaciones", "Observaciones", false),
    text("urlActaCierre", "URL acta cierre", false),
  ],
  listFields: ["vigencia", "unidadEjecutoraId", "fechaCierre", "totalGastosComprometidos", "totalGastosPagados", "estado"],
};

export const agendaEventosConfig: CrudResourceConfig = {
  resource: "dbo-agenda-eventos",
  title: "Eventos",
  singularTitle: "Evento",
  primaryField: "titulo",
  fields: [
    text("titulo", "Título"),
    textarea("descripcion", "Descripción", false),
    text("tipo", "Tipo"),
    text("prioridad", "Prioridad"),
    number("unidadEjecutoraId", "Unidad ejecutora", false),
    datetime("fechaInicio", "Fecha inicio"),
    datetime("fechaFin", "Fecha fin", false),
    datetime("fechaLimite", "Fecha límite", false),
    bool("esRecurrente", "Es recurrente"),
    text("patronRecurrencia", "Patrón recurrencia", false),
    text("entidadOrigenTipo", "Entidad origen tipo", false),
    number("entidadOrigenId", "Entidad origen id", false),
    text("estado", "Estado"),
    text("creadoPor", "Creado por", false),
  ],
  listFields: ["titulo", "tipo", "prioridad", "unidadEjecutoraId", "fechaInicio", "estado"],
};

export const contratosConfig: CrudResourceConfig = {
  resource: "dbo-contratos",
  title: "Contratos",
  singularTitle: "Contrato",
  primaryField: "numeroContrato",
  fields: [
    text("numeroContrato", "Número contrato"),
    datetime("fechaInicio", "Fecha inicio"),
    datetime("fechaFin", "Fecha fin"),
    text("contratista", "Contratista"),
    text("nitCedula", "NIT / Cédula"),
    textarea("objetoContrato", "Objeto contrato"),
    number("valorTotal", "Valor total"),
    number("unidadEjecutoraId", "Unidad ejecutora"),
    number("rubroGastoId", "Rubro gasto"),
    number("fuenteRecursoId", "Fuente recurso"),
    number("cdpId", "CDP", false),
    number("registroPresupuestalId", "Registro presupuestal", false),
    text("estado", "Estado", false),
    text("supervisor", "Supervisor", false),
    text("urlDocumento", "URL documento", false),
    text("urlOtrosDocumentos", "Otros documentos", false),
    number("proyectoEspecialId", "Proyecto especial", false),
  ],
  listFields: ["numeroContrato", "contratista", "valorTotal", "unidadEjecutoraId", "fechaInicio", "estado"],
};

export const eventosNominaConfig: CrudResourceConfig = {
  resource: "dbo-eventos-nomina",
  title: "Eventos de Nómina",
  singularTitle: "Evento de Nómina",
  primaryField: "id",
  fields: [
    number("empleadoId", "Empleado"),
    number("vigencia", "Vigencia"),
    number("mes", "Mes"),
    text("tipoEvento", "Tipo evento"),
    number("conceptoId", "Concepto"),
    number("valor", "Valor"),
    number("cantidadHoras", "Cantidad horas", false),
    textarea("descripcion", "Descripción", false),
    datetime("fechaRegistro", "Fecha registro", false),
    text("estado", "Estado", false),
  ],
  listFields: ["empleadoId", "vigencia", "mes", "tipoEvento", "valor", "estado"],
};

export const empleadosConfig: CrudResourceConfig = {
  resource: "dbo-empleados",
  title: "Empleados",
  singularTitle: "Empleado",
  primaryField: "numeroIdentificacion",
  fields: [
    text("tipoIdentificacion", "Tipo identificación"),
    text("numeroIdentificacion", "Número identificación"),
    text("primerNombre", "Primer nombre"),
    text("segundoNombre", "Segundo nombre", false),
    text("primerApellido", "Primer apellido"),
    text("segundoApellido", "Segundo apellido", false),
    text("email", "Email", false),
    text("telefono", "Teléfono", false),
    text("direccion", "Dirección", false),
    datetime("fechaNacimiento", "Fecha nacimiento", false),
    datetime("fechaIngreso", "Fecha ingreso"),
    datetime("fechaRetiro", "Fecha retiro", false),
    text("tipoEmpleado", "Tipo empleado"),
    text("cargo", "Cargo"),
    number("salarioBaseMensual", "Salario base mensual"),
    number("programaAcademicoId", "Programa académico", false),
    number("unidadEjecutoraId", "Unidad ejecutora"),
    text("estado", "Estado", false),
    text("urlContrato", "URL contrato", false),
    text("categoriaDocente", "Categoría docente", false),
  ],
  listFields: ["numeroIdentificacion", "primerNombre", "primerApellido", "tipoEmpleado", "cargo", "unidadEjecutoraId", "estado"],
};

export const conceptosNominaConfig: CrudResourceConfig = {
  resource: "dbo-conceptos-nomina",
  title: "Conceptos de Nómina",
  singularTitle: "Concepto de Nómina",
  primaryField: "codigo",
  fields: [
    text("codigo", "Código"),
    text("nombre", "Nombre"),
    text("tipo", "Tipo"),
    number("rubroGastoId", "Rubro gasto"),
    bool("esFactorSalarial", "Es factor salarial", false),
    number("porcentajeAplicacion", "Porcentaje aplicación", false),
    textarea("formulaCalculo", "Fórmula cálculo", false),
    number("orden", "Orden", false),
    text("estado", "Estado", false),
  ],
  listFields: ["codigo", "nombre", "tipo", "rubroGastoId", "esFactorSalarial", "estado"],
};

export const eventosSeguimientoConfig: CrudResourceConfig = {
  resource: "dbo-eventos-seguimiento",
  title: "Eventos de Seguimiento",
  singularTitle: "Evento de Seguimiento",
  primaryField: "titulo",
  fields: [
    text("entidadTipo", "Entidad tipo"),
    number("entidadId", "Entidad id"),
    text("eventoTipo", "Evento tipo"),
    text("titulo", "Título"),
    textarea("descripcion", "Descripción", false),
    datetime("fechaEvento", "Fecha evento", false),
    text("usuario", "Usuario", false),
    datetime("fechaLimite", "Fecha límite", false),
    datetime("fechaRecordatorio", "Fecha recordatorio", false),
    bool("recordatorioEnviado", "Recordatorio enviado", false),
    text("urlDocumento", "URL documento", false),
    text("estado", "Estado", false),
    number("unidadEjecutoraId", "Unidad ejecutora", false),
  ],
  listFields: ["entidadTipo", "eventoTipo", "titulo", "fechaEvento", "estado", "unidadEjecutoraId"],
};

export const pagosContratosConfig: CrudResourceConfig = {
  resource: "dbo-pagos-contratos",
  title: "Pagos de Contratos",
  singularTitle: "Pago de Contrato",
  primaryField: "numeroPago",
  fields: [
    number("contratoId", "Contrato"),
    number("numeroPago", "Número pago"),
    datetime("fechaPago", "Fecha pago"),
    number("valor", "Valor"),
    number("ordenPagoId", "Orden de pago", false),
    text("comprobante", "Comprobante", false),
    text("urlSoporte", "URL soporte", false),
    textarea("observaciones", "Observaciones", false),
  ],
  listFields: ["contratoId", "numeroPago", "fechaPago", "valor", "ordenPagoId"],
};

export const adminUsersConfig = {
  resource: "identity-users",
  title: "Usuarios",
  singularTitle: "Usuario",
} as const;

export const adminRolesConfig = {
  resource: "identity-roles",
  title: "Roles",
  singularTitle: "Rol",
} as const;

export const programasAcademicosConfig: CrudResourceConfig = {
  resource: "dbo-programas-academicos",
  title: "Programas Académicos",
  singularTitle: "Programa Académico",
  primaryField: "codigo",
  fields: [
    text("codigo", "Código"),
    text("nombre", "Nombre"),
    text("nivel", "Nivel"),
    number("facultadId", "Facultad", false),
    text("estado", "Estado", false),
  ],
  listFields: ["codigo", "nombre", "nivel", "facultadId", "estado"],
};

export const estudiantesConfig: CrudResourceConfig = {
  resource: "dbo-estudiante",
  title: "Estudiantes",
  singularTitle: "Estudiante",
  primaryField: "nombre",
  fields: [
    text("nombre", "Nombre"),
    text("apellidos", "Apellidos"),
    number("cohorteAnio", "Cohorte año"),
    number("cohortePeriodo", "Cohorte periodo"),
    number("codigoMunicipio", "Código municipio"),
    number("codigoProyecto", "Código proyecto"),
    number("valorDerechosAcademicos", "Valor derechos académicos"),
    number("programaNormalizadoId", "Programa normalizado", false),
  ],
  listFields: ["nombre", "apellidos", "cohorteAnio", "cohortePeriodo", "codigoMunicipio", "programaNormalizadoId"],
};

export const becasPosgradoConfig: CrudResourceConfig = {
  resource: "dbo-becas-posgrado",
  title: "Becas Posgrado",
  singularTitle: "Beca Posgrado",
  primaryField: "tipoBeca",
  fields: [
    number("vigencia", "Vigencia"),
    text("convocatoriaMinciencias", "Convocatoria Minciencias"),
    text("tipoBeca", "Tipo beca"),
    number("programaAcademicoId", "Programa académico"),
    number("unidadEjecutoraId", "Unidad ejecutora"),
    number("numBeneficiarios", "Número beneficiarios"),
    number("valorPorBeca", "Valor por beca"),
    bool("vicerrectoriaDetermina", "Vicerrectoría determina"),
    datetime("fechaResolucionMinisterio", "Fecha resolución ministerio", false),
    datetime("fechaGiroMinisterio", "Fecha giro ministerio", false),
    datetime("fechaTransferenciaUe", "Fecha transferencia UE", false),
    text("estado", "Estado"),
    text("urlResolucion", "URL resolución", false),
  ],
  listFields: ["vigencia", "tipoBeca", "programaAcademicoId", "unidadEjecutoraId", "numBeneficiarios", "valorPorBeca", "estado"],
};

export const apoyosMatriculaConfig: CrudResourceConfig = {
  resource: "dbo-apoyos-matricula",
  title: "Tipos de Apoyo",
  singularTitle: "Tipo de Apoyo",
  primaryField: "codigo",
  fields: [
    text("codigo", "Código"),
    text("nombre", "Nombre"),
    text("tipo", "Tipo"),
    number("rubroIngresoId", "Rubro ingreso"),
  ],
  listFields: ["codigo", "nombre", "tipo", "rubroIngresoId"],
};

export const apoyoMatriculaConfig: CrudResourceConfig = {
  resource: "dbo-apoyomatricula",
  title: "Apoyos de Matrícula",
  singularTitle: "Apoyo de Matrícula",
  primaryField: "nombre",
  fields: [
    text("nombre", "Nombre"),
    text("convenio", "Convenio", false),
    textarea("descripcion", "Descripción", false),
    number("apoyoNormalizadoId", "Apoyo normalizado", false),
  ],
  listFields: ["nombre", "convenio", "apoyoNormalizadoId"],
};

export const periodosAcademicosConfig: CrudResourceConfig = {
  resource: "dbo-periodos-academicos",
  title: "Períodos Académicos",
  singularTitle: "Período Académico",
  primaryField: "nombre",
  fields: [
    number("vigencia", "Vigencia"),
    number("periodo", "Período"),
    text("nombre", "Nombre"),
    datetime("fechaInicio", "Fecha inicio"),
    datetime("fechaFin", "Fecha fin"),
    text("estado", "Estado"),
  ],
  listFields: ["vigencia", "periodo", "nombre", "fechaInicio", "fechaFin", "estado"],
};

export const tiposProyectoConfig: CrudResourceConfig = {
  resource: "dbo-tipos-proyecto",
  title: "Tipos de Proyecto",
  singularTitle: "Tipo de Proyecto",
  primaryField: "codigo",
  fields: [
    text("codigo", "Código"),
    text("nombre", "Nombre"),
    textarea("descripcion", "Descripción", false),
    bool("requiereProgramaAcademico", "Requiere programa académico"),
    bool("habilitaMatriculas", "Habilita matrículas"),
    bool("habilitaNominaCatedratico", "Habilita nómina catedrático"),
    bool("habilitaSar", "Habilita SAR"),
    text("estado", "Estado"),
  ],
  listFields: ["codigo", "nombre", "requiereProgramaAcademico", "habilitaMatriculas", "habilitaSar", "estado"],
};

export const proyectosEspecialesConfig: CrudResourceConfig = {
  resource: "dbo-proyectos-especiales",
  title: "Proyectos Especiales",
  singularTitle: "Proyecto Especial",
  primaryField: "codigo",
  fields: [
    text("codigo", "Código"),
    text("nombre", "Nombre"),
    {
      key: "unidadEjecutoraId",
      label: "Unidad ejecutora",
      type: "select",
      required: true,
      optionResource: "dbo-unidades-ejecutoras",
      optionLabelKey: "nombre",
      optionValueKey: "id",
      selectValueType: "number",
    },
    number("valorTotal", "Valor total"),
    datetime("fechaInicio", "Fecha inicio"),
    datetime("fechaFin", "Fecha fin"),
    text("estado", "Estado"),
    {
      key: "tipoProyectoId",
      label: "Tipo proyecto",
      type: "select",
      required: true,
      optionResource: "dbo-tipos-proyecto",
      optionLabelKey: "nombre",
      optionValueKey: "id",
      selectValueType: "number",
    },
    {
      key: "programaAcademicoId",
      label: "Programa académico",
      type: "select",
      required: true,
      optionResource: "dbo-programas-academicos",
      optionLabelKey: "nombre",
      optionValueKey: "id",
      selectValueType: "number",
    },
    {
      key: "estadoPresupuesto",
      label: "Estado presupuesto",
      type: "select",
      required: true,
      options: [
        { label: "Pendiente", value: "PENDIENTE" },
        { label: "Aprobado", value: "APROBADO" },
        { label: "En ejecución", value: "EN_EJECUCION" },
        { label: "Cerrado", value: "CERRADO" },
      ],
    },
    {
      key: "vigenciaActiva",
      label: "Vigencia activa",
      type: "select",
      required: true,
      optionResource: "dbo-periodos-academicos",
      optionLabelKey: "nombre",
      optionValueKey: "vigencia",
      selectValueType: "number",
    },
  ],
  listFields: ["codigo", "nombre", "unidadEjecutoraId", "valorTotal", "estado", "estadoPresupuesto"],
};

export const carteraFacturasConfig: CrudResourceConfig = {
  resource: "dbo-cartera-facturas",
  title: "Cartera de Facturas",
  singularTitle: "Factura de Cartera",
  primaryField: "numeroFactura",
  fields: [
    text("numeroFactura", "Número factura"),
    datetime("fechaFactura", "Fecha factura"),
    datetime("fechaVencimiento", "Fecha vencimiento"),
    number("vigencia", "Vigencia"),
    number("unidadEjecutoraId", "Unidad ejecutora"),
    number("proyectoEspecialId", "Proyecto especial", false),
    number("contratoId", "Contrato", false),
    text("clienteNombre", "Cliente"),
    text("clienteNit", "NIT cliente", false),
    textarea("concepto", "Concepto"),
    number("rubroIngresoId", "Rubro ingreso"),
    number("valorFactura", "Valor factura"),
    number("valorPagado", "Valor pagado"),
    text("estado", "Estado"),
    text("urlDocumento", "URL documento", false),
    textarea("observaciones", "Observaciones", false),
  ],
  listFields: ["numeroFactura", "fechaFactura", "vigencia", "unidadEjecutoraId", "clienteNombre", "valorFactura", "estado"],
};

export const agendaAsignacionesConfig: CrudResourceConfig = {
  resource: "dbo-agenda-asignaciones",
  title: "Asignaciones",
  singularTitle: "Asignación",
  primaryField: "eventoId",
  fields: [
    {
      key: "eventoId",
      label: "Evento",
      type: "select",
      required: true,
      optionResource: "dbo-agenda-eventos",
      optionLabelKey: "titulo",
      optionValueKey: "id",
      selectValueType: "number",
    },
    {
      key: "usuarioId",
      label: "Usuario",
      type: "select",
      required: false,
      optionResource: "identity-users",
      optionLabelKey: "fullName",
      optionValueKey: "id",
      selectValueType: "string",
    },
    text("rolDestino", "Rol destino", false),
    bool("notificado", "Notificado", false),
    datetime("fechaNotif", "Fecha notificación", false),
    bool("visto", "Visto", false),
    datetime("fechaVisto", "Fecha visto", false),
  ],
  listFields: ["eventoId", "usuarioId", "rolDestino", "notificado", "visto"],
};

export const fuentesRecursosConfig: CrudResourceConfig = {
  resource: "dbo-fuentes-recursos",
  title: "Fuentes de Recursos",
  singularTitle: "Fuente de Recurso",
  primaryField: "codigo",
  fields: [
    text("codigo", "Código"),
    text("nombre", "Nombre"),
    text("estado", "Estado", false),
  ],
  listFields: ["codigo", "nombre", "estado"],
};

export const rubrosGastoConfig: CrudResourceConfig = {
  resource: "dbo-rubros-gasto",
  title: "Rubros de Gasto",
  singularTitle: "Rubro de Gasto",
  primaryField: "codigoCcp",
  fields: [
    text("codigoCcp", "Código CCP"),
    text("nombre", "Nombre"),
    text("tipoGasto", "Tipo gasto"),
    text("clasificacionFunc", "Clasificación funcional"),
    number("estructuraId", "Estructura", false),
    text("estado", "Estado", false),
  ],
  listFields: ["codigoCcp", "nombre", "tipoGasto", "clasificacionFunc", "estructuraId", "estado"],
};

export const rubrosIngresoConfig: CrudResourceConfig = {
  resource: "dbo-rubros-ingreso",
  title: "Rubros de Ingreso",
  singularTitle: "Rubro de Ingreso",
  primaryField: "codigoCicp",
  fields: [
    text("codigoCicp", "Código CICP"),
    text("nombre", "Nombre"),
    text("categoria", "Categoría", false),
    text("subcategoria", "Subcategoría", false),
    number("nivelDetalle", "Nivel detalle", false),
    number("estructuraId", "Estructura", false),
    text("estado", "Estado", false),
  ],
  listFields: ["codigoCicp", "nombre", "categoria", "subcategoria", "nivelDetalle", "estructuraId", "estado"],
};

export const municipiosConfig: CrudResourceConfig = {
  resource: "dbo-municipio",
  title: "Municipios",
  singularTitle: "Municipio",
  primaryField: "codigo",
  fields: [
    text("codigo", "Código"),
    text("nombre", "Nombre"),
    text("departamento", "Departamento", false),
    text("estado", "Estado", false),
  ],
  listFields: ["codigo", "nombre", "departamento", "estado"],
};
