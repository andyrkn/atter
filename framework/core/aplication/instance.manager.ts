import { PagesOrchestrator } from "./utils/pages-orchestrator";

export class InstanceManager {
    private pageOrchestrator: PagesOrchestrator;

    constructor(pageOrchestrator: PagesOrchestrator) {
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