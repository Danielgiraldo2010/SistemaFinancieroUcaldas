import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { tiposProyectoConfig } from "@/pages/crud-configs";

const pages = createCrudPages(tiposProyectoConfig);

export const TiposProyectoList = pages.ListPage;
export const TiposProyectoCreate = pages.CreatePage;
export const TiposProyectoEdit = pages.EditPage;
export const TiposProyectoShow = pages.ShowPage;
