import { Component } from '@angular/core';
import { AppService } from './app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-task-app';
  taskName = '';
  taskDetails = '';

  taskList = [];

  constructor(private appService: AppService, private toastr: ToastrService) {

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
    
  }
}
