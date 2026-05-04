import { createCrudPages } from "@/components/refine-ui/crud/resource-crud";
import { cdpConfig } from "@/pages/crud-configs";

const pages = createCrudPages(cdpConfig);

export const CdpList = pages.ListPage;
export const CdpCreate = pages.CreatePage;
export const CdpEdit = pages.EditPage;
export const CdpShow = pages.ShowPage;

