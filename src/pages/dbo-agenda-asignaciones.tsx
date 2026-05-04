import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { agendaAsignacionesConfig } from "@/pages/crud-configs";

const pages = createCrudPages(agendaAsignacionesConfig);

export const AgendaAsignacionesList = pages.ListPage;
export const AgendaAsignacionesCreate = pages.CreatePage;
export const AgendaAsignacionesEdit = pages.EditPage;
export const AgendaAsignacionesShow = pages.ShowPage;
