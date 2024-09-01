import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-task-app';
  taskName = '';
  taskDetails = '';

  constructor(private appService: AppService) {

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
}
