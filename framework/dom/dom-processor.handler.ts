import { DomProcessor } from "./dom-processor";
import { Encapsulator } from "./encapsulator";
import { Renderer } from "./renderer";
import { ClickProcessor } from "./processors/click.processor";
import { SubmitProcessor } from "./processors/submit.processor";

const processors: Function[] = [
    ClickProcessor,
    SubmitProcessor
];

export class DomProcessorHandler {
    private instancesOfProcessors: DomProcessor[] = [];

    constructor(private renderer: Renderer) {
        for (const processor of processors) {
            this.instancesOfProcessors.push(new processor.prototype.constructor());
        }
    }

    public handle(selector: string, toRender: string, renderingIndex: number, context: any): void {
        const element = this.createElement(selector, toRender, renderingIndex);
        this.process(element, context);
        this.renderer.render(selector, element);
    }


    private createElement(selector: string, template: string, renderingIndex: number): Element {
        const result = template.replace(/>[\s]+\</g, "><");
        const encapsulatedTemplate = Encapsulator.encapsulateTempalte(result, renderingIndex);
        const element = document.createElement(selector);
        element.innerHTML = encapsulatedTemplate;
        return element;
    }

    private process(element: Element, context: any): void {
        for (const processor of this.instancesOfProcessors) {
            element = processor.processElement(element, context);
        }
    }
}