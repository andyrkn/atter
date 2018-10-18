import { ModuleMetadata } from "../metadata/module.metadata";
import { PagesOrchestrator } from "./utils/pages-orchestrator";
import { PageMetadata } from "../metadata/page.metadata";
import { TrackChangesMetadata } from "../metadata/track-changes.metadata";

export class AppContainer {

    private static _pagesOrchestrator: PagesOrchestrator = new PagesOrchestrator();
    private static modules: ModuleMetadata[] = [];
    private static trackChanges: TrackChangesMetadata[] = [];


    public static addPage(targetClass: Function, pageMetadata: PageMetadata): void {
        this._pagesOrchestrator.addPage(targetClass, pageMetadata);
    }

    public static addModule(moduleMetadata: ModuleMetadata): void {
        this.modules.push(moduleMetadata);
    }

    public static addTrackChangesProperty(trackChangesPropertyMetadata:  TrackChangesMetadata): void {
        this.trackChanges.push(trackChangesPropertyMetadata);
    }

    public static get pagesOrchestrator(): PagesOrchestrator {
        return this._pagesOrchestrator;
    }

    public static mergeMetadata(): void {
        for(const mod of this.modules) {
            if (mod.route && mod.pagesDeclaration) {
                for (const route of mod.route) {
                    this.pagesOrchestrator.setPathToPage(route.page.name, route.path, mod.pagesDeclaration.pagesFolder);
                }
            }
        }

        for (const property of this.trackChanges) {
            this.pagesOrchestrator.addTrackChangesProperty(property.targetClass.name, property.propertyName);
        }
    }
}