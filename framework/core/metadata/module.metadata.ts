import { Route } from "../../router/route";

export interface ModuleMetadata {
    declarations?: Function[];
    injectable?: Function[];
    route?: Route[];
}