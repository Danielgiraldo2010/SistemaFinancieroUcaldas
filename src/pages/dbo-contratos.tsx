import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { contratosConfig } from "@/pages/crud-configs";

const pages = createCrudPages(contratosConfig);

export const ContratosList = pages.ListPage;
export const ContratosCreate = pages.CreatePage;
export const ContratosEdit = pages.EditPage;
export const ContratosShow = pages.ShowPage;

