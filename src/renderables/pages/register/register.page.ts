import { Renderable } from "@web/core";
import { Router } from "@web/router";

@Renderable({
    folderPathRelativeToRenderablesFolder: 'pages/register',
    templateUrl: '/register.page.html',
    styleUrl: '/register.page.css'
})
export class RegisterPage {

    public id: number = 2;
    constructor(private router: Router) {
    }
}
