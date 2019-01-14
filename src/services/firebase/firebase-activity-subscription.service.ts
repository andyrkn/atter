import { Observable, from } from "rxjs";
import { Injectable } from "@web/core";
import { NewActivityModel } from "@app/models/activity.model";
import { UserService } from "../user.service";
import { FirebaseService } from "./firebase.service";

@Injectable()
export class FireBaseActivitySubscriptionService {

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

    private checkActivityExistance(code: string): Observable<any> {
        return from(new Promise((resolve) =>
            this.database.ref('activities/' + code).once('value')
                .then((snapshot) => resolve(snapshot.val()))));
    }

    public createActivity(activity: NewActivityModel) {

        const dashboardref = this.database.ref('dashboards/' + this.userId + '/')
            .push({ name: activity.name, iconID: activity.iconID }, (e) => { if (!e) { alert("succes"); } });

        activity['owner'] = this.userService.user.email;
        this.database.ref('activities/' + dashboardref.key)
            .set(activity, (e) => { if (!e) { console.log(e); } });
    }

    public followActivity(code: string): Observable<boolean> {
        return from(new Promise((resolve) =>
            this.checkActivityExistance(code).subscribe(
                (res) => {
                    if (res) {
                        this.database.ref('following/' + this.userId).push(code);
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })));
    }
}