export type DboAgendaAsignaciones = {
  id: number;
  eventoId: number;
  usuarioId?: string;
  rolDestino?: string;
  notificado: boolean;
  fechaNotif?: string;
  visto: boolean;
  fechaVisto?: string;
};

export type DboAgendaEventos = {
  id: number;
  titulo: string;
  descripcion?: string;
  tipo: string;
  prioridad: string;
  unidadEjecutoraId?: number;
  fechaInicio: string;
  fechaFin?: string;
  fechaLimite?: string;
  esRecurrente: boolean;
  patronRecurrencia?: string;
  entidadOrigenTipo?: string;
  entidadOrigenId?: number;
  estado: string;
  creadoPor?: string;
};

export type DboAlertasPresupuestales = {
  id: number;
  vigencia: number;
  rubroGastoId: number;
  umbralAlerta: number;
  mensaje: string;
  fechaAlerta?: string;
  estado?: string;
  destinatario?: string;
  unidadEjecutoraId?: number;
};

export type DboApoyoMatricula = {
  id: number;
  nombre: string;
  convenio?: string;
  descripcion?: string;
  apoyoNormalizadoId?: number;
};

export type DboApoyosMatricula = {
  id: number;
  codigo: string;
  nombre: string;
  tipo: string;
  rubroIngresoId: number;
};

export type DboAvancesLegalizaciones = {
  id: number;
  numero: string;
  tipo: string;
  vigencia: number;
  unidadEjecutoraId: number;
  beneficiario: string;
  nitCedula?: string;
  concepto: string;
  rubroGastoId: number;
  fuenteRecursoId: number;
  cdpId?: number;
  valorAvance: number;
  valorLegalizado: number;
  fechaAvance?: string;
  fechaLimiteLegal?: string;
  fechaLegalizacion?: string;
  estado: string;
  urlDocumentoAvance?: string;
  urlDocumentoLegalizacion?: string;
  observaciones?: string;
};

export type DboBecasPosgrado = {
  id: number;
  vigencia: number;
  convocatoriaMinciencias: string;
  tipoBeca: string;
  programaAcademicoId: number;
  unidadEjecutoraId: number;
  numBeneficiarios: number;
  valorPorBeca: number;
  vicerrectoriaDetermina: boolean;
  fechaResolucionMinisterio?: string;
  fechaGiroMinisterio?: string;
  fechaTransferenciaUe?: string;
  estado: string;
  urlResolucion?: string;
};

export type DboCarteraFacturas = {
  id: number;
  numeroFactura: string;
  fechaFactura: string;
  fechaVencimiento: string;
  vigencia: number;
  unidadEjecutoraId: number;
  proyectoEspecialId?: number;
  contratoId?: number;
  clienteNombre: string;
  clienteNit?: string;
  concepto: string;
  rubroIngresoId: number;
  valorFactura: number;
  valorPagado: number;
  estado: string;
  urlDocumento?: string;
  observaciones?: string;
};

export type DboCdp = {
  id: number;
  numero: string;
  fechaExpedicion: string;
  vigencia: number;
  unidadEjecutoraId: number;
  rubroGastoId: number;
  fuenteRecursoId: number;
  valorSolicitado?: number;
  valorAprobado: number;
  valorComprometidoRp?: number;
  valorReintegrado: number;
  estado?: string;
  beneficiario?: string;
  descripcion?: string;
  urlDocumento?: string;
  objeto?: string;
};

export type DboCierreVigencia = {
  id: number;
  vigencia: number;
  unidadEjecutoraId: number;
  fechaCierre: string;
  totalIngresosApropiados: number;
  totalIngresosRecaudados: number;
  totalGastosApropiados: number;
  totalGastosComprometidos: number;
  totalGastosPagados: number;
  estado: string;
  usuarioCierre?: string;
  observaciones?: string;
  urlActaCierre?: string;
};

export type DboConceptosNomina = {
  id: number;
  codigo: string;
  nombre: string;
  tipo: string;
  rubroGastoId: number;
  esFactorSalarial?: boolean;
  porcentajeAplicacion?: number;
  formulaCalculo?: string;
  orden?: number;
  estado?: string;
};

