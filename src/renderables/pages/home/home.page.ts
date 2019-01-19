import { Renderable, TrackChanges } from "@web/core";
import { FillerDataService } from "@app/services/filler.data.service";
import { UserService } from "@app/services/user.service";
import { FireBaseActivityService } from "@app/services/firebase/firebase-activities.service";
import { ExternalDataService } from "@app/services/external.data.service";
import { DropboxImporter } from "@app/services/data-importer/dropbox.importer";
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
        private firebaseActivities: FireBaseActivityService,
        private externalDataService: ExternalDataService,
        private dropboxImporter: DropboxImporter
    ) {
        this.userService.onLoginChange().subscribe((loginStatus: boolean) => this.loggedIn = loginStatus);

        if (this.userService.user) {
            this.getActivities();
        }
        if(this.dropboxImporter.getCurrentCodeFromLocalStorage())
        {
            this.dropboxImporter.setCurrentCode(this.dropboxImporter.getCurrentCodeFromLocalStorage());
            this.dropboxImporter.resetLocalStorageCode();
            console.log(this.dropboxImporter.getCurrentCode());
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

    public authorizeDropbox() {
        this.externalDataService.authorizeApp(this.dropboxImporter);
    }
}