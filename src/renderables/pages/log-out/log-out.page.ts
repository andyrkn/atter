import { Renderable } from "@web/core";
import { UserService } from "@app/services/user.service";
import { Router } from "@web/router";

@Renderable({
    template: require('./log-out.page.html')
})
export class LogoutPage {
    constructor(userService: UserService, router: Router) {
        userService.logout();
        router.navigate('home');
    }
}