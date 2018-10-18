import { AppContainer } from "../aplication/app-container";

export function TrackChanges() {
    return (targetObject: Object, propertyName: string) => {
        AppContainer.addTrackChangesProperty({
            targetClass: targetObject.constructor,
            propertyName: propertyName
        });
    }
};