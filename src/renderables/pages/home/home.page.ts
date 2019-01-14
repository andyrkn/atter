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

        this.userService.userObservable.subscribe((data) => {
            if (data) {
                this.getActivities();
            }
        });
    }

    private getActivities(): void {

        this.firebaseActivities.getFollowedActivities().subscribe((following) => {
            this.followedActivities = following;

            // track changes bug, if both elements update fast one wont show up
            this.firebaseActivities.getUserActivities().subscribe((dashboards) => {
                this.myActivities = dashboards;
            });
        });
    }
}