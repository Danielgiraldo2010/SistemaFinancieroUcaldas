import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { conceptosNominaConfig } from "@/pages/crud-configs";

const pages = createCrudPages(conceptosNominaConfig);

export const ConceptosNominaList = pages.ListPage;
export const ConceptosNominaCreate = pages.CreatePage;
export const ConceptosNominaEdit = pages.EditPage;
export const ConceptosNominaShow = pages.ShowPage;
