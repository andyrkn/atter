import * as diffDom from 'diff-dom';

export class Renderer {
    private diffDomInstance: any;
    constructor() {
        this.diffDomInstance = new diffDom({
            valueDiffing: false
        });
    }

    public render(selector: string, elementToRender: Element): void {
        const targetElement = document.getElementsByTagName(selector)[0];
        targetElement.replaceWith(elementToRender);
        // // const differences = this.diffDomInstance.diff(targetElement, elementToRender);
        // // const computedElement = this.computeDiferences(targetElement,elementToRender, differences);
        // // targetElement.replaceWith(computedElement);
    }

    private computeDiferences(targetElement: Element, elementToRender: Element, differences: any[]): Element {
        for (const difference of differences) {
            let elementModifed: Element = this.getElementModified(targetElement, difference.route);
            if (difference.action === 'replaceElement') {
                const elem = elementToRender.cloneNode(true) as Element;
                const newValue: Element = this.getElementModified(elem, difference.route);
                elementModifed.replaceWith(newValue);
            }
            if (difference.action === 'addElement') {
                const newValue = this.getElementModified(elementToRender, difference.route);
                if (newValue) {
                    targetElement.appendChild(newValue);
                }
            }
            if (difference.action === 'removeElement') {
                targetElement.removeChild(elementModifed);
            }
            if (difference.action === 'modifyAttribute') {
                elementModifed.setAttribute(difference.name, difference.newValue)
            }
            if (difference.action === 'modifyTextElement') {
                elementModifed.nodeValue = difference.newValue;
            }
        }
        return targetElement;
    }

    private getElementModified(target: Element, routes: number[]): Element {
        let elementToReturn: any = target;
        for (const route of routes) {
            elementToReturn = elementToReturn.childNodes[route];
        }

        return elementToReturn;
    }
}