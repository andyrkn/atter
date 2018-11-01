    export class ClassInfo {
    public className: string;
    public description: string;
    public admin: string;
    public meetingDays: any = [];
    public startingTime: string;
    public endingTime: string;
    public status: string;
    public weekDays: any = [];
    public checkIns: any[] = [];
    constructor() {
        this.admin = "Andrei";
        this.description = " Description";
        this.status = "Active";
        this.className = "Test class";
        this.weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        this.meetingDays = ["Wed", "Fri", "Sun"];
        this.startingTime = "15:00";
        this.endingTime = "16:00";
        this.checkIns = [{
            Date: "27.01.2018",
            Attendees: [{
                    FirstName: "Andrei",
                    LastName: "Mihaila",
                    tag: "CssMaster"
                },
                {
                    FirstName: "Andrei",
                    LastName: "Mihaila",
                    tag: "HtmlApprentice"
                },
                {
                    FirstName: "Andrei",
                    LastName: "Mihaila",
                    tag: "JsGod"
                },
                {
                    FirstName: "Andrei",
                    LastName: "Mihaila",
                    tag: "CssMaster"
                },
                {
                    FirstName: "Andrei",
                    LastName: "Mihaila",
                    tag: "CssMaster"
                }
            ],
            frauds: [{
                    FirstName: "Andreea",
                    LastName: "Papadie"
                },
                {
                    FirstName: "Matei",
                    LastName: "Papadie"
                },
                {
                    FirstName: "Mihai",
                    LastName: "Papadie"
                }
            ]
        }, {
            Date: "28.01.2018",
            Attendees: [{
                FirstName: "Andreea",
                LastName: "Mihaila",
                tag: "CssMaster"
            }],
            frauds: [{
                FirstName: "Andreea",
                LastName: "Papadie"
            },
            {
                FirstName: "Matei",
                LastName: "Papadie"
            },
            {
                FirstName: "Mihai",
                LastName: "Papadie"
            }
        ]
        }];
    }
}