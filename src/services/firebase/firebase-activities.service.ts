import { Observable, from, BehaviorSubject } from "rxjs";
import { Injectable } from "@web/core";
import { UserService } from "../user.service";
import { FirebaseService } from "./firebase.service";

@Injectable()
export class FireBaseActivityService {

    constructor(
        private firebaseService: FirebaseService,
        private userService: UserService) {
    }

    private get userId() {
        return this.userService.user.uid;
    }

    private get database() {
        return this.firebaseService.firebaseApp.database();
    }

    private async getAllActivitiesDetails(activities) {
        const res = {};

        // tslint:disable-next-line:forin
        for (const i in activities) {
            await this.database.ref('activities/' + activities[i]).once('value')
                .then((snapshot) => {
                    const data = snapshot.val();
                    res[activities[i]] = { name: data.name, iconID: data.iconID };
                });
        }
        return res;
    }

    public getUserActivities(): Observable<any> {
        return from(new Promise((resolve) =>
            this.database.ref('dashboards/' + this.userId).once('value')
                .then((snapshot) => { resolve(snapshot.val()); })));
    }

    public getFollowedActivities(): Observable<any> {
        return from(new Promise((resolve) =>
            this.database.ref('following/' + this.userId).once('value')
                .then((snapshot) => { resolve(this.getAllActivitiesDetails(snapshot.val())); })));
    }

    public getStaticActivityDetails(code: string): Observable<any> {
        return from(new Promise((resolve) =>
            this.database.ref('activities/' + code).once('value')
                .then((snapshot) => {
                    const data = snapshot.val();
                    data['id'] = snapshot.key;
                    resolve(data);
                })));
    }

    public getObservableActivityDetails(code: string, activity: BehaviorSubject<any>): void {

        this.database.ref('activities/' + code).on('value', (snapshot) => {
            // console.log(snapshot.val());
            activity.next(snapshot.val());
        });
    }
}