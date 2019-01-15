import { Injectable } from "@web/core";
import { UserService } from "../user.service";
import { FirebaseService } from "./firebase.service";
import { GeolocationService } from "../geolocation.service";
import { Coordinates } from "../coordinates";
import { from, Observable } from "rxjs";
import { LegalCheckInModel } from "@app/models/checkInModels/legalCheckIn.model";
import { IllegalCheckInModel } from "@app/models/checkInModels/illegalCheckIn.model";

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

    private get userEmail() {
        return this.userService.user.email;
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
            date.getUTCDate().toString() + '_' +
            (date.getMonth() + 1).toString() + '_' +
            date.getFullYear().toString() + '_' +
            date.getHours().toString() + ':' +
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

    public userCheckIn(activityID: string, datestring: string, distance: number, legal: boolean): Observable<any> {
        const checkInData = legal ?
            new LegalCheckInModel(this.userEmail, distance) : new IllegalCheckInModel(this.userEmail, distance);
        const route = legal ? 'checkins/' : 'frauds/';

        return from(new Promise((resolve) => {
            this.saveCheckIn(activityID, datestring, checkInData, route, resolve);
        }));
    }

    private saveCheckIn(activityID, datestring: string, checkInData: any, route: string, resolve) {
        this.database.ref(route + activityID + '/' + datestring + '/' + this.userId).set(checkInData)
            .then((res) => { if (res) { resolve(res); } });
    }
}