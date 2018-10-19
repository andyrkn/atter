import { RenderableOrchestrator, RenderableManipulator } from "@web/core";
import { PageManipulatorHandler } from "@web/core/handlers";
import { UrlTree } from "./utils/url-tree";
import { NavigationState } from "./utils/navigation-state.enum";

import { Subject } from "rxjs";

export class RoutingManager {

    private orchestrator: RenderableOrchestrator;
    private navigationState: Subject<NavigationState>;
    private handler: PageManipulatorHandler;

    constructor(pagesOrchestrator: RenderableOrchestrator, navigationState: Subject<NavigationState>, pageManuipulatorHandler: PageManipulatorHandler ) {
        this.orchestrator = pagesOrchestrator;
        this.navigationState = navigationState;
        this.handler = pageManuipulatorHandler;
    }

    public manage(): void {
        addEventListener('hashchange', () => this.handleRouteChange(this.orchestrator, this.navigationState, this.handler));
        addEventListener('load', () => this.handleRouteChange(this.orchestrator, this.navigationState, this.handler));
    }

    private handleRouteChange(pagesOrchestrator: RenderableOrchestrator, navigationState: Subject<NavigationState>, pageManuipulatorHandler: PageManipulatorHandler): void  {
        navigationState.next(NavigationState.Start);
        
        const urlTree: UrlTree = new UrlTree();
        const page: RenderableManipulator = pagesOrchestrator.getPageFor(urlTree);

        if (page) {
            pageManuipulatorHandler.handle(page);
        } else {
            const defaultPage: RenderableManipulator = pagesOrchestrator.getDefaultPage();
            if (defaultPage) {
                pageManuipulatorHandler.handle(defaultPage);
            }
        }

        navigationState.next(NavigationState.End);
    }
}
