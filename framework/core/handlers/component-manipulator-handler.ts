import { InstanceManager, RenderableManipulator } from "@web/core";
import { Renderer, StyleHandler } from "@web/dom";

import { Subject } from "rxjs";

import { RenderableManipulatorHandler } from "./renderable-manipulator-handler";
import { DomProcessorHandler } from "@web/dom/dom-processor.handler";

export class ComponentManipulatorHandler extends RenderableManipulatorHandler {
    constructor(
        styleHandler: StyleHandler,
        instanceManager: InstanceManager,
        processorsHandler: DomProcessorHandler) {
        super(styleHandler, instanceManager, processorsHandler);
    }

    protected whenToUnwatch(): Subject<boolean> {
        return new Subject<boolean>();
    }

    protected whereToRender(renderableManipulaotr: RenderableManipulator): string {
        return renderableManipulaotr.selector;
    }
}