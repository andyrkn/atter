import { Module } from "@web/core";
import { appRoute } from "./app.routing";
import { HomePage, LoginPage, NotFoundPage, RegisterPage, ForgotPasswordPage, Dashboard, Activity, AdminActivityPage } from "./renderables/pages";
import { HeaderComponent } from "./renderables/components";
import { FillerDataService } from "./services/filler.data.service";
import { UserService } from "./services/user.service";

@Module({
    renderableDeclaration: {
        folderPath: 'src/renderables',
        declarations: [
            HomePage,
            LoginPage,
            NotFoundPage,
            HeaderComponent,
            RegisterPage,
            Dashboard,
            Activity,
            ForgotPasswordPage,
            AdminActivityPage

        ]
    },
    injectable: [
        FillerDataService,
        UserService
    ],
    route: appRoute
})
export class AppModule { }