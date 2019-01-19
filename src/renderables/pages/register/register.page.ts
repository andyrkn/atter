import { Renderable } from "@web/core";
import { AuthFirebaseSerivce } from "@app/services/firebase/firebase-auth.service";
import { UserService } from "@app/services/user.service";
import { Router } from "@web/router";
import { UserModel } from "@app/models/user.model";

@Renderable({
    template: require('./register.page.html'),
    style: require('./register.page.css')
})
export class RegisterPage {

    public email: string = "";
    public firstName: string = "";
    public lastName: string = "";
    public password: string = "";
    constructor(
        private authFirebaseSerivce: AuthFirebaseSerivce,
        private userService: UserService,
        private router: Router
    ) {
    }

    public register() {
        const userModel = new UserModel(this.firstName, this.lastName, this.email);
        console.log(userModel);
        this.authFirebaseSerivce.register(userModel.email, this.password).subscribe((result) => {
            if (result) {
                console.log(result);
                this.userService.login(userModel.email, this.password).subscribe((res) => {
                    if (res) {
                        this.userService.createUser(userModel);
                        this.router.navigate('home');
                    }
                });
            }
        });
    }
}
