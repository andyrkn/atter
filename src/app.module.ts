import { Module } from "@web/core";
import { appRoute } from "./app.routing";
import {
    HomePage, LoginPage, NotFoundPage, RegisterPage,
    ForgotPasswordPage, Activity, DashboardPage, CreateNewActivityPage,
    FollowActivity, CheckInServivce, ImportDataForActivity, ProfilePage
} from "./renderables/pages";

import { HeaderComponent, HeaderService } from "./renderables/components";
import { FillerDataService } from "./services/filler.data.service";
import { UserService } from "./services/user.service";
import { AsignGradePage } from "./renderables/pages/asign-grade/asign-grade.page";

@Module({
    declarations: [
        HomePage,
        LoginPage,
        NotFoundPage,
        HeaderComponent,
        RegisterPage,
        Activity,
        ForgotPasswordPage,
        DashboardPage,
        CreateNewActivityPage,
        FollowActivity,
        AsignGradePage,
        ImportDataForActivity,
        ProfilePage
    ],
    injectable: [
        FillerDataService,
        UserService,
        HeaderService,
        CheckInServivce
    ],
    route: appRoute
})
export class AppModule { }