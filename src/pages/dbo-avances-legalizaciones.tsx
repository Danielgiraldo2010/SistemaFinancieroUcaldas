import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { avancesLegalizacionesConfig } from "@/pages/crud-configs";

const pages = createCrudPages(avancesLegalizacionesConfig);

export const AvancesLegalizacionesList = pages.ListPage;
export const AvancesLegalizacionesCreate = pages.CreatePage;
export const AvancesLegalizacionesEdit = pages.EditPage;
export const AvancesLegalizacionesShow = pages.ShowPage;
