import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { proyectosEspecialesConfig } from "@/pages/crud-configs";

const pages = createCrudPages(proyectosEspecialesConfig);

export const ProyectosEspecialesList = pages.ListPage;
export const ProyectosEspecialesCreate = pages.CreatePage;
export const ProyectosEspecialesEdit = pages.EditPage;
export const ProyectosEspecialesShow = pages.ShowPage;
