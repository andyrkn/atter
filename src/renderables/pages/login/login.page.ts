import { Renderable } from "@web/core";
import { Router } from "@web/router";

@Renderable({
    folder: 'pages/login',
    templateUrl: '/login.page.html',
    styleUrl: '/login.page.css'
})
export class LoginPage {

    public id: number = 1;
    constructor(private router: Router) {
        setTimeout(() => { router.navigate("/home"); }, 2000);
        console.log(this.id);
    }
}
