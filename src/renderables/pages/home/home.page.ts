import { Renderable, TrackChanges } from "@web/core";
import { UserService } from "@app/services/user.service";
import { FireBaseActivityService } from "@app/services/firebase/firebase-activities.service";
import { ExternalDataService } from "@app/services/external.data.service";
import { DropboxImporter } from "@app/services/data-importer/dropbox.importer";
import { BehaviorSubject } from "rxjs";
@Renderable({
    template: require('./home.page.html'),
    style: require('./home.page.css')
})
export class HomePage {

    private _dashboardsSubject = new BehaviorSubject<any>(null);
    private _followingSubject = new BehaviorSubject<any>(null);

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
            this.listenToActivities();
        }
    }

    private listenToActivities(): void {
        this.firebaseActivities.getFollowedActivities(this._followingSubject);
        this.firebaseActivities.getUserActivities(this._dashboardsSubject);
        this._dashboardsSubject.subscribe((data) => { this.myActivities = data; });
        this._followingSubject.subscribe((data) => { this.followedActivities = data; });
    }

    public authorizeDropbox() {
        this.externalDataService.authorizeApp(this.dropboxImporter);
    }
}