import { ModuleMetadata } from "../metadata/module.metadata";
import { AppContainer } from "../aplication/app-container";
export function Module(metadata: ModuleMetadata) {
    return <TFunction extends Function>(target: TFunction) => {
        AppContainer.addModule(metadata);
    };
} 