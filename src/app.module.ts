import { Module } from "@web/core";
import { appRoute } from "./app.routing";
import {
    HomePage, LoginPage, NotFoundPage, RegisterPage,
    ForgotPasswordPage, Activity, DashboardPage, CreateNewActivityPage,
    FollowActivity, CheckInServivce, LayoutPage, LogoutPage
} from "./renderables/pages";

import { HeaderComponent, HeaderService } from "./renderables/components";
import { UserService } from "./services/user.service";
import { AsignGradePage } from "./renderables/pages/asign-grade/asign-grade.page";
import { DropboxImporter } from "./services/data-importer/dropbox.importer";
import { FireBaseActivityService } from "./services/firebase/firebase-activities.service";
import { FireBaseActivitySubscriptionService } from "./services/firebase/firebase-activity-subscription.service";
import { AuthFirebaseSerivce } from "./services/firebase/firebase-auth.service";
import { FireBaseCheckInService } from "./services/firebase/firebase-checkin.service";
import { FirebaseService } from "./services/firebase/firebase.service";
import { ExternalDataService } from "./services/external.data.service";
import { GeolocationService } from "./services/geolocation.service";

@Module({
    declarations: [
        Activity,
        AsignGradePage,
        CreateNewActivityPage,
        DashboardPage,
        FollowActivity,
        ForgotPasswordPage,
        HomePage,
        LayoutPage,
        LogoutPage,
        LoginPage,
        NotFoundPage,
        HeaderComponent,
        RegisterPage
    ],
    injectable: [
        HeaderService,
        CheckInServivce,
        DropboxImporter,
        FireBaseActivityService,
        FireBaseActivitySubscriptionService,
        AuthFirebaseSerivce,
        FireBaseCheckInService,
        FirebaseService,
        ExternalDataService,
        GeolocationService,
        UserService
    ],
    route: appRoute
})
export class AppModule { }