import { RenderableOrchestrator, RenderableManipulator } from "@web/core";
import { PageManipulatorHandler } from "@web/core/handlers";
import { UrlTree } from "./utils/url-tree";
import { NavigationState } from "./utils/navigation-state.enum";

import { Subject } from "rxjs";

export class RoutingManager {

    constructor(
        private pagesOrchestrator: RenderableOrchestrator,
        private navigationState: Subject<NavigationState>,
        private handler: PageManipulatorHandler) { }

    public manage(): void {
        addEventListener('hashchange', () => this.handleRouteChanged(this.pagesOrchestrator, this.navigationState, this.handler));
        addEventListener('load', () => this.handleRouteChanged(this.pagesOrchestrator, this.navigationState, this.handler));
    }

    private handleRouteChanged(
        pageOrchestrator: RenderableOrchestrator,
        navigationState: Subject<NavigationState>,
        pageManuipulatorHandler: PageManipulatorHandler): void {

        navigationState.next(NavigationState.Start);

        const urlTree: UrlTree = new UrlTree();
        const page: RenderableManipulator = pageOrchestrator.getPageFor(urlTree);

        if (page) {
            pageManuipulatorHandler.handle(page);
        } else {
            const defaultPage: RenderableManipulator = pageOrchestrator.getDefaultPage();
            if (defaultPage) {
                pageManuipulatorHandler.handle(defaultPage);
            }
        }

        navigationState.next(NavigationState.End);
    }
}
