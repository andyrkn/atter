import { Renderable, TrackChanges, AfterRender } from "@web/core";
import { UrlTree } from "@web/router";
import { FireBaseActivityService } from "@app/services/firebase/firebase-activities.service";
import { BehaviorSubject } from "rxjs";
import { FireBaseCheckInService } from "@app/services/firebase/firebase-checkin.service";
import { GeolocationService } from "@app/services/geolocation.service";
import { Coordinates } from "@app/services/coordinates";

@Renderable({
    template: require('./activity.page.html'),
    style: require('./activity.page.css')
})
export class Activity {

    private activityID = new UrlTree().routeParameter;
    private activitySubject: BehaviorSubject<any> = new BehaviorSubject<any>({});

    @TrackChanges()
    public canCheckIn: boolean = false;

    @TrackChanges()
    public activity: any = {};

    constructor(
        private firebaseActivityService: FireBaseActivityService,
        private firebaseCheckInService: FireBaseCheckInService,
        private geolocationService: GeolocationService) {
        this.registerActivitySubject();
    }

    private registerActivitySubject() {

        this.firebaseActivityService.getObservableActivityDetails(this.activityID, this.activitySubject);

        this.activitySubject.subscribe((data) => {
            // console.log(data);
            if (data.owner) { data.owner = data.owner.split('@')[0]; }
            this.canCheckIn = data.ableToCheckIn;
            this.activity = data;
        });
    }

    public checkIn(): void {

        this.geolocationService.calculateDistance
            (new Coordinates(this.activity.coords.longitude, this.activity.coords.latitude))
            .subscribe((actualDistance) => {
                console.log('distance: ' + actualDistance);
                let legal = false;
                if (actualDistance < this.activity.distance) { legal = true; }

                this.firebaseCheckInService.userCheckIn(this.activityID, this.activity.lastCheckInDate, actualDistance, legal)
                    .subscribe((res) => { console.log(res); });
            });
    }
}