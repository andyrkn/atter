import { Renderable, AfterRender } from "@web/core";
import { UserService } from "@app/services/user.service";
import { Router } from "@web/router";

@Renderable({
    template: require('./login.page.html'),
    style: require('./login.page.css')
})
export class LoginPage implements AfterRender {
    constructor(private userService: UserService, private router: Router) {
    }

    public afterRender(): void {
        // just a hack, when onClick will be implemented the code will not use document at all
        // don't do this
        document.getElementById("login-submit").addEventListener('click', () => {
            this.userService.login();
            this.router.navigate('home');
        });
    }
}
