import { RenderableOrchestrator } from "./utils/renderable-orchestrator";

export class InstanceManager {
    private pageOrchestrator: RenderableOrchestrator;

    constructor(pageOrchestrator: RenderableOrchestrator) {
        this.pageOrchestrator = pageOrchestrator;
    }

    public getInstance(classToInstantiate: Function): Function {
        let instance = new classToInstantiate.prototype.constructor();
        // TODO: dependency injection
        // instance.constructor.apply(instance, args)
        // find args
        return instance;
    }
}