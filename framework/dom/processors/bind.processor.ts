import { Utils } from "@web/utils";
import { AttributeParser } from "../utils/attribute.parser";
import { DomProcessor } from "../dom-processor";

export class BindProcessor implements DomProcessor {

    public processElement(elementToProcess: Element, context: any): Element {
        const inputelEments = elementToProcess.querySelectorAll('[data-bind]');
        for (const inputElement of inputelEments) {
            const attributeValue = inputElement.getAttribute('data-bind');

            inputElement.addEventListener('change', () => {
                if (context[attributeValue] !== undefined) {
                    context[attributeValue] = inputElement.value;
                } else {
                    Utils.printError(`Variable: "${attributeValue}" doesn't exist on
                    ${context.__proto__.constructor.name}! Is it initialised with "" ?`);
                }
            });
        }

        return elementToProcess;
    }
}