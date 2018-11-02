import {
    Renderable, TrackChanges
} from "@web/core";
import {
    ActivityDetails
} from "./activity-details";
import * as Chart from 'chart.js';
import { CheckInServivce } from "./services/check-in.service";

@Renderable({
    folderPathRelativeToRenderablesFolder: 'pages/dashboard',
    templateUrl: '/dashboard.page.html',
    styleUrl: '/dashboard.page.css'
})
export class DashboardPage {
    private enableValue = 'Enable check-in';
    private disableValue = 'Disable check-in';

    public id: number = 1;
    public activity: ActivityDetails = new ActivityDetails();

    @TrackChanges()
    public checkinButtonValue: string = this.enableValue;

    constructor(private checkInService: CheckInServivce) {
        this.checkinButtonValue = this.checkInService.checkinStatus ? this.disableValue : this.enableValue;
    }

    public onRefresh(): void {
        this.handleCheckInButton();
        this.drawGraphs();
    }

    public afterRender(): void {
        this.handleCheckInButton();
        this.drawGraphs();
    }

    private handleCheckInButton(): void {
        // just a hack onClick feature is on its way
        document.getElementById('check-in-btn').addEventListener('click', () => {
            this.checkInService.toggleStatus();
            this.checkinButtonValue = this.checkInService.checkinStatus === true ? this.disableValue : this.enableValue;
        });
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