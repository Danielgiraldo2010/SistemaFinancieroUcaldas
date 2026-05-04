import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { apoyosMatriculaConfig } from "@/pages/crud-configs";

const pages = createCrudPages(apoyosMatriculaConfig);

export const ApoyosMatriculaList = pages.ListPage;
export const ApoyosMatriculaCreate = pages.CreatePage;
export const ApoyosMatriculaEdit = pages.EditPage;
export const ApoyosMatriculaShow = pages.ShowPage;
