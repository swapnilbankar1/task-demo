import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WebSocketService } from './services/web-socket.service';
import { TaskService } from './services/task.service';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  userName = ''
  constructor(
    private toastr: ToastrService,
    private socketService: WebSocketService, private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.listenSocket();
    setTimeout(() => {
      
      this.userName = this.sharedService.userName;
    }, 2000);
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
