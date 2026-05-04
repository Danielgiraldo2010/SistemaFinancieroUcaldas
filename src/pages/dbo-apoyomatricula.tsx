import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { apoyoMatriculaConfig } from "@/pages/crud-configs";

const pages = createCrudPages(apoyoMatriculaConfig);

export const ApoyoMatriculaList = pages.ListPage;
export const ApoyoMatriculaCreate = pages.CreatePage;
export const ApoyoMatriculaEdit = pages.EditPage;
export const ApoyoMatriculaShow = pages.ShowPage;
