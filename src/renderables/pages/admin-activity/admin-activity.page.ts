import { Renderable } from "@web/core";

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


class ClassInfo {
    public className: string;
    public description: string;
    public admin: string;
    public meetingDays: any = [];
    public startingTime: string;
    public endingTime: string;
    public status: string;
    public weekDays: any = [];
    constructor() {
        this.admin = "Andrei";
        this.description = " Description";
        this.status = "Active";
        this.className="Test class";
        this.weekDays=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
        this.meetingDays = ["Wed", "Fri","Sun"];
        this.startingTime = "15:00";
        this.endingTime = "16:00";
    }
}