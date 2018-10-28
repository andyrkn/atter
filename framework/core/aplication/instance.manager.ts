import { RenderableOrchestrator } from "./utils/renderable-orchestrator";
import { DependancyContainer } from "./dependancy.container";

export class InstanceManager {
    private pageOrchestrator: RenderableOrchestrator;
    private dependencyContainer: DependancyContainer;

    constructor(pageOrchestrator: RenderableOrchestrator, dependencyContainer: DependancyContainer) {
        this.pageOrchestrator = pageOrchestrator;
        this.dependencyContainer = dependencyContainer;
    }

    public getInstance(classToInstantiate: Function): Function {
        const classArguments: [] = Reflect.getMetadata('design:paramtypes', classToInstantiate);
        if (classArguments) {
            const params = classArguments.map((x: any) => this.dependencyContainer.getInjectable(x.name));
            return new classToInstantiate.prototype.constructor(...params);
        } else {
            return new classToInstantiate.prototype.constructor();
        }
    }
}