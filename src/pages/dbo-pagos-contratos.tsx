import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { pagosContratosConfig } from "@/pages/crud-configs";

const pages = createCrudPages(pagosContratosConfig);

export const PagosContratosList = pages.ListPage;
export const PagosContratosCreate = pages.CreatePage;
export const PagosContratosEdit = pages.EditPage;
export const PagosContratosShow = pages.ShowPage;

