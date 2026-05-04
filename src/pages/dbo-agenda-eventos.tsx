import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { agendaEventosConfig } from "@/pages/crud-configs";

const pages = createCrudPages(agendaEventosConfig);

export const AgendaEventosList = pages.ListPage;
export const AgendaEventosCreate = pages.CreatePage;
export const AgendaEventosEdit = pages.EditPage;
export const AgendaEventosShow = pages.ShowPage;

