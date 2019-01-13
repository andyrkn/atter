export class NewActivityModel {
    constructor(name, gradingType, iconID) {
        this.name = name;
        this.gradingType = gradingType;
        this.iconID = iconID;
    }

    public name: string;
    public gradingType: string;
    public iconID: number;
}