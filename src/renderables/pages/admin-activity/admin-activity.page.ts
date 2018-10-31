import { Renderable } from "@web/core";
import { Router } from "@web/router";

@Renderable({
    folderPathRelativeToRenderablesFolder: 'pages/admin-activity',
    templateUrl: '/admin-activity.page.html',
    styleUrl: '/admin-activity.page.css'
})
export class AdminActivityPage {

    public id: number = 1;
    constructor(private router: Router) {
    }
}
