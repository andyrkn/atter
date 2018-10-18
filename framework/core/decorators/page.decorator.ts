import { PageMetadata } from "../metadata/page.metadata";
import { AppContainer } from "../aplication/app-container";

export function Page(pageMetadata: PageMetadata) {
    return <TFunction extends Function>(target: TFunction) => {
        AppContainer.addPage(target, pageMetadata);
    };
}