import { Module } from "@web/core";
import { appRoute } from "./app.routing";
import { HomePage, LoginPage, NotFoundPage } from "./renderables/pages";
import { HeaderComponent } from "./renderables/components";
import { TestService, NeedyService, A } from "@app/services";

@Module({
    renderableDeclaration: {
        folderPath: 'src/renderables',
        declarations: [
            HomePage,
            LoginPage,
            NotFoundPage,
            HeaderComponent
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