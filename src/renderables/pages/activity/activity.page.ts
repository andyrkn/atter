import { Renderable, TrackChanges, AfterRender } from "@web/core";
import { FillerDataService } from "@app/services/filler.data.service";
import { UrlTree } from "@web/router";
import { CheckInServivce } from "../dashboard/services/check-in.service";

@Renderable({
    template: require('./activity.page.html'),
    style: require('./activity.page.css')
})
export class Activity implements AfterRender {

    @TrackChanges()
    public canCheckIn: boolean = false;

    public activity: any;

    constructor(private fillerDataService: FillerDataService, private checkinService: CheckInServivce) {
        this.activity = this.fillerDataService.getFollowedActivityId(new UrlTree().routeParameter);
        this.canCheckIn = this.checkinService.checkinStatus;
    }

    public afterRender(): void {
        // just a hack to be replaced
        if (this.canCheckIn) {
            document.getElementById('check-in-button').addEventListener('click', () => {
                this.canCheckIn = false;
            });
        }
    }
}