import { Injectable } from "@web/core";
import { A } from "./A.service";

@Injectable()
export class TestService {
    public _variable: number = 12;

    constructor() { }

    public increase() {
        this._variable++;
    }

    public getVariable() {
        return this._variable;
    }
}