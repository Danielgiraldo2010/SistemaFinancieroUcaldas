import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { descuentoMatriculaConfig } from "@/pages/crud-configs";

const pages = createCrudPages(descuentoMatriculaConfig);

export const DescuentoMatriculaList = pages.ListPage;
export const DescuentoMatriculaCreate = pages.CreatePage;
export const DescuentoMatriculaEdit = pages.EditPage;
export const DescuentoMatriculaShow = pages.ShowPage;
