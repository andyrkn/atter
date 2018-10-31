import { Renderable } from "@web/core";

@Renderable({
    folderPathRelativeToRenderablesFolder: 'pages/dashboard',
    templateUrl: './dashboard.page.html',
    styleUrl: './dashboard.page.css'
})
export class Dashboard {
    constructor() {

    }
}