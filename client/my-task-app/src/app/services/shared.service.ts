import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class SharedService {

    private _userName: string = ''
    constructor() { }

    public set userName(v: string) {
        this._userName = v;
    }

    public get userName(): string {
        return this._userName;
    }
}