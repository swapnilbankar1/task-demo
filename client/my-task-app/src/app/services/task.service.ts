import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    constructor(private http: HttpClient) {
    }

    createTask(payload: any) {
        return this.http.post('http://localhost:3000/api/tasks/create-task', payload);
    }

    getTasks() {
        return this.http.get('http://localhost:3000/api/tasks/get-tasks');
    }
}
