import { Module } from "@web/core";
import { appRoute } from "./app.routing";
import { HomePage, LoginPage, NotFoundPage, RegisterPage } from "./renderables/pages";
import { HeaderComponent } from "./renderables/components";
import { TestService, NeedyService, A } from "@app/services";

@Module({
    renderableDeclaration: {
        folderPath: 'src/renderables',
        declarations: [
            HomePage,
            LoginPage,
            NotFoundPage,
            HeaderComponent,
            RegisterPage
        ]
    },
    injectable: [
        TestService,
        A,
        NeedyService
    ],
    route: appRoute
})
export class AppModule { }