import { RenderableMetadata } from "../metadata/renderable.metadata";
import { AppContainer } from "../aplication/app-container";

export function Renderable(componentMetadata: RenderableMetadata) {
    return <TFunction extends Function>(target: TFunction) => {
        AppContainer.addRenderable(target, componentMetadata);
    };
}