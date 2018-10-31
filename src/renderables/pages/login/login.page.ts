import { Renderable } from "@web/core";
import { Router } from "@web/router";

@Renderable({
    folderPathRelativeToRenderablesFolder: 'pages/login',
    templateUrl: '/login.page.html',
    styleUrl: '/login.page.css'
})
export class LoginPage {
    constructor(private router: Router) {
    }
}