export type DboEmpleados = {
  id: number;
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  email?: string;
  telefono?: string;
  direccion?: string;
  fechaNacimiento?: string;
  fechaIngreso: string;
  fechaRetiro?: string;
  tipoEmpleado: string;
  cargo: string;
  salarioBaseMensual: number;
  programaAcademicoId?: number;
  unidadEjecutoraId: number;
  estado?: string;
  urlContrato?: string;
  categoriaDocente?: string;
};

export type DboEstudiante = {
  id: number;
  nombre: string;
  apellidos: string;
  cohorteAnio: number;
  cohortePeriodo: number;
  codigoMunicipio: number;
  codigoProyecto: number;
  valorDerechosAcademicos: number;
  programaNormalizadoId?: number;
};

export type DboFuentasRecursos = {
  id: number;
  codigo: string;
  nombre: string;
  tipo: string;
  descripcion?: string;
};

export type DboMunicipio = {
  id: number;
  nombreMunicipio: string;
  departamento: string;
};

export type DboPeriodosAcademicos = {
  id: number;
  vigencia: number;
  periodo: number;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  estado?: string;
};

export type DboProgramasAcademicos = {
  id: number;
  codigo: string;
  nombre: string;
  nivel: string;
  facultadId?: number;
  estado?: string;
};

export type DboProyectosEspeciales = {
  id: number;
  codigo: string;
  nombre: string;
  unidadEjecutoraId: number;
  valorTotal: number;
  fechaInicio?: string;
  fechaFin?: string;
  estado?: string;
  tipoProyectoId?: number;
  programaAcademicoId?: number;
  estadoPresupuesto: string;
  vigenciaActiva?: number;
};

export type DboTiposProyecto = {
  id: number;
  codigo: string;
  nombre: string;
  descripcion?: string;
  requiereProgramaAcademico: boolean;
  habilitaMatriculas: boolean;
  habilitaNominaCatedratico: boolean;
  habilitaSar: boolean;
  estado: string;
};

export type DboRubrosGasto = {
  id: number;
  codigoCcp: string;
  nombre: string;
  tipoGasto: string;
  clasificacionFunc: string;
  estructuraId?: number;
  estado?: string;
};

export type DboRubrosIngreso = {
  id: number;
  codigoCicp: string;
  nombre: string;
  categoria?: string;
  subcategoria?: string;
  nivelDetalle?: number;
  estructuraId?: number;
  estado?: string;
};

export type DboUnidadesEjecutoras = {
  id: number;
  codigo: string;
  nombre: string;
  nivel: number;
  padreId?: number;
  estado?: string;
};

export type LoginDto = {
  email: string;
  password: string;
  twoFactorCode?: string;
  twoFactorRecoveryCode?: string;
};

export type LoginResponse = {
  tokenType?: string;
  accessToken?: string;
  expiresIn?: number;
  refreshToken?: string;
};

export type GetIdentityResponse = {
  id?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  avatar?: string;
  email?: string;
  isEmailConfirmed?: boolean;
};

export type RegisterDto = {
  email: string;
  password: string;
};

export type RegisterResponse = Record<string, unknown>;

export type RefreshTokenDto = {
  refreshToken: string;
};

export type RefreshTokenResponse = {
  tokenType?: string;
  accessToken?: string;
  expiresIn?: number;
  refreshToken?: string;
};

export type ForgotPasswordDto = {
  email: string;
};

export type ForgotPasswordResponse = Record<string, unknown>;

export type CreateDboAgendaAsignacionesDto = {
  eventoId: number;
  usuarioId?: string;
  rolDestino?: string;
  notificado: boolean;
  fechaNotif?: string;
  visto: boolean;
  fechaVisto?: string;
};

export type UpdateDboAgendaAsignacionesDto = {
  eventoId: number;
  usuarioId?: string;
  rolDestino?: string;
  notificado: boolean;
  fechaNotif?: string;
  visto: boolean;
  fechaVisto?: string;
};

export type CreateDboAgendaEventosDto = {
  titulo: string;
  tipo: string;
  prioridad: string;
  fechaInicio: string;
  esRecurrente: boolean;
  estado: string;
  creadoPor: string;
  descripcion?: string;
  unidadEjecutoraId?: number;
  fechaFin?: string;
  fechaLimite?: string;
  patronRecurrencia?: string;
  entidadOrigenTipo?: string;
  entidadOrigenId?: number;
};

