import { Renderable, TrackChanges } from "@web/core";
import { ExternalDataService } from "@app/services/external.data.service";
import { DropboxImporter } from "@app/services/data-importer/dropbox.importer";
import { UrlTree, Router } from "@web/router";
import * as csvjson from "../../../../node_modules/csvjson";
import { FireBaseCheckInService } from "@app/services/firebase/firebase-checkin.service";
import { throws } from "assert";
@Renderable({
    template: require('./import-data-for-activity.page.html'),
    style: require('./import-data-for-activity.page.css')
})
export class ImportDataForActivity {
    private mapper = {
    };
    private activityID = new UrlTree().routeParameter;
    private acceptedExtensions = [".json", ".csv"];
    @TrackChanges()
    public dropBoxFiles: any = [];
    constructor(private fireBaseCheckInService: FireBaseCheckInService,
                private externalDataService: ExternalDataService,
                private dropboxImporter: DropboxImporter,
                private router : Router
    ) {
        this.mapper["json"] = this.importJson.bind(this);
        this.mapper["csv"] = this.importCsv.bind(this);

    }

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
                this.mapper[this.dropBoxFiles[index].name.split('.').pop()](data.text);
            });
    }
    private importCsv(data): void {
        const options = {
            delimiter: ',',
            quote: '"'
        };
        const dataToImport = csvjson.toObject(data, options);
        const finalData : {} = {};
        for (const row of dataToImport) {
            const email =  row.email.replace('.', ',');
            const newCheckIn = {
                distance : row.distance,
                freeText : row.freeText,
                grade : row.grade
            };
            if (!finalData.hasOwnProperty(row.date)) {
                finalData[row.date] = {};
            }
            if (row.type === "legal") {
                if (!finalData[row.date].hasOwnProperty("legalcheckins")) {
                    finalData[row.date]["legalcheckins"] = {};
                    finalData[row.date]["legalcheckins"][email] = {};
                    finalData[row.date]["legalcheckins"][email] = newCheckIn;
                } else {
                    finalData[row.date]["legalcheckins"][email] = newCheckIn;
                }
            } else {
                if (!finalData[row.date].hasOwnProperty("frauds")) {
                    finalData[row.date]["frauds"] = {};
                    finalData[row.date]["frauds"][email] = {};
                    finalData[row.date]["frauds"][email] = newCheckIn;
                } else {
                    finalData[row.date]["frauds"][email] = newCheckIn;
                }
            }
        }
        this.fireBaseCheckInService.updateActivityFromExternalSource(this.activityID, finalData).subscribe(
             () => {this.router.navigate("dashboard", this.activityID); }
        );
    }
    private importJson(data) {
        const dataToImport = JSON.parse(data);
        this.fireBaseCheckInService.updateActivityFromExternalSource(this.activityID, dataToImport).subscribe(
            () => {this.router.navigate("dashboard", this.activityID); }
        );
    }
}
