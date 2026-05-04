import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { empleadosConfig } from "@/pages/crud-configs";

const pages = createCrudPages(empleadosConfig);

export const EmpleadosList = pages.ListPage;
export const EmpleadosCreate = pages.CreatePage;
export const EmpleadosEdit = pages.EditPage;
export const EmpleadosShow = pages.ShowPage;
