import { Utils } from "../utils";

export class HttpResponse {
    private statusCode;
    private rawText;

    constructor(response) {
        this.statusCode = response.status;
        this.rawText = response.responseText;
    }

    public get body() {
        return Utils.tryParse(this.rawText);
    }
}
