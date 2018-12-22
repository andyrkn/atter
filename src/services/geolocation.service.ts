import { Injectable } from "@web/core";
import { Coordinates } from "./coordinates";
import { Observable, from } from "rxjs";

@Injectable()
export class GeolocationService {

    private readonly maximumCheckInDistance: number = 10;

    constructor() { }

    private getCurrentLocation(): Observable<Coordinates> {
        return from(new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve(new Coordinates(position.coords.longitude, position.coords.latitude));
            });
        }));
    }

    public checkIfLegalCheckIn(): Observable<boolean> {

        // get activity coords from firebase
        const flon = 27.574614399999998;
        const flat = 47.1738559;
        const activityCoords = new Coordinates(flon, flat);

        return from(new Promise((resolve) => this.getCurrentLocation()
            .subscribe((coords) => resolve(coords.calculateDistance(activityCoords) < this.maximumCheckInDistance ? true : false))));
    }
}