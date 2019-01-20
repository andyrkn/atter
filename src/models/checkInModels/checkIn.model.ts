export abstract class CheckInModel {
    constructor(user: string, distance: number) {
        this.user = user;
        this.distance = distance;
    }

    public user: string = null;
    public distance: number = null;
}