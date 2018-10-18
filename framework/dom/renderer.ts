export class Renderer {
    private renderElement: Element;

    constructor() {
        this.renderElement = document.getElementsByTagName('render-container')[0];
    }

    public renderToRouter(template: string): void {
        this.render(this.renderElement, template);
    }

    private render(element: Element, template: string): void {
        element.innerHTML = template;
    }
}