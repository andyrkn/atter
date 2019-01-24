import { Renderable, TrackChanges, AfterRender, OnRefresh } from "@web/core";
import * as Chart from 'chart.js';

import { ActivityDetails } from "./activity-details";
import { UrlTree, Route, Router } from "@web/router";
import { FireBaseCheckInService } from "@app/services/firebase/firebase-checkin.service";
import { FireBaseActivityService } from "@app/services/firebase/firebase-activities.service";
import { BehaviorSubject } from "rxjs";

@Renderable({
    template: require('./dashboard.page.html'),
    style: require('./dashboard.page.css')
})
export class DashboardPage implements AfterRender, OnRefresh {
    private _checkInsSubject = new BehaviorSubject<any>(null);
    private enableValue = 'Enable check-in';
    private disableValue = 'Disable check-in';
    public activityID = new UrlTree().routeParameter;
    private activityDetails: any = {};

    @TrackChanges()
    private checkInData: any = null;

    public maxDistance: number = 0;
    public activity: ActivityDetails = new ActivityDetails();

    @TrackChanges()
    public checkinButtonValue: string = "...";

    constructor(
        private firebaseCheckInService: FireBaseCheckInService,
        private firebaseActivityService: FireBaseActivityService,
        private router: Router
    ) {

        // TODO: check if current user is actually allowed to browse this dashboard
        // console.log(this.userService.ownedactivities);

        this.firebaseActivityService.getStaticActivityDetails(this.activityID).subscribe((data) => {
            this.activityDetails = data;
            this.toggleCheckInButton(this.activityDetails.ableToCheckIn);
        });

        this.firebaseCheckInService.getAllCheckins(this.activityID, this._checkInsSubject);
        this._checkInsSubject.subscribe((data) => {
            console.log("created!");
            this.checkInData = data;
        });
    }

    private toggleCheckInButton(value: boolean): void {
        value === true ?
            this.checkinButtonValue = this.disableValue : this.checkinButtonValue = this.enableValue;
    }

    public onRefresh(): void {
        //    this.drawGraphs();
    }

    public afterRender(): void {
        //   this.drawGraphs();
    }

    public handleCheckInButton(): void {
        this.checkinButtonValue = "...";
        if (this.activityDetails.ableToCheckIn === false) {
            this.firebaseCheckInService.enableActivityCheckIn(this.maxDistance, this.activityID).subscribe((data: any) => {
                console.log(data);
                this.activityDetails = data;
                this.toggleCheckInButton(data.ableToCheckIn);
            });
        } else {
            this.firebaseCheckInService.disableActivityCheckIn(this.activityID).subscribe((data: any) => {
                console.log(data);
                this.activityDetails = data;
                this.toggleCheckInButton(data.ableToCheckIn);
            });
        }
    }
    /*
    private drawGraphs(): void {
        for (const [index, week] of this.activity.checkIns.entries()) {

            const keyData = [];
            const values: any = {};
            const extractedValues = [];
            for (const atendee of week.Attendees) {
                if (keyData.indexOf(atendee.tag) === -1) {
                    keyData.push(atendee.tag);
                }
                if (values[atendee.tag] === undefined) {
                    values[atendee.tag] = 1;
                } else {
                    values[atendee.tag]++;
                }

            }
            for (const [index1, record] of keyData.entries()) {
                extractedValues.push(values[keyData[index1]]);
            }
            const canvas = document.getElementById(`graph-${index}`) as any;
            const canvasContext = canvas.getContext('2d');
            const chart = new Chart(canvasContext, {
                type: 'bar',
                data: {
                    labels: keyData,
                    datasets: [{
                        label: '# of Attendees',
                        data: extractedValues,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: false,
                    scales: {
                        xAxes: [{
                            ticks: {
                                maxRotation: 90,
                                minRotation: 80
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }
    }*/
    public importGrades() {
        this.router.navigate("import", this.activityID);
    }
    public exportGradesJSON() {
        this.exportThis(JSON.stringify(this.checkInData), this.activityDetails.name + "-    grades.json", "json");
    }
    public exportGradesHTML() {
        const weeks = JSON.parse(JSON.stringify(this.checkInData));
        let data = "<!DOCTYPE html>";
        data = data + "<html>";
        data = data + "<head> <title>" + this.activityDetails.name + "</title> </head>";
        data = data + "<body>";
        for (const week in weeks) {
            if (weeks.hasOwnProperty(week)) {
                data = data + "<div>" + week + "</div>";
                if (weeks[week].hasOwnProperty("legalcheckins")) {
                    data = data + "<div> Legal Checkins";

                    for (const legal in weeks[week]["legalcheckins"]) {
                        if (weeks[week]["legalcheckins"].hasOwnProperty(legal)) {
                            data = data + "<div>" + legal;
                            data = data  + "<div> Distance :" +  weeks[week]["legalcheckins"][legal]["distance"] + "</div>";
                            data = data  + "<div> Grade :" +  weeks[week]["legalcheckins"][legal]["grade"] + "</div>";
                            data = data  + "<div> Free text :" +  weeks[week]["legalcheckins"][legal]["freeText"] + "</div>";
                            data = data + "</div>";
                        }
                    }
                    data = data + "</div>";
                }
                if (weeks[week].hasOwnProperty("frauds")) {
                    data = data + "<div> Frauds";

                    for (const fraud in weeks[week]["frauds"]) {
                        if (weeks[week]["frauds"].hasOwnProperty(fraud)) {
                            data = data + "<div>" + fraud + "</div>";
                        }
                    }
                    data = data + "</div>";
                }
            }
        }
        data = data + "</body>";
        data = data + "</html>";

        this.exportThis(data, this.activityDetails.name + "-activity.html", "html");
    }

    private exportThis(text, filename, type) {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/' + type + ';charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';

        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
}