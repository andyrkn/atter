import { UrlTree } from "@web/router";
import { Renderable } from "@web/core";

@Renderable({
    folder: 'pages/login',
    templateUrl: '/login.page.html',
    styleUrl: '/login.page.html'
})
export class LoginPage {
    public id: string;
    constructor() {
        this.id = new UrlTree().routeParameter;
    }
}