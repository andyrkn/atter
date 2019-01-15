import { CheckInModel } from "./checkIn.model";

export class IllegalCheckInModel extends CheckInModel {
    constructor(user: string, distance: number) {
        super(user, distance);
    }
}