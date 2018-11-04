import { Handler, RenderableManipulator, InstanceManager } from "@web/core";
import { Renderer, StyleHandler } from "@web/dom";
import { Subscription, Subject } from "rxjs";

import * as WatchJS from 'melanke-watchjs';
import { LifeCycle } from "../lifecycle/lifecycle-instanceOf";

export abstract class RenderableManipulatorHandler implements Handler<RenderableManipulator> {
    protected renderer: Renderer;
    protected styleHandler: StyleHandler;
    protected instanceManager: InstanceManager;

    constructor(renderer: Renderer, styleHandler: StyleHandler, instanceManager: InstanceManager) {
        this.renderer = renderer;
        this.styleHandler = styleHandler;
        this.instanceManager = instanceManager;
    }

    public handle(objectToHandle: RenderableManipulator): void {
        const context: Function = this.instanceManager.getInstance(objectToHandle.renderableClass);

        if(LifeCycle.implementsOnInit(context)) {
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
        this.renderer.renderTo(selector, toRender, renderableManipulator.renderingIndex);
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

        if(LifeCycle.implementsOnDestroy(context)) {
            context.onDestroy();
        }
    }

    protected abstract whenToUnwatch(): Subject<boolean>;

    protected abstract whereToRender(renderableManipulator: RenderableManipulator): string;
}