import { Renderable } from "@web/core";
import { UserService } from "@app/services/user.service";
import { Router } from "@web/router";
import { AuthFirebaseSerivce } from "@app/services/auth-firebase.service";

@Renderable({
    template: require('./login.page.html'),
    style: require('./login.page.css')
})
export class LoginPage {
    constructor(private userService: UserService, private router: Router) {
    }

    public login(): void {
        this.userService.login();
        this.router.navigate('home');
    }
}
