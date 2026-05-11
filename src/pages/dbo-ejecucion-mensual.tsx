import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { ejecucionMensualConfig } from "@/pages/crud-configs";

const pages = createCrudPages(ejecucionMensualConfig);

export const EjecucionMensualList = pages.ListPage;
export const EjecucionMensualCreate = pages.CreatePage;
export const EjecucionMensualEdit = pages.EditPage;
export const EjecucionMensualShow = pages.ShowPage;
