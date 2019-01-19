import { BaseImporter } from './base.importer';
import { Injectable } from "@web/core";

@Injectable()
export class DropboxImporter extends BaseImporter {

    constructor() {
        super();
        this.appkey = "8w54dor24s7wd5y";
        this.appsecret = "0qfox8tfdcida8i";
        this.redirecturi = "http://localhost:3000/";
        this.authorizeuri = "https://www.dropbox.com/oauth2/authorize";
    }

    private getAuthorizeLink(): string {
        return this.authorizeUri+"?client_id=" + this.appKey
            + "&response_type=code" + "&redirect_uri=" + this.redirecturi;
    }
    public authorizeApp() {
        window.location.href = this.getAuthorizeLink();
    }
    public itemKey(): string{
        return "dropBoxCode";
    }
}