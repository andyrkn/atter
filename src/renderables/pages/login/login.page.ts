import { UrlTree, Router } from "@web/router";
import { Renderable, TrackChanges } from "@web/core";
import { AppContainer } from "@web/core/aplication/app-container";
import { TestService } from "@app/services";

@Renderable({
    folder: 'pages/login',
    templateUrl: '/login.page.html',
    styleUrl: '/login.page.css'
})
export class LoginPage {

    public id: string;

    constructor(private testService: TestService) {
        this.id = "1";
    }
}