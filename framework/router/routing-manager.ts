import { RenderableOrchestrator, RenderableManipulator } from "@web/core";
import { UrlTree } from "./utils/url-tree";
import { Handler } from "@web/core/utils/handler";
import { Subject } from "rxjs";
import { NavigationState } from "./utils/navigation-state.enum";

export class RoutingManager {
    
    constructor(pagesOrchestrator: RenderableOrchestrator, navigationSate: Subject<NavigationState>, pageManuipulatorHandler: Handler<RenderableManipulator> ) {
        addEventListener('hashchange', () => this.handleRouteChange(pagesOrchestrator, navigationSate, pageManuipulatorHandler));
        addEventListener('load', () => this.handleRouteChange(pagesOrchestrator, navigationSate, pageManuipulatorHandler));
    }

    private handleRouteChange(pagesOrchestrator: RenderableOrchestrator, navigationState: Subject<NavigationState>, pageManuipulatorHandler: Handler<RenderableManipulator>): void  {
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
