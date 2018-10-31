import { Renderable } from "@web/core";
import { FillerDataService } from "@app/services/filler.data.service";
import { UrlTree } from "@web/router";

@Renderable({
    folderPathRelativeToRenderablesFolder: 'pages/activity',
    templateUrl: './activity.page.html',
    styleUrl: './activity.page.css'
})
export class Activity {
    public activity: any;
    constructor(private fillerDataService: FillerDataService) {
        this.activity = this.fillerDataService.getFollowedActivityId(new UrlTree().routeParameter);
    }
}