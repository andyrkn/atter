import { InstanceManager, RenderableManipulator } from "@web/core";
import { Renderer, StyleHandler } from "@web/dom";

import { Subject } from "rxjs";

import { RenderableManipulatorHandler } from "./renderable-manipulator-handler";

export class ComponentManipulatorHandler extends RenderableManipulatorHandler {
    constructor(renderer: Renderer, styleHandler: StyleHandler, instanceManager: InstanceManager) {
        super(renderer, styleHandler, instanceManager);
    }

    protected whenToUnwatch(): Subject<boolean> {
        return new Subject<boolean>();
    }

    protected whereToRender(renderableManipulaotr: RenderableManipulator): string {
        return renderableManipulaotr.selector;
    }
}