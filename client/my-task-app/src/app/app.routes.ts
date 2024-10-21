import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { TasksComponent } from './page/tasks/tasks.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'tasks', component: TasksComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' } // Default route
];