export class Encapsulator {
    private static encapsulatorAttributeName: string = '__renderable-'

    public static encapsulateTempalte(template: string, renderingIndex: number): string {
        return template.replace(/<[a-z0-9]+/g, `$& ${this.encapsualtorAttribute(renderingIndex)}`);
    }

    public static encapsulateStyle(style: string, renderingIndex: number): string {
        return style.replace(/([^\r\n ,{}()]+)(,(?=[^}]*{)|\s*{)/g, `$1[${this.encapsualtorAttribute(renderingIndex)}]$2`);
    }

    private static encapsualtorAttribute(renderingIndex: number): string {
        return `${this.encapsulatorAttributeName}${renderingIndex.toString()}`;
    }
}