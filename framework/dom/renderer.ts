import { Encapsulator } from "./encapsulator";

export class Renderer {
    private renderElements: Element[] = [];

    constructor() {
    }

    public renderTo(selector: string, template: string, renderingIndex: number): void {
        let elementToRenderIn: Element = this.renderElements[selector];
        if (!elementToRenderIn) {
            elementToRenderIn = document.getElementsByTagName(selector)[0];
            this.renderElements[selector] = elementToRenderIn;
        }

        this.render(elementToRenderIn, template, renderingIndex);
    }

    private render(element: Element, template: string, renderingIndex: number): void {
        const encapsulatedTemplate = Encapsulator.encapsulateTempalte(template, renderingIndex);
        element.innerHTML = encapsulatedTemplate;
    }
}