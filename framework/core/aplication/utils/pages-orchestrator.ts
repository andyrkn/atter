import { PageManipulator } from "./page-manipulator";
import { Utils } from "@web/utils";
import { PageMetadata } from "@web/core/metadata/page.metadata";
import { RoutePath, UrlTree } from "@web/router";

export class PagesOrchestrator {
    private pages: PageManipulator[] = [];

    public addPage(targetClass: Function, pageMetadata: PageMetadata): void {
        this.pages.push(PageManipulator.Create(targetClass, pageMetadata));
    }

    public setPathToPage(pageClassName: string, path: string, pageFolder: string): void {
        var pageToSetPath = this.pages.find((x: PageManipulator) => x.hasClassName(pageClassName));
        if (pageToSetPath) {
            const routePath = new RoutePath(path);
            pageToSetPath.setPathToPage(routePath, pageFolder);
        } else {
            Utils.printError("Something went wrong...");
        }
    }

    public addTrackChangesProperty(pageClassName: string, propertyName: string): void {
        var pageToSetTrackChangesProperty = this.pages.find((x: PageManipulator) => x.hasClassName(pageClassName));

        if (pageToSetTrackChangesProperty) {
            pageToSetTrackChangesProperty.addTrackProperty(propertyName);
        } else {
            Utils.printError("Something went wrong...");
        }
    }

    public getPageFor(urlTree: UrlTree): PageManipulator {
        return this.pages.find((x: PageManipulator) => x.isForTree(urlTree));
    }

    public getDefaultPage(): PageManipulator {
        return this.pages.find((x: PageManipulator) => x.isDefaultPage);
    }
}
