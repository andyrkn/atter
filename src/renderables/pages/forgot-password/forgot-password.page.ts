import { Renderable } from "@web/core";
import { Router } from "@web/router";

@Renderable({
    folderPathRelativeToRenderablesFolder: 'pages/forgot-password',
    templateUrl: '/forgot-password.page.html',
    styleUrl: '/forgot-password.page.css'
})
export class ForgotPasswordPage {

    public id: number = 1;
    constructor(private router: Router) {
    }
}
