import { Renderable, TrackChanges } from "@web/core";
import { UrlTree, Router } from "@web/router";
import { FireBaseCheckInService } from "@app/services/firebase/firebase-checkin.service";
import { LegalCheckInModel } from "@app/models/checkInModels/legalCheckIn.model";

@Renderable({
    template: require('./asign-grade.page.html'),
    style: require('./asign-grade.page.css')
})
export class AsignGradePage {

    @TrackChanges()
    public user: LegalCheckInModel = new LegalCheckInModel('...', 0);

    public grade: number = 0;
    public freeText: string = "";
    public tags: string = "";

    private params: string[];
    private route: string;

    constructor(
        private firebaseCheckInService: FireBaseCheckInService,
        private router: Router
    ) {
        this.params = new UrlTree().routeParameter.split('&');
        this.route = this.params[0] + '/' + this.params[1] + '/' + this.params[2] + '/' + this.params[3];

        this.firebaseCheckInService.getUserCheckIn(this.route).subscribe((data: LegalCheckInModel) => {
            this.user = data;
            this.grade = this.user.grade ? this.user.grade : 0;
            this.tags = this.user.tags ? this.user.tags : "";
            this.freeText = this.user.freeText ? this.user.freeText : "";
        });
    }

    public submit(): void {
        this.user.grade = this.grade;
        this.user.tags = this.tags;
        this.user.freeText = this.freeText;

        this.firebaseCheckInService.updateUserCheckIn(this.route, this.user).subscribe((res) => {
            if (res) { this.router.navigate('/dashboard', this.params[0]); } else { alert("submission failure"); }
        });

    }
}