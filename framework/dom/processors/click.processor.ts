import { Utils } from "@web/utils";
import { AttributeParser } from "../utils/attribute.parser";
import { DomProcessor } from "../pre-processor";

export class ClickProcessor implements DomProcessor {

    public processElement(elementToProcess: Element, context: any): Element {
        const elements = elementToProcess.querySelectorAll('[click]');
        for (const element of elements) {
            const attributeValue = element.getAttribute('click');
            const action = AttributeParser.getAction(attributeValue);

            element.addEventListener('click', () => {
                if (context[action.method]) {
                    context[action.method](...action.args);
                } else {
                    Utils.printError(`Method: "${action.method}" doesn't exists on ${context.__proto__.constructor.name}!`);
                }
            });
        }

        return elementToProcess;
    }
}