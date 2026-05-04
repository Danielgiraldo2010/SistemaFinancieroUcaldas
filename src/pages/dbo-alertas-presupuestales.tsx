import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { alertasPresupuestalesConfig } from "@/pages/crud-configs";

const pages = createCrudPages(alertasPresupuestalesConfig);

export const AlertasPresupuestalesList = pages.ListPage;
export const AlertasPresupuestalesCreate = pages.CreatePage;
export const AlertasPresupuestalesEdit = pages.EditPage;
export const AlertasPresupuestalesShow = pages.ShowPage;

