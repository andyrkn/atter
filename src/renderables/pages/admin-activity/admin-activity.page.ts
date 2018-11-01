import { Renderable } from "@web/core";
import { ClassInfo } from "./class-info";
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
        console.log('draww');
        for (const [index, week] of this.classInfo.checkIns.entries()) {
            const canvas = document.getElementById(`graph-${index}`) as any;
            const canvasContext = canvas.getContext('2d');
            const chart = new Chart(canvasContext, {
                type: 'bar',
                data: {
                    labels: [
                        "2015-01",
                        "2015-02",
                        "2015-03",
                        "2015-04",
                        "2015-05",
                        "2015-06",
                        "2015-07",
                        "2015-08",
                        "2015-09",
                        "2015-10",
                        "2015-11",
                        "2015-12"],
                    datasets: [{
                        label: '# of Tomatoes',
                        data: [12, 19, 3, 5, 2, 3, 20, 3, 5, 6, 2, 1],
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