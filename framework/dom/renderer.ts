import { Encapsulator } from "./encapsulator";

export class Renderer {
    public render(selector: string, elementToRender: Element): void {
        const targetElement = document.getElementsByTagName(selector)[0];
        targetElement.replaceWith(elementToRender);
    }
}