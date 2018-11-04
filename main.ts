import { startApplication } from "./framework/start-application";
import { AppModule } from "./src/app.module";
import 'reflect-metadata';

startApplication({
    entryModule: AppModule
});