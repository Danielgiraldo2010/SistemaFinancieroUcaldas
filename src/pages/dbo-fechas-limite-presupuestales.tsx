import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { fechasLimitePresupuestalesConfig } from "@/pages/crud-configs";

const pages = createCrudPages(fechasLimitePresupuestalesConfig);

export const FechasLimitePresupuestalesList = pages.ListPage;
export const FechasLimitePresupuestalesCreate = pages.CreatePage;
export const FechasLimitePresupuestalesEdit = pages.EditPage;
export const FechasLimitePresupuestalesShow = pages.ShowPage;
