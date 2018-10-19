export class Renderer {
    private renderElements: HTMLCollectionOf<Element>[] = [];

    constructor() {
    }

    public renderTo(selector: string, template: string): void {
        let elementsToRenderIn: HTMLCollectionOf<Element> = this.renderElements[selector];
        if(!elementsToRenderIn) {
            elementsToRenderIn = document.getElementsByTagName(selector);
            this.renderElements[selector] = elementsToRenderIn; 
        }

        this.render(elementsToRenderIn, template);
    }

    private render(elements: HTMLCollectionOf<Element>, template: string): void {
        for(const element of elements) {
            element.innerHTML = template;
        }
    }
}