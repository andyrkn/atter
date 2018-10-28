import { RenderableOrchestrator } from "./utils/renderable-orchestrator";
<<<<<<< HEAD
import { TestService } from "@app/services";
=======
import 'reflect-metadata';

>>>>>>> master

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
<<<<<<< HEAD

        // override test service in args

=======
        // Reflect.getMetadata('design:paramtypes', target)[0];
        // console.log(instance);
       
>>>>>>> master
        return instance;
    }
}