import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { periodosAcademicosConfig } from "@/pages/crud-configs";

const pages = createCrudPages(periodosAcademicosConfig);

export const PeriodosAcademicosList = pages.ListPage;
export const PeriodosAcademicosCreate = pages.CreatePage;
export const PeriodosAcademicosEdit = pages.EditPage;
export const PeriodosAcademicosShow = pages.ShowPage;
