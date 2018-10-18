export class RoutePath {
    private _rawPath: string;
    private _supportsParameter: boolean = false;
    private _parameterName: string;
    private _path: string;

    private _isDefaultRoutePath: boolean = false;

    constructor(path: string) {
        if (path === '**') {
            this._isDefaultRoutePath = true;
        }

        if (path.indexOf('/') !=0 ) {
            path = `/${path}`;
        }

        this.normalizePath(path);
    }

    private normalizePath(path: string): void {
        this._rawPath = path;
        const parameterIndex = path.lastIndexOf(':');
        if (parameterIndex != -1) {
            this._path = this._rawPath.slice(0, parameterIndex - 1);
            this._parameterName = this._rawPath.slice(parameterIndex + 1);
            this._supportsParameter = true;
        } else {
            this._path = this._rawPath;
        }
    }

    public get rawText(): string {
        return this._rawPath;
    }

    public get supportsParameter(): boolean {
        return this._supportsParameter;
    }

    public get parameterName(): string {
        return this._parameterName;
    }

    public get path(): string {
        return this._path;
    }

    public get isDefaultRoutePath(): boolean {
        return this._isDefaultRoutePath;
    }
}