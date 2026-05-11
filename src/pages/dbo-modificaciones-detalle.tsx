import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { modificacionesDetalleConfig } from "@/pages/crud-configs";

const pages = createCrudPages(modificacionesDetalleConfig);

export const ModificacionesDetalleList = pages.ListPage;
export const ModificacionesDetalleCreate = pages.CreatePage;
export const ModificacionesDetalleEdit = pages.EditPage;
export const ModificacionesDetalleShow = pages.ShowPage;
