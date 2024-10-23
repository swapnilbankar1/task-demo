import { Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { TasksComponent } from './page/tasks/tasks.component';
import { ProfileComponent } from './page/profile/profile.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'tasks', component: TasksComponent },
    { path: 'profile', component: ProfileComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' } // Default route
];