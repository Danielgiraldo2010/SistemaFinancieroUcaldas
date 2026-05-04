import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { rubrosGastoConfig } from "@/pages/crud-configs";

const pages = createCrudPages(rubrosGastoConfig);

export const RubrosGastoList = pages.ListPage;
export const RubrosGastoCreate = pages.CreatePage;
export const RubrosGastoEdit = pages.EditPage;
export const RubrosGastoShow = pages.ShowPage;
