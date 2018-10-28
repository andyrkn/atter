import { Injectable } from "@web/core";
import { A } from "./A.service";

@Injectable()
export class TestService {
    public _variable: number = 12;

    constructor(private a: A) { }

    public increase(): void {
        this._variable++;
    }

    public getVariable(): number {
        return this._variable;
    }

    public useAService(): string {
        return this.a.getAvar();
    }
}