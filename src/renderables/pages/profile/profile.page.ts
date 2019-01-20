import { Renderable, TrackChanges } from "@web/core";
import { UserService } from "@app/services/user.service";
import { ExternalDataService } from "@app/services/external.data.service";
import { DropboxImporter } from "@app/services/data-importer/dropbox.importer";
@Renderable({
    template: require('./profile.page.html'),
    style: require('./profile.page.css')
})
export class ProfilePage {
    @TrackChanges()
    public firstName: string = "";
    @TrackChanges()
    public lastName: string = "";
    @TrackChanges()
    public email: string = "";
    constructor(
        private userService: UserService,
        private externalDataService: ExternalDataService,
        private dropboxImporter: DropboxImporter
    ) {
        this.userService.getCurrentUser().subscribe((data) => {
            this.firstName = data["firstName"];
            this.lastName = data["lastName"];
            this.email = data["email"];
        });
    }

    public authorizeDropbox() {
        this.externalDataService.authorizeApp(this.dropboxImporter);
    }
    public updateProfileData() {
        this.userService.updateValues(["firstName", "lastName"], [this.firstName, this.lastName]).subscribe();
    }

    // TO DO REAL TIME UPDATE
}