import { Injectable } from "@web/core";

@Injectable()
export class FillerDataService {

    constructor() {

    }

    private _followedActivities: any = [
        {
            name: 'cristi\'s activity'
        }, {
            name: 'CLIW'
        }, {
            name: 'another activity'
        }, {
            name: 'cristi\'s activity'
        }
    ];
    private _myActivities: any = [
        {
            name: 'laosdjhkfldasf'
        }, {
            name: 'CLIW!!!!'
        }, {
            name: 'anuheuheuhe>?y'
        }, {
            name: 'cpadurety'
        }, {
            name: 'arctos din cer'
        }, {
            name: 'steauta'
        }, {
            name: 'cristi\'s activity'
        }
    ];

    public get myActivities() {
        return this._myActivities;
    }

    public get followedActivities() {
        return this._followedActivities;
    }
}