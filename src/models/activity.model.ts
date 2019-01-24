export class NewActivityModel {
    constructor(name, iconID) {
        this.name = name;
        this.iconID = iconID;
        this.ableToCheckIn = false;
    }

    public ableToCheckIn: boolean;
    public name: string;
    public gradingType: string;
    public iconID: number;
}