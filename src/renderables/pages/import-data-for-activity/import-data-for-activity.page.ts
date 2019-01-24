import { Renderable, TrackChanges } from "@web/core";
import { ExternalDataService } from "@app/services/external.data.service";
import { DropboxImporter } from "@app/services/data-importer/dropbox.importer";
import { UrlTree, Router } from "@web/router";
import * as csvjson from "../../../../node_modules/csvjson";
@Renderable({
    template: require('./import-data-for-activity.page.html'),
    style: require('./import-data-for-activity.page.css')
})
export class ImportDataForActivity {
    private mapper = {
        csv: this.importCsv,
        json: this.importJson
    };
    private activityID = new UrlTree().routeParameter;
    private acceptedExtensions = [".json", ".csv", ".xls"];
    @TrackChanges()
    public dropBoxFiles: any = [];
    constructor(private externalDataService: ExternalDataService,
                private dropboxImporter: DropboxImporter
    ) { }

    public getFilesFromDropBox() {
        this.externalDataService.obtainFiles(this.dropboxImporter).subscribe((data) => {
            const entries = JSON.parse(data.text).entries;
            this.dropBoxFiles = [];
            for (const entry of entries) {
                let approvedFile = false;
                for (const extension of this.acceptedExtensions) {
                    if (entry.name.includes(extension)) {
                        approvedFile = true;
                    }
                }
                if (approvedFile === true) {
                    this.dropBoxFiles.push(entry);
                }
            }
        });
    }
    public getAndImportDataForAFile(index: number) {
        this.externalDataService.obtainDataFromFile(this.dropboxImporter, this.dropBoxFiles[index].name)
            .subscribe((data) => {
                console.log(data);
                this.mapper[this.dropBoxFiles[index].name.split('.').pop()](data.text);
            });
    }
    private importCsv(data): void {
        const options = {
            delimiter: ',',
            quote: '"'
        };
        const dataToImport = csvjson.toObject(data, options);
        for (const row of dataToImport) {
            console.log(row);
        }
    }
    private importJson(data): {} {
        const dataToImport = JSON.parse(data);
        return {};
    }
}