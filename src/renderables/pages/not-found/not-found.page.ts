import { Renderable } from "@web/core";
import { DropboxImporter } from "@app/services/data-importer/dropbox.importer";
import { Router } from "@web/router";
import { ExternalDataService } from "@app/services/external.data.service";
@Renderable({
    template: require('./not-found.page.html'),
    style: require('./not-found.page.css')
})
export class NotFoundPage {

    constructor(private dropboxImporter: DropboxImporter, private router: Router, private externalDataService: ExternalDataService) {
        const currentLocation = window.location.href;
        const codeLocation = currentLocation.indexOf("code");
        if (codeLocation !== -1) {
            const code = currentLocation.substring(codeLocation + 5, currentLocation.length);
            this.externalDataService.obtainOauthToken(this.dropboxImporter, code);
            // window.location.href = "http://localhost:3000/#/home";
        }
    }
}