import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { municipiosConfig } from "@/pages/crud-configs";

const pages = createCrudPages(municipiosConfig);

export const MunicipiosList = pages.ListPage;
export const MunicipiosCreate = pages.CreatePage;
export const MunicipiosEdit = pages.EditPage;
export const MunicipiosShow = pages.ShowPage;
