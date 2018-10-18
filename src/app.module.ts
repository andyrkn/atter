import { Module } from "@web/core";
import { HomePage } from "./pages/home/home.page";
import { appRoute } from "./app.routing";
import { LoginPage } from "./pages/login/login.page";
import { NotFoundPage } from "./pages/not-found/not-found.page";

@Module({
    pagesDeclaration: {
        pagesFolder: 'src/pages',
        declarations: [
            HomePage,
            LoginPage,
            NotFoundPage
        ]
    },
    route: appRoute
})
export class AppModule { }