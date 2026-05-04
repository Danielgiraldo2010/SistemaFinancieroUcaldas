import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { carteraFacturasConfig } from "@/pages/crud-configs";

const pages = createCrudPages(carteraFacturasConfig);

export const CarteraFacturasList = pages.ListPage;
export const CarteraFacturasCreate = pages.CreatePage;
export const CarteraFacturasEdit = pages.EditPage;
export const CarteraFacturasShow = pages.ShowPage;
