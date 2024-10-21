import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WebSocketService } from './services/web-socket.service';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  taskName = '';
  taskDetails = '';

  taskList = [];

  displayedColumns: string[] = ['name', 'status', 'details'];
  dataSource: any = [];

  constructor(
    private toastr: ToastrService,
    private taskService: TaskService,
    private socketService: WebSocketService, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.listenSocket();
  }

  clear() {
    this.taskName = '';
    this.taskDetails = '';
  }

  createTask() {
    const payload = {
      name: this.taskName,
      details: this.taskDetails
    }
    this.taskService.createTask(payload).subscribe(resp => {
      console.log(resp);
    }, error => {

    });
  }

  getTasks() {
    this.taskService.getTasks().subscribe((resp: any) => {
      console.log(resp);
      this.dataSource = resp.tasks;
    }, error => {
      console.log(error);
    });
  }

  removeTasks() {

  }

  listenSocket() {
    this.socketService.getMessages().subscribe(resp => {
      console.log(resp);
      this.handleNotification(resp);
    });
  }

  private handleNotification(resp: any) {
    if (resp.status.toLowerCase() === 'success') {
      this.toastr.success(resp.message);
    } else if (resp.status.toLowerCase() === 'running') {
      this.toastr.info(resp.message);
    } else if (resp.status.toLowerCase() === 'error') {
      this.toastr.error(resp.message);
    }
  }
}
