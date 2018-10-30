import { Injectable } from "@web/core";

@Injectable()
export class UserService {

    private _loggedIn: boolean = true;

    constructor() {

    }

    public get loggedIn(): boolean {
        return this._loggedIn;
    }
}