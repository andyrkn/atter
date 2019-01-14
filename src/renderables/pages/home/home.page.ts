import { Renderable, TrackChanges } from "@web/core";
import { FillerDataService } from "@app/services/filler.data.service";
import { UserService } from "@app/services/user.service";
import { FireBaseActivityService } from "@app/services/firebase/firebase-activities.service";

@Renderable({
    template: require('./home.page.html'),
    style: require('./home.page.css')
})
export class HomePage {
    public appTitle: string = 'Atter';

    @TrackChanges()
    public loggedIn: boolean;

    @TrackChanges()
    public followedActivities: any = {};

    @TrackChanges()
    public myActivities: any = {};

    constructor(
        private userService: UserService,
        private firebaseActivities: FireBaseActivityService
    ) {
        this.userService.onLoginChange().subscribe((loginStatus: boolean) => this.loggedIn = loginStatus);

        if (this.userService.user) {
            this.getActivities();
        }
    }

    private getActivities(): void {

        this.firebaseActivities.getFollowedActivities().subscribe((following) => {
            this.followedActivities = following;
            this.logActivities(following, "followedactivities");
        });

        this.firebaseActivities.getUserActivities().subscribe((dashboards) => {
            this.myActivities = dashboards;
            this.logActivities(this.myActivities, "ownedactivities");
        });
    }

    private logActivities(activities, type: string): void {
        this.userService[type] = [];
        for (const key in activities) {
            if (key) {
                this.userService[type].push(key);
            }
        }
    }
}