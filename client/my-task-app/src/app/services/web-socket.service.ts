import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    private socket$: WebSocketSubject<any>;

    constructor() {
        this.socket$ = webSocket('ws://your-websocket-url');
    }

    public sendMessage(msg: any): void {
        this.socket$.next(msg);
    }

    public getMessages(): Observable<any> {
        return this.socket$.asObservable();
    }

    public close(): void {
        this.socket$.complete();
    }
}