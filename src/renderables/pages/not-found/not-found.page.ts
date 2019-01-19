import { Renderable } from "@web/core";
import { DropboxImporter } from "@app/services/data-importer/dropbox.importer";
import { Router } from "@web/router";
@Renderable({
    template: require('./not-found.page.html'),
    style: require('./not-found.page.css')
})
export class NotFoundPage {

    constructor(private dropboxImporter: DropboxImporter, private router: Router) {
        const currentLocation = window.location.href;
        const codeLocation = currentLocation.indexOf("code");
        if (codeLocation !== -1) {
            const code = currentLocation.substring(codeLocation + 5, currentLocation.length);
            this.dropboxImporter.setCurrentCodeInLocalStorage(code);
            window.location.href = "http://localhost:3000/#/home";
        }
    }
}