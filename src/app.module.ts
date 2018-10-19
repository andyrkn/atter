import { Module } from "@web/core";
import { appRoute } from "./app.routing";
import { HomePage, LoginPage, NotFoundPage } from "./renderables/pages";
import { HeaderComponent } from "./renderables/components";

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
    route: appRoute
})
export class AppModule { }