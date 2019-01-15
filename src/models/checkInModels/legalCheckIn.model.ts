import { CheckInModel } from "./checkIn.model";

export class LegalCheckInModel extends CheckInModel {
    constructor(user: string, distance: number) {
        super(user, distance);
    }

    public tags: string;
    public grade: number;
    public freeText: string;
}