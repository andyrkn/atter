export class Utils {
    public static tryParse(text): any {
        let result;
        try {
            result = JSON.parse(text);
        } catch {
            result = text;
        } finally {
            return result;
        }
    }

    public static readTextFile(file: string): string {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", file, false);
        xmlhttp.send();
        return xmlhttp.responseText;
    }

    public static printError(error) {
        console.error(error);
    }
}