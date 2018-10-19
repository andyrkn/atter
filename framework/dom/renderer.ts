export class Renderer {
    private renderElements: ShadowRoot[] = [];

    constructor() {
    }

    public renderTo(selector: string, template: string): void {
        let elementToRenderIn: ShadowRoot = this.renderElements[selector];
        if(!elementToRenderIn) {
            elementToRenderIn = document.querySelector(selector).attachShadow({ mode: 'closed'});
            this.renderElements[selector] = elementToRenderIn;
        }

        this.render(elementToRenderIn, template);
    }

    private render(element: ShadowRoot, template: string): void {
            element.innerHTML = template;
    }
}