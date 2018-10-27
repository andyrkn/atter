import { RenderableOrchestrator } from "./utils/renderable-orchestrator";

export class InstanceManager {
    private pageOrchestrator: RenderableOrchestrator;

    constructor(pageOrchestrator: RenderableOrchestrator) {
        this.pageOrchestrator = pageOrchestrator;
    }

    public getInstance(classToInstantiate: Function): Function {
        const instance = new classToInstantiate.prototype.constructor();
        // TODO: dependency injection
        // instance.constructor.apply(instance, args)
        // find args

        // console.log(instance);

        return instance;
    }
}