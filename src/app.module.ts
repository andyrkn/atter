import { Module } from "@web/core";
import { appRoute } from "./app.routing";
import { HomePage } from "./renderables/pages/home/home.page";
import { LoginPage } from "./renderables/pages/login/login.page";
import { NotFoundPage } from "./renderables/pages/not-found/not-found.page";

@Module({
    renderableDeclaration: {
        folderPath: 'src/renderables',
        declarations: [
            HomePage,
            LoginPage,
            NotFoundPage
        ]
    },
    route: appRoute
})
export class AppModule { }