import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { cierreVigenciaConfig } from "@/pages/crud-configs";

const pages = createCrudPages(cierreVigenciaConfig);

export const CierreVigenciaList = pages.ListPage;
export const CierreVigenciaCreate = pages.CreatePage;
export const CierreVigenciaEdit = pages.EditPage;
export const CierreVigenciaShow = pages.ShowPage;
