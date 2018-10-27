export class TestService {
    public _variable: number = 1;

    constructor() { }

    public increase() {
        this._variable++;
    }

    public getVariable() {
        return this._variable;
    }
}