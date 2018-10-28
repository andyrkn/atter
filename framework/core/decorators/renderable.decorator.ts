import { RenderableMetadata } from "../metadata/renderable.metadata";
import { AppContainer } from "../aplication/app-container";
import 'reflect-metadata';

export function Renderable(componentMetadata: RenderableMetadata) {
    return <TFunction extends Function>(target: TFunction) => {
        // tslint:disable-next-line:forin
        /*
        const t = Reflect.getMetadata('design:paramtypes', target);
        console.log(t);
        if (t) {
            for (const ref of t) {
                if (ref) {
                    console.log(Reflect.getMetadata('design:paramtypes', ref));
                }
            }
        }
        */
        AppContainer.addRenderable(target, componentMetadata);
    };
}