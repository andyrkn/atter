import { Injectable } from "@web/core";

@Injectable()
export class FillerDataService {

    constructor() {

    }

    private _followedActivities: any = [
        {
            name: 'arctic activity',
            id: 1,
            coordinator: 'Cristi'
        }, {
            name: 'CLIW',
            id: 2,
            coordinator: 'Sergiu'
        }, {
            name: 'another activity',
            id: 3,
            coordinator: 'Andrei'
        }, {
            name: 'cristi\'s activity',
            id: 4,
            coordinator: 'Buraga'
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

    public getFollowedActivityId(id: any) {
        return this._followedActivities[id - 1];
    }
}