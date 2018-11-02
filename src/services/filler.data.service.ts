import { Injectable } from "@web/core";

@Injectable()
export class FillerDataService {

    private _followedActivities: any = [
        {
            name: 'arctic activity',
            id: 1,
            coordinator: 'Cristi',
            iconId: 3
        }, {
            name: 'CLIW',
            id: 2,
            coordinator: 'Sergiu',
            iconId: 1
        }, {
            name: 'another activity',
            id: 3,
            coordinator: 'Andrei',
            iconId: 5
        }, {
            name: 'cristi\'s activity',
            id: 4,
            coordinator: 'Buraga',
            iconId: 4
        }
    ];
    private _myActivities: any = [
        {
            name: 'laosdjhkfldasf',
            id: 1,
            iconId: 1
        }, {
            name: 'CLIW!!!!',
            id: 2,
            iconId: 5
        }, {
            name: 'anuheuheuhe>?y',
            id: 3,
            iconId: 2
        }, {
            name: 'cpadurety',
            id: 4,
            iconId: 3
        }, {
            name: 'arctos din cer',
            id: 5,
            iconId: 4
        }, {
            name: 'steauta',
            id: 6,
            iconId: 2
        }, {
            name: 'cristi\'s activity',
            id: 7,
            iconId: 1
        }, {
            name: 'cristi\'s activity',
            id: 8,
            iconId: 6
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