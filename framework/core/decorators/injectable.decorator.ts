import { AppContainer } from "@web/core/aplication/app-container";

export function Injectable() {
    return <TFunction extends Function>(target: TFunction) => {
        AppContainer.addInjectable(target);
    };
}