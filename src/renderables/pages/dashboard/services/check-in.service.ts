import { Injectable } from '@web/core';

@Injectable()
export class CheckInServivce {

    constructor() {

    }

    public toggleStatus(): void {
        const newValue = this.checkinStatus === true ? 'FALSE' : 'TRUE';
        localStorage.setItem('checkInStatus', newValue);
    }

    public get checkinStatus(): boolean {
        return localStorage.getItem('checkInStatus') === 'TRUE' ? true : false;
    }
}