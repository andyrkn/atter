import { RenderableOrchestrator, RenderableManipulator } from "@web/core";
import { ComponentManipulatorHandler } from "@web/core/handlers";

export class ComponentManager {
    private components: RenderableManipulator[];
    private handler: ComponentManipulatorHandler;

    constructor(orchestrator: RenderableOrchestrator, handler: ComponentManipulatorHandler) {
        this.components = orchestrator.getComponents();
        this.handler = handler;
    }

    public manage(): void {
        for (const component of this.components) {
            this.handler.handle(component);
        }
    }
}