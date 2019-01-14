import { Handler, RenderableManipulator, InstanceManager } from "@web/core";
import { Renderer, StyleHandler } from "@web/dom";
import { Subscription, Subject } from "rxjs";
import { LifeCycle } from "../lifecycle/lifecycle-instanceOf";
import { DomProcessorHandler } from "@web/dom/dom-processor.handler";

import * as WatchJS from 'melanke-watchjs';

export abstract class RenderableManipulatorHandler implements Handler<RenderableManipulator> {

    constructor(
        private styleHandler: StyleHandler,
        private instanceManager: InstanceManager,
        private processorsHandler: DomProcessorHandler) {
    }

    public handle(objectToHandle: RenderableManipulator): void {
        const context: Function = this.instanceManager.getInstance(objectToHandle.renderableClass);

        if (LifeCycle.implementsOnInit(context)) {
            context.onInit();
        }

        const contextChangeSubject: Subject<boolean> = new Subject();

        this.handleStyle(objectToHandle);
        this.renderTemplate(objectToHandle, context);

        if (LifeCycle.implementsAfterRender(context)) {
            context.afterRender();
        }

        const subscription: Subscription = contextChangeSubject.subscribe(() => {
            this.renderTemplate(objectToHandle, context);
            if (LifeCycle.implementsOnRefresh(context)) {
                context.onRefresh();
            }
        });

        this.watch(objectToHandle, context, contextChangeSubject);
        this.whenToUnwatch().subscribe(() => this.unwatch(objectToHandle, context, subscription));
    }

    private renderTemplate(renderableManipulator: RenderableManipulator, context: any): void {
        const interpretation = renderableManipulator.getInterpretation();
        const toRender: string = interpretation(context);
        const selector = this.whereToRender(renderableManipulator);
        this.processorsHandler.handle(selector, toRender, renderableManipulator.renderingIndex, context);
    }

    private handleStyle(pageManipulator: RenderableManipulator): void {
        this.styleHandler.handle(pageManipulator);
    }

    private watch(objectToHandle: RenderableManipulator, context: Function, contextChangeSubject: Subject<boolean>): void {
        WatchJS.watch(context, objectToHandle.propertiesToTrack, () => {
            contextChangeSubject.next(true);
        });
    }

    private unwatch(objectToHandle: RenderableManipulator, context: Function, contextChangeSubscription: Subscription): void {
        WatchJS.unwatch(context, objectToHandle.propertiesToTrack);
        contextChangeSubscription.unsubscribe();

        if (LifeCycle.implementsOnDestroy(context)) {
            context.onDestroy();
        }
    }

    protected abstract whenToUnwatch(): Subject<boolean>;

    protected abstract whereToRender(renderableManipulator: RenderableManipulator): string;
}