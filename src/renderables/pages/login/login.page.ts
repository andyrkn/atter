import { UrlTree, Router } from "@web/router";
import { Renderable, TrackChanges } from "@web/core";
import { AppContainer } from "@web/core/aplication/app-container";
import { TestService, NeedyService } from "@app/services";

@Renderable({
    folder: 'pages/login',
    templateUrl: '/login.page.html',
    styleUrl: '/login.page.css'
})
export class LoginPage {

    public id: number = this.testService.getVariable();
    constructor(
        private testService: TestService,
        private needyService: NeedyService) {

        console.log(this.id);
        this.testService.increase();
    }
}
