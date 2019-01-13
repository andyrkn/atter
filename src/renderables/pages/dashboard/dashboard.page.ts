import { Renderable, TrackChanges, AfterRender, OnRefresh } from "@web/core";
import * as Chart from 'chart.js';

import { ActivityDetails } from "./activity-details";
import { CheckInServivce } from "./services/check-in.service";
import { UrlTree } from "@web/router";
import { FireBaseCheckInService } from "@app/services/firebase/firebase-checkin.service";

@Renderable({
    template: require('./dashboard.page.html'),
    style: require('./dashboard.page.css')
})
export class DashboardPage implements AfterRender, OnRefresh {
    private enableValue = 'Enable check-in';
    private disableValue = 'Disable check-in';
    private activityID = Number(new UrlTree().routeParameter);

    public maxDistance: number = 0;
    public id: number = 1;
    public activity: ActivityDetails = new ActivityDetails();

    @TrackChanges()
    public checkinButtonValue: string = this.enableValue;

    constructor(
        private checkInService: CheckInServivce,
        private firebaseCheckInService: FireBaseCheckInService) {
        this.checkinButtonValue = this.checkInService.checkinStatus ? this.disableValue : this.enableValue;
    }

    public onRefresh(): void {
        this.drawGraphs();
    }

    public afterRender(): void {
        this.drawGraphs();
    }
    /*
    public handleCheckInButton(): void {
        this.checkInService.toggleStatus();
        this.checkinButtonValue =
            this.checkInService.checkinStatus ? this.disableValue : this.enableValue;
    }*/

    public handleCheckInButton(): void {
        console.log(this.maxDistance);
        this.firebaseCheckInService.enableActivityCheckIn(10);
    }

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
    }

}