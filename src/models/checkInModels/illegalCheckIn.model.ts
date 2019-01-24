import { CheckInModel } from "./checkIn.model";

export class IllegalCheckInModel extends CheckInModel {
    constructor(distance: number) {
        super(distance);
    }
}