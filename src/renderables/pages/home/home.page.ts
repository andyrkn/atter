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
    public counter: number = 0;

    public followedActivities: any = {};
    public myActivities: any = {};

    constructor(
        private userService: UserService,
        private fillerDataService: FillerDataService,
        private firebaseActivities: FireBaseActivityService
    ) {
        this.userService.onLoginChange().subscribe((loginStatus: boolean) => this.loggedIn = loginStatus);
        this.getActivities();
    }

    public increment(): void {
        this.counter++;
    }

    private getActivities(): void {
        this.firebaseActivities.getUserActivities().subscribe((activities) => {
            this.myActivities = activities;
            console.log(activities);
        });
        this.firebaseActivities.getFollowedActivities().subscribe((activities) => {
            this.followedActivities = activities;
            console.log(activities);
        });
    }
}