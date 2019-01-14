import { Renderable } from "@web/core";
import { AuthFirebaseSerivce } from "@app/services/firebase/firebase-auth.service";
import { UserService } from "@app/services/user.service";
import { Router } from "@web/router";

@Renderable({
    template: require('./register.page.html'),
    style: require('./register.page.css')
})
export class RegisterPage {

    public email: string = "";
    public password: string = "";

    constructor(
        private authFirebaseSerivce: AuthFirebaseSerivce,
        private userService: UserService,
        private router: Router) {
    }

    public register() {
        this.authFirebaseSerivce.register(this.email, this.password).subscribe((result) => {
            if (result) {
                this.userService.login(this.email, this.password).subscribe((res) => {
                    if (res) {
                        this.router.navigate('home');
                    }
                });
            }
        });
    }
}
