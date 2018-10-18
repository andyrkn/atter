export class UrlTree {
    private _segments: string[];

    private _rawUrl: string;
    private _routeParameter: string;
    private _hasParameter: boolean = false;

    constructor() {

        this._rawUrl = location.hash.slice(1);
        if(this.rawUrl.endsWith('/')) {
            this._rawUrl = this._rawUrl.slice(0, this._rawUrl.lastIndexOf('/'));
        }

        this._segments = this._rawUrl.slice(1).split('/');
        let parameterIndex = this._rawUrl.lastIndexOf('/');
        if (parameterIndex != 0) {
            this._hasParameter = true;
            this._routeParameter = this._rawUrl.slice(parameterIndex +1);
            this._rawUrl = this._rawUrl.slice(0, parameterIndex);
        }
    }

    public get segments(): string[] {
        return this._segments;
    }

    public get rawUrl(): string {
        return this._rawUrl;
    }

    public get routeParameter(): string {
        return this._routeParameter;
    }

    public get hasParameter(): boolean {
        return this._hasParameter;
    }
}