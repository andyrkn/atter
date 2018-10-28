import { Injectable } from "@web/core";

@Injectable()
export class A {
    constructor() { }

    public getAvar(): string {
        return "class A";
    }
}