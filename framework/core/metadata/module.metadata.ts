import { Route } from "../../router/route";
import { RenderableDeclaration } from "./renderable-declaration";

export interface ModuleMetadata {
    renderableDeclaration?: RenderableDeclaration,
    injectable?: Function[],
    route?: Route[]
}