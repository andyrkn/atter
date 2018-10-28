import { RenderableManipulator } from "@web/core";
import { Encapsulator } from "./encapsulator";

export class StyleHandler {
    private headElement: Element;

    constructor() {
        this.headElement = document.getElementsByTagName('head')[0];
    }

    public handle(renderableManipulator: RenderableManipulator): void {
        if (!renderableManipulator.styleRendered) {
            const styleEncapsulated = Encapsulator.encapsulateStyle(renderableManipulator.getStyle(), renderableManipulator.renderingIndex);
            const styleElement = document.createElement('style');
            styleElement.innerHTML = styleEncapsulated;
            this.headElement.appendChild(styleElement);
        }
    }
}