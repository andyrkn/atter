import { AppContainer } from "@web/core/aplication/app-container";
import 'reflect-metadata';

export function Injectable() {
    return <TFunction extends Function>(target: TFunction) => {
        AppContainer.addInjectable(target);
    };
}