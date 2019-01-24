import { Renderable, TrackChanges } from "@web/core";
import { UserService } from "@app/services/user.service";
import { ExternalDataService } from "@app/services/external.data.service";
import { DropboxImporter } from "@app/services/data-importer/dropbox.importer";
import { BehaviorSubject } from "rxjs";
@Renderable({
    template: require('./profile.page.html'),
    style: require('./profile.page.css')
})
export class ProfilePage {
    private _userSubject = new BehaviorSubject<any>(null);
    public firstName: string = "";
    public lastName: string = "";
    public email: string = "";

    @TrackChanges()
    public existsDropboxToken: boolean = false;
    @TrackChanges()
    public success: boolean = false;

    constructor(
        private userService: UserService,
        private externalDataService: ExternalDataService,
        private dropboxImporter: DropboxImporter
    ) {
        if (this.userService.user) {
            this.listenToUserChanges();
        }
    }

    public authorizeDropbox() {
        if (this.existsDropboxToken === false) {
            this.externalDataService.authorizeApp(this.dropboxImporter);
        } else {
            this.externalDataService.revokeAcces(this.dropboxImporter);
        }
    }
    public updateProfileData() {
        this.success = false;
        this.userService.updateValues(["firstName", "lastName"], [this.firstName, this.lastName]).subscribe(() => {
            this.success = true;
        });
    }
    private listenToUserChanges() {
        this.userService.getCurrentUserRealTime(this._userSubject);
        this._userSubject.subscribe((data) => {
            if (data !== null) {
                this.firstName = data.firstName;
                this.lastName = data.lastName;
                this.email = data.email;
                this.existsDropboxToken = false;
                if (data.dropboxOAuthToken !== "") {
                    this.existsDropboxToken = true;
                }
            }
        });
    }
}