export type UpdateDboAgendaEventosDto = {
  titulo: string;
  tipo: string;
  prioridad: string;
  fechaInicio: string;
  esRecurrente: boolean;
  estado: string;
  creadoPor: string;
  descripcion?: string;
  unidadEjecutoraId?: number;
  fechaFin?: string;
  fechaLimite?: string;
  patronRecurrencia?: string;
  entidadOrigenTipo?: string;
  entidadOrigenId?: number;
};

export type CreateDboAlertasPresupuestalesDto = {
  vigencia: number;
  rubroGastoId: number;
  umbralAlerta: number;
  mensaje: string;
  fechaAlerta?: string;
  estado?: string;
  destinatario?: string;
  unidadEjecutoraId?: number;
};

export type UpdateDboAlertasPresupuestalesDto = {
  vigencia: number;
  rubroGastoId: number;
  umbralAlerta: number;
  mensaje: string;
  fechaAlerta?: string;
  estado?: string;
  destinatario?: string;
  unidadEjecutoraId?: number;
};

export type CreateDboApoyoMatriculaDto = {
  nombre: string;
  apoyoNormalizadoId: number;
  convenio?: string;
  descripcion?: string;
};

export type UpdateDboApoyoMatriculaDto = {
  nombre: string;
  apoyoNormalizadoId: number;
  convenio?: string;
  descripcion?: string;
};

export type CreateDboApoyosMatriculaDto = {
  codigo: string;
  nombre: string;
  tipo: string;
  rubroIngresoId: number;
};

export type UpdateDboApoyosMatriculaDto = {
  codigo: string;
  nombre: string;
  tipo: string;
  rubroIngresoId: number;
};

export type CreateDboAvancesLegalizacionesDto = {
  numero: string;
  tipo: string;
  vigencia: number;
  unidadEjecutoraId: number;
  beneficiario: string;
  concepto: string;
  rubroGastoId: number;
  fuenteRecursoId: number;
  valorAvance: number;
  valorLegalizado: number;
  estado: string;
  nitCedula?: string;
  cdpId?: number;
  fechaAvance?: string;
  fechaLimiteLegal?: string;
  fechaLegalizacion?: string;
  urlDocumentoAvance?: string;
  urlDocumentoLegalizacion?: string;
  observaciones?: string;
};

export type UpdateDboAvancesLegalizacionesDto = {
  numero: string;
  tipo: string;
  vigencia: number;
  unidadEjecutoraId: number;
  beneficiario: string;
  concepto: string;
  rubroGastoId: number;
  fuenteRecursoId: number;
  valorAvance: number;
  valorLegalizado: number;
  estado: string;
  nitCedula?: string;
  cdpId?: number;
  fechaAvance?: string;
  fechaLimiteLegal?: string;
  fechaLegalizacion?: string;
  urlDocumentoAvance?: string;
  urlDocumentoLegalizacion?: string;
  observaciones?: string;
};

export type CreateDboBecasPosgradoDto = {
  vigencia: number;
  convocatoriaMinciencias: string;
  tipoBeca: string;
  programaAcademicoId: number;
  unidadEjecutoraId: number;
  numBeneficiarios: number;
  valorPorBeca: number;
  vicerrectoriaDetermina: boolean;
  estado: string;
  fechaResolucionMinisterio?: string;
  fechaGiroMinisterio?: string;
  fechaTransferenciaUe?: string;
  urlResolucion?: string;
};

export type UpdateDboBecasPosgradoDto = {
  vigencia: number;
  convocatoriaMinciencias: string;
  tipoBeca: string;
  programaAcademicoId: number;
  unidadEjecutoraId: number;
  numBeneficiarios: number;
  valorPorBeca: number;
  vicerrectoriaDetermina: boolean;
  estado: string;
  fechaResolucionMinisterio?: string;
  fechaGiroMinisterio?: string;
  fechaTransferenciaUe?: string;
  urlResolucion?: string;
};

export type CreateDboCarteraFacturasDto = {
  numeroFactura: string;
  fechaFactura: string;
  fechaVencimiento: string;
  vigencia: number;
  unidadEjecutoraId: number;
  clienteNombre: string;
  concepto: string;
  rubroIngresoId: number;
  valorFactura: number;
  valorPagado: number;
  estado: string;
  proyectoEspecialId?: number;
  contratoId?: number;
  clienteNit?: string;
  urlDocumento?: string;
  observaciones?: string;
};

