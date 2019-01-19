import { BaseImporter } from './base.importer';
import { Injectable } from "@web/core";
import { HttpClient } from '@web/http/http-client';
import { STATUS_CODES } from 'http';

@Injectable()
export class DropboxImporter extends BaseImporter {

    constructor() {
        super();
        this.name = "dropbox";
        this.appkey = "8w54dor24s7wd5y";
        this.appsecret = "0qfox8tfdcida8i";
        this.redirecturi = "http://localhost:3000/";
        this.authorizeuri = "https://www.dropbox.com/oauth2/authorize";
        this.authentificateuri = "https://api.dropboxapi.com/oauth2/token";
        this.requestContentType = "application/x-www-form-urlencoded";
    }

    public getAuthorizeLink(): string {
        return this.authorizeUri + "?client_id=" + this.appKey
            + "&response_type=code" + "&redirect_uri=" + this.redirecturi;
    }
    public itemKey(): string {
        return "dropBoxCode";
    }
    public obtainBody(code): {} {
        const body: {} = {
            code: code,
            grant_type: "authorization_code",
            redirect_uri: this.redirecturi
        };
        return body;
    }
    public getCredentials() {
        return { username: this.appkey, password: this.appSecret };
    }
}