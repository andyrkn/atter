import { Page } from "@web/core";
import { UrlTree } from "@web/router";

@Page({
    folder: 'login',
    templateUrl: '/login.page.html',
    styleUrl: '/login.page.html'
})
export class LoginPage {
    public id: string;
    constructor() {
        this.id = new UrlTree().routeParameter;
    }
}