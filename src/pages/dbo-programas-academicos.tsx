import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { programasAcademicosConfig } from "@/pages/crud-configs";

const pages = createCrudPages(programasAcademicosConfig);

export const ProgramasAcademicosList = pages.ListPage;
export const ProgramasAcademicosCreate = pages.CreatePage;
export const ProgramasAcademicosEdit = pages.EditPage;
export const ProgramasAcademicosShow = pages.ShowPage;
