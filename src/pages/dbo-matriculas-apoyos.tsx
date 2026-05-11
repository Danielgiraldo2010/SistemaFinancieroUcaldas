import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { matriculasApoyosConfig } from "@/pages/crud-configs";

const pages = createCrudPages(matriculasApoyosConfig);

export const MatriculasApoyosList = pages.ListPage;
export const MatriculasApoyosCreate = pages.CreatePage;
export const MatriculasApoyosEdit = pages.EditPage;
export const MatriculasApoyosShow = pages.ShowPage;
