import { PageManipulator, InstanceManager, Handler } from "@web/core";
import { StyleHandler, Renderer } from "@web/dom";
import { Router } from "../router";
import { NavigationState } from "../utils/navigation-state.enum";

import * as WatchJS from 'melanke-watchjs';
import { Subject, Subscription } from "rxjs";

export class PageManipulatorHandler implements Handler<PageManipulator> {
    private renderer: Renderer;
    private styleHandler: StyleHandler;
    private instanceManager: InstanceManager;
    private router: Router;

    constructor(router: Router, renderer: Renderer, styleHandler: StyleHandler, instanceManager: InstanceManager) {
        this.renderer = renderer;
        this.styleHandler = styleHandler;
        this.instanceManager = instanceManager;
        this.router = router;
    }

    public handle(pageManipulator: PageManipulator): void {
        const interpretation: Function = pageManipulator.getInterpretation();
        let pageContext: Function = this.instanceManager.getInstance(pageManipulator.pageClass.prototype.constructor);

        const contextChangeSubject: Subject<boolean> = new Subject();

        this.handleStyle(pageManipulator);
        this.renderTemplate(interpretation, pageContext);

        WatchJS.watch(pageContext, pageManipulator.propertiesToTrack, () => {
            contextChangeSubject.next(true);
        });

        const subscription: Subscription = contextChangeSubject.subscribe(() => {
            this.renderTemplate(interpretation, pageContext);
        })

        this.router.navigationState.subscribe((state: NavigationState) => {
            if (NavigationState.Start === state) {
                WatchJS.unwatch(pageContext, pageManipulator.propertiesToTrack);
                subscription.unsubscribe();
            }
        });
    }

    private renderTemplate(interpretation: Function, context: any): void {
        const toRender: string = interpretation(context);
        this.renderer.renderToRouter(toRender);
    }

    private handleStyle(pageManipulator: PageManipulator): void {
        const pageStyle: string = pageManipulator.getStyle();
        this.styleHandler.handle(pageStyle);
    }
}