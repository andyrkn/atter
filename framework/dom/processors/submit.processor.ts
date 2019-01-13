import { AttributeParser } from "../utils/attribute.parser";
import { Utils } from "@web/utils";
import { DomProcessor } from "../dom-processor";

export class SubmitProcessor implements DomProcessor {
    public processElement(elementToProcess: Element, context: any): Element {
        const submitables = elementToProcess.querySelectorAll('[data-submit]');
        for (const element of submitables) {
            const attributeValue = element.getAttribute('data-submit');
            const action = AttributeParser.getAction(attributeValue);

            element.addEventListener('submit', () => {
                if (context[action.method]) {
                    context[action.method](...action.args);
                    window.history.pushState(null, null, window.location.pathname);
                } else {
                    Utils.printError(`Method: "${action.method}" doesn't exists on ${context.__proto__.constructor.name}!`)
                }
            });
        }

        return elementToProcess;
    }

}