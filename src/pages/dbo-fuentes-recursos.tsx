import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { fuentesRecursosConfig } from "@/pages/crud-configs";

const pages = createCrudPages(fuentesRecursosConfig);

export const FuentesRecursosList = pages.ListPage;
export const FuentesRecursosCreate = pages.CreatePage;
export const FuentesRecursosEdit = pages.EditPage;
export const FuentesRecursosShow = pages.ShowPage;
