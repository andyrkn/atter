import * as request from "superagent";
import { from, Observable } from "rxjs";
export abstract class BaseImporter {
    protected name: string = "";
    protected appkey: string = "";
    protected appsecret: string = "";
    protected redirecturi: string = "http://localhost:3000/";
    protected authorizeuri: string = "";
    protected authentificateuri: string = "";
    protected requestContentType: string = "";
    protected requestAuth: string = "";

    public getName(): string { return this.name; }
    public get appKey() {
        return this.appkey;
    }

    public get appSecret() {
        return this.appsecret;
    }

    public get redirectUri() {
        return this.redirecturi;
    }

    public get authorizeUri() {
        return this.authorizeuri;
    }

    public obtainOauthToken(code: string): Observable<any> {
        const body: {} = this.obtainBody(code);
        return from(request.post(this.authentificateuri)
            .set('Accept', 'application/json')
            .set('Content-type', this.requestContentType)
            .set('Authorization', this.getEncodedCredentials())
            .send(body));
    }

    public authorizeApp() {
        window.location.href = this.getAuthorizeLink();
    }

    protected abstract itemKey(): string;
    protected abstract getAuthorizeLink(): string;
    protected abstract obtainBody(code): {};
    protected abstract getCredentials();
    public abstract obtainFiles(numberOfFiles: number): Observable<any>;
    public abstract obtainDataFromFile(fileName : string): Observable<any>;
    private getEncodedCredentials(): string {
        return "Basic " + new Buffer(this.appKey + ":" + this.appsecret).toString("base64");
    }

}
