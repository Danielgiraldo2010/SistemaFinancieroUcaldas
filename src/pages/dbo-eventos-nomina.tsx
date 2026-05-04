import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { eventosNominaConfig } from "@/pages/crud-configs";

const pages = createCrudPages(eventosNominaConfig);

export const EventosNominaList = pages.ListPage;
export const EventosNominaCreate = pages.CreatePage;
export const EventosNominaEdit = pages.EditPage;
export const EventosNominaShow = pages.ShowPage;

