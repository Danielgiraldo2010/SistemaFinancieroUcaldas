import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { estudiantesConfig } from "@/pages/crud-configs";

const pages = createCrudPages(estudiantesConfig);

export const EstudiantesList = pages.ListPage;
export const EstudiantesCreate = pages.CreatePage;
export const EstudiantesEdit = pages.EditPage;
export const EstudiantesShow = pages.ShowPage;
