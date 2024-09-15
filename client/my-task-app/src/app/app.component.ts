import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { ToastrService } from 'ngx-toastr';
import { WebSocketService } from './services/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-task-app';
  taskName = '';
  taskDetails = '';

  taskList = [];

  constructor(private appService: AppService, private toastr: ToastrService,
    private socketService: WebSocketService) {

  }

  ngOnInit(): void {
    this.listenSocket();
  }

  createTask() {
    const payload = {
      name: this.taskName,
      details: this.taskDetails
    }
    this.appService.createTask(payload).subscribe(resp => {
      console.log(resp);
    }, error => {

    });
  }

  getTasks() {
    this.appService.getTasks().subscribe(resp => {
      console.log(resp);
    }, error => {
      console.log(error);

    });
  }

  listenSocket() {
    this.socketService.getMessages().subscribe(resp => {
      console.log(resp);
    });
  }
}
