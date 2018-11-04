import { RenderableManipulator } from "@web/core";
import { Encapsulator } from "./encapsulator";

export class StyleHandler {
    private headElement: Element;

    constructor() {
        this.headElement = document.getElementsByTagName('head')[0];
    }

    public handle(renderableManipulator: RenderableManipulator): void {
        if (!renderableManipulator.styleRendered) {
            const style = renderableManipulator.getStyle();
            if (style) {
                const styleEncapsulated = Encapsulator.encapsulateStyle(style, renderableManipulator.renderingIndex);
                const styleElement = document.createElement('style');
                styleElement.setAttribute('type', 'text/css');
                styleElement.innerHTML = styleEncapsulated;
                this.headElement.appendChild(styleElement);
                renderableManipulator.styleRendered = true;
            }
        }
    }
}