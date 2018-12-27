export interface DomProcessor {
    processElement(elementToProcess: Element, context: Function): Element;
}