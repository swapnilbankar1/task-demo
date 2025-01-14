import { Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { TasksComponent } from './page/tasks/tasks.component';
import { ProfileComponent } from './page/profile/profile.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthOTPComponent } from './page/auth-otp/auth-otp.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'tasks', component: TasksComponent },
    { path: 'validateOTP', component: AuthOTPComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' } // Default route
];