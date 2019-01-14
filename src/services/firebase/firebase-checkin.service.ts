import { Injectable } from "@web/core";
import { UserService } from "../user.service";
import { FirebaseService } from "./firebase.service";
import { GeolocationService } from "../geolocation.service";
import { Coordinates } from "../coordinates";
import { from, Observable } from "rxjs";

@Injectable()
export class FireBaseCheckInService {

    constructor(
        private firebaseService: FirebaseService,
        private userService: UserService,
        private geolocationService: GeolocationService) {
    }

    private get userId() {
        return this.userService.user.uid;
    }

    private get database() {
        return this.firebaseService.firebaseApp.database();
    }

    private updateActivityData(activityData, activityID): Observable<{}> {
        return from(new Promise((resolve) =>
            this.database.ref('activities/' + activityID).update(activityData).then(
                (res) => { if (!res) { resolve(activityData); } },
                (err) => { resolve(err); })));
    }

    private prepareCheckInCoordinates(activityData, activityID: string, resolve): void {
        this.geolocationService.getCurrentLocation()
            .subscribe((coords: Coordinates) => {
                activityData['coords'] = coords;
                this.updateActivityData(activityData, activityID).subscribe((data) => { resolve(data); });
            });
    }

    private prepareCheckInActivityData(distance: number, activityID: string, resolve): void {

        const date = new Date();
        const datestring: string =
            date.getFullYear().toString() +
            date.getMonth().toString() +
            date.getUTCDate().toString() +
            date.getHours().toString() +
            date.getMinutes().toString();

        this.database.ref('activities/' + activityID).once('value')
            .then((snapshot) => {
                const activityData = snapshot.val();

                activityData['distance'] = distance;
                activityData['lastCheckInDate'] = datestring;
                activityData['ableToCheckIn'] = true;
                this.prepareCheckInCoordinates(activityData, activityID, resolve);
            });
    }

    private prepareActivityDisableCheckIn(activityID: string, resolve): void {
        this.database.ref('activities/' + activityID).once('value')
            .then((snapshot) => {
                const activityData = snapshot.val();
                activityData['ableToCheckIn'] = false;
                this.updateActivityData(activityData, activityID).subscribe((data) => {
                    resolve(data);
                });
            });
    }

    public enableActivityCheckIn(distance: number, activityID: string): Observable<{}> {
        return from(new Promise((resolve) =>
            this.prepareCheckInActivityData(distance, activityID, resolve)));
    }

    public disableActivityCheckIn(activityID: string): Observable<{}> {
        return from(new Promise((resolve) =>
            this.prepareActivityDisableCheckIn(activityID, resolve)
        ));
    }
}