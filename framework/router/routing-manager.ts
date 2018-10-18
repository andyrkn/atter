import { PagesOrchestrator, PageManipulator } from "@web/core";
import { UrlTree } from "./utils/url-tree";
import { Handler } from "@web/core/utils/handler";
import { Subject } from "rxjs";
import { NavigationState } from "./utils/navigation-state.enum";

export class RoutingManager {
    
    constructor(pagesOrchestrator: PagesOrchestrator, navigationSate: Subject<NavigationState>, pageManuipulatorHandler: Handler<PageManipulator> ) {
        addEventListener('hashchange', () => this.handleRouteChange(pagesOrchestrator, navigationSate, pageManuipulatorHandler));
        addEventListener('load', () => this.handleRouteChange(pagesOrchestrator, navigationSate, pageManuipulatorHandler));
    }

    private handleRouteChange(pagesOrchestrator: PagesOrchestrator, navigationState: Subject<NavigationState>, pageManuipulatorHandler: Handler<PageManipulator>): void  {
        navigationState.next(NavigationState.Start);
        
        const urlTree: UrlTree = new UrlTree();
        const page: PageManipulator = pagesOrchestrator.getPageFor(urlTree);

        if (page) {
            pageManuipulatorHandler.handle(page);
        } else {
            const defaultPage: PageManipulator = pagesOrchestrator.getDefaultPage();
            if (defaultPage) {
                pageManuipulatorHandler.handle(defaultPage);
            }
        }

        navigationState.next(NavigationState.End);
    }
}
