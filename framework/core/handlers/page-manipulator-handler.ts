import { InstanceManager, RenderableManipulator } from "@web/core";
import { StyleHandler, Renderer } from "@web/dom";
import { Router } from "@web/router";
import { RenderableManipulatorHandler } from "./renderable-manipulator-handler";

import { Subject } from "rxjs";
import { NavigationState } from "@web/router/utils/navigation-state.enum";

export class PageManipulatorHandler extends RenderableManipulatorHandler {

    private router: Router;
    private whenToUnwatchSubject: Subject<boolean> = new Subject<boolean>();

    constructor(router: Router, renderer: Renderer, styleHandler: StyleHandler, instanceManager: InstanceManager) {
        super(renderer, styleHandler, instanceManager);
        this.router = router;

        this.router.navigationState.subscribe((state: NavigationState) => {
            if (NavigationState.Start === state) {
                this.whenToUnwatchSubject.next(true);
            }
        });
    }

    protected whenToUnwatch(): Subject<boolean> {
        return this.whenToUnwatchSubject;
    }

    protected whereToRender(page: RenderableManipulator): string {
        return 'render-container';
    }
}