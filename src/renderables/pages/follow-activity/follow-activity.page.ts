import { Renderable } from "@web/core";
import { FireBaseActivitySubscriptionService } from "@app/services/firebase/firebase-activity-subscription.service";

@Renderable({
    template: require('./follow-activity.page.html'),
    style: require('./follow-activity.page.css')
})
export class FollowActivity {

    public activityKey: string = "";

    constructor(
        private firebaseDataService: FireBaseActivitySubscriptionService
    ) { }

    public followActivity(): void {
        if (this.activityKey) {
            this.firebaseDataService.followActivity(this.activityKey)
                .subscribe((res) => {
                    if (res) { console.log("sucess"); } else { console.log("activity doesnt exist"); }
                });
        } else {
            alert("Invalid activity");
        }
    }
}