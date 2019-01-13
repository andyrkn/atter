import { Action } from "./action";

export class AttributeParser {
    public static getAction(value: string): Action {
        const indexOfCall = value.indexOf('(');
        const method = value.slice(0, indexOfCall);
        const endOfCall = value.indexOf(')');
        const argsAsString = value.slice(indexOfCall + 1, endOfCall);
        let args = [];
        if (argsAsString.length > 0) {
            args = argsAsString.split(',');
        }
        return {
            method: method,
            args: args
        };
    }
}