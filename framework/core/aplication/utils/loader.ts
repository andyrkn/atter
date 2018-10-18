import { Utils } from "@web/utils";

export class Loader {

    public static load(toLoadPath: string): string {
        return Utils.readTextFile(toLoadPath);
    }
}