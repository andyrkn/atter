import { Renderable, TrackChanges, AfterRender } from "@web/core";
import { FillerDataService } from "@app/services/filler.data.service";
import { UrlTree } from "@web/router";
import { CheckInServivce } from "../dashboard/services/check-in.service";
import { FireBaseActivityService } from "@app/services/firebase/firebase-activities.service";

@Renderable({
    template: require('./activity.page.html'),
    style: require('./activity.page.css')
})
export class Activity {

    private activityID = new UrlTree().routeParameter;

    @TrackChanges()
    public canCheckIn: boolean = true;

    @TrackChanges()
    public activity: any = {};

    constructor(
        private firebaseActivityService: FireBaseActivityService) {
        this.firebaseActivityService.getActivityDetails(this.activityID).subscribe((data) => {
            this.activity = data;
            console.log(this.activity);
        });
    }

    public checkIn(): void {
        // this.canCheckIn = false;
    }
}