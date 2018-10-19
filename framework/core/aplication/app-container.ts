import { ModuleMetadata } from "../metadata/module.metadata";
import { RenderableOrchestrator } from "./utils/renderable-orchestrator";
import { RenderableMetadata } from "../metadata/renderable.metadata";
import { TrackChangesMetadata } from "../metadata/track-changes.metadata";

export class AppContainer {

    private static _renderableOrchestrator: RenderableOrchestrator = new RenderableOrchestrator();
    private static modules: ModuleMetadata[] = [];
    private static trackChanges: TrackChangesMetadata[] = [];

    public static addRenderable(targetClass: Function, pageMetadata: RenderableMetadata): void {
        this._renderableOrchestrator.addPage(targetClass, pageMetadata);
    }

    public static addModule(moduleMetadata: ModuleMetadata): void {
        this.modules.push(moduleMetadata);
    }

    public static addTrackChangesProperty(trackChangesPropertyMetadata:  TrackChangesMetadata): void {
        this.trackChanges.push(trackChangesPropertyMetadata);
    }

    public static get orchestrator(): RenderableOrchestrator {
        return this._renderableOrchestrator;
    }

    public static mergeMetadata(): void {
        for(const mod of this.modules) {
            if (mod.route && mod.renderableDeclaration) {
                for (const route of mod.route) {
                    this.orchestrator.setPathToPage(route.page.name, route.path, mod.renderableDeclaration.folderPath);
                }
            }
        }

        for (const property of this.trackChanges) {
            this.orchestrator.addTrackChangesProperty(property.targetClass.name, property.propertyName);
        }
    }
}