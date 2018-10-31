import { Renderable } from "@web/core";

@Renderable({
    folderPathRelativeToRenderablesFolder: 'pages/activity',
    templateUrl: './activity.page.html',
    styleUrl: './activity.page.css'
})
export class Activity {
    constructor() { }
}