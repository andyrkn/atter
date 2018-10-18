import { Route } from "../../router/route";
import { PagesDeclaration } from "./pages-declaration";

export interface ModuleMetadata {
    pagesDeclaration?: PagesDeclaration,
    injectable?: Function[],
    route?: Route[]
}