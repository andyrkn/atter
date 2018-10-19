import { RenderableManipulator } from "./renderable-manipulator";
import { Utils } from "@web/utils";
import { RenderableMetadata } from "@web/core/metadata/renderable.metadata";
import { RoutePath, UrlTree } from "@web/router";

export class RenderableOrchestrator {
    private renderables: RenderableManipulator[] = [];

    public addPage(targetClass: Function, pageMetadata: RenderableMetadata): void {
        this.renderables.push(RenderableManipulator.Create(targetClass, pageMetadata));
    }

    public setPathToPage(pageClassName: string, path: string, pageFolder: string): void {
        var pageToSetPath = this.renderables.find((x: RenderableManipulator) => x.hasClassName(pageClassName));
        if (pageToSetPath) {
            const routePath = new RoutePath(path);
            pageToSetPath.setPathTo(routePath, pageFolder);
        } else {
            Utils.printError("Something went wrong...");
        }
    }

    public addTrackChangesProperty(pageClassName: string, propertyName: string): void {
        var pageToSetTrackChangesProperty = this.renderables.find((x: RenderableManipulator) => x.hasClassName(pageClassName));

        if (pageToSetTrackChangesProperty) {
            pageToSetTrackChangesProperty.addTrackProperty(propertyName);
        } else {
            Utils.printError("Something went wrong...");
        }
    }

    public getPageFor(urlTree: UrlTree): RenderableManipulator {
        return this.renderables.find((x: RenderableManipulator) => x.isForTree(urlTree));
    }

    public getDefaultPage(): RenderableManipulator {
        return this.renderables.find((x: RenderableManipulator) => x.isDefaultPage);
    }

    public getComponents(): RenderableManipulator[] {
        return this.renderables.filter((x :RenderableManipulator) => x.isComponent);
    }
}
