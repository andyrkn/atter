import { Injectable } from "@web/core";
import { UserService } from "../user.service";
import { FirebaseService } from "./firebase.service";
import { GeolocationService } from "../geolocation.service";
import { Coordinates } from "../coordinates";
import { from, Observable } from "rxjs";

@Injectable()
export class FireBaseCheckInService {

    constructor(
        private firebaseService: FirebaseService,
        private userService: UserService,
        private geolocationService: GeolocationService) {
    }

    private get userId() {
        return this.userService.user.uid;
    }

    private get database() {
        return this.firebaseService.firebaseApp.database();
    }

    private setActivityLocation(resolve): void {
        resolve(true);
    }

    public enableActivityCheckIn(distance: number): Observable<boolean> {
        let activityCoords: Coordinates;

        return from(new Promise((resolve) =>
            this.geolocationService.getCurrentLocation()
                .subscribe((coords: Coordinates) => {
                    activityCoords = coords;
                    console.log(activityCoords);
                })));
    }
}