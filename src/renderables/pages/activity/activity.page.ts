import { Renderable, TrackChanges, AfterRender } from "@web/core";
import { UrlTree } from "@web/router";
import { FireBaseActivityService } from "@app/services/firebase/firebase-activities.service";
import { BehaviorSubject } from "rxjs";
import { FireBaseCheckInService } from "@app/services/firebase/firebase-checkin.service";
import { GeolocationService } from "@app/services/geolocation.service";
import { Coordinates } from "@app/services/coordinates";
import { UserService } from "@app/services/user.service";

@Renderable({
    template: require('./activity.page.html'),
    style: require('./activity.page.css')
})
export class Activity {

    private activityID = new UrlTree().routeParameter;
    private activitySubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
    private _checkInsSubject = new BehaviorSubject<any>(null);

    @TrackChanges()
    public canCheckIn: boolean = false;

    @TrackChanges()
    public activity: any = {};

    @TrackChanges()
    public checkInData: any[] = [];

    public userEmail: string = "";

    constructor(
        private firebaseActivityService: FireBaseActivityService,
        private firebaseCheckInService: FireBaseCheckInService,
        private geolocationService: GeolocationService,
        private userService: UserService) {
        this.userEmail = this.userService.user.email;
        this.registerActivitySubject();
    }

    private registerActivitySubject() {

        this.firebaseActivityService.getObservableActivityDetails(this.activityID, this.activitySubject);

        this.activitySubject.subscribe((data) => {
            if (data.owner) { data.owner = data.owner.split('@')[0]; }
            this.canCheckIn = data.ableToCheckIn;
            this.activity = data;
        });

        this.firebaseCheckInService.getAllCheckins(this.activityID, this._checkInsSubject);
        this._checkInsSubject.subscribe((data) => {
            this.checkInData = [];
            // tslint:disable-next-line:forin
            for (const date in data) {
                const currentDate = { date: date, checkins: [] };
                // tslint:disable-next-line:forin
                for (const type in data[date]) {
                    // tslint:disable-next-line:forin
                    for (const user in data[date][type]) {
                        const checkin = {
                            email: user.replace(',', '.'),
                            type: type === 'legalcheckins' ? "legal" : "fraud",
                            grade: data[date][type][user]['grade'],
                            freeText: data[date][type][user]['freeText']
                        };
                        currentDate.checkins.push(checkin);
                    }
                }
                this.checkInData.push(currentDate);
            }
            console.log(this.checkInData);
        });
    }

    public checkIn(): void {
        this.geolocationService.calculateDistance
            (new Coordinates(this.activity.coords.longitude, this.activity.coords.latitude))
            .subscribe((actualDistance) => {
                console.log('distance: ' + actualDistance);
                let legal = false;
                if (actualDistance <= this.activity.distance) { legal = true; }

                this.firebaseCheckInService.setUserCheckIn(this.activityID, this.activity.lastCheckInDate, actualDistance, legal)
                    .subscribe((res) => { console.log(res); });
            });
    }
}