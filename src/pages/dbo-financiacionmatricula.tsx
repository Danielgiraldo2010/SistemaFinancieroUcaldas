import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { financiacionMatriculaConfig } from "@/pages/crud-configs";

const pages = createCrudPages(financiacionMatriculaConfig);

export const FinanciacionMatriculaList = pages.ListPage;
export const FinanciacionMatriculaCreate = pages.CreatePage;
export const FinanciacionMatriculaEdit = pages.EditPage;
export const FinanciacionMatriculaShow = pages.ShowPage;
