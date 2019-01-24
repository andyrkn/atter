import { Observable, from, of } from "rxjs";
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

    private checkActivityExistance(code: string): Observable<firebase.database.DataSnapshot> {
        return from(this.database.ref('activities').orderByChild('followCode').equalTo(code).once('value'));
    }

    public createActivity(activity: NewActivityModel): Observable<any> {
        activity['followCode'] = this.createFollowCode();
        activity['gradesVisibility'] = 'private';
        const dashboardref = this.database.ref('dashboards/' + this.userId + '/')
            .push({ name: activity.name, iconID: activity.iconID }, (e) => { if (!e) { } });

        activity['owner'] = this.userService.user.email;
        return from(this.database.ref('activities/' + dashboardref.key)
            .set(activity, (e) => { if (!e) { console.log(e); } }));
    }

    public followActivity(code: string): Observable<boolean> {
        return from(new Promise((resolve) =>
            this.checkActivityExistance(code).subscribe(
                (res) => {
                    if (res.exists()) {
                        let actitvityId: string = '';
                        res.forEach((data) => { actitvityId = data.key.toString(); });
                        this.database.ref('following/' + this.userId).push(actitvityId);
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })));
    }

    private createFollowCode(): string {
        let followCode = new Date().getTime().toString().slice(7);
        const letters = ['a', 'b', 'c', 'd', 'e', 'f'];
        const index = Math.floor(Math.random() * 6);
        followCode += letters[index];
        return followCode;
    }
}