import { Renderable } from "@web/core";
import { DatabaseFirebaseService } from "@app/services/database-firebase.service";
import { NewActivityModel } from "@app/models/activity.model";

@Renderable({
    template: require('./create-new-activity.page.html'),
    style: require('./create-new-activity.page.css')
})
export class CreateNewActivityPage {

    constructor(
        private firebaseDataService: DatabaseFirebaseService
    ) { }

    public gradingTypes = ['Tags', 'Points', 'Free Text'];
    public activityName: string = "";

    private selectedIcon: number;
    private selectedGradingType: string;

    public selectIcon(index: number): void {
        this.selectedIcon = index;
    }
    public selectGradingType(type: string): void {
        this.selectedGradingType = type;
    }
    public createActivity(): void {
        if (!this.activityName) {
            alert("Empty activity name");
            return;
        }

        const activity = new NewActivityModel(
            this.activityName,
            this.selectedGradingType,
            this.selectedIcon !== undefined ? this.selectedIcon : 1
        );

        this.firebaseDataService.createActivity(activity);
    }
}