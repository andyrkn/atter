import { Renderable, TrackChanges } from "@web/core";
import { UrlTree, Router } from "@web/router";
import { FireBaseCheckInService } from "@app/services/firebase/firebase-checkin.service";
import { LegalCheckInModel } from "@app/models/checkInModels/legalCheckIn.model";
import { UserService } from "@app/services/user.service";

@Renderable({
    template: require('./asign-grade.page.html'),
    style: require('./asign-grade.page.css')
})
export class AsignGradePage {

    @TrackChanges()
    public user: LegalCheckInModel = new LegalCheckInModel(0);

    public grade: number = 0;
    public freeText: string = "";

    public userName: string = "";
    private params: string[];
    private route: string;

    constructor(
        private firebaseCheckInService: FireBaseCheckInService,
        private router: Router,
        private userService: UserService
    ) {
        this.params = new UrlTree().routeParameter.split('&');
        this.route = this.params[0] + '/' + this.params[1] + '/' + this.params[2] + '/' + this.params[3];

        this.firebaseCheckInService.getUserCheckIn(this.route).subscribe((data: LegalCheckInModel) => {
            this.user = data;
            this.grade = this.user.grade ? this.user.grade : 0;
            this.freeText = this.user.freeText ? this.user.freeText : "";
        });
        this.userName = this.userService.user.email;
    }

    public submit(): void {
        this.user.grade = this.grade;
        this.user.freeText = this.freeText;

        this.firebaseCheckInService.updateUserCheckIn(this.route, this.user).subscribe((res) => {
            this.router.navigate('/dashboard', this.params[0]);
        });

    }
}