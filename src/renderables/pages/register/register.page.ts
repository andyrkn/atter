import { Renderable } from "@web/core";
import { AuthFirebaseSerivce} from "@app/services/auth-firebase.service";

@Renderable({
    template: require('./register.page.html'),
    style: require('./register.page.css')
})
export class RegisterPage {
    constructor(private authFirebaseSerivce: AuthFirebaseSerivce) {

    }
    public register() {

        const email = (document.getElementById("email-input") as HTMLInputElement).value;
        const password = (document.getElementById("password-input") as HTMLInputElement).value;

        this.authFirebaseSerivce.register(email, password).subscribe((result) => {

        });

    }
}
