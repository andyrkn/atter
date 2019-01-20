import { Renderable, TrackChanges } from "@web/core";
import { ExternalDataService } from "@app/services/external.data.service";
import { DropboxImporter } from "@app/services/data-importer/dropbox.importer";
import { UrlTree } from "@web/router";
@Renderable({
    template: require('./import-data-for-activity.page.html'),
    style: require('./import-data-for-activity.page.css')
})
export class ImportDataForActivity {
    private activityID = new UrlTree().routeParameter;
    private acceptedExtensions = [".json", ".csv", ".xls"];
    @TrackChanges()
    public dropBoxFiles: [] = [];

    constructor(private externalDataService: ExternalDataService, private dropboxImporter: DropboxImporter) { }

    public getFilesFromDropBox() {
        this.externalDataService.obtainFiles(this.dropboxImporter).subscribe((data) => {
            const entries = JSON.parse(data.text).entries;
            for (const key in entries) {
            // REMOVE UNWANTED EXTENSIONS
            }
            this.dropBoxFiles = entries;
        });
    }
}