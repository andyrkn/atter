export abstract class BaseImporter {
    protected appkey: string = "";
    protected appsecret: string = "";
    protected redirecturi: string = "http://localhost:3000/";
    protected authorizeuri: string = "";
    protected currentCode: string = "";

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

    public abstract authorizeApp();

    public setCurrentCodeInLocalStorage(code: string) {
        localStorage.setItem(this.itemKey(), code);
    }
    public setCurrentCode(code: string) {
        this.currentCode = code;
    }
    public resetLocalStorageCode() {
        localStorage.removeItem(this.itemKey());
    }
    public resetCurrentCode() {
        this.currentCode = "";
    }
    public getCurrentCodeFromLocalStorage() {
        return localStorage.getItem(this.itemKey());
    }
    public getCurrentCode() {
        return this.currentCode;
    }
    public abstract itemKey(): string;
}

