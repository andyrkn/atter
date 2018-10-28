import { RenderableMetadata } from "../metadata/renderable.metadata";
import { AppContainer } from "../aplication/app-container";

export function Renderable(componentMetadata: RenderableMetadata) {
    return <TFunction extends Function>(target: TFunction) => {
        // tslint:disable-next-line:forin
        /*
        const t = Reflect.getMetadata('design:paramtypes', target);
        for (const ref of t) {
            console.log(ref.name + ' -> ');
            if (ref) {
                console.log(Reflect.getMetadata('design:paramtypes', ref)[0]);
            }
        }
        */
        AppContainer.addRenderable(target, componentMetadata);
    };
}