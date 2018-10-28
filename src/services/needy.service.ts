import { Injectable } from "@web/core";
import { TestService } from "./test.service";
import { A } from "./A.service";

@Injectable()
export class NeedyService {

    constructor(
        private testService: TestService,
        private a: A) { }

    public useTestService(): number {
        return this.testService.getVariable();
    }
}