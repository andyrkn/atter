import {
    Renderable
} from "@web/core";
import {
    ClassInfo
} from "./class-info";
import * as Chart from 'chart.js';

@Renderable({
    folderPathRelativeToRenderablesFolder: 'pages/admin-activity',
    templateUrl: '/admin-activity.page.html',
    styleUrl: '/admin-activity.page.css'
})
export class AdminActivityPage {

    public id: number = 1;
    public classInfo: ClassInfo = new ClassInfo();
    public afterRender(): void {
        for (const [index, week] of this.classInfo.checkIns.entries()) {

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