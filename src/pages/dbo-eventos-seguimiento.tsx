import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { eventosSeguimientoConfig } from "@/pages/crud-configs";

const pages = createCrudPages(eventosSeguimientoConfig);

export const EventosSeguimientoList = pages.ListPage;
export const EventosSeguimientoCreate = pages.CreatePage;
export const EventosSeguimientoEdit = pages.EditPage;
export const EventosSeguimientoShow = pages.ShowPage;

