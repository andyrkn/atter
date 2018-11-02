export class ActivityDetails {
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
                FirstName: "Bogdan",
                LastName: "Mihaila",
                tag: "CssMaster"
            },
            {
                FirstName: "Andrei",
                LastName: "Florin",
                tag: "HtmlApprentice"
            },
            {
                FirstName: "Iounut",
                LastName: "Apetrei",
                tag: "JsGod"
            },
            {
                FirstName: "Andrei",
                LastName: "Mihaila",
                tag: "CssMaster"
            },
            {
                FirstName: "Bogdan",
                LastName: "Glont",
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
                FirstName: "George",
                LastName: "Ion"
            }
            ]
        }, {
            Date: "28.01.2018",
            Attendees: [
                {
                    FirstName: "Andreea",
                    LastName: "Mihaila",
                    tag: "CssMaster"
                },
                {
                    FirstName: "Andrei",
                    LastName: "Hekerul",
                    tag: "HtmlApprentice"
                },
                {
                    FirstName: "Bogdan",
                    LastName: "Hekerul",
                    tag: "JsGod"
                },
                {
                    FirstName: "Andrei",
                    LastName: "JSGod",
                    tag: "JsGod"
                }
            ],
            frauds: [{
                FirstName: "Andreea",
                LastName: "Papadie"
            },
            {
                FirstName: "Matei",
                LastName: "Papadie"
            }
            ]
        }];
    }
}