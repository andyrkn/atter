import { Injectable } from "@web/core";
import { Coordinates } from "./coordinates";
import { Observable, from } from "rxjs";

@Injectable()
export class GeolocationService {

    constructor() { }

    public getCurrentLocation(): Observable<Coordinates> {
        return from(new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve(new Coordinates(position.coords.longitude, position.coords.latitude));
            });
        }));
    }

    public calculateDistance(activityCoords: Coordinates): Observable<number> {

        return from(new Promise((resolve) => this.getCurrentLocation()
            .subscribe((coords) => resolve(coords.calculateDistance(activityCoords)))));
    }
}