export type UpdateDboCarteraFacturasDto = {
  numeroFactura: string;
  fechaFactura: string;
  fechaVencimiento: string;
  vigencia: number;
  unidadEjecutoraId: number;
  clienteNombre: string;
  concepto: string;
  rubroIngresoId: number;
  valorFactura: number;
  valorPagado: number;
  estado: string;
  proyectoEspecialId?: number;
  contratoId?: number;
  clienteNit?: string;
  urlDocumento?: string;
  observaciones?: string;
};

export type CreateDboCdpDto = {
  numero: string;
  fechaExpedicion: string;
  vigencia: number;
  unidadEjecutoraId: number;
  rubroGastoId: number;
  fuenteRecursoId: number;
  valorAprobado: number;
  valorReintegrado: number;
  estado: string;
  valorSolicitado?: number;
  valorComprometidoRp?: number;
  beneficiario?: string;
  descripcion?: string;
  urlDocumento?: string;
  objeto?: string;
};

export type UpdateDboCdpDto = {
  numero: string;
  fechaExpedicion: string;
  vigencia: number;
  unidadEjecutoraId: number;
  rubroGastoId: number;
  fuenteRecursoId: number;
  valorAprobado: number;
  valorReintegrado: number;
  estado: string;
  valorSolicitado?: number;
  valorComprometidoRp?: number;
  beneficiario?: string;
  descripcion?: string;
  urlDocumento?: string;
  objeto?: string;
};

export type CreateDboCierreVigenciaDto = {
  vigencia: number;
  unidadEjecutoraId: number;
  fechaCierre: string;
  totalIngresosApropiados: number;
  totalIngresosRecaudados: number;
  totalGastosApropiados: number;
  totalGastosComprometidos: number;
  totalGastosPagados: number;
  estado: string;
  usuarioCierre?: string;
  observaciones?: string;
  urlActaCierre?: string;
};

export type UpdateDboCierreVigenciaDto = {
  vigencia: number;
  unidadEjecutoraId: number;
  fechaCierre: string;
  totalIngresosApropiados: number;
  totalIngresosRecaudados: number;
  totalGastosApropiados: number;
  totalGastosComprometidos: number;
  totalGastosPagados: number;
  estado: string;
  usuarioCierre?: string;
  observaciones?: string;
  urlActaCierre?: string;
};

export type CreateDboConceptosNominaDto = {
  codigo: string;
  nombre: string;
  tipo: string;
  rubroGastoId: number;
  esFactorSalarial?: boolean;
  porcentajeAplicacion?: number;
  formulaCalculo?: string;
  orden?: number;
  estado?: string;
};

export type UpdateDboConceptosNominaDto = {
  codigo: string;
  nombre: string;
  tipo: string;
  rubroGastoId: number;
  esFactorSalarial?: boolean;
  porcentajeAplicacion?: number;
  formulaCalculo?: string;
  orden?: number;
  estado?: string;
};

export type CreateDboEmpleadosDto = {
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  primerNombre: string;
  primerApellido: string;
  fechaIngreso: string;
  tipoEmpleado: string;
  cargo: string;
  salarioBaseMensual: number;
  unidadEjecutoraId: number;
  segundoNombre?: string;
  segundoApellido?: string;
  email?: string;
  telefono?: string;
  direccion?: string;
  fechaNacimiento?: string;
  fechaRetiro?: string;
  programaAcademicoId?: number;
  estado?: string;
  urlContrato?: string;
  categoriaDocente?: string;
};

export type UpdateDboEmpleadosDto = {
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  primerNombre: string;
  primerApellido: string;
  fechaIngreso: string;
  tipoEmpleado: string;
  cargo: string;
  salarioBaseMensual: number;
  unidadEjecutoraId: number;
  segundoNombre?: string;
  segundoApellido?: string;
  email?: string;
  telefono?: string;
  direccion?: string;
  fechaNacimiento?: string;
  fechaRetiro?: string;
  programaAcademicoId?: number;
  estado?: string;
  urlContrato?: string;
  categoriaDocente?: string;
};

export type CreateDboEstudianteDto = {
  nombre: string;
  apellidos: string;
  cohorteAnio: number;
  cohortePeriodo: number;
  codigoMunicipio: number;
  codigoProyecto: number;
  valorDerechosAcademicos: number;
  programaNormalizadoId?: number;
};

export type UpdateDboEstudianteDto = {
  nombre: string;
  apellidos: string;
  cohorteAnio: number;
  cohortePeriodo: number;
  codigoMunicipio: number;
  codigoProyecto: number;
  valorDerechosAcademicos: number;
  programaNormalizadoId?: number;
};

export type CreateDboFuentasRecursosDto = {
  codigo: string;
  nombre: string;
  tipo: string;
  descripcion?: string;
};

export type UpdateDboFuentasRecursosDto = {
  codigo: string;
  nombre: string;
  tipo: string;
  descripcion?: string;
};

export type CreateDboMunicipioDto = {
  nombreMunicipio: string;
  departamento: string;
};

export type UpdateDboMunicipioDto = {
  nombreMunicipio: string;
  departamento: string;
};

export type CreateDboPeriodosAcademicosDto = {
  vigencia: number;
  periodo: number;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  estado?: string;
};

export type UpdateDboPeriodosAcademicosDto = {
  vigencia: number;
  periodo: number;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  estado?: string;
};

export type CreateDboProgramasAcademicosDto = {
  codigo: string;
  nombre: string;
  nivel: string;
  facultadId?: number;
  estado?: string;
};

export type UpdateDboProgramasAcademicosDto = {
  codigo: string;
  nombre: string;
  nivel: string;
  facultadId?: number;
  estado?: string;
};

export type CreateDboProyectosEspecialesDto = {
  codigo: string;
  nombre: string;
  unidadEjecutoraId: number;
  valorTotal: number;
  estadoPresupuesto: string;
  fechaInicio?: string;
  fechaFin?: string;
  estado?: string;
  tipoProyectoId?: number;
  programaAcademicoId?: number;
  vigenciaActiva?: number;
};

export type UpdateDboProyectosEspecialesDto = {
  codigo: string;
  nombre: string;
  unidadEjecutoraId: number;
  valorTotal: number;
  estadoPresupuesto: string;
  fechaInicio?: string;
  fechaFin?: string;
  estado?: string;
  tipoProyectoId?: number;
  programaAcademicoId?: number;
  vigenciaActiva?: number;
};

export type CreateDboTiposProyectoDto = {
  codigo: string;
  nombre: string;
  requiereProgramaAcademico: boolean;
  habilitaMatriculas: boolean;
  habilitaNominaCatedratico: boolean;
  habilitaSar: boolean;
  estado: string;
  descripcion?: string;
};

export type UpdateDboTiposProyectoDto = {
  codigo: string;
  nombre: string;
  requiereProgramaAcademico: boolean;
  habilitaMatriculas: boolean;
  habilitaNominaCatedratico: boolean;
  habilitaSar: boolean;
  estado: string;
  descripcion?: string;
};

export type CreateDboRubrosGastoDto = {
  codigoCcp: string;
  nombre: string;
  tipoGasto: string;
  clasificacionFunc: string;
  estructuraId?: number;
  estado?: string;
};

export type UpdateDboRubrosGastoDto = {
  codigoCcp: string;
  nombre: string;
  tipoGasto: string;
  clasificacionFunc: string;
  estructuraId?: number;
  estado?: string;
};

export type CreateDboRubrosIngresoDto = {
  codigoCicp: string;
  nombre: string;
  categoria?: string;
  subcategoria?: string;
  nivelDetalle?: number;
  estructuraId?: number;
  estado?: string;
};

export type UpdateDboRubrosIngresoDto = {
  codigoCicp: string;
  nombre: string;
  categoria?: string;
  subcategoria?: string;
  nivelDetalle?: number;
  estructuraId?: number;
  estado?: string;
};

export type CreateDboUnidadesEjecutorasDto = {
  codigo: string;
  nombre: string;
  nivel: number;
  padreId?: number;
  estado?: string;
};

export type UpdateDboUnidadesEjecutorasDto = {
  codigo: string;
  nombre: string;
  nivel: number;
  padreId?: number;
  estado?: string;
};