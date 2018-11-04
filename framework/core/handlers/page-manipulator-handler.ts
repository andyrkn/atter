import { InstanceManager, RenderableManipulator } from "@web/core";
import { StyleHandler, Renderer } from "@web/dom";
import { Router } from "@web/router";
import { RenderableManipulatorHandler } from "./renderable-manipulator-handler";

import { Subject } from "rxjs";
import { NavigationState } from "@web/router/utils/navigation-state.enum";
import { DomProcessorHandler } from "@web/dom/dom-processor.handler";

export class PageManipulatorHandler extends RenderableManipulatorHandler {

    private whenToUnwatchSubject: Subject<boolean> = new Subject<boolean>();

    constructor(
        private router: Router,
        styleHandler: StyleHandler,
        instanceManager: InstanceManager,
        processorsHandler: DomProcessorHandler) {
        super(styleHandler, instanceManager, processorsHandler);
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