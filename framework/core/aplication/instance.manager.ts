import { RenderableOrchestrator } from "./utils/renderable-orchestrator";
import 'reflect-metadata';


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
        // Reflect.getMetadata('design:paramtypes', target)[0];
        // console.log(instance);
       
        return instance;
    }
}