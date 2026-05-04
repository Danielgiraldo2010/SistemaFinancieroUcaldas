import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { becasPosgradoConfig } from "@/pages/crud-configs";

const pages = createCrudPages(becasPosgradoConfig);

export const BecasPosgradoList = pages.ListPage;
export const BecasPosgradoCreate = pages.CreatePage;
export const BecasPosgradoEdit = pages.EditPage;
export const BecasPosgradoShow = pages.ShowPage;
