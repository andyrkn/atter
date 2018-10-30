import { Renderable } from "@web/core";
import { FillerDataService } from "@app/services/filler.data.service";
import { UserService } from "@app/services/user.service";

@Renderable({
    folderPathRelativeToRenderablesFolder: 'pages/home',
    templateUrl: './home.page.html',
    styleUrl: './home.page.css'
})
export class HomePage {
    public appTitle: string = 'Atter';
    public loggedIn: boolean = false;

    public followedActivities: any = [];
    public myActivities: any = [];

    constructor(
        private fillerDataService: FillerDataService,
        private userService: UserService) {

        this.followedActivities = this.fillerDataService.followedActivities;
        this.myActivities = this.fillerDataService.myActivities;
        this.loggedIn = this.userService.loggedIn;
    }
}