import { Renderable, TrackChanges } from "@web/core";
import { UserService } from "@app/services/user.service";
import { Router } from "@web/router";

@Renderable({
    template: require('./login.page.html'),
    style: require('./login.page.css')
})
export class LoginPage {
    constructor(private userService: UserService, private router: Router) {
    }

    public email: string = "";
    public password: string = "";
    @TrackChanges()
    public invalidData: boolean = false;

    public login(): void {
        this.userService.login(this.email, this.password).subscribe((res) => {
            if (res) {
                this.router.navigate('home');
            } else {
                this.invalidData = true;
            }
        });
    }
}
