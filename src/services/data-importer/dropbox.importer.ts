import { BaseImporter } from './base.importer';
import { Injectable } from "@web/core";
import { UserService } from '../user.service';
import { from, Observable } from "rxjs";
import * as request from "superagent";
@Injectable()
export class DropboxImporter extends BaseImporter {

    constructor(private userService: UserService) {
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
    public obtainFiles(data: any): Observable<any> {
        return from(request.post("https://api.dropboxapi.com/2/files/list_folder")
            .set('Authorization', "Bearer " + data)
            .set('Accept', 'application/json')
            .send({
                path: "/atter-resources",
                recursive: false,
                include_media_info: false,
                include_deleted: false,
                include_has_explicit_shared_members: false,
                include_mounted_folders: true
            }));
    }
    public obtainDataFromFile(filePath: string, data: string) {
        return from(request.post("https://content.dropboxapi.com/2/files/download")
            .set('Authorization', "Bearer " + data)
            .set('Accept', 'application/json')
            .set('Dropbox-API-Arg', '{"path": "/atter-resources/' + filePath + '"}')
            .send());
    }

}