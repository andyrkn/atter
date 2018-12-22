export class Coordinates {

    private longitude: number;
    private latitude: number;

    constructor(longitude: number, latitude: number) {
        this.longitude = longitude;
        this.latitude = latitude;
    }

    public calculateDistance(coords: Coordinates): number {
        const latitude1Rad: number = this.toRadians(this.latitude);
        const latitude2Rad: number = this.toRadians(coords.latitude);
        const deltaLon: number = this.toRadians(coords.longitude) - this.toRadians(this.longitude);
        const R: number = 6378137;
        const dist: number = Math.acos(
            Math.sin(latitude1Rad) * Math.sin(latitude2Rad) +
            Math.cos(latitude1Rad) * Math.cos(latitude2Rad) * Math.cos(deltaLon)) * R;

        return dist;
    }

    private toRadians(angle: number): number {
        return angle * (Math.PI / 180);
    }
}