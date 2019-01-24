import { CheckInModel } from "./checkIn.model";

export class LegalCheckInModel extends CheckInModel {
    constructor(distance: number) {
        super(distance);
    }

    public tags: string;
    public grade: number;
    public freeText: string;
}