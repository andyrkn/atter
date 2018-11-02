import { Renderable } from "@web/core";
import { UserService } from "@app/services/user.service";
import { Router } from "@web/router";

@Renderable({
    folderPathRelativeToRenderablesFolder: 'pages/log-out',
    templateUrl: './log-out.page.hmtl'
})
export class LogoutPage {
    constructor(userService: UserService, router: Router) {
        userService.logout();
        router.navigate('home');
    }
}