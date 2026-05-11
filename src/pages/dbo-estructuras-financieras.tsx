import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { estructurasFinancierasConfig } from "@/pages/crud-configs";

const pages = createCrudPages(estructurasFinancierasConfig);

export const EstructurasFinancierasList = pages.ListPage;
export const EstructurasFinancierasCreate = pages.CreatePage;
export const EstructurasFinancierasEdit = pages.EditPage;
export const EstructurasFinancierasShow = pages.ShowPage;
