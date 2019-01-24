import { Renderable, TrackChanges } from "@web/core";
import { FireBaseActivitySubscriptionService } from "@app/services/firebase/firebase-activity-subscription.service";
import { NewActivityModel } from "@app/models/activity.model";
import { Router } from "@web/router";

@Renderable({
    template: require('./create-new-activity.page.html'),
    style: require('./create-new-activity.page.css')
})
export class CreateNewActivityPage {

    constructor(
        private firebaseDataService: FireBaseActivitySubscriptionService,
        private router: Router
    ) { }
    @TrackChanges()
    public error: string = "";
    public activityName: string = "";

    private selectedIcon: number;

    public selectIcon(index: number): void {
        this.selectedIcon = index;
    }
    public createActivity(): void {
        if (!this.activityName) {
            this.error = "Activity name is empty";
            return;
        }

        const activity = new NewActivityModel(
            this.activityName,
            this.selectedIcon !== undefined ? this.selectedIcon : 1
        );

        this.firebaseDataService.createActivity(activity).subscribe(() => this.router.navigate('home'));
    }
}