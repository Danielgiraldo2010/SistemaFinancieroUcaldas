import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { matriculasProyectadasConfig } from "@/pages/crud-configs";

const pages = createCrudPages(matriculasProyectadasConfig);

export const MatriculasProyectadasList = pages.ListPage;
export const MatriculasProyectadasCreate = pages.CreatePage;
export const MatriculasProyectadasEdit = pages.EditPage;
export const MatriculasProyectadasShow = pages.ShowPage;
