import { Renderable } from "@web/core";

@Renderable({
    folderPathRelativeToRenderablesFolder: 'pages/create-new-activity',
    templateUrl: '/create-new-activity.page.html',
    styleUrl: '/create-new-activity.page.css'
})
export class CreateNewActivityPage {
    constructor() {
    }
}