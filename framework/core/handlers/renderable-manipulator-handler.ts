import { Handler, RenderableManipulator, InstanceManager } from "@web/core";
import { Renderer, StyleHandler } from "@web/dom";
import { Subscription, Subject } from "rxjs";

import * as WatchJS from 'melanke-watchjs';

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
        let context: Function = this.instanceManager.getInstance(objectToHandle.renderableClass.prototype.constructor);

        const contextChangeSubject: Subject<boolean> = new Subject();

        this.handleStyle(objectToHandle);
        this.renderTemplate(objectToHandle, context);

        const subscription: Subscription = contextChangeSubject.subscribe(() => {
            this.renderTemplate(objectToHandle, context);
        })

        this.watch(objectToHandle, context, contextChangeSubject);
        this.whenToUnwatch().subscribe(() => this.unwatch(objectToHandle, context, subscription));
    }

    private renderTemplate(renderableManipulator: RenderableManipulator, context: any): void {
        const interpretation = renderableManipulator.getInterpretation();
        const toRender: string = interpretation(context);
        const selector = this.whereToRender(renderableManipulator);
        this.renderer.renderTo(selector, toRender);
    }

    private handleStyle(pageManipulator: RenderableManipulator): void {
        const pageStyle: string = pageManipulator.getStyle();
        this.styleHandler.handle(pageStyle);
    }

    private watch(objectToHandle: RenderableManipulator, context: Function, contextChangeSubject: Subject<boolean>): void {
        WatchJS.watch(context, objectToHandle.propertiesToTrack, () => {
            contextChangeSubject.next(true);
        });
    }

    private unwatch(objectToHandle: RenderableManipulator, context: Function, contextChangeSubscription: Subscription): void {
        WatchJS.unwatch(context, objectToHandle.propertiesToTrack);
        contextChangeSubscription.unsubscribe();
    }

    protected abstract whenToUnwatch(): Subject<boolean>;

    protected abstract whereToRender(renderableManipulator: RenderableManipulator): string;
}