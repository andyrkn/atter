import { Renderable } from "@web/core";

@Renderable({
    folderPathRelativeToRenderablesFolder: 'pages/dashboard',
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.css'
})
export class Dashboard {
    constructor() {

    }
}