import { RenderableOrchestrator, RenderableManipulator } from "@web/core";
import { PageManipulatorHandler } from "@web/core/handlers";
import { UrlTree } from "./utils/url-tree";
import { NavigationState } from "./utils/navigation-state.enum";

import { Subject } from "rxjs";

export class RoutingManager {

    constructor(
        private pagesOrchestrator: RenderableOrchestrator,
        private navigationState: Subject<NavigationState>,
        private handler: PageManipulatorHandler) {

    }

    public manage(): void {
        addEventListener('hashchange', () => this.handleRouteChange(this.pagesOrchestrator, this.navigationState, this.handler));
        addEventListener('load', () => this.handleRouteChange(this.pagesOrchestrator, this.navigationState, this.handler));
    }

    private handleRouteChange(
        pageOrchestrator: RenderableOrchestrator, navigationState: Subject<NavigationState>,
        pageManuipulatorHandler: PageManipulatorHandler): void {

        navigationState.next(NavigationState.Start);

        const urlTree: UrlTree = new UrlTree();
        const page: RenderableManipulator = pageOrchestrator.getPageFor(urlTree);

        if (page) {
            const parameterCondition = urlTree.hasParameter === page.hasParameter();
            if (parameterCondition) {
                this.handlePage(pageManuipulatorHandler, page);
            } else {
                this.handleDefaultPage(pageOrchestrator, pageManuipulatorHandler);
            }
        } else {
            this.handleDefaultPage(pageOrchestrator, pageManuipulatorHandler);
        }

        navigationState.next(NavigationState.End);
    }

    private handlePage(pageManuipulatorHandler: PageManipulatorHandler, page: RenderableManipulator): void {
        pageManuipulatorHandler.handle(page);
    }

    private handleDefaultPage(pagesOrchestrator: RenderableOrchestrator, pageManuipulatorHandler: PageManipulatorHandler): void {
        const defaultPage: RenderableManipulator = pagesOrchestrator.getDefaultPage();
        if (defaultPage) {
            pageManuipulatorHandler.handle(defaultPage);
        }
    }
}
