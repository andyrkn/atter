import { RenderableMetadata } from "../metadata/renderable.metadata";
import { AppContainer } from "../aplication/app-container";
import 'reflect-metadata';

export function Renderable(renderableMetadata: RenderableMetadata) {
    return <TFunction extends Function>(target: TFunction) => {
        AppContainer.addRenderable(target, renderableMetadata);
    };
}