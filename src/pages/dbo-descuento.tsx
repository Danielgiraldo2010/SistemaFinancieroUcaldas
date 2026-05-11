import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { descuentosConfig } from "@/pages/crud-configs";

const pages = createCrudPages(descuentosConfig);

export const DescuentosList = pages.ListPage;
export const DescuentosCreate = pages.CreatePage;
export const DescuentosEdit = pages.EditPage;
export const DescuentosShow = pages.ShowPage;
