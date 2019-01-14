import { Observable, from } from "rxjs";
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

    public getUserActivities(): Observable<any> {
        return from(new Promise((resolve) =>
            this.database.ref('dashboards/' + this.userId).once('value')
                .then((snapshot) => { resolve(snapshot.val()); })));
    }

    public getFollowedActivities(): Observable<any> {
        return from(new Promise((resolve) =>
            this.database.ref('following/' + this.userId).once('value')
                .then((snapshot) => { resolve(this.getActivityDetails(snapshot.val())); })));
        // .then((snapshot) => { resolve(snapshot.val()); })));
    }

    private getActivityDetails(activities) {
        const res = {};

        // tslint:disable-next-line:forin
        for (const i in activities) {
            this.database.ref('activities/' + activities[i]).once('value')
                .then((snapshot) => {
                    const data = snapshot.val();
                    res[activities[i]] = { name: data.name, iconID: data.iconID };
                });
        }
        return res;
    }
}