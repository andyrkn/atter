import { Utils } from "@web/utils";
import { AttributeParser } from "../utils/attribute.parser";
import { DomProcessor } from "../dom-processor";

export class ClickProcessor implements DomProcessor {

    public processElement(elementToProcess: Element, context: any): Element {
        const elements = elementToProcess.querySelectorAll('[data-click]');
        for (const element of elements) {
            const attributeValue = element.getAttribute('data-click');
            const action = AttributeParser.getAction(attributeValue);

            element.addEventListener('click', () => {
                if (context[action.method]) {
                    context[action.method](...action.args);
                } else {
                    Utils.printError(`Method: "${action.method}" doesn't exist on ${context.__proto__.constructor.name}!`);
                }
            });
        }

        return elementToProcess;
    }
}