import { Renderer, StyleHandler, DomProcessorHandler } from "./dom";
import { Application, InstanceManager } from "./core";
import { AppContainer } from "./core/aplication/app-container";
import { RoutingManager } from "./router/routing-manager";
import { Router } from "./router/router";
import { Subject } from "rxjs";
import { NavigationState } from "./router/utils/navigation-state.enum";
import { PageManipulatorHandler } from "./core/handlers/page-manipulator-handler";
import { ComponentManipulatorHandler } from "./core/handlers";
import { ComponentManager } from "./component";

export function startApplication<T>(application: Application<T>): void {
    AppContainer.mergeMetadata();

    const orchestrator = AppContainer.orchestrator;
    const dependencyContainer = AppContainer.dependencyContainer;

    const renderer = new Renderer();
    const styleHandler = new StyleHandler();

    const navigationState = new Subject<NavigationState>();
    const router = new Router(navigationState);
    dependencyContainer.addRouter(Router.name, router);

    const instanceManager = new InstanceManager(dependencyContainer);
    
    const processHandler = new DomProcessorHandler(renderer);
    const componentManipulatorHandler = new ComponentManipulatorHandler(styleHandler, instanceManager, processHandler);
    const pageManipulatorHandler = new PageManipulatorHandler(router, styleHandler, instanceManager, processHandler);

    const componentManager = new ComponentManager(orchestrator, componentManipulatorHandler);
    componentManager.manage();

    const routingManager = new RoutingManager(orchestrator, navigationState, pageManipulatorHandler);
    routingManager.manage();
}