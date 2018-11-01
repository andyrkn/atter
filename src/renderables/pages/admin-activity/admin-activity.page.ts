import { Renderable } from "@web/core";
import { ClassInfo } from "./class-info";

@Renderable({
    folderPathRelativeToRenderablesFolder: 'pages/admin-activity',
    templateUrl: '/admin-activity.page.html',
    styleUrl: '/admin-activity.page.css'
})
export class AdminActivityPage {

    public id: number = 1;
    public classInfo: ClassInfo = new ClassInfo();
    constructor() {
        console.log(this.classInfo.weekDays);
    }
}