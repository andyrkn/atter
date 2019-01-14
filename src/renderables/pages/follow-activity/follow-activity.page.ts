import { Renderable, TrackChanges } from "@web/core";
import { FireBaseActivitySubscriptionService } from "@app/services/firebase/firebase-activity-subscription.service";
import { Router } from "@web/router";

@Renderable({
    template: require('./follow-activity.page.html'),
    style: require('./follow-activity.page.css')
})
export class FollowActivity {

    public activityKey: string = "";

    @TrackChanges()
    public invalidKey: boolean = false;
    constructor(
        private firebaseDataService: FireBaseActivitySubscriptionService,
        private router: Router) { }

    public followActivity(): void {
        this.invalidKey = false;
        if (this.activityKey) {
            this.firebaseDataService.followActivity(this.activityKey)
                .subscribe((res) => {
                    if (res) { this.router.navigate('home'); } else { this.invalidKey = true; }
                });
        } else {
            alert("Invalid activity");
            this.invalidKey = true;
        }
    }
}