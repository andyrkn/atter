import {BaseModel} from "./base.model";

export class UserModel implements BaseModel {
    public uid : string;
    public firstName : string;
    public lastName : string;
}