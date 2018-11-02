import { Module } from "@web/core";
import { appRoute } from "./app.routing";
import {
    HomePage, LoginPage, NotFoundPage, RegisterPage,
    ForgotPasswordPage, Activity, DashboardPage, CreateNewActivityPage,
    FollowActivity, CheckInServivce
} from "./renderables/pages";

import { HeaderComponent, HeaderService } from "./renderables/components";
import { FillerDataService } from "./services/filler.data.service";
import { UserService } from "./services/user.service";
import { AsignGradePage } from "./renderables/pages/asign-grade/asign-grade.page";

@Module({
    renderableDeclaration: {
        folderPath: 'src/renderables',
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
            AsignGradePage
        ]
    },
    injectable: [
        FillerDataService,
        UserService,
        HeaderService,
        CheckInServivce
    ],
    route: appRoute
})
export class AppModule { }