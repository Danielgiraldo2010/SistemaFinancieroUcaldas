import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { rubrosIngresoConfig } from "@/pages/crud-configs";

const pages = createCrudPages(rubrosIngresoConfig);

export const RubrosIngresoList = pages.ListPage;
export const RubrosIngresoCreate = pages.CreatePage;
export const RubrosIngresoEdit = pages.EditPage;
export const RubrosIngresoShow = pages.ShowPage